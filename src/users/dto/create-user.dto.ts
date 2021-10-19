import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  IsEnum,
} from 'class-validator';
import { Coins } from 'src/shared/enums/coins.enum';

export class CreateUserDTO {
  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  lastName: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(Coins, {
    message: `preferredCoin must be a valid value: ${Object.values(Coins)}`,
  })
  preferredCoin: string;
}
