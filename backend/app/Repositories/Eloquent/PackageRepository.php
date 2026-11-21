<?php

namespace App\Repositories\Eloquent;

use App\Models\DecorationPackage;
use App\Repositories\Contracts\PackageRepositoryInterface;
use Illuminate\Pagination\LengthAwarePaginator;

class PackageRepository extends BaseRepository implements PackageRepositoryInterface
{
    public function __construct(DecorationPackage $model)
    {
        parent::__construct($model);
    }

    public function getActivePackages(?int $categoryId = null, ?string $search = null, int $perPage = 12): LengthAwarePaginator
    {
        return $this->model
            ->with(['category', 'items'])
            ->where('is_active', true)
            ->when($categoryId, fn ($q) => $q->where('category_id', $categoryId))
            ->when($search, fn ($q) => $q->where(function ($sub) use ($search) {
                $sub->where('name', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            }))
            ->latest()
            ->paginate($perPage);
    }

    public function findBySlug(string $slug): ?DecorationPackage
    {
        return $this->model
            ->with(['category', 'items', 'reviews.user'])
            ->where('slug', $slug)
            ->first();
    }
}
