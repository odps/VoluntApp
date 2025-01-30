<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
 
    protected $fillable= [
        'title',
        'description',
        'location',
        'date_time',
        'created_by',
        'created_at',
        'updated_at'
    ];

    public function owner(){
        return $this->belongsTo(User::class, 'created_by');
    }
    public function participants(){
        return $this->belongsToMany(User::class, 'event_participants', 'event_id', 'user_id')
        ->withPivot('joined_at')
        ->withTimestamps();  
    }

    public function getTitle(){
        return $this['title'];
    }

    public function getDescription(){
        return $this['description'];
    }

    public function getLocation(){
        return $this['location'];
    }

    public function getDateTime(){
        return $this['date_time'];
    }

    public function getCreatedBy(){
        return $this['created_by'];
    }
}