import { DynamicModule, Global, Module, Provider } from '@nestjs/common'
import { FactorydriveModuleAsyncOptions, FactorydriveModuleOptions, FactorydriveModuleOptionsFactory } from './factorydrive.interfaces'
import { createFactorydriveConnection, getFactorydriveConnectionToken, getFactorydriveOptionsToken } from './factorydrive.utils'

@Global()
@Module({})
export class FactorydriveCoreModule {
  public static forRoot(options: FactorydriveModuleOptions, connection?: string): DynamicModule {
    const factorydriveOptionsProvider: Provider = {
      provide: getFactorydriveOptionsToken(connection),
      useValue: options,
    }

    const factorydriveConnectionProvider: Provider = {
      provide: getFactorydriveConnectionToken(connection),
      useValue: createFactorydriveConnection(options),
    }

    return {
      module: FactorydriveCoreModule,
      providers: [factorydriveOptionsProvider, factorydriveConnectionProvider],
      exports: [factorydriveOptionsProvider, factorydriveConnectionProvider],
    }
  }

  public static forRootAsync(options: FactorydriveModuleAsyncOptions, connection: string): DynamicModule {
    const factorydriveConnectionProvider: Provider = {
      provide: getFactorydriveConnectionToken(connection),
      useFactory(options: FactorydriveModuleOptions) {
        return createFactorydriveConnection(options)
      },
      inject: [getFactorydriveOptionsToken(connection)],
    }

    return {
      module: FactorydriveCoreModule,
      imports: options.imports,
      providers: [...this.createAsyncProviders(options, connection), factorydriveConnectionProvider],
      exports: [factorydriveConnectionProvider],
    }
  }

  public static createAsyncProviders(options: FactorydriveModuleAsyncOptions, connection?: string): Provider[] {
    if (!(options.useExisting || options.useFactory || options.useClass)) {
      throw new Error('Invalid configuration. Must provide useFactory, useClass or useExisting')
    }

    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options, connection)]
    }

    return [this.createAsyncOptionsProvider(options, connection), { provide: options.useClass, useClass: options.useClass }]
  }

  public static createAsyncOptionsProvider(options: FactorydriveModuleAsyncOptions, connection?: string): Provider {
    if (!(options.useExisting || options.useFactory || options.useClass)) {
      throw new Error('Invalid configuration. Must provide useFactory, useClass or useExisting')
    }

    if (options.useFactory) {
      return {
        provide: getFactorydriveOptionsToken(connection),
        useFactory: options.useFactory,
        inject: options.inject || [],
      }
    }

    return {
      provide: getFactorydriveOptionsToken(connection),
      async useFactory(optionsFactory: FactorydriveModuleOptionsFactory): Promise<FactorydriveModuleOptions> {
        return optionsFactory.createRconModuleOptions();
      },
      inject: [options.useClass || options.useExisting],
    }
  }
}
