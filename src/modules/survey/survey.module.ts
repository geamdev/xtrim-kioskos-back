import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { SurveyController } from './survey.controller';
import { SurveyService } from './survey.service';
import { ValidacionBasicMiddleware } from '../../common/middleware/validacion-basic.middleware';

@Module({
  controllers: [SurveyController],
  providers: [SurveyService],
})
export class SurveyModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ValidacionBasicMiddleware).forRoutes(SurveyController);
  }
}
