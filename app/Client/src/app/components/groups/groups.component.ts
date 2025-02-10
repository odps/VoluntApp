import { Component, OnInit } from '@angular/core';
import { Group, GroupInfoResponse, GroupMember, GroupResponse } from '../../interfaces/group';
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
  groups: Group[] | null =[];
  /*Valores input formulario crearGrupo()*/
  groupNameForm: string ="";
  groupDescriptionForm: string = "";
  groupReputationForm: number = 0;

  /*Interacción con desplegables*/
  expandedGroupId: number | null = null; // Para rastrear el grupo expandido
  formClicked: boolean = false;

  /*Miembros de un grupo*/
  members: GroupMember[] | null = null;
  memberProfile: Profile | null = null;
  profileData: { [userId: number]: { nickname: string, profilePicture: string } } = {};

  constructor(private userService: UserService, private groupService: GroupService){}


 ngOnInit(): void {
   this.cargarGrupos();
   this.identificarUser();
 }

 onSubmit(event: Event){
  event.preventDefault();
  //this.crearGrupo();
  this.cargarGrupos();
 }

 identificarUser(){
  this.userService.getUserProfile().subscribe({
    next:(response: {user: User, profile: Profile})=>{
      this.user = response.user;
    },
    error: (error) => console.error('Error loading user profile:', error)
  });
}


////////////////
//PRUEBA
// Método para verificar si el usuario logueado es miembro del grupo
esMiembro(): boolean {
  if (!this.user || !this.members) return false;
  return this.members.some(member => member.id === this.user?.id);
}



// Método para obtener el nickname y la imagen de perfil
cargarProfileData(userId: number) {
  this.userService.getUserProfileSpecific(userId).subscribe({
    next: (response: { user: User, profile: Profile }) => {
      this.profileData[userId] = {
        nickname: response.profile.nickname,
        profilePicture: response.profile.profile_picture_route
      };
    },
    error: (error) => console.log('Error al cargar el perfil: ', error)
  });
}

cargarMiembros(groupId: number) {
  this.groupService.getGroup(groupId).subscribe({
    next: (response: GroupInfoResponse) => {
      this.members = response.group.members;
      console.log('Miembros del grupo', response.group.name, ': ', this.members);

      // Cargar los datos de perfil de cada miembro
      this.members.forEach(member => this.cargarProfileData(member.id));
    },
    error: (error) => console.log('Error al cargar la info del grupo: ', error)
  });
}
////////////////


cargarGrupos(){
  this.groupService.getAllGroups().subscribe({
    next:(response:GroupResponse)=>{
      console.log('Grupos cargados:', response.groups);
      this.groups = response.groups.data;
      console.log('this.groups dentro del subscribe:', this.groups);
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
      //Actualizar lista grupos
      this.cargarGrupos();
    },
    error: (error) => console.error('Error eliminando el grupo: ', error)
  });
}

unirseGrupo(groupId: number){
  this.groupService.joinGroup(groupId).subscribe({
    next:(response)=>{
      console.log('Te has unido al grupo correctamente', response);
      this.cargarMiembros(groupId);
    },
    error: (error) => console.error('Error al unirse al grupo:', error)
  });

}

abandonarGrupo(groupId: number){
  this.groupService.leaveGroup(groupId).subscribe({
    next:(response)=>{
      console.log('Has abandonado el grupo correctamente', response);
      this.cargarMiembros(groupId);
    },
    error: (error) => console.error('Error al abandonar el grupo:', error)
  });
}

openFormGroup(){
    this.formClicked = !this.formClicked;
}

getGroupDetalles(groupId: number) {
  if (this.expandedGroupId === groupId) {
    this.expandedGroupId = null; // Si ya está expandido, lo colapsa
  } else {
    this.expandedGroupId = groupId; // Expande el grupo seleccionado
  }
}
 
}
 
 
 


// MAL


/*cargarMiembros(groupId: number){
  this.groupService.getGroup(groupId).subscribe({
    next:(response: GroupInfoResponse) =>{
      this.members = response.group.members;
      console.log('Miembros del grupo',response.group.name,': ',this.members);
    },
    error: (error) => console.log('Error al cargar la info del grupo: ',error)
  });
}*/


/*conseguirProfileNickname(userId: number){
  this.userService.getUserProfileSpecific(userId).subscribe({
    next:(response: {user: User, profile: Profile})=>{
      return response.profile.nickname;
    }
  })
}*/


/*conseguirProfilePicture(userId: number){
  this.userService.getUserProfileSpecific(userId).subscribe({
    next:(response: {user: User, profile: Profile})=>{
      return response.profile.profile_picture_route;
    }
  })
}*/


// MAL


 
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

