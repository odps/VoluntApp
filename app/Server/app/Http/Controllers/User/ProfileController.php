<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Models\User;
use App\Models\Profile;
use Illuminate\Support\Facades\Storage;

use function PHPUnit\Framework\isEmpty;

class ProfileController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();
        $profile = $user->profile;

        return response()->json([
            'user' => $user,
            'profile' => $profile
        ]);
    }

    public function getProfile($id): JsonResponse
    {
        try {
            $user = User::find($id);

            if (is_null($user)) {
                return response()->json([
                    'message' => "Este usuario no existe",
                ]);
            }
            $profile = $user->profile;

            return response()->json([
                'user' => $user,
                'profile' => $profile
            ]);
        } catch (\Exception $err) {
            return response()->json([
                'message' => $err->getMessage(),
            ]);
        }
    }

    public function setEmail(Request $request): JsonResponse
    {
        $request->validate([
            'email' => 'required|email|unique:users,email',
        ]);

        $user = $request->user();
        $user->email = $request->input('email');
        $user->save();

        return response()->json(['message' => 'Email updated successfully']);
    }

    public function setPassword(Request $request): JsonResponse
    {
        $request->validate([
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user = $request->user();
        $user->password = bcrypt($request->input('password'));
        $user->save();

        return response()->json(['message' => 'Password updated successfully']);
    }

    public function setNickname(Request $request): JsonResponse
    {
        $request->validate([
            'nickname' => 'required|string|max:255',
        ]);

        $user = $request->user();
        $user->name = $request->input('nickname');
        $user->profile['nickname'] = $request->input('nickname');
        $user->profile->save();
        $user->save();

        return response()->json(['message' => 'Nickname updated successfully']);
    }

    public function setProfilePicture(Request $request): JsonResponse
    {
        $request->validate([
            'image' => 'required|image|mimes:png,jpg,jpeg|max:2048',
        ]);

        $image = $request->file('image');
        $filename = 'profile_' . $request->user()->id . '_' . time() . '.' . $image->getClientOriginalExtension();

        // Guarda el fichero en el servidor dentro de storage/app/public/profile_pictures
        // Usando php artisan storage:link, se pueden guardar de forma segura y ser accesidos usando storage/profile_pictures/{fichero}
        $path = $request->file('image')->storeAs('profile_pictures', $filename, 'public');

        $user = $request->user();

        // Borra la imagen antigua, en caso de que esta exista.
        if ($user->profile->profile_picture_route) {
            $oldPath = str_replace('storage/', '', $user->profile->profile_picture_route);
            if (Storage::disk('public')->exists($oldPath)) {
                Storage::disk('public')->delete($oldPath);
            }
        }

        $user->profile->profile_picture_route = 'storage/' . $path;
        $user->profile->save();

        return response()->json(['message' => 'Profile picture updated successfully']);
    }

    //Funcion que devuelve la url de la foto de perfil del usuario solicitado
    public function getProfilePicture(Request $request, $id = null): JsonResponse
    {
        $profile = $id ? Profile::findOrFail($id) : $request->user()->profile;

        if (!$profile->profile_picture_route) {
            return response()->json([
                'url' => '/storage/profile_pictures/default.png'
            ]);
        }

        return response()->json([
            'url' => asset($profile->profile_picture_route)
        ]);
    }

    public function setInterests(Request $request): JsonResponse
    {
        $request->validate([
            'interests' => 'required|string|max:255',
        ]);

        $user = $request->user();
        $user->profile['interests'] = $request->input('interests');
        $user->profile->save();

        return response()->json(['message' => 'Interests updated successfully']);
    }
}
