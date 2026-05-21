import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto, systemOperator: string = 'System_Register'): Promise<User> {
    const { email, password } = createUserDto;

    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new ConflictException('El correo electrónico ya está registrado');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Mapeamos los datos del negocio y los datos iniciales de la auditoría de C#
    const user = this.userRepository.create({
      email,
      password: hashedPassword,
      createdBy: systemOperator,
    });

    const savedUser = await this.userRepository.save(user);
    delete savedUser.password;
    return savedUser;
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find({
      where: { isActive: true }, // Borrado lógico manual controlado mediante flag de estado
    });
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email, isActive: true } });
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id, isActive: true } });
    if (!user) throw new NotFoundException('Usuario no encontrado');
    return user;
  }

  // Implementación del Borrado Lógico mediante cambio de estados y autoría
  async softDelete(id: string, operatorEmail: string): Promise<{ message: string }> {
    const user = await this.findOne(id);
    
    user.isActive = false;
    user.isEnabled = false;
    user.modifiedBy = operatorEmail; // Registramos quién ejecutó el borrado lógico

    await this.userRepository.save(user);
    return { message: 'Registro desactivado (borrado lógico) correctamente' };
  }
}