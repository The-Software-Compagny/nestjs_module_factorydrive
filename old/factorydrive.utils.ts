import {
    FACTORYDRIVE_MODULE_CONNECTION,
    FACTORYDRIVE_MODULE_CONNECTION_TOKEN,
    FACTORYDRIVE_MODULE_OPTIONS_TOKEN
} from './factorydrive.constants'
import {FactorydriveOptions} from './factorydrive.interfaces'

export function getFactorydriveOptionsToken(connection: string): string {
    return `${connection || FACTORYDRIVE_MODULE_CONNECTION}_${FACTORYDRIVE_MODULE_OPTIONS_TOKEN}`
}

export function getFactorydriveConnectionToken(connection: string): string {
    return `${connection || FACTORYDRIVE_MODULE_CONNECTION}_${FACTORYDRIVE_MODULE_CONNECTION_TOKEN}`
}

export async function createFactorydriveConnection(options: FactorydriveOptions) {
    const {config} = options

}
