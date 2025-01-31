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
use App\Http\Controllers\User\PostLikesController;
use App\Http\Controllers\User\CommentController;
use App\Http\Controllers\User\GroupController;
use App\Http\Controllers\User\FriendRequestController;
use App\Http\Controllers\User\EventsController;
use App\Http\Controllers\User\ProfileController;
use App\Models\Profile;

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
    Route::get('/posts', [PostController::class, 'index']); // Obtener TODOS los posts en la BB.DD
    //Likes de los posts
    Route::post(
        '/posts/{post}/likePost',
        [PostLikesController::class, 'likePost']
    );
    //Comentarios de los posts
    Route::post('/posts/{post}/comments', [CommentController::class, 'store']);
    Route::delete('/comments/{comment}', [CommentController::class, 'destroy']);


    //Rutas de amigos
    Route::post('friends/request/{toUserId}', [FriendRequestController::class, 'sendRequest']); // Envia peticion de amistad
    Route::get('friend-requests-pending', [FriendRequestController::class, 'getPendingRequests']); // Busca peticiones de amistad pendientes.
    Route::post('friends/request/{friendRequest}/respond', [FriendRequestController::class, 'respondToRequest']); // Responde a la peticion
    Route::delete('friends/remove/{friendId}', [FriendRequestController::class, 'removeFriend']); // Borra a un amigo
    Route::get('friends/{userId}', [FriendRequestController::class, 'getFriends']); // Busca amigos de un usuario



    //Rutas de los grupos
    Route::post('/groups', [GroupController::class, 'store']); // Crea un nuevo grupo
    Route::get('/groups', [GroupController::class, 'index']); // Lista todos los grupos del usuario
    Route::get('/groups/{group}', [
        GroupController::class,
        'show'
    ]); // Mostrar detalles del grupo
    Route::put('/groups/{group}', [
        GroupController::class,
        'update'
    ]); // Modificar datos del grupo
    Route::delete('/groups/{group}', [GroupController::class, 'destroy']); // Borrar el grupo
    Route::post('/groups/{group}/join', [GroupController::class, 'join']); //Unirse a un grupo
    Route::post('/groups/{group}/leave', [GroupController::class, 'leave']); // Abandonar un grupo


    //Rutas de los eventos
    Route::post('/events', [EventsController::class, 'store']); // Creacion de un evento
    Route::get('/events', [EventsController::class, 'index']); // Muestra todos los eventos del usuario
    Route::get('events/{id}', [EventsController::class, 'show']); //Muestra la info de un evento en especifico
    Route::put('events/edit/{id}', [EventsController::class, 'update']); //Edita los parametros del evento.
    Route::delete('/events/{id}', [EventsController::class, 'destroy']); // Borrar el grupo
    Route::post('events/join', [EventsController::class, 'join']); //Unirse a un evento
    Route::post('events/leave', [EventsController::class, 'leave']); //Abandonar a un evento


    //Ruta de gestion del perfil de usuario
    Route::get('profile', [ProfileController::class, 'index']); // Obtener informacion del perfil del usuario
    Route::get('profile/{id}', [ProfileController::class, 'getProfile']); // Obtener info perfil especifico
    Route::get('profile/picture/{id?}', [ProfileController::class, 'getProfilePicture']); //Obtiene foto de perfil de usuario
    Route::post('edit/profile-picture', [ProfileController::class, 'setProfilePicture']); // Modifica la foto de perfil del usuario
    Route::put('edit/profile-email', [ProfileController::class, 'setEmail']); // Modifica el email del usuario
    Route::put('edit/profile-password', [ProfileController::class, 'setPassword']); // Modifica la contraseña del usuario
    Route::put('edit/profile-nickname', [ProfileController::class, 'setNickname']); //Modifica el nickname del usuario
    Route::put('edit/profile-interests', [ProfileController::class, 'setInterests']); // Modifica los intereses del usuario
});
