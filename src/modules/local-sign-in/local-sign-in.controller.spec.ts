import { Test, TestingModule } from '@nestjs/testing';
import { LocalSignInController } from './local-sign-in.controller';
import { LocalSignInService } from './local-sign-in.service';

describe('LocalSignInController', () => {
  let controller: LocalSignInController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocalSignInController],
      providers: [LocalSignInService],
    }).compile();

    controller = module.get<LocalSignInController>(LocalSignInController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
