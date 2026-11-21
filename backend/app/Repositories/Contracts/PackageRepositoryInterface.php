<?php

namespace App\Repositories\Contracts;

use App\Models\DecorationPackage;
use Illuminate\Pagination\LengthAwarePaginator;

interface PackageRepositoryInterface extends BaseRepositoryInterface
{
    public function getActivePackages(?int $categoryId = null, ?string $search = null, int $perPage = 12): LengthAwarePaginator;

    public function findBySlug(string $slug): ?DecorationPackage;
}
