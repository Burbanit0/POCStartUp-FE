import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { Role } from 'src/app/models/role.model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  currentUser: User = {
    name: '',
    roles: [{id:'', name:''}],
  };
  message = '';

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.message = '';
    this.getUser(this.route.snapshot.params?.['id']);
  }

  getUser(id: string): void {
    this.userService.get(id)
      .subscribe(
        data => {
          this.currentUser = data;
          // console.log(data);
        },
        error => {
          console.log(error);
        });
  }


  updateUser(): void {
    this.message = '';

    this.userService.update(this.currentUser.id, this.currentUser)
      .subscribe(
         response => {
          // console.log(response);
          this.message = response.message ? response.message : 'This user was updated successfully!';
        },
        error => {
          console.log(error);
        });
  }

  deleteUser(): void {
    this.userService.delete(this.currentUser.id)
      .subscribe(
        response => {
          // console.log(response);
          this.router.navigate(['/users']);
        },
        error => {
          console.log(error);
        });
  }
}