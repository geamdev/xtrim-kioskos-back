import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateSurveyDto } from './dto/create-survey.dto';
import axios from 'axios';

@Injectable()
export class SurveyService {
  async create(createSurveyDto: CreateSurveyDto) {
    try {
      const idExternal = Math.floor(Math.random() * 1000000000).toString();

      const { data } = await axios.post(
        'https://surveyup-api.baymark.net/api/rest/surveys/955386/import',
        {
          user: createSurveyDto.user,
          password: createSurveyDto.password,
          data: [
            {
              '955386X740X10929': createSurveyDto.respuesta,
              '955386X740X10930': createSurveyDto.IdCuenta,
              '955386X740X10931': createSurveyDto.canal,
              '955386X740X10932': idExternal,
            },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      return {
        success: true,
        data: data,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          data: error,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
