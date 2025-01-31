<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Models\User;
use App\Models\Profile;

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

    public function setEmail(Request $request)
    {
        $request->validate([
            'email' => 'required|email|unique:users,email',
        ]);

        $user = $request->user();
        $user->email = $request->input('email');
        $user->save();

        return response()->json(['message' => 'Email updated successfully']);
    }

    public function setPassword(Request $request)
    {
        $request->validate([
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user = $request->user();
        $user->password = bcrypt($request->input('password'));
        $user->save();

        return response()->json(['message' => 'Password updated successfully']);
    }

    public function setNickname(Request $request)
    {
        $request->validate([
            'nickname' => 'required|string|max:255',
        ]);

        $user = $request->user();
        $user->profile['nickname'] = $request->input('nickname');
        $user->profile->save();

        return response()->json(['message' => 'Nickname updated successfully']);
    }

    public function setProfilePicture(Request $request)
    {
        $request->validate([
            'profile_picture_route' => 'required|string|max:255',
        ]);

        $user = $request->user();
        $user->profile['profile_picture_route'] = $request->input('profile_picture_route');
        $user->profile->save();

        return response()->json(['message' => 'Profile picture updated successfully']);
    }

    public function setInterests(Request $request)
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
