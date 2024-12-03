import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountsModule } from './modules/accounts/accounts.module';
import { SurveyModule } from './modules/survey/survey.module';

@Module({
  imports: [AccountsModule, SurveyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
