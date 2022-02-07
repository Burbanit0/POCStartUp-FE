import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';
import { User } from '../../models/user.model';
import { Role } from 'src/app/models/role.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})

export class AddProjectComponent implements OnInit {

  project: Project = {
    name: '',
    description: '',
    users: [{id:'',name:'', roles:[{id:'', name:''}]}],
    published: false
  };
  submitted = false;
  user:User = {};
  selectedUser: User = {};
  projectUsers: User[] = [];
  projectUsersId: string[] = [];
  users?: User[];


  constructor(
    private projectService: ProjectService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getAll().subscribe(
      data => {
        this.users = data;
      },
      error => {
        console.log(error)
      }
    )
  }

  async saveProject() : Promise<void> {
    const data = {
      name: this.project.name,
      description: this.project.description,
    };
    let projectId = "";
    (await this.projectService.create(data))
      .subscribe(
        response => {
          projectId = response.id;
          this.submitted = true;
          this.usersproject(projectId);
        },
        error => {
          console.log(error);
        });
    console.log(projectId);
   
  }

  usersproject(id: string): void {
    console.log(this.projectUsersId)
    const dt = {
      ids: this.projectUsersId,
    }
    this.projectService.update(id, dt).subscribe(
      response => {
        console.log(response)
      },
      error => {
        console.log(error);
      });

  }

  ngOnChanges(){

  }

  addUser(): void{
    this.projectUsers.push(this.selectedUser);
    this.projectUsersId.push(this.selectedUser.id);
  };

  delUser(): void{
    this.projectUsers.push();
    this.projectUsersId.push();
  };

  newProject(): void {
    this.submitted = false;
    this.project = {
      name: '',
      description: '',
      users: undefined, 
      published: false
    };
  }
}
