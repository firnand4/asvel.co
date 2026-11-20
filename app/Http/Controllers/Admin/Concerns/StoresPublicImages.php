<?php

namespace App\Http\Controllers\Admin\Concerns;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

/**
 * Uploaded images live on the "public" disk and are stored as a path relative to
 * public/ (e.g. "storage/team/abc.jpg"), so the frontend can render "/{path}".
 * Requires `php artisan storage:link`.
 */
trait StoresPublicImages
{
    protected function storePublicImage(UploadedFile $file, string $folder): string
    {
        return 'storage/' . $file->store($folder, 'public');
    }

    /** Only deletes files this app uploaded; paths like images/portfolio/... are left alone. */
    protected function deletePublicImage(?string $path): void
    {
        if ($path && Str::startsWith($path, 'storage/')) {
            Storage::disk('public')->delete(Str::after($path, 'storage/'));
        }
    }

    /**
     * Applies an upload or removal request to $current and returns the new path.
     * Returns $current unchanged when neither was requested.
     */
    protected function syncPublicImage(?UploadedFile $file, bool $remove, ?string $current, string $folder): ?string
    {
        if ($file) {
            $this->deletePublicImage($current);
            return $this->storePublicImage($file, $folder);
        }

        if ($remove) {
            $this->deletePublicImage($current);
            return null;
        }

        return $current;
    }
}
