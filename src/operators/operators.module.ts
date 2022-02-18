import { forwardRef, Module, OnModuleInit } from '@nestjs/common';
import { OperatorsService } from './operators.service';
import { ActionName, FilterName, Repository, Service } from '../contants';
import { CampaignsModule } from '../campaigns/campaigns.module';
import { OperatorsRepository } from './operators.repository';
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

  constructor(private moduleRef: ModuleRef) {
    this.operatorsRepository = this.moduleRef.get(Repository.Operator);
  }

  async onModuleInit(): Promise<void> {
    const actionNames = Object.keys(ActionName).map((n) => ActionName[n]);
    const filterNames = Object.keys(FilterName).map((n) => FilterName[n]);
    const operatorControls = [...actionNames, ...filterNames];
    const operatorOnDatabase = await this.operatorsRepository.findAll();
    const operatorOnDatabaseNames = operatorOnDatabase.map((n) => n.name);

    for (const opd of operatorOnDatabaseNames) {
      const isIn = operatorControls.includes(opd);
      if (!isIn) {
        throw new Error(`${opd} is not in operator control list`);
      }
    }
  }
}
