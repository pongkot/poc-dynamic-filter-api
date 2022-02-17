import { Module } from '@nestjs/common';
import { OperatorsService } from './operators.service';
import { Service } from '../contants';

@Module({
  providers: [
    {
      provide: Service.Operator,
      useClass: OperatorsService,
    },
  ],
  exports: [Service.Operator],
})
export class OperatorsModule {}
