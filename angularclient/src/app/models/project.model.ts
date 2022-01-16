import { User } from "./user.model";

export class Project {
    id?: any;
    title?: string;
    description?: string;
    users?: User[];
    published?: boolean;
  }
