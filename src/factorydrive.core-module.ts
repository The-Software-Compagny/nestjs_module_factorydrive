import { DynamicModule, Global, Inject, Module, Provider, Type } from '@nestjs/common'
import { StorageService } from './storage.service'
import { FACTORYDRIVE_MODULE_OPTIONS_TOKEN } from './factorydrive.constants'
import { FactorydriveModuleAsyncOptions, FactorydriveModuleOptions, FactorydriveModuleOptionsFactory } from './factorydrive.interfaces'
import { ModuleRef } from '@nestjs/core'

@Global()
@Module({})
export class FactorydriveCoreModule {
  public constructor(
    @Inject(FACTORYDRIVE_MODULE_OPTIONS_TOKEN)
    private readonly options: FactorydriveModuleOptions,
    private readonly moduleRef: ModuleRef,
  ) {}

  public static forRoot(options: FactorydriveModuleOptions): DynamicModule {
    const storageModuleOptions: Provider = {
      provide: FACTORYDRIVE_MODULE_OPTIONS_TOKEN,
      useValue: options,
    }
    return {
      module: FactorydriveCoreModule,
      providers: [storageModuleOptions, StorageService],
      exports: [StorageService],
    }
  }

  public static forRootAsync(options: FactorydriveModuleAsyncOptions): DynamicModule {
    const asyncProviders = this.createAsyncProviders(options)
    return {
      module: FactorydriveCoreModule,
      imports: options.imports,
      providers: [...asyncProviders, StorageService],
      exports: [StorageService],
    }
  }

  private static createAsyncProviders(options: FactorydriveModuleAsyncOptions): Provider[] {
    if (options.useFactory) return [this.createAsyncOptionsProvider(options)]
    const useClass = options.useClass as Type<FactorydriveModuleOptionsFactory>
    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: useClass,
        useClass,
      },
    ]
  }

  private static createAsyncOptionsProvider(options: FactorydriveModuleAsyncOptions): Provider {
    if (options.useFactory) {
      return {
        provide: FACTORYDRIVE_MODULE_OPTIONS_TOKEN,
        useFactory: options.useFactory,
        inject: options.inject || [],
      }
    }
    const inject = [options.useClass as Type<FactorydriveModuleOptionsFactory>]
    return {
      provide: FACTORYDRIVE_MODULE_OPTIONS_TOKEN,
      useFactory: async (optionsFactory: FactorydriveModuleOptionsFactory) => optionsFactory.createFactorydriveModuleOptions(),
      inject,
    }
  }
}
