import { Hobby } from "./hobby.model";

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    profilePicture: string;
    hobbies: Hobby[];
    //private password: string;
}
