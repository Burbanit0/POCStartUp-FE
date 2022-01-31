import { User } from "./user.model";

export class Project {
    id?: any;
    name?: string;
    description?: string;
    users?: Array<User>;
    published?: boolean;
  }
