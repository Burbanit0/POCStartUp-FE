import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';
import { ProjectService } from './service/project-service.service';
import { UserService } from './service/user-service.service';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectFormComponent } from './project-form/project-form.component';
import { RouterModule, Routes } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserFormComponent,
    ProjectListComponent,
    ProjectFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [UserService, ProjectService],
  bootstrap: [AppComponent]
})
export class AppModule { }
