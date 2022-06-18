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
  id: string;
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  joinedDate: Date;
  status: Status;
  bio: string;
  team: string;
  location: string;
  avatar: Avatar;
}

enum EventType {
  DELETED = "Delete",
  NEW_CONTRIBUTOR = "New contributor",
}

enum Entity {
  TASK = "Task",
}
export interface Notification {
  _id: string;
  entity: Entity;
  entityId: string;
  eventType: EventType;
  actor: User;
  isRead: boolean;
  notifier: User;
  message: string;
}
