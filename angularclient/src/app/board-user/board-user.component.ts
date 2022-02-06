import { Component, OnInit } from '@angular/core';
// import { ProjectService } from '../services/project.service';
import { WorktimeService } from '../services/worktime.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { User } from '../models/user.model';
import { Datetime } from '../models/datetime.model';
import { Project } from '../models/project.model';
import { UserService } from '../services/user.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Worktime } from '../models/worktime.model';
import { DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})

export class BoardUserComponent implements OnInit {
  currentUser: any;
  currentUserId: any;
  projects?: Project[];
  currentProject: Project = {};
  projectWorktime?: Worktime[];
  workTime: Worktime = {
    date: new Date() ,
    duration: 0
  };
  dateChoose: Datetime = {
    day:0,
    month:0,
    year:0
  }
  currentIndex = -1;
  user: User = {
    name: '',
    roles: [{id:'', name:''}],
    projects: [{id:'', name:''}],
  };
  submitted = false;

  constructor(
    private token: TokenStorageService,
    private userService: UserService,
    private worktimeService: WorktimeService,
    private modalService: NgbModal,
    private datePipe: DatePipe
    ) { }

    closeResult = '';
  
    open(content:any) {
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }
  
    private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
      } else {
        return `with: ${reason}`;
      }
    }
  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.currentUserId = this.currentUser.id;
    this.userService.get(this.currentUserId).subscribe(
      data => {
        this.user = data;
        this.projects = this.user.projects;
        // console.log(data);
      },
      error => {
        console.log(error);
      });
  }

  setActiveProject(project: Project, index: number): void {
    this.currentProject = project;
    this.currentIndex = index;
    this.worktimeService.getWorktime(this.currentUserId, this.currentProject.id).subscribe(
      data => {
        this.projectWorktime = data;
        console.log(this.projectWorktime)
      },
      error => {
        console.log(error);
      });
  }

  addWorktime(): void {
    this.workTime.date = new Date(this.dateChoose.year, this.dateChoose.month, this.dateChoose.day)
    const data = {
      date: this.datePipe.transform(this.workTime.date,"yyyy-MM-dd"),
      duration: this.workTime.duration,
    };
    
    this.worktimeService.postWorktime(this.currentUserId, this.currentProject.id, data).subscribe(
      response => {
        console.log(data)
      },
      error => {
        console.log(error);
      });
    window.location.reload()
  }
}