<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Models\Post;
use Illuminate\Support\Facades\DB;

class PostLikesController extends Controller
{
    //Esta funcion
    public function likePost(Request $request, Post $post): JsonResponse
    {
        //Se recogen el id del usuario que realiza la peticion
        $userId = $request->user()->id;

        //Se verifica si en nuestra base de datos existe una relacion de like entre el usuario y el post
        $liked = DB::table('post_likes')
            ->where('post_id', $post->id)
            ->where('user_id', $userId)
            ->exists();

        //Si existe, se elimina la relacion, borrando asi el Like.
        if ($liked) {
            // Unlike
            DB::table('post_likes')
                ->where('post_id', $post->id)
                ->where('user_id', $userId)
                ->delete();

            return response()->json([
                'message' => 'Post unliked successfully',
                'post' => $post,
                'liked' => false,
            ], 202);
        }

        // Like
        DB::table('post_likes')->insert([
            'post_id' => $post->id,
            'user_id' => $userId,
            'liked_at' => now()
        ]);

        return response()->json([
            'message' => 'Post liked successfully',
            'post' => $post,
            'liked' => true,
        ]);
    }
}
