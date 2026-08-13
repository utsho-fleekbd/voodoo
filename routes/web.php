<?php

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
});

require __DIR__.'/settings.php';
