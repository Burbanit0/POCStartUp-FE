import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css']
})
export class ProjectsListComponent implements OnInit {

  projects?: Project[];
  currentProject: Project = {};
  currentIndex = -1;
  name = '';

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.retrieveProjects();
  }

  retrieveProjects(): void {
    this.projectService.getAll()
      .subscribe(
        data => {
          this.projects = data;
          // console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  refreshList(): void {
    this.retrieveProjects();
    this.currentProject = {};
    this.currentIndex = -1;
  }

  setActiveProject(project: Project, index: number): void {
    this.currentProject = project;
    this.currentIndex = index;
  }

  searchName(): void {
    this.currentProject = {};
    this.currentIndex = -1;
    this.projectService.findByTitle(this.name)
      .subscribe(
        data => {
          this.projects = data;
          // console.log(data);
        },
        error => {
          console.log(error);
        });
  }
}