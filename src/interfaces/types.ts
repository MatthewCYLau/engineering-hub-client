export interface Task {
  name: string;
  description: string;
  theme: string;
  owner: User;
  contributors: User[];
}

export enum Status {
  ACTIVE = "Active",
  BUSY = "Busy",
}

export enum Avatar {
  MAN = "man",
  WOMAN = "woman",
  USER = "user",
}

export interface User {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  joinedDate: Date;
  status: Status;
  bio: string;
  team: string;
  location: string;
  avatar: Avatar;
}
