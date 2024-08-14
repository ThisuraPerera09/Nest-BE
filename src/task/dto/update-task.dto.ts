import { IsString, IsEnum, IsInt, IsDateString,Length } from 'class-validator';
import { TaskStatus } from '../../enums/task-status.enum'; 

export class UpdateTaskDto {
  
  @IsString()
  @Length(1, 200)
  title?: string;

  @IsString()
  @Length(1, 1000)
  description?: string;

  @IsDateString()
  dueDate?: string;

  @IsEnum(TaskStatus)
  status?: TaskStatus;
  
  @IsInt()
  projectId?: number;

  @IsInt()
  userId?: number; 
}
