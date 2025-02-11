import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/user';
import { Profile } from '../../interfaces/profile';
import { UserService } from '../../services/user.service';
import { Post } from '../../interfaces/post';
import { PostService } from '../../services/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FriendService } from '../../services/friend.service';
import { FriendshipRequest } from '../../interfaces/friendship';

@Component({
  selector: 'app-friend-profile',
  standalone: false,
  
  templateUrl: './friend-profile.component.html',
  styleUrl: './friend-profile.component.css'
})
export class FriendProfileComponent implements OnInit{

  user: User | null = null;
  userFriends: User[] | [] = [];

  friendId: number = 0;

  friendProfile: {friend: User, profile: Profile}  | null = null;

  posts: Post[] = [];

  friendPosts: Post[] = [];

  friendEvents: Event[] | null = null;

  activeView: string = 'posts';

  esAmigo: boolean = false;

  solicitudPendiente: boolean = false;

  constructor(private userService: UserService,
              private friendService: FriendService,
              private postService: PostService,
              private route: ActivatedRoute,
              private router: Router) { }


    
              ngOnInit(): void {
                this.route.params.subscribe({
                  next: (params) => {
                    this.friendId = +params['friendId'];
                    this.getUserProfileFriend(this.friendId);
                    this.getFriendPosts(this.friendId);
                    this.loadFriends(); // Al final, la lista de amigos se carga y se verifica la amistad
                  ///////
                  this.checkFriendshipRequest();
                  },
                  error: (error) => console.error("Error al conseguir el friendId de la ruta", error)
                });
              }

           ///////////////////////////
           checkFriendshipRequest() {
            this.friendService.getFriendshipRequests().subscribe({
              next: (requests: FriendshipRequest[]) => {
                const request = requests.find(req => req.to_user_id == this.friendId);
                
                if (request) {
                  console.log(request.status);
                  this.solicitudPendiente = request.status == 'pending';
                  
                }
              },
              error: (error) => console.error('Error checking friendship requests:', error)
            });
          }
           ///////////////////////////





  comprobarAmistad(friendId: number) {
    // Verificar si el friendId está en la lista de amigos

    this.userFriends.forEach(friend => {
      if (friend.id == friendId) {
        this.esAmigo = true;
      }else{
        this.esAmigo = false;
      }
      console.log("¿Son amigos?", this.esAmigo);
    });
    
  }

  loadFriends() {
    this.userService.getUserProfile().subscribe({
      next: (response: { user: User }) => {
        this.user = response.user;
        this.friendService.getFriends(this.user.id).subscribe({
          next: (response: any) => {
            this.userFriends = response; // Response es un array de objetos con amigos
            console.log(this.userFriends);
            this.comprobarAmistad(this.friendId);
          },
          error: (error) => console.error('Error loading friends:', error),
        });
      },
      error: (error) => console.error('Error loading user profile:', error),
    });
  }

  solicitarAmistad(friendId: number){
    this.friendService.sendFriendshipRequest(friendId).subscribe({
      next:(response)=>{
        console.log("Solicitud de amistad enviada: "+response);
        this.solicitudPendiente = true;
        this.loadFriends();
      },
      error:(error)=>{
        console.log('Error al enviar la solicitud de amistad: ',error);
      }
    });
  }

  eliminarAmistad(friendId: number){
    this.friendService.deleteFriendship(friendId).subscribe({
      next:(response)=>{
        console.log("Amistad eliminada: "+response);
        this.esAmigo = false; // Actualizar el estado de la amistad
        this.loadFriends();
      },
      error:(error)=>{
        console.log("Error al eliminar amistad: "+error);
      }
    });
  }

  responderPeticionAmistad(friendId: number, status: "accepted" | "rejected"){
    this.friendService.respondFriendshipRequest(friendId, status).subscribe({
      next:(response)=>{
        console.log("Ha respondido a la peticion de amistad con: "+status+"  "+response);
        if (status == "accepted") {
          this.esAmigo = true; // Actualizar el estado de la amistad
        this.solicitudPendiente = false; // La solicitud ya no está pendiente
        this.loadFriends(); 
        }else if(status == "rejected"){
          this.esAmigo = false;
          this.solicitudPendiente = false;
          this.loadFriends();
        }
        
      },
      error:(error)=>{
        console.log("Error en el proceso de respuesta "+error);
      }
    });
  }
    


  conseguirIdFriend(){
    this.route.params.subscribe({
      next:(response) =>{

        this.friendId = +response['friendId'];

      },
      error:(error)=>{
        console.log("Error al conseguir el friendId de la ruta", error);
      }
    })
  }

  getUserProfileFriend(userId: number){
    this.userService.getUserProfileSpecific(userId).subscribe({
      next: (response) =>{
        this.friendProfile = {
          friend : response.user,
          profile : response.profile
        };
      },

      error: (error) => {
        console.error('Error al cargar el usuario y perfil de amigo:', error);
      }
    })
  }


  getFriendPosts(friendId: number){
    this.postService.getAllPosts().subscribe({
      next: (response)=>{
        console.log("API Response:", response.posts);
        this.posts = response.posts;
        console.log("FriendID:"+friendId);
        this.posts.forEach(post => {
          console.log("post.userId:", post.user.id, "friendId:", friendId);
          
          if(post.user.id == friendId){
            this.friendPosts.push(post);
          }
        });

        console.log("TODOS LOS POSTS:"+this.posts);
        console.log("TODOS LOS POSTS DE DIEGO:"+this.friendPosts);
          
      },
      error: (error)=> {
          console.error("Error al cargar todos los posts: ", error);
      },
    });
  }


  toSettings() {
    this.router.navigate(['/settings']);
  }

  setActiveView(view: string): void {
    this.activeView = view;
  }



}
