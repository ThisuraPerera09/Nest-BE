
import { IsString, IsInt,Length } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @Length(1, 200) 
  title: string;

  @IsString()
  @Length(1, 500) 
  description?: string;

  @IsInt()
  userId: number; 
}
