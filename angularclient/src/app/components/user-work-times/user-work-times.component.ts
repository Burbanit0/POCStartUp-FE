import { Component, OnInit , Input} from '@angular/core';
import { User } from 'src/app/models/user.model';
import { WorktimeService } from '../../services/worktime.service';
import { Worktime } from '../../models/worktime.model';
import { Project } from 'src/app/models/project.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-work-times',
  templateUrl: './user-work-times.component.html',
  styleUrls: ['./user-work-times.component.css']
})
export class UserWorkTimesComponent implements OnInit {

  @Input() user:User = {};
  response:any;
  wts?:Array<Worktime> = [];
  projects:Array<Project> = [];

  constructor(
    private userService: UserService,
    private worktimeService : WorktimeService
  ) {  }

  ngOnChanges() {
    this.worktimeService.getWorktimeForUser(this.user?.id).subscribe(
      data => {
        this.wts = data;
        if(this.wts.length==0){this.wts=undefined}
        console.log(this.wts);
      },
      error => {
        console.log(error);
      });
  }

  ngOnInit(): void {
  }

  

}
