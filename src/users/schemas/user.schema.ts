import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type UserDocument = User & Document;

@Schema()
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  salt: string;

  @Prop({ required: true })
  preferredCoin: string;

  validatePassword: (password: string) => Promise<boolean>;
  hashPassword: (password: string, salt: string) => Promise<string>;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre<User>('save', async function (next) {
  this.salt = await bcrypt.genSalt();
  this.password = await this.hashPassword(this.password, this.salt);
  next();
});

UserSchema.methods.validatePassword = async function (
  password: string,
): Promise<boolean> {
  const hash = await bcrypt.hash(password, this.salt);
  return hash === this.password;
};

UserSchema.methods.hashPassword = async (password: string, salt: string) =>
  bcrypt.hash(password, salt);
