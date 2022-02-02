import { User } from "./user.model";

export class Project {
    id?: any;
    name?: string;
    description?: string | undefined;
    users?: Array<User> | undefined;
    published?: boolean | undefined;
  }
