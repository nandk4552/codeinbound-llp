import { Test, TestingModule } from '@nestjs/testing';

import { NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

jest.mock('bcrypt'); // This line is crucial!
const mockUserRepository = () => ({
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  findByEmail: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
});

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useFactory: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('create', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = {
        email: 'test@test.com',
        password: '123456', // Use a plain text password here
      };
      const createdUser = {
        id: 1,
        ...createUserDto,
        password:
          '$2b$10$DpQzyb44xGi7pK9WbUtPH.6mfq/vNmtG6Bo.hLkOPdXw412J6FM5y',
      }; // Provide the expected hashed password

      // Mock bcrypt.hash to return the expected hashed password
      (bcrypt.hash as jest.Mock).mockResolvedValue(
        '$2b$10$DpQzyb44xGi7pK9WbUtPH.6mfq/vNmtG6Bo.hLkOPdXw412J6FM5y',
      );

      jest.spyOn(userRepository, 'create').mockReturnValue(createdUser);
      jest.spyOn(userRepository, 'save').mockResolvedValue(createdUser);

      const result = await service.create(createUserDto);

      expect(bcrypt.hash).toHaveBeenCalledWith('123456', 10); // Check if bcrypt.hash was called with the correct arguments
      expect(userRepository.create).toHaveBeenCalledWith({
        email: 'test@test.com',
        password:
          '$2b$10$DpQzyb44xGi7pK9WbUtPH.6mfq/vNmtG6Bo.hLkOPdXw412J6FM5y', // Verify that the hashed password is passed to create
      });
      expect(userRepository.save).toHaveBeenCalledWith(createdUser);
      expect(result).toEqual(createdUser);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users = [
        { id: 1, email: 'test@test.com', password: '123456' },
        { id: 6, email: 'nandk', password: '123456' },
      ];
      jest.spyOn(userRepository, 'find').mockResolvedValue(users);

      const result = await service.findAll();

      expect(userRepository.find).toHaveBeenCalled();
      expect(result).toEqual(users);
    });
  });

  describe('findOne', () => {
    it('should return a user by ID', async () => {
      const user = {
        id: 1,
        email: 'test@test.com',
        password: '123456',
      };
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);

      const result = await service.findOne(1);

      expect(userRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(result).toEqual(user);
    });

    it('should t`hrow NotFoundException if user is not found', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findByEmail', () => {
    it('should find a user by email', async () => {
      const user = {
        id: 1,
        email: 'test@example.com',
        password: 'password123',
      };
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);

      const result = await service.findByEmail('test@example.com');

      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { email: 'test@example.com' },
      });
      expect(result).toEqual(user);
    });

    it('should return undefined if user is not found', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);

      const result = await service.findByEmail('nonexistent@example.com');

      expect(result).toBeUndefined();
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const user = {
        id: 1,
        email: 'test@example.com',
        password: 'password123',
      };
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);
      jest
        .spyOn(userRepository, 'save')
        .mockResolvedValue({ ...user, email: 'updated@example.com' });

      const result = await service.update(1, { email: 'updated@example.com' });

      expect(userRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(userRepository.save).toHaveBeenCalledWith({
        ...user,
        email: 'updated@example.com',
      });
      expect(result).toEqual({ ...user, email: 'updated@example.com' });
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      jest.spyOn(userRepository, 'delete').mockResolvedValue(undefined);

      await service.remove(1);

      expect(userRepository.delete).toHaveBeenCalledWith(1);
    });
  });
});
