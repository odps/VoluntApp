<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

//Funcion que maneja el inicio de sesion, si va bien, devuelve un token de autentificacion
class AuthenticatedSessionController extends Controller
{
    public function store(LoginRequest $request): JsonResponse
    {
        $request->authenticate();
        
        //Solo se permite una sesion abierta por usuario.
        $request->user()->tokens()->delete();        
        $token = $request->user()->createToken('auth-token', ['*'], now()->addHours(4));
        
        return response()->json([
            'token' => $token->plainTextToken
        ]);
    }

    public function destroy(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();
        
        return response()->json([
            'message' => 'Logged out successfully'
        ]);
    }
}