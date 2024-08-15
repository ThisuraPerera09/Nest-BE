import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/dto/user.dto';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateUserDto) {
    try {
      const existingUser = await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });

      if (existingUser) {
        throw new ConflictException('Email is already in use');
      }

      const hashedPassword = await hash(dto.password, 10);

      const newUser = await this.prisma.user.create({
        data: {
          ...dto,
          password: hashedPassword,
        },
      });

      const { password, ...result } = newUser;
      return result;
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      } else {
        throw new InternalServerErrorException('An error occurred while creating the user');
      }
    }
  }

  async findByEmail(email: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: email,
        },
      });

      if (!user) {
        throw new NotFoundException('User not found with that email');
      }

      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new InternalServerErrorException('An error occurred while fetching the user by email');
      }
    }
  }

  async findById(id: number) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: id,
        },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new InternalServerErrorException('An error occurred while fetching the user by ID');
      }
    }
  }

  async getAllUsers() {
    try {
      return await this.prisma.user.findMany();
    } catch (error) {
      throw new InternalServerErrorException('An error occurred while fetching all users');
    }
  }
}
