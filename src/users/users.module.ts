import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt'; // <-- Importamos JwtModule directamente

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    // Registramos el JwtModule de forma asíncrona igual que en el Auth para que comparta el SECRET
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '8h' },
      }),
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], // Sigue exportando UsersService para el AuthModule
})
export class UsersModule {}