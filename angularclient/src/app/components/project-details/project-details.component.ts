import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/models/project.model';
import { User } from '../../models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {

  currentProject!: Project;
  message = '';
  user:User = {};
  users?: User[];
  selectedUser: User = {};
  projectUsersId: string[] = [];


  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService) { }

  ngOnInit(): void {
    this.message = '';
    this.getProject(this.route.snapshot.params?.['id']);
    this.userService.getAll().subscribe(
      data => {
        this.users = data;
      },
      error => {
        console.log(error)
      }
    )
  }

  getProject(id: string): void {
    this.projectService.get(id)
      .subscribe(
        data => {
          this.currentProject = data;
          // console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  updatePublished(status: boolean): void {
    const data = {
      name: this.currentProject.name,
      description: this.currentProject.description,
      users: this.currentProject.users,
      published: status
    };

    this.message = '';

    this.projectService.update(this.currentProject.id, data)
      .subscribe(
        response => {
          this.currentProject.published = status;
          // console.log(response);
          this.message = response.message ? response.message : 'The status was updated successfully!';
        },
        error => {
          console.log(error);
        });
  }

  updateProject(): void {
    this.message = '';
    let ids_users = this.idsUsers(this.currentProject.users)
    const data = {
      name : this.currentProject.name,
      description: this.currentProject.description,
      ids:  ids_users
    }
    console.log(data)
    this.projectService.update(this.currentProject.id, data)
      .subscribe(
        response => {
          // console.log(response);
          this.message = response.message ? response.message : 'This project was updated successfully!';
        },
        error => {
          console.log(error);
        });
  }

  idsUsers(users: User[]|undefined): string[] {
    let ids: string[] = []
    users?.map(user => {
      let id = user.id.toString();
      console.log(id)
      ids?.push(id);
      console.log(ids)
    })
    return ids;
  }

  addUser(): void{
    this.currentProject.users?.push(this.selectedUser);
    this.projectUsersId.push(this.selectedUser.id);
  };

  delUser(): void{
    let a = this.currentProject.users?.pop();
    let b = this.projectUsersId.pop();
  };

  deleteProject(): void {
    this.projectService.delete(this.currentProject.id)
      .subscribe(
        response => {
          // console.log(response);
          this.router.navigate(['/projects']);
        },
        error => {
          console.log(error);
        });
  }
}