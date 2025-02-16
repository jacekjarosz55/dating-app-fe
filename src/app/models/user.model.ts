import { Hobby } from "./hobby.model";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  profilePicture: string;
  facebookUrl: string;
  description: string;
  city: string;
  age: number;

  hobbies: Hobby[];
  //private password: string;
}
