import { Hobby } from "./hobby.model";

export interface RegisterUserDto {
    email: string;
    password: string;
    username: string;
    firstName: string;
    lastName: string;
    profilePicture: string;
    description: string;
    facebookUrl: string;
    city: string;
    age: number;
    hobbies: Hobby[];
}
