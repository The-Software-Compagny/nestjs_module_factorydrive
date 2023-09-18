<p align="center">
  <a href="http://nestjs.com/" target="blank">
    <img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" />
  </a>
</p>

<p align="center">
  Factory drive module for NestJS framework
</p>

<p align="center">
  <a href="https://www.npmjs.com/org/streamkits"><img src="https://img.shields.io/npm/v/@streamkits/nestjs_module_rcon.svg" alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/org/streamkits"><img src="https://img.shields.io/npm/l/@streamkits/nestjs_module_rcon.svg" alt="Package License" /></a>
  <a href="https://github.com/StreamKITS/nestjs_module_rcon/actions/workflows/ci.yml"><img src="https://github.com/StreamKITS/nestjs_module_rcon/actions/workflows/ci.yml/badge.svg" alt="Publish Package to npmjs" /></a>
</p>
<br>

# NestJS Factory drive Module
Factory drive module for NestJS Framework

## Install dependencies
```bash
yarn add @streamkits/nestjs_module_factorydrive
```
## Instanciate
```ts
RconModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (config: ConfigService) => ({
    config: config.get<RconOptions>('factorydrive.options'),
  }),
})
```
