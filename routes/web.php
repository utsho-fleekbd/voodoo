<?php

use App\Http\Controllers\NotificationController;
use App\Http\Controllers\PersuasionController;
use App\Http\Controllers\VoodooController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/voodoos', [VoodooController::class, 'index'])
        ->name('voodoos.index');
    Route::get('/voodoos/create', [VoodooController::class, 'create'])
        ->name('voodoos.create');
    Route::post('/voodoos', [VoodooController::class, 'store'])
        ->name('voodoos.store');
    Route::post('/voodoos/children', [VoodooController::class, 'storeChildren'])
        ->name('voodoos.storeChildren');
    Route::get('/voodoos/{voodoo}', [VoodooController::class, 'show'])
        ->name('voodoos.show');

    Route::post('/persuasions/persuade/{voodoo}', [PersuasionController::class, 'persuade'])
        ->name('persuasions.persuade');

    Route::get('/notifications', [NotificationController::class, 'index'])
        ->name('notifications.index');
    Route::post('/notifications/mark-all-as-read', [NotificationController::class, 'markAllAsRead'])
        ->name('notifications.markAllAsRead');
    Route::post('/notifications/mark-as-read/{id}', [NotificationController::class, 'markAsRead'])
        ->name('notifications.markAsRead');
});

require __DIR__.'/settings.php';
