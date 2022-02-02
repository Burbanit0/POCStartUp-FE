import { Component, OnInit } from '@angular/core';
// import { ProjectService } from '../services/project.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit {
  currentUser: any;
  currentUserId: any;
  user: User = {
    name: '',
    roles: [{id:'', name:''}],
    projects: [{id:'', name:''}],
  };


  constructor(
    private token: TokenStorageService,
    private userService: UserService) { }

    
  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.currentUserId = this.currentUser.id;
    this.userService.get(this.currentUserId).subscribe(
      data => {
        this.user = data;
        // console.log(data);
      },
      error => {
        console.log(error);
      });
  }
}
