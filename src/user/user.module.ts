import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Mongoose } from 'mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { HashingService } from 'src/utils/hashing/hashing.service';
import { IdGeneratorService } from 'src/utils/Id-generator/Id-generator.service';
import { JwtsService } from 'src/utils/jwt/jwt.service';
import { User, UserSchema } from './schema/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    AuthModule,
  ],
  controllers: [UserController],
  providers: [UserService, HashingService, IdGeneratorService, JwtsService],
  exports: [UserService],
})
export class UserModule {}
