import { DynamicModule, Module } from '@nestjs/common'
import { FactorydriveModuleAsyncOptions } from './factorydrive.interfaces'
import { FactorydriveCoreModule } from './factorydrive.core-module'
import { StorageManagerConfig } from './factorydrive'

@Module({})
export class FactorydriveModule {
  public static forRoot(options: StorageManagerConfig): DynamicModule {
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
