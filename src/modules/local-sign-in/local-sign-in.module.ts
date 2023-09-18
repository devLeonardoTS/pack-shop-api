import { Module } from '@nestjs/common';
import { LocalSignInService } from './local-sign-in.service';
import { LocalSignInController } from './local-sign-in.controller';

@Module({
  controllers: [LocalSignInController],
  providers: [LocalSignInService]
})
export class LocalSignInModule {}
