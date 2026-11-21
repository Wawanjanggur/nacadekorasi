<?php

namespace App\Repositories\Contracts;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Pagination\LengthAwarePaginator;

interface BaseRepositoryInterface
{
    public function all(array $columns = ['*'], array $relations = []): Collection;

    public function paginate(int $perPage = 15, array $columns = ['*'], array $relations = []): LengthAwarePaginator;

    public function findById(int $id, array $columns = ['*'], array $relations = []): ?Model;

    public function findOrFail(int $id, array $columns = ['*'], array $relations = []): Model;

    public function create(array $payload): Model;

    public function update(int $id, array $payload): bool;

    public function delete(int $id): bool;
}
