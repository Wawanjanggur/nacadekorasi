<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;

class CategoryController extends Controller
{
    use ApiResponse;

    public function index(): JsonResponse
    {
        $categories = Category::where('is_active', true)
            ->withCount(['packages' => fn ($q) => $q->where('is_active', true)])
            ->get();

        return $this->success(CategoryResource::collection($categories), 'Daftar kategori dekorasi');
    }

    public function show(int|string $idOrSlug): JsonResponse
    {
        $category = Category::where('is_active', true)
            ->where(fn ($q) => $q->where('id', $idOrSlug)->orWhere('slug', $idOrSlug))
            ->with(['packages' => fn ($q) => $q->where('is_active', true)])
            ->firstOrFail();

        return $this->success(new CategoryResource($category), 'Detail kategori');
    }
}
