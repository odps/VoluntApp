<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Friendship extends Model
{
    protected $fillable = [
        'user_id_1',
        'user_id_2',
        'status',
        'requested_at'
    ];

    public $timestamps = false;
    
    public function friend()
    {
        return $this->belongsTo(User::class, 'user_id_2')->orWhere('user_id_1', '!=', $this->user_id_1);
    }

    //Funcion que devuelve los amigos de un usuario especificado por su id.
    public function getFriends($userId)
    {
        return $this->select('*')
                    ->where('user_id_1', $userId )
                    ->orWhere('user_id_2', $userId)
                    ->get();
    }
};