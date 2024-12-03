import { Controller, Post, Body } from '@nestjs/common';
import { SurveyService } from './survey.service';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('XTRIM')
@Controller('api/v1')
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) {}

  @Post('registrar_encuesta')
  @ApiOperation({
    summary: 'Registrar encuesta',
    description: 'Endpoint para registrar una nueva encuesta en el sistema',
  })
  @ApiBody({
    type: CreateSurveyDto,
    description: 'Datos de la encuesta a registrar',
    examples: {
      ejemplo1: {
        value: {
          IdCuenta: '123456',
          respuesta: 'Respuesta de ejemplo',
          canal: 'Kiosco',
          user: 'usuario',
          password: 'contraseña',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Encuesta registrada exitosamente',
    schema: {
      type: 'object',
      properties: {
        success: {
          type: 'boolean',
          example: true,
        },
        data: {
          type: 'object',
          example: {
            // Aquí puedes agregar un ejemplo de la respuesta exitosa
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos',
    schema: {
      type: 'object',
      properties: {
        success: {
          type: 'boolean',
          example: false,
        },
        data: {
          type: 'object',
          example: {
            message: 'Descripción del error',
          },
        },
      },
    },
  })
  async createSurvey(@Body() createSurveyDto: CreateSurveyDto) {
    return await this.surveyService.create(createSurveyDto);
  }
}
