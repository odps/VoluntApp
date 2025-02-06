import { Component, OnInit } from '@angular/core';
import { Group, GroupInfoResponse, GroupResponse } from '../../interfaces/group';
import { GroupService } from '../../services/group.service';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';
import { environment } from '../../../environment';
import { Profile } from '../../interfaces/profile';


@Component({
  selector: 'app-groups',
  standalone: false,
  
  templateUrl: './groups.component.html',
  styleUrl: './groups.component.css'
})
export class GroupsComponent implements OnInit {
  baseUrl = environment.baseUrl;

  /*User login*/
  user: User | null = null;

  /*Grupos*/
  groups: GroupResponse |null = null;
  /*Valores input formulario crearGrupo()*/
  groupNameForm: string ="";
  groupDescriptionForm: string = "";
  groupReputationForm: number = 0;

  /*Interacción con desplegables*/
  expandedGroupId: number | null = null; // Para rastrear el grupo expandido
  formClicked: boolean = false;


  constructor(private userService: UserService, private groupService: GroupService){}


 ngOnInit(): void {
   this.cargarGrupos();
 }

 onSubmit(event: Event){
  event.preventDefault();
  this.crearGrupo();
 }

 identificarUser(){
  this.userService.getUserProfile().subscribe({
    next:(response: {user: User, profile: Profile})=>{
      this.user = response.user;
    },
    error: (error) => console.error('Error loading user profile:', error)
  });
}

conseguirProfileNickname(userId: number){
  this.userService.getUserProfileSpecific(userId).subscribe({
    next:(response: {user: User, profile: Profile})=>{
      return response.profile.nickname;
    }
  })
}
conseguirProfilePicture(userId: number){
  this.userService.getUserProfileSpecific(userId).subscribe({
    next:(response: {user: User, profile: Profile})=>{
      return response.profile.nickname;
    }
  })
}

cargarGrupos(){
  this.groupService.getAllGroups().subscribe({
    next:(response:GroupResponse)=>{
      console.log('Grupos cargados:', response.groups);
      this.groups = response;
      console.log('this.groups dentro del subscribe:', this.groups.groups);
    },
    error: (error) => console.error('Error cargando los grupos:', error)
  });
}

crearGrupo(){
  this.groupService.postGroup(this.groupNameForm, this.groupDescriptionForm, this.groupReputationForm).subscribe({
    next:(response)=>{
      console.log('Grupo creado correctamente', response);
      this.cargarGrupos();
    },
    error: (error) => console.error('Error loading user profile:', error)
  });
}

borrarGrupo(groupId: number){
  this.groupService.deleteGroup(groupId).subscribe({
    next:(response)=>{
      console.log('Grupo eliminado correctamente', response);
    },
    error: (error) => console.error('Error loading user profile:', error)
  });
}

unirseGrupo(groupId: number){
  this.groupService.joinGroup(groupId).subscribe({
    next:(response)=>{
      console.log('Te has unido al grupo correctamente', response);
    },
    error: (error) => console.error('Error loading user profile:', error)
  });

}

abandonarGrupo(groupId: number){
  this.groupService.leaveGroup(groupId).subscribe({
    next:(response)=>{
      console.log('Has abandonado el grupo correctamente', response);
    },
    error: (error) => console.error('Error loading user profile:', error)
  });
}

openFormGroup(){
    this.formClicked = !this.formClicked;
}
 
 
 
 
 
 
  /* user: User | null = null;
  profile: Profile | null = null;
  baseUrl = environment.baseUrl;
  creador: User | null = null;
  groups: Group[] = [];
  group: any| null = null;
  expandedGroupId: number | null = null; // Para rastrear el grupo expandido
  formClicked: boolean = false;
  name: string = "";
  description: string = "";
  reputation_required: number = 0;
  members: GroupMembers = [];
  membersProfile: Profile[] = [];


  constructor(private groupService: GroupService, private userService: UserService) {}

  ngOnInit(): void {
    this.loadGroups();
    this.cargarUserProfile();
  }
  
  cargarUserProfile(){
    this.userService.getUserProfile().subscribe({
      next:(response: {user: User, profile: Profile})=>{
        this.user = response.user;
        this.profile = response.profile;
      },
      error: (error) => console.error('Error loading user profile:', error)
    });
  }

  loadGroups() {
  this.groupService.getAllGroups().subscribe({
    next: (response: GroupResponse) => {
      this.groups = response.groups.data; // Accede a la lista de grupos
      console.log('Grupos cargados:', this.groups);

      this.userService.getUserProfile().subscribe({
        next:(response: {user: User})=>{
          this.creador = response.user;
        },
        error: (error) => console.error('Error loading user profile:', error)
      });

    },
    error: (err) => {
      console.error('Error al cargar los grupos:', err);
    }
  });
}
  

getGroupInfo(groupId: number) {
  this.groupService.getGroup(groupId).subscribe({
    next: (response: GroupInfoResponse) => {
      console.log('Grupo cargado:', response);
      this.group = response.group; // Accede a la info del grupo (group)
      this.members = response.group.members; // Accede a la lista de miembros (members)
      console.log('Members:', this.members); // Console de Members
      this.getGroupMembersProfile(this.members);
    },
    error: (err) => {
      console.error('Error fetching group info:', err);
    }
  });
}

  getGroupMembersProfile(members: GroupMember[]){
    this.membersProfile = [];
    for(let i = 0; i < members.length; i++){
      this.userService.getUserProfileSpecific(this.members[i].id).subscribe({
        next: (response: {user: User; profile: Profile}) => {
          console.log(response.profile);
          this.membersProfile.push(response.profile);
        },
        error: (error) => console.error('Error loading user profile:', error)
      });
    }
  }

  getGroupDetalles(groupId: number) {
    if (this.expandedGroupId === groupId) {
      this.expandedGroupId = null; // Si ya está expandido, lo colapsa
    } else {
      this.expandedGroupId = groupId; // Expande el grupo seleccionado
    }
  }

  onSubmit(event: Event){

    event.preventDefault();
    this.groupService.postGroup(this.name, this.description, this.reputation_required)
    .subscribe({
      next: (response) => {
        console.log('Grupo creado correctamente', response);
        this.openFormGroup(event);
      },
      error: (error) =>{
        console.log('Error al crear el grupo', error);
      }
    });
  }

  openFormGroup(event: Event){
    if(event){
      this.formClicked = !this.formClicked;
    }
  }

  borrarGrupo(group: Group){

    if(this.user?.id == group.creator.id){
      this.groupService.deleteGroup(group.id);
    }
    /*for(let i = 0; i < this.groups.length; i++){
      if(this.groups[i].creator.id === group.creator.id){
        this.groupService.deleteGroup(group.id);
      }
    }*//*
  }

  entrarGrupo(group: Group){
    this.groupService.joinGroup(group.id);
    this.getGroupInfo(group.id);
  }

  salirGrupo(group: Group){
    this.groupService.leaveGroup(group.id);
    this.getGroupInfo(group.id);
  }

}
*/
}
