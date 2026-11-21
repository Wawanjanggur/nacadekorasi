<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Symfony\Component\HttpFoundation\Response;

class RateLimitMiddleware
{
    /**
     * Handle an incoming request with rate limiting.
     */
    public function handle(Request $request, Closure $next, string $type = 'default'): Response
    {
        $key = $this->resolveRateLimiterKey($request, $type);

        $rateLimiter = match ($type) {
            'auth' => 30,      // 30 requests per minute for authentication
            'api' => 60,       // 60 requests per minute for API
            'store' => 10,     // 10 requests per minute for store operations
            default => 120,    // 120 requests per minute for general API
        };

        if (RateLimiter::tooManyAttempts($key, $rateLimiter)) {
            return response()->json([
                'message' => 'Too many requests. Please try again later.',
                'seconds' => RateLimiter::availableIn($key),
            ], 429);
        }

        RateLimiter::hit($key, 60); // Increment attempt counter for 60 seconds

        $response = $next($request);

        // Add rate limit headers to response
        $response->headers->add([
            'X-RateLimit-Limit' => $rateLimiter,
            'X-RateLimit-Remaining' => RateLimiter::remaining($key),
            'Retry-After' => RateLimiter::availableIn($key) > 0 ? (string) RateLimiter::availableIn($key) : '60',
        ]);

        return $response;
    }

    /**
     * Resolve the rate limiter key based on request type and user.
     */
    protected function resolveRateLimiterKey(Request $request, string $type): string
    {
        if ($request->user()) {
            return sprintf('%s_%d', $type, $request->user()->id);
        }

        return sprintf('anonymous_%s_%s', $type, $request->ip());
    }
}
