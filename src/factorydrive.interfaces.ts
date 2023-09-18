import { ModuleMetadata, Type } from '@nestjs/common'
import { StorageManagerConfig } from './factorydrive'

export interface FactorydriveOptions extends StorageManagerConfig {}

export interface FactorydriveModuleOptions {
  config: FactorydriveOptions
}

export interface FactorydriveModuleOptionsFactory {
  createFactorydriveModuleOptions(): Promise<FactorydriveModuleOptions> | FactorydriveModuleOptions
}

export interface FactorydriveModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[]
  useClass?: Type<FactorydriveModuleOptionsFactory>
  useExisting?: Type<FactorydriveModuleOptionsFactory>
  useFactory?: (...args: any[]) => Promise<FactorydriveModuleOptions> | FactorydriveModuleOptions
}
