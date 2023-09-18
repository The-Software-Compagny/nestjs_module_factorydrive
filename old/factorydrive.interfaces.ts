import { ModuleMetadata, Type } from '@nestjs/common'

export interface FactorydriveOptions {

}

export interface FactorydriveModuleOptions {
  config: FactorydriveOptions
}

export interface FactorydriveModuleOptionsFactory {
  createRconModuleOptions(): Promise<FactorydriveModuleOptions> | FactorydriveModuleOptions
}

export interface FactorydriveModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[]
  useClass?: Type<FactorydriveModuleOptionsFactory>
  useExisting?: Type<FactorydriveModuleOptionsFactory>
  useFactory?: (...args: any[]) => Promise<FactorydriveModuleOptions> | FactorydriveModuleOptions
}
