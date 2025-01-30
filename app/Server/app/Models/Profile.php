<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    protected $fillable = [
        'user_id',
        'nickname',
        'profile_picture_route',
        'interests',
        'rating',
        'created_at',
        'updated_at'
    ];

    //Devuelve el propietario de la cuenta
    public function account(){
        return $this->belongsTo(User::class, 'user_id');
    }
    //Devuelve ruta de la foto de perfil del usuario que llama al metodo
    public function getProfilePicture(){
        return $this->profile_picture_route;
    }
    //Devuelve la ruta de la foto de perfil de otro usuario
    public function getProfilePictureOf($id){
        return $this->select('profile_picture_route')->where('user_id', $id)->get();
    }
    //Devuelve el mote del usuario
    public function getNickName(){
        return $this->nickname;
    }
    //Devuelve los intereses de los usuarios
    public function getIntererests(){
        return $this->interests;
    }
    //Devuelve el rating del usuario
    public function getRating(){
        return $this->rating;
    }
}
