import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}

  async createTask(createTaskDto: CreateTaskDto) {
    try {
      const { title, description, dueDate, status, projectId, userId } = createTaskDto;

      return await this.prisma.task.create({
        data: {
          title,
          description,
          dueDate: dueDate ? new Date(dueDate) : null,
          status,
          project: {
            connect: { id: projectId },
          },
          user: userId
            ? {
                connect: { id: userId },
              }
            : undefined,
        },
      });
    } catch (error) {
      throw new Error('Could not create task.');
    }
  }

  async updateTask(id: number, updateTaskDto: UpdateTaskDto) {
    try {
      const task = await this.prisma.task.findUnique({
        where: { id },
      });

      if (!task) {
        throw new NotFoundException(`Task with id ${id} not found`);
      }

      return await this.prisma.task.update({
        where: { id },
        data: {
          title: updateTaskDto.title,
          description: updateTaskDto.description,
          dueDate: updateTaskDto.dueDate ? new Date(updateTaskDto.dueDate) : null,
          status: updateTaskDto.status,
          project: updateTaskDto.projectId
            ? {
                connect: { id: updateTaskDto.projectId },
              }
            : undefined,
          user: updateTaskDto.userId
            ? {
                connect: { id: updateTaskDto.userId },
              }
            : undefined, 
        },
      });
    } catch (error) {
      throw new Error('Could not update task.');
    }
  }

  async getTasks() {
    try {
      return await this.prisma.task.findMany({
        include: {
          project: true,
          user: true,
        },
      });
    } catch (error) {
      throw new Error('Could not fetch tasks.');
    }
  }

  async getTaskById(id: number) {
    try {
      const task = await this.prisma.task.findUnique({
        where: { id },
        include: {
          project: true,
          user: true,
        },
      });

      if (!task) {
        throw new NotFoundException(`Task with id ${id} not found`);
      }

      return task;
    } catch (error) {
      throw new Error('Could not fetch task.');
    }
  }

  async deleteTask(id: number) {
    try {
      const task = await this.prisma.task.findUnique({
        where: { id },
      });

      if (!task) {
        throw new NotFoundException(`Task with id ${id} not found`);
      }

      return await this.prisma.task.delete({
        where: { id },
      });
    } catch (error) {
      throw new Error('Could not delete task.');
    }
  }

  async getTasksByProject(projectId: number) {
    try {
      const tasks = await this.prisma.task.findMany({
        where: { projectId },
        include: {
          project: true,
          user: true,
        },
      });

      return tasks;
    } catch (error) {
      throw new Error('Could not fetch tasks for the project.');
    }
  }

  async getTasksForUser(userId: number) {
    try {
      return await this.prisma.task.findMany({
        where: { userId },
        include: {
          project: true,
        },
      });
    } catch (error) {
      throw new Error('Could not fetch tasks for the user.');
    }
  }
}
