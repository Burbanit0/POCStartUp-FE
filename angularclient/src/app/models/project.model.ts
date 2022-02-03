import { User } from "./user.model";
import { Worktime } from "./worktime.model";

export class Project {
    id?: any;
    name?: string;
    description?: string | undefined;
    users?: Array<User> | undefined;
    worktime?: Array<Worktime> | undefined;
    published?: boolean | undefined;
  }
