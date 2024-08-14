import { IsString, Length, IsEnum, IsInt, IsDateString } from 'class-validator';
import { TaskStatus } from '../../enums/task-status.enum'; 

export class CreateTaskDto {
  @IsString()
  @Length(1, 2000)
  title: string;

  @IsString()
  @Length(1, 1000)
  description?: string;

  @IsDateString()
  dueDate?: string;

  @IsEnum(TaskStatus)
  status: TaskStatus;

  @IsInt()
  projectId: number;

  @IsInt()
  userId: number; 
}
