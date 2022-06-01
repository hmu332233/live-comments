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
  url?: string;
}

export interface IComment {
  id: string;
  userId: string;
  text: string;
  timestamp: number;
}

export type INormalizedData<Type> = {
  ids: string[];
  entities: { [key: string]: Type };
};
