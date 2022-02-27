import { forwardRef, Logger, Module, OnModuleInit } from '@nestjs/common';
import { OperatorsService } from './operators.service';
import { ActionName, FilterName, Repository, Service } from '../contants';
import { CampaignsModule } from '../campaigns/campaigns.module';
import { IOperator, OperatorsRepository } from './operators.repository';
import { ModuleRef } from '@nestjs/core';

@Module({
  imports: [forwardRef(() => CampaignsModule)],
  providers: [
    {
      provide: Service.Operator,
      useClass: OperatorsService,
    },
    {
      provide: Repository.Operator,
      useClass: OperatorsRepository,
    },
  ],
  exports: [Service.Operator],
})
export class OperatorsModule implements OnModuleInit {
  private readonly operatorsRepository: OperatorsRepository;
  private readonly logger = new Logger('OperatorsModule');

  constructor(private moduleRef: ModuleRef) {
    this.operatorsRepository = this.moduleRef.get(Repository.Operator);
  }

  async onModuleInit(): Promise<void> {
    const actionNames = OperatorsModule.enumToList(ActionName);
    const filterNames = OperatorsModule.enumToList(FilterName);
    const operatorControls = [...actionNames, ...filterNames];
    const operatorOnDatabase = await this.operatorsRepository.findAll();
    const operatorOnDatabaseNames = operatorOnDatabase.map(
      (operator: IOperator) => operator.name,
    );

    for (const operatorName of operatorOnDatabaseNames) {
      const isOperatorInControls = operatorControls.includes(operatorName);
      if (!isOperatorInControls) {
        const errorMessage = `Ops! ${operatorName} does not is in operator control list`;
        this.logger.error(errorMessage);
        throw new Error(errorMessage);
      }
    }
  }

  private static enumToList<T>(context: T): Array<string> {
    return Object.keys(context).map((name: string) => context[name]);
  }
}
