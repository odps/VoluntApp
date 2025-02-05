<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Models\Post;

class PostController extends Controller
{
    //Funcion para crear posts y guardarlos en la BB.DD
    // La ruta es /post
    public function store(Request $request): JsonResponse
    {
        // Se validan los datos que llegan en request, content es obligatorio, group_id es opcional
        $validated = $request->validate([
            'content' => 'required|string',
            'group_id' => 'nullable|exists:groups,id'
        ]);
        //Si se ha validado correctamente se crea un post en la BB.DD
        $post = Post::create([
            'user_id' => $request->user()->id,
            'group_id' => $validated['group_id'] ?? null,
            'content' => $validated['content'],
        ]);
        //Si ha transcurrido con exito se devuelve codigo estatus 201
        return response()->json([
            'message' => 'Post creado con exito!',
            'post' => $post
        ], 201);
    }
    //Funcion que borra los posts de la BB.DD, se pasa como parametro request y el id del post.
    //En la ruta se ve como post/{id}
    public function destroy(Request $request, Post $post): JsonResponse
    {
        //Guardamos en una variable el id del usuario que ha hecho la peticion.
        $userId = $request->user()->id;
        //Comprobamos si este usuario es el propietario del post
        //En caso de que lo sea, se borra el post de la BB.DD, retorna status 200, si no devuelve 403
        if ($userId != $post->user_id) {
            return response()->json([
                'message' => 'No autorizado para borrar esta publicacion'
            ], 403);
        } else {
            $post->delete();
            return response()->json([
                'message' => 'Se ha eliminado con exito'
            ], 200);
        }
    }
    public function update(Request $request, Post $post): JsonResponse
    {
        //Guardamos en una variable el id del usuario que ha hecho la peticion.
        $userId = $request->user()->id;
        //Comprobamos si este usuario es el propietario del post
        //En caso de que lo sea, se actualiza el post de la BB.DD, retorna status 200, si no devuelve 403
        if ($userId !== $post->user_id) {
            return response()->json([
                'message' => 'No autorizado para editar esta publicacion'
            ], 403);
        }

        // Se validan los datos que llegan en request, content es obligatorio, group_id es opcional
        $validated = $request->validate([
            'content' => 'required|string',
            'group_id' => 'nullable|exists:groups,id'
        ]);

        // Se actualiza el post
        $post->update([
            'content' => $validated['content'],
            'group_id' => $validated['group_id'] ?? $post->group_id
        ]);

        // De ser exitoso se devuelve el objeto post junto con status 200
        return response()->json([
            'message' => 'Post actualizado con exito',
            'post' => $post
        ], 200);
    }
    //Funcion que devuelve los ultimos 10 posts del usuario especificado o del que hace la peticion
    public function show(Request $request, $id = null): JsonResponse
    {
        if ($id) {
            $posts = Post::where('user_id', $id)->with(['user', 'comments'])->latest()->simplePaginate(20);
        } else {
            $posts = Post::where('user_id', $request->user()->id)->with(['user', 'comments'])->latest()->simplePaginate(20);
        }

        return response()->json([
            'posts' => $posts
        ], 200);
    }
    public function index(): JsonResponse
    {
        $posts = Post::with(['user', 'comments'])
            ->latest()
            ->get();

        return response()->json([
            'posts' => $posts
        ], 200);
    }
}
