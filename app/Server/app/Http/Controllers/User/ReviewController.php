<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Review;
use Illuminate\Http\JsonResponse;
use App\Models\Profile;

class ReviewController extends Controller
{
    public function setReview(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'to_user_id' => 'required|exists:users,id',
            'rating' => 'required|integer|min:1|max:5',
            'comments' => 'nullable|string',
        ]);

        $review = Review::create([
            'from_user_id' => $request->user()->id,
            'to_user_id' => $validated['to_user_id'],
            'rating' => $validated['rating'],
            'comments' => $validated['comments'],
        ]);

        // Recalcula y asigna el rating al usuario en base a la suma de sus reviews
        $averageRating = Review::where('to_user_id', $validated['to_user_id'])->avg('rating');
        Profile::where('user_id', $validated['to_user_id'])->update(['rating' => $averageRating]);

        return response()->json(['message' => 'Review submitted successfully', 'review' => $review], 201);
    }

    public function getReviews($userId): JsonResponse
    {
        $reviews = Review::where('to_user_id', $userId)->get();

        if ($reviews->isEmpty()) {
            return response()->json(['message' => 'No reviews found'], 404);
        }

        return response()->json(['reviews' => $reviews], 200);
    }
}