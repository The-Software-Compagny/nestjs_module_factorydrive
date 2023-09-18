/* eslint-disable @typescript-eslint/no-unused-vars */
// noinspection JSUnusedGlobalSymbols

import { MethodNotSupportedException } from '../exceptions'
import {
  ContentResponse,
  DeleteResponse,
  ExistsResponse,
  FileListResponse,
  Response,
  SignedUrlOptions,
  SignedUrlResponse,
  StatResponse,
} from './types'

export default abstract class AbstractStorage {
  public append(_location: string, _content: Buffer | string): Promise<Response> {
    throw new MethodNotSupportedException('append', this.constructor.name)
  }

  public copy(_src: string, _dest: string): Promise<Response> {
    throw new MethodNotSupportedException('copy', this.constructor.name)
  }

  public delete(_location: string): Promise<DeleteResponse> {
    throw new MethodNotSupportedException('delete', this.constructor.name)
  }

  public driver(): unknown {
    throw new MethodNotSupportedException('driver', this.constructor.name)
  }

  public exists(_location: string): Promise<ExistsResponse> {
    throw new MethodNotSupportedException('exists', this.constructor.name)
  }

  public get(_location: string, _encoding?: string): Promise<ContentResponse<string>> {
    throw new MethodNotSupportedException('get', this.constructor.name)
  }

  public getBuffer(_location: string): Promise<ContentResponse<Buffer>> {
    throw new MethodNotSupportedException('getBuffer', this.constructor.name)
  }

  public getSignedUrl(_location: string, _options?: SignedUrlOptions): Promise<SignedUrlResponse> {
    throw new MethodNotSupportedException('getSignedUrl', this.constructor.name)
  }

  public getStat(_location: string): Promise<StatResponse> {
    throw new MethodNotSupportedException('getStat', this.constructor.name)
  }

  public getStream(_location: string): NodeJS.ReadableStream {
    throw new MethodNotSupportedException('getStream', this.constructor.name)
  }

  public getUrl(_location: string): string {
    throw new MethodNotSupportedException('getUrl', this.constructor.name)
  }

  public move(_src: string, _dest: string): Promise<Response> {
    throw new MethodNotSupportedException('move', this.constructor.name)
  }

  public put(_location: string, _content: Buffer | NodeJS.ReadableStream | string): Promise<Response> {
    throw new MethodNotSupportedException('put', this.constructor.name)
  }

  public prepend(_location: string, _content: Buffer | string): Promise<Response> {
    throw new MethodNotSupportedException('prepend', this.constructor.name)
  }

  public flatList(_prefix?: string): AsyncIterable<FileListResponse> {
    throw new MethodNotSupportedException('flatList', this.constructor.name)
  }
}
