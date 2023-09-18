import { DynamicModule, Module } from '@nestjs/common'
import { FactorydriveModuleAsyncOptions, FactorydriveModuleOptions } from './factorydrive.interfaces'
import { FactorydriveCoreModule } from './factorydrive.core-module'

@Module({})
export class FactorydriveModule {
  public static forRoot(options: FactorydriveModuleOptions): DynamicModule {
    return {
      module: FactorydriveModule,
      imports: [FactorydriveCoreModule.forRoot(options)],
    }
  }

  public static forRootAsync(options: FactorydriveModuleAsyncOptions): DynamicModule {
    return {
      module: FactorydriveModule,
      imports: [FactorydriveCoreModule.forRootAsync(options)],
    }
  }
}
