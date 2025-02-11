<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Models\Event;
use App\Models\User;
use Exception;

class EventsController extends Controller
{

    //Funcion que devuelve todos los eventos que pertenecen al usuario que hace la solicitud
    public function index(Request $request):JsonResponse
    {

        try {
            $user = User::find($request->user()->id);
            $events = $user->events()->get();
            if($events){
                return response()->json([
                    "events"=>$events
                ]);
            }else return response()->json(
                [
                    "message"=>"There are no events."
                ]
            );
        } catch (\Exception $err) {
            return response()->json(
                [
                    "error"=>$err->getMessage()
                ]
            );
        }

    }

    // Creacion de un evento y adjunta su creador a la tabla de participantes.
    public function store(Request $request):JsonResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'location' => 'required|string|max:255',
            'date_time' => 'required|date'
        ]);

        try {
            $event = Event::create([
                ...$validated,
                'created_by' => $request->user()->id,
            ]);
    
            $event->participants()->attach($request->user()->id);

            return response()->json([
                'message' => 'Event created successfully',
                'event' => $event->load('owner')
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Failed to create event',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    //Muestra la info de un evento en especifico
    public function show($id): JsonResponse
    {
        try {
            $event = Event::find($id);
            if (!$event) {
                return response()->json([
                    'message' => 'Event not found'
                ], 404);
            }
            $participants = $event->participants()->get();
    
            return response()->json([
                "event" => $event,
                "participants" => $participants
            ]);
        } catch (\Exception $err) {
            return response()->json([
                'message' => 'Failed to display event',
                'error' => $err->getMessage()
            ], 500);
        }
    }

    //Edita los parametros del evento.
    public function update(Request $request, $id):JsonResponse
    {
        $owner = User::find($request->user()->id);
        $event = Event::find($id);

        if (!$event) {
            return response()->json(['error' => 'Event not found'], 404);
        }

        if ($event['created_by'] !== $owner['id']) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'location' => 'required|string|max:255',
            'date_time' => 'required|date',
        ]);

        $event->update($validatedData);

        return response()->json(['message' => 'Event updated successfully', 'event' => $event], 200);
    }

    //Elimina el evento
    public function destroy(Request $request,string $id):JsonResponse
    {
        $owner = User::find($request->user()->id);
        $event = Event::find($id);

        if (!$event) {
            return response()->json(['error' => 'Event not found'], 404);
        }
        if ($event['created_by'] !== $owner['id']) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $event->delete();
    
        return response()->json(['message' => 'Event deleted successfully'], 200);
    }
    
    public function join(Request $request)
    {
        $eventId = $request->input('event_id');
        $userId = $request->input('user_id');
    
        $event = Event::find($eventId);
    
        if (!$event) {
            return response()->json(['message' => 'Event not found'], 404);
        }
    
        $event->participants()->attach($userId);
    
        return response()->json(['message' => 'Joined event successfully'], 200);
    }
    
    public function leave(Request $request)
    {
        $eventId = $request->input('event_id');
        $userId = $request->input('user_id');
    
        $event = Event::find($eventId);
    
        if (!$event) {
            return response()->json(['message' => 'Event not found'], 404);
        }
    
        $event->participants()->detach($userId);
    
        return response()->json(['message' => 'Left event successfully'], 200);
    }
}
