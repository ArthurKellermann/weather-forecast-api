import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
import { regexHelper } from '../helpers/regex-helper';
import { messageHelper } from '@application/helpers/message-helper';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Matches(regexHelper.password, {
    message: messageHelper.PASSWORD_VALID,
  })
  password: string;
}
