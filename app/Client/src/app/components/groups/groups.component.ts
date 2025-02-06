import { Component, OnInit } from '@angular/core';
import { Group, GroupInfoResponse, GroupMember, GroupMembers } from '../../interfaces/group';
import { GroupService } from '../../services/group.service';
import { UserService } from '../../services/user.service';
import { GroupResponse } from '../../interfaces/group';
import { User } from '../../interfaces/user';
import { Profile } from '../../interfaces/profile';
import { environment } from '../../../environment';


@Component({
  selector: 'app-groups',
  standalone: false,
  
  templateUrl: './groups.component.html',
  styleUrl: './groups.component.css'
})
export class GroupsComponent implements OnInit {
  user: User | null = null;
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
    for(let i = 0; i < this.groups.length; i++){
      if(this.groups[i].creator.id === group.creator.id){
        this.groupService.deleteGroup(group.id);
      }
    }
  }

  entrarGrupo(group: Group){
    this.groupService.joinGroup(group.id);
  }

  salirGrupo(group: Group){
    this.groupService.leaveGroup(group.id);
  }

}

  
