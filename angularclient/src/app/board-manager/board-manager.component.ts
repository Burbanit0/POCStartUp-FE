import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { WorkteamService } from '../services/workteam.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../services/user.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-board-manager',
  templateUrl: './board-manager.component.html',
  styleUrls: ['./board-manager.component.css']
})
export class BoardManagerComponent implements OnInit {
  usersList?: User[];
  usersGroup?:User[];
  user: User = {};
  currentUser: any;
  currentUserId: any;
  currentIndex = -1;
  name = '';
  selectedUser = null;

  constructor(
    private token: TokenStorageService,
    private workteamService: WorkteamService,
    private userService: UserService,
    private modalService: NgbModal
  ) { }

  closeResult = '';

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.currentUserId = this.currentUser.id;
    this.workteamService.getTeams(this.currentUserId).subscribe(
      data => {
        this.usersGroup = data;
      },
      error => {
        console.log(error);
      });
    this.userService.getAll().subscribe(
      data => {
        this.usersList = data;
      },
      error => {
        console.log(error)
      }
    )
  }


  open(content:any) {
    console.log(this.usersList)
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

  addUser(): void {
    console.log(this.selectedUser)
    // const data = {
    //   ids: [this.selectedUser],
    // };
    // console.log(this.selectedUser)
    // this.workteamService.addUser(this.currentUserId, data).subscribe(
    //   response => {
    //     console.log(data)
    //   },
    //   error => {
    //     console.log(error);
    //   });
    // window.location.reload()
  }
}
