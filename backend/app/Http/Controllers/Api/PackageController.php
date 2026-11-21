<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Package\StorePackageRequest;
use App\Http\Requests\Package\UpdatePackageRequest;
use App\Http\Resources\DecorationPackageResource;
use App\Models\DecorationPackage;
use App\Repositories\Contracts\PackageRepositoryInterface;
use App\Services\PackageService;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PackageController extends Controller
{
    use ApiResponse;

    public function __construct(
        protected PackageRepositoryInterface $packageRepository,
        protected PackageService $packageService
    ) {
    }

    public function index(Request $request): JsonResponse
    {
        $categoryId = $request->query('category_id');
        $search = $request->query('search');
        $perPage = (int) $request->query('per_page', 12);

        $packages = $this->packageRepository->getActivePackages(
            categoryId: $categoryId ? (int) $categoryId : null,
            search: $search,
            perPage: $perPage
        );

        return $this->success([
            'items' => DecorationPackageResource::collection($packages->items()),
            'pagination' => [
                'current_page' => $packages->currentPage(),
                'last_page' => $packages->lastPage(),
                'per_page' => $packages->perPage(),
                'total' => $packages->total(),
            ],
        ], 'Daftar paket dekorasi');
    }

    public function show(string $slug): JsonResponse
    {
        $package = $this->packageRepository->findBySlug($slug);

        if (! $package) {
            return $this->error('Paket dekorasi tidak ditemukan', 404);
        }

        return $this->success(new DecorationPackageResource($package), 'Detail paket dekorasi');
    }

    public function store(StorePackageRequest $request): JsonResponse
    {
        $this->authorize('create', DecorationPackage::class);

        $package = $this->packageService->createPackage($request->validated());

        return $this->created(new DecorationPackageResource($package), 'Paket dekorasi berhasil ditambahkan');
    }

    public function update(UpdatePackageRequest $request, DecorationPackage $package): JsonResponse
    {
        $this->authorize('update', $package);

        $updated = $this->packageService->updatePackage($package, $request->validated());

        return $this->success(new DecorationPackageResource($updated), 'Paket dekorasi berhasil diperbarui');
    }

    public function destroy(DecorationPackage $package): JsonResponse
    {
        $this->authorize('delete', $package);

        $package->delete();

        return $this->success(null, 'Paket dekorasi berhasil dihapus');
    }
}
