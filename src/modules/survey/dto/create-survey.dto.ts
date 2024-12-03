import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateSurveyDto {
  @ApiProperty({
    description: 'ID de la cuenta',
    example: '123456',
  })
  @IsString()
  @IsNotEmpty()
  IdCuenta: string;

  @ApiProperty({
    description: 'Respuesta de la encuesta',
    example: 'Respuesta de ejemplo',
  })
  @IsString()
  @IsNotEmpty()
  respuesta: string;

  @ApiProperty({
    description: 'Canal de la encuesta',
    example: 'Kiosco',
  })
  @IsString()
  @IsNotEmpty()
  canal: string;

  @ApiProperty({
    description: 'Usuario para autenticación',
    example: 'usuario',
  })
  @IsString()
  @IsNotEmpty()
  user: string;

  @ApiProperty({
    description: 'Contraseña para autenticación',
    example: 'contraseña',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
