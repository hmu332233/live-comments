export type Comment = {
  id: string;
  userId: string;
  selector: string;
  text: string;
  timestamp: number;
  resolved?: boolean;
  url?: string;
};

export type NormalizedData<Type> = {
  ids: string[];
  entities: { [key: string]: Type };
};
