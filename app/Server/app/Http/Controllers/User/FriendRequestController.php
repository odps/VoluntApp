<?php
namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\FriendRequest;
use App\Models\Friendship;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Models\User;

class FriendRequestController extends Controller
{
    public function sendRequest(Request $request, $toUserId): JsonResponse
    {
        if($request->user()->id == $toUserId){
            return response()->json([
                'message'=>'Can\'t befriend yourself'
            ], 403);
        }

        // Verifica si la peticion de amistad ya existe.
        $friendId = $toUserId;
        if (Friendship::where(function($query) use ($request, $friendId) {
            $query->where([
                'user_id_1' => $request->user()->id,
                'user_id_2' => $friendId
            ])->orWhere([
                'user_id_1' => $friendId,
                'user_id_2' => $request->user()->id
            ]);
        })->exists()) {
            return response()->json(['message' => 'Friend request already sent'], 400);
        };

        // Crea la peticion de amistad
        FriendRequest::create([
            'from_user_id' => $request->user()->id,
            'to_user_id' => $toUserId,
            'created_at' => now(),
            'status' => 'pending'
        ]);

        return response()->json(['message' => 'Friend request sent successfully']);
    }
    public function respondToRequest(Request $request, FriendRequest $friendRequest): JsonResponse
    {
        //Esta peticion solo coge como valores los enum 'accepted' o 'rejected'
        $request->validate(['status' => 'required|in:accepted,rejected']);

        $friendRequest->update([
            'status' => $request->status,
            'responded_at' => now()
        ]);
    
        if ($request->status === 'accepted') {
            // Si se acepta la solicitud, se crea la tabla amistad con ambos ids
            Friendship::create([
                'user_id_1' => $friendRequest->from_user_id,
                'user_id_2' => $friendRequest->to_user_id,
                'status' => 'accepted',
                'requested_at' => $friendRequest->created_at
            ]);
        }
    
        return response()->json(['message' => 'Friend request ' . $request->status]);
    }

    public function removeFriend(Request $request, $friendId): JsonResponse
{
    // Elimina la relacion de amistad, sin importar el orden en el que se halla registrado
    $deleted = Friendship::where(function($query) use ($request, $friendId) {
        $query->where([
            'user_id_1' => $request->user()->id,
            'user_id_2' => $friendId
        ])->orWhere([
            'user_id_1' => $friendId,
            'user_id_2' => $request->user()->id
        ]);
    })->delete();

    //Si no se ha podido borrar, por que no existe o algun otro motivo devuelve error.
    if (!$deleted) {
        return response()->json(['message' => 'Friendship not found'], 404);
    }

    // Elimina tambien, en caso de existiese, peticiones de amistad pendientes.
    FriendRequest::where([
        'from_user_id' => $request->user()->id,
        'to_user_id' => $friendId
    ])->orWhere([
        'from_user_id' => $friendId,
        'to_user_id' => $request->user()->id
    ])->delete();

    return response()->json(['message' => 'Friend removed successfully']);
}
public function getPendingRequests(Request $request): JsonResponse
{
    //Busca en la BB.DD peticiones de amistad al usuario que esten en estado 'pending'
    $pendingRequests = FriendRequest::where([
        'to_user_id' => $request->user()->id,
        'status' => 'pending'
    ])->with('sender')->get();
    
    return response()->json($pendingRequests);
}

//Funcion que devuelve todos los amigos de un usuario especificado
public function getFriends(User $user) : JsonResponse
{
    $friends = Friendship::where(function($query) use ($user) {
        $query->where('user_id_1', $user->id)
              ->orWhere('user_id_2', $user->id);
    })->with(['friend' => function($query) use ($user) {
        $query->where('id', '!=', $user->id);
    }])->get();

    if($friends->isEmpty()){
        return response()->json([
            'message'=>'No friends found',
        ], 404);
    }
    return response()->json($friends);
    }

}