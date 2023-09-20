import { ModuleMetadata, Type } from '@nestjs/common'
import { StorageManagerConfig } from './factorydrive'

export interface FactorydriveModuleOptionsFactory {
  createFactorydriveModuleOptions(): Promise<StorageManagerConfig> | StorageManagerConfig
}

export interface FactorydriveModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[]
  useClass?: Type<FactorydriveModuleOptionsFactory>
  useExisting?: Type<FactorydriveModuleOptionsFactory>
  useFactory?: (...args: any[]) => Promise<StorageManagerConfig> | StorageManagerConfig
}
