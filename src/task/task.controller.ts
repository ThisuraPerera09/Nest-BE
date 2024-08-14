import { Controller, Post, Body, Param, Put, Delete, Get,ParseIntPipe } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.createTask(createTaskDto);
  }

  @Put(':id')
  async updateTask(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.updateTask(id, updateTaskDto);
  }

  @Get()
  async getTasks() {
    return this.taskService.getTasks();
  }

  @Get(':id')
  async getTaskById(@Param('id') id: number) {
    return this.taskService.getTaskById(id);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: number) {
    return this.taskService.deleteTask(id);
  }

  @Get('project/:projectId')
  async getTasksByProject(@Param('projectId', ParseIntPipe) projectId: number) {
    return this.taskService.getTasksByProject(projectId);
  }

  @Get('user/:userId')
  async getTasksForUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.taskService.getTasksForUser(userId);
  }
}
