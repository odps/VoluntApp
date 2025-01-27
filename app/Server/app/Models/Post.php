<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $fillable = [
        'user_id',
        'group_id',
        'content'
    ];
    
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}