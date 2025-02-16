import { Hobby } from "./hobby.model";

export interface CommonHobbiesDto {
  similarHobbies: Hobby[],
  similarityLevel: number
}
