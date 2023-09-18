import { Inject, Injectable } from '@nestjs/common'
import { AbstractStorage, StorageManager, StorageManagerConfig } from './factorydrive'
import { FACTORYDRIVE_MODULE_OPTIONS_TOKEN } from './factorydrive.constants'

@Injectable()
export class FactorydriveService {
  private storageManager: StorageManager

  public constructor(@Inject(FACTORYDRIVE_MODULE_OPTIONS_TOKEN) protected options: StorageManagerConfig) {
    this.storageManager = new StorageManager(options)
  }

  public getDisk<T extends AbstractStorage>(name?: string): T {
    return this.storageManager.disk<T>(name)
  }

  public registerDriver(name: string, driver: new (...args: any[]) => AbstractStorage): void {
    this.storageManager.registerDriver(name, driver)
  }
}
