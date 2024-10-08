<?php

use App\Http\Controllers\MessageController;
use App\Http\Controllers\MessengerController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserProfileController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

Route::middleware('auth')->group(function () {
    Route::get('/messenger', [MessengerController::class, 'index'])->name('messenger.index');
    Route::post('/profile', [UserProfileController::class, 'update'])->name('profile.update');
    Route::get('/profile/{id}', [UserProfileController::class, 'show'])->name('profile.show');
    Route::get('messenger/search', [MessengerController::class, 'search'])->name('messenger.search');

    Route::post('/send-message', [MessageController::class, 'sendMessage'])->name('send-message');
    Route::get('/fetch-messages', [MessageController::class, 'fetchMessage'])->name('fetch-messages');
});
