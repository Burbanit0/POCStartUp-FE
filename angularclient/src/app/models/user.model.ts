import { Role } from './role.model';
import { Project } from './project.model';
import { Worktime } from './worktime.model';

export class User {
    id?: any;
    name?: string;
    roles?: Array<Role>
    projects?: Array<Project>
    workTimes?: Array<Worktime>
    groupUser?: number
}
