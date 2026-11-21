<?php

namespace App\Policies;

use App\Models\DecorationPackage;
use App\Models\User;

class DecorationPackagePolicy
{
    public function before(User $user, string $ability): ?bool
    {
        if ($user->isAdmin()) {
            return true;
        }

        return null;
    }

    public function viewAny(?User $user): bool
    {
        return true;
    }

    public function view(?User $user, DecorationPackage $package): bool
    {
        return true;
    }

    public function create(User $user): bool
    {
        return $user->isAdmin();
    }

    public function update(User $user, DecorationPackage $package): bool
    {
        return $user->isAdmin();
    }

    public function delete(User $user, DecorationPackage $package): bool
    {
        return $user->isAdmin();
    }
}
