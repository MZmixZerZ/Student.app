import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class SignInDto {
  @ApiProperty({ description: 'Username หรือ Email ของผู้ใช้' })
  @IsString()
  @IsNotEmpty({ message: 'Username หรือ Email จำเป็นต้องระบุ' })
  @MinLength(3)
  username: string; // ใช้สำหรับรับ username หรือ email

  @ApiProperty({ description: 'รหัสผ่านของผู้ใช้' })
  @IsString()
  @IsNotEmpty({ message: 'Password จำเป็นต้องระบุ' })
  @MinLength(6)
  @MaxLength(20)
  password: string;
}
