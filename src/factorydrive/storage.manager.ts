import { LocalFileSystemStorage } from './local-file-system.storage'
import AbstractStorage from './abstract.storage'
import { InvalidConfigException, DriverNotSupportedException } from '../exceptions'
import { StorageManagerConfig, StorageManagerDiskConfig, StorageManagerSingleDiskConfig } from './types'

interface StorageConstructor<T extends AbstractStorage = AbstractStorage> {
    new (...args: any[]): T
}

// noinspection JSUnusedGlobalSymbols
export default class StorageManager {
    private readonly defaultDisk: string | undefined
    private readonly disksConfig: StorageManagerDiskConfig
    private _disks: Map<string, AbstractStorage> = new Map()
    private _drivers: Map<string, StorageConstructor> = new Map()

    public constructor(config: StorageManagerConfig) {
        this.defaultDisk = config.default
        this.disksConfig = config.disks || {}
        this.registerDriver('local', LocalFileSystemStorage)
    }

    public getDisks(): Map<string, AbstractStorage> {
        return this._disks
    }

    public getDrivers(): Map<string, StorageConstructor> {
        return this._drivers
    }

    public disk<T extends AbstractStorage = AbstractStorage>(name?: string): T {
        name = name || this.defaultDisk

        if (!name) {
            throw InvalidConfigException.missingDiskName()
        }

        if (this._disks.has(name)) {
            return this._disks.get(name) as T
        }

        const diskConfig = this.disksConfig[name]

        if (!diskConfig) {
            throw InvalidConfigException.missingDiskConfig(name)
        }

        if (!diskConfig.driver) {
            throw InvalidConfigException.missingDiskDriver(name)
        }

        const Driver = this._drivers.get(diskConfig.driver)
        if (!Driver) {
            throw DriverNotSupportedException.driver(diskConfig.driver)
        }

        const disk = new Driver(diskConfig.config)
        this._disks.set(name, disk)
        return disk as T
    }

    public addDisk(name: string, config: StorageManagerSingleDiskConfig): void {
        if (this.disksConfig[name]) {
            throw InvalidConfigException.duplicateDiskName(name)
        }
        this.disksConfig[name] = config
    }

    public registerDriver<T extends AbstractStorage>(name: string, driver: StorageConstructor<T>): void {
        this._drivers.set(name, driver)
    }
}
