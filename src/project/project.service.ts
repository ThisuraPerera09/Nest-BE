
import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  async create(createProjectDto: CreateProjectDto) {
    try {
      return await this.prisma.project.create({
        data: createProjectDto,
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to create project');
    }
  }

  async findAll() {
    try {
      return await this.prisma.project.findMany();
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve projects');
    }
  }

  async findOne(id: number) {
    try {
      const project = await this.prisma.project.findUnique({
        where: { id },
      });
      if (!project) {
        throw new NotFoundException('Project not found');
      }
      return project;
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve project');
    }
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    try {
      const project = await this.prisma.project.update({
        where: { id },
        data: updateProjectDto,
      });
      if (!project) {
        throw new NotFoundException('Project not found');
      }
      return project;
    } catch (error) {
      throw new InternalServerErrorException('Failed to update project');
    }
  }

  async remove(id: number) {
    try {
      // Delete all tasks associated with the project
      await this.prisma.task.deleteMany({
        where: { projectId: id },
      });

      // Delete the project
      const project = await this.prisma.project.delete({
        where: { id },
      });

      if (!project) {
        throw new NotFoundException('Project not found');
      }

      return project;
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete project');
    }
  }

  async findByUserId(userId: number) {
    try {
      const projects = await this.prisma.project.findMany({
        where: { userId },
      });
      if (projects.length === 0) {
        throw new NotFoundException('No projects found for this user');
      }
      return projects;
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve projects for user');
    }
  }
}
