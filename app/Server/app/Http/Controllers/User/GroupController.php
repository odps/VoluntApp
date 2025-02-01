<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Group;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class GroupController extends Controller
{
    public function index(): JsonResponse
    {
        $groups = Group::with('creator')->paginate(10);
        return response()->json(['groups' => $groups]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'reputation_required' => 'integer|min:0'
        ]);

        $group = Group::create([
            ...$validated,
            'created_by' => $request->user()->id
        ]);

        // Add creator as admin
        $group->members()->attach($request->user()->id, ['role' => 'admin']);

        return response()->json([
            'message' => 'Group created successfully',
            'group' => $group->load('creator')
        ], 201);
    }

    public function show(Group $group): JsonResponse
    {
        return response()->json([
            'group' => $group->load(['creator', 'members'])
        ]);
    }

    public function update(Request $request, Group $group): JsonResponse
    {
        // Check if user is admin
        $membership = $group->members()->where('user_id', $request->user()->id)->first();
        if (!$membership || $membership->pivot->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'reputation_required' => 'integer|min:0'
        ]);

        $group->update($validated);

        return response()->json([
            'message' => 'Group updated successfully',
            'group' => $group->load('creator')
        ]);
    }

    public function destroy(Request $request, Group $group): JsonResponse
    {
        // Check if user is admin
        $membership = $group->members()->where('user_id', $request->user()->id)->first();
        if (!$membership || $membership->pivot->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $group->delete();

        return response()->json([
            'message' => 'Group deleted successfully'
        ]);
    }

    public function join(Request $request, Group $group): JsonResponse
    {
        if ($group->members()->where('user_id', $request->user()->id)->exists()) {
            return response()->json(['message' => 'Already a member'], 400);
        }

        $group->members()->attach($request->user()->id, ['role' => 'member']);

        return response()->json(['message' => 'Joined group successfully']);
    }

    public function leave(Request $request, Group $group): JsonResponse
    {
        $group->members()->detach($request->user()->id);
        return response()->json(['message' => 'Left group successfully']);
    }
}
