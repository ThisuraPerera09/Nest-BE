// src/task/task.controller.ts
import { Controller, Get, Post, Body, Param, Delete, Put, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('projects') 
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @UseGuards(JwtGuard)
  @Post()
  create(@Body() createTaskDto: CreateProjectDto) {
    return this.projectService.create(createTaskDto);
  }

  @Get()
  findAll() {
    return this.projectService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.projectService.findOne(id);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateTaskDto: UpdateProjectDto) {
    return this.projectService.update(id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.projectService.remove(id);
  }

  @Get('user/:userId')
  async getProjectsByUserId(@Param('userId', ParseIntPipe) userId: number) {
    return this.projectService.findByUserId(userId);
  }
}
