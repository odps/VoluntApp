<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\User\PostController;

// Ruta para obtener los datos de la cuenta de usuario
Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});


// Rutas para el registro y autentificacion del usuario.
Route::post('/register', [RegisteredUserController::class, 'store'])
    ->middleware('guest')
    ->name('register');

    Route::post('/login', [AuthenticatedSessionController::class, 'store'])
    ->middleware('guest')
    ->name('login');

Route::post('/forgot-password', [PasswordResetLinkController::class, 'store'])
    ->middleware('guest')
    ->name('password.email');

Route::post('/reset-password', [NewPasswordController::class, 'store'])
    ->middleware('guest')
    ->name('password.store');

Route::post('/verify-email/{id}/{hash}', VerifyEmailController::class)
    ->middleware(['auth:sanctum', 'signed', 'throttle:6,1'])
    ->name('verification.verify');

Route::post('/email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
    ->middleware(['auth:sanctum', 'throttle:6,1'])
    ->name('verification.send');

Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
    ->middleware('auth:sanctum')
    ->name('logout');

// Rutas protegidas (Requiere login para poder acceder a ellas)
Route::middleware('auth:sanctum')->group(function () {
    // Rutas que controlan los posts en la red social
    Route::post('/posts', [PostController::class, 'store']); // Ruta para almacenar un post
    Route::delete('/posts/{post}', [PostController::class, 'destroy']); // Ruta para borrar un post
    Route::put('/posts/{post}', [PostController::class, 'update']); // Ruta para editar un post
    Route::get('/posts/{post}', [PostController::class, 'show']); // Obtener informacion de UN post
    Route::get('/posts', [PostController::class, 'index']); // Obtener todos los posts en la BB.DD



});