import { Component, OnInit } from '@angular/core';
// import { ProjectService } from '../services/project.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { User } from '../models/user.model';
import { Project } from '../models/project.model';
import { UserService } from '../services/user.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


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
  currentIndex = -1;
  user: User = {
    name: '',
    roles: [{id:'', name:''}],
    projects: [{id:'', name:''}],
  };

  constructor(
    private token: TokenStorageService,
    private userService: UserService,
    private modalService: NgbModal) { }

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
  }
}
