import { Component, OnInit } from '@angular/core';
import { Group } from '../../interfaces/group';
import { GroupService } from '../../services/group.service';
import { UserService } from '../../services/user.service';
import { GroupResponse } from '../../interfaces/group';

@Component({
  selector: 'app-groups',
  standalone: false,
  
  templateUrl: './groups.component.html',
  styleUrl: './groups.component.css'
})
export class GroupsComponent implements OnInit {

  groups: Group[] = [];
  group: any = "";
  expandedGroupId: number | null = null; // Para rastrear el grupo expandido
  formClicked: boolean = false;
  name: string = "";
  description: string = "";
  reputation_required: number = 0;

  constructor(private groupService: GroupService) {}

  ngOnInit(): void {
    this.loadGroups();
  }
  
  loadGroups() {
  this.groupService.getAllGroups().subscribe({
    next: (response: GroupResponse) => {
      this.groups = response.groups.data; // Accede a la lista de grupos
      console.log('Grupos cargados:', this.groups);
    },
    error: (err) => {
      console.error('Error al cargar los grupos:', err);
    }
  });
}

  getGroupInfo(groupId: number) {
    this.groupService.getGroup(groupId).subscribe({
      next: (response: GroupResponse) => {
        this.group = response.groups.data[0];
        console.log(this.group);
      },
      error: (err) => {
        console.error('Error fetching group info:', err);
      }
    });
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


}

  
