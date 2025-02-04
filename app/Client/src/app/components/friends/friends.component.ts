import { Component, OnInit } from '@angular/core';
import { FriendService } from '../../services/friend.service';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { Profile } from '../../interfaces/profile';
import { environment } from '../../../environment';

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
  user: User | null = null;
  friends: any[]| null = null;
  friendProfiles: Profile[] =[];
  baseUrl = environment.baseUrl;

  constructor(
    private friendService: FriendService, 
    private userService: UserService
  ) { }

  ngOnInit(): void {
    setTimeout(this.loadFriends.bind(this), 1000);
    //this.loadFriends();
  }

  loadFriends(){
    this.friendProfiles = [];

    this.userService.getUserProfile().subscribe({
      next: (response: {user: User}) => {
        this.user = response.user;
        this.friendService.getFriends(this.user.id).subscribe({
          next: (response: any) => {
            this.friends = response; // Response es un array de objetos con amigos
            console.log(this.friends);
            this.getFriendInfo();
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

        if (this.friends) {
          for (let friend of this.friends){
            
              let idAmigo = (this.user.id == friend.user_id_1)? friend.user_id_2 : friend.user_id_1;

              friend.userService.getUserProfileSpecific(idAmigo).subscribe({

                next: (response: {user:User, profile: Profile}) =>{
                  if (this.friendProfiles) {
                    this.friendProfiles.push(response.profile);
                  }
                }
              })
            
        }
      }else{
        console.log("No hay amigos");
      }
    }
  });

  }//Fin Function
}
