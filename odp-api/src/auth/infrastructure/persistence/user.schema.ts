import { Schema as MongooseSchema, SchemaFactory } from '@nestjs/mongoose';
import { UserEntity } from 'src/auth/domain/entities/user.entity';
import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ timestamps: true, collection: 'users' })
export class User extends UserEntity {}

export const UserSchema = SchemaFactory.createForClass(User);
