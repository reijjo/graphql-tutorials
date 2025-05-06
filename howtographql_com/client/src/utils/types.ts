export interface LinkType {
  id: number | string;
  description: string;
  url: string;
  postedBy?: User;
  votes: User[];
  createdAt: Date;
}

export type User = {
  name: string;
  emil: string;
  password: string;
  links: LinkType[];
};
