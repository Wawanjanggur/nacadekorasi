<?php

namespace App\Services;

use App\Models\DecorationPackage;
use App\Repositories\Contracts\PackageRepositoryInterface;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class PackageService
{
    public function __construct(
        protected PackageRepositoryInterface $packageRepository
    ) {
    }

    public function createPackage(array $data): DecorationPackage
    {
        return DB::transaction(function () use ($data) {
            $data['slug'] = Str::slug($data['name']) . '-' . Str::lower(Str::random(5));
            $items = $data['items'] ?? [];
            unset($data['items']);

            /** @var DecorationPackage $package */
            $package = $this->packageRepository->create($data);

            if (! empty($items)) {
                $this->syncItems($package, $items);
            }

            return $package->load(['category', 'items']);
        });
    }

    public function updatePackage(DecorationPackage $package, array $data): DecorationPackage
    {
        return DB::transaction(function () use ($package, $data) {
            if (isset($data['name']) && $data['name'] !== $package->name) {
                $data['slug'] = Str::slug($data['name']) . '-' . Str::lower(Str::random(5));
            }

            $items = $data['items'] ?? null;
            unset($data['items']);

            $package->update($data);

            if ($items !== null) {
                $this->syncItems($package, $items);
            }

            return $package->fresh(['category', 'items']);
        });
    }

    public function syncItems(DecorationPackage $package, array $items): void
    {
        // $items structure: [ ['item_id' => 1, 'quantity' => 2], ... ]
        $syncData = [];
        foreach ($items as $item) {
            $syncData[$item['item_id']] = ['quantity' => $item['quantity'] ?? 1];
        }
        $package->items()->sync($syncData);
    }
}
