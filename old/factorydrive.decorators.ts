import { Inject } from '@nestjs/common'
import { getFactorydriveConnectionToken } from './factorydrive.utils'

export const InjectFactorydrive = (connection?: string) => {
  return Inject(getFactorydriveConnectionToken(connection))
}
