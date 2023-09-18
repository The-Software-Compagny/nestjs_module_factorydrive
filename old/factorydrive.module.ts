import { DynamicModule, Module } from '@nestjs/common'
import { FactorydriveCoreModule } from './factorydrive.core-module'
import { FactorydriveModuleAsyncOptions, FactorydriveModuleOptions } from './factorydrive.interfaces'

@Module({})
export class FactorydriveModule {
  public static forRoot(options: FactorydriveModuleOptions, connection?: string): DynamicModule {
    return {
      module: FactorydriveModule,
      imports: [FactorydriveCoreModule.forRoot(options, connection)],
      exports: [FactorydriveCoreModule],
    }
  }

  public static forRootAsync(options: FactorydriveModuleAsyncOptions, connection?: string): DynamicModule {
    return {
      module: FactorydriveModule,
      imports: [FactorydriveCoreModule.forRootAsync(options, connection)],
      exports: [FactorydriveCoreModule],
    }
  }
}
