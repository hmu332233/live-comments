export interface IPostPointer {
  post: IPost;
  x: number;
  y: number;
  show: boolean;
}

export interface IPost {
  id: string;
  userId: string;
  selector: string;
  timestamp: number;
  comments: IComment[];
  resolved?: boolean;
  pageCode: string;
}

export interface IComment {
  id: string;
  userId: string;
  userName: string;
  text: string;
  timestamp: number;
}

export interface IUser {
  id: string;
  name: string;
  lastLoginAt: string;
}

export interface IPage {
  code: string;
  url: string;
}

export interface IAuth {
  user: IUser;
  page: IPage;
}

export type INormalizedData<Type> = {
  ids: string[];
  entities: { [key: string]: Type };
};
