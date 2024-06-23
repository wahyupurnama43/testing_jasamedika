<?php

use App\Http\Controllers\MobilController;
use App\Http\Controllers\PengembalianController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SewaController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
 */

Route::get('/', function () {
    return Inertia::render('Auth/Login');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::name("mobil.")->group(function () {
        Route::get('/mobil', [MobilController::class, 'show'])->name('show');
        Route::get('/mobil/create', [MobilController::class, 'create'])->name('create');
        Route::post('/mobil/store', [MobilController::class, 'store'])->name('store');
        Route::get('/mobil/{id}', [MobilController::class, 'edit'])->name('edit');
        Route::put('/mobil/{id}', [MobilController::class, 'update'])->name('update');
        Route::delete('/mobil/{id}', [MobilController::class, 'destroy'])->name('destroy');
    });

    Route::name("sewa.")->group(function () {
        Route::get('/sewa', [SewaController::class, 'show'])->name('show');
        Route::get('/sewa/create', [SewaController::class, 'create'])->name('create');
        Route::post('/sewa/store', [SewaController::class, 'store'])->name('store');
        Route::get('/sewa/{id}', [SewaController::class, 'edit'])->name('edit');
        Route::put('/sewa/{id}', [SewaController::class, 'update'])->name('update');
        Route::post('/sewa/available-cars', [SewaController::class, 'checkAvailability'])->name('check');
    });

    Route::name("pengembalian.")->group(function () {
        Route::get('/pengembalian', [PengembalianController::class, 'show'])->name('show');
        Route::post('/pengembalian', [PengembalianController::class, 'store'])->name('store');
    });

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
