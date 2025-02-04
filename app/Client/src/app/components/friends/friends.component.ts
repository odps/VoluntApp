import { Component, OnInit } from '@angular/core';
import { FriendService } from '../../services/friend.service';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { Profile } from '../../interfaces/profile';

interface FriendResponse {
  id: number;
  name: string;
}

@Component({
  selector: 'app-friends',
  standalone: false,
  
  templateUrl: './friends.component.html',
  styleUrl: './friends.component.scss'
})
export class FriendsComponent implements OnInit {

  constructor(private friendService: FriendService, private userService: UserService) { }

  user: User | null = null;
  friendProfiles: Profile[] | null = null;
  friends: any[]| null = null;

  ngOnInit(): void {
    this.loadFriends();
  }

  loadFriends(){
    this.userService.getUserProfile().subscribe({
      next: (response: {user: User}) => {
        this.user = response.user;
        this.friendService.getFriends(this.user.id).subscribe({
          next: (response: any) => {
            this.friends = response; // Response es un array de objetos con amigos
            console.log(this.friends);
          },
          error: (error) => console.error('Error loading friends:', error),
        });
      },
      error: (error) => console.error('Error loading user profile:', error),
    });
  }

  getFriendInfo(){
    this.userService.getUserProfile().subscribe({
      next: (response :{user: User, profile: Profile})=>{
        this.user = response.user;


        for (let friend of this.friends){
          if(friend.user_id_1 == this.user.id){
            friend.userService.getUserProfile().subscribe({
              next: (response: {user:User, profile: Profile}) =>{
                this.friendProfiles?.push(response.profile);
              }
            })
          }
      }


      //Fin Function
      }
    })

    
}
