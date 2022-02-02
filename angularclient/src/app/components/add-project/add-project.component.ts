import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';
import { User } from '../../models/user.model';
import { Role } from 'src/app/models/role.model';

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

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
  }

  saveProject(): void {
    const data = {
      name: this.project.name,
      description: this.project.description,
      users: this.project.users
    };

    this.projectService.create(data)
      .subscribe(
        response => {
          // console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }
  addUser(): void{
    
    
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
