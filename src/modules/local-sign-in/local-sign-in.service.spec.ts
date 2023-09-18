import { Test, TestingModule } from '@nestjs/testing';
import { LocalSignInService } from './local-sign-in.service';

describe('LocalSignInService', () => {
  let service: LocalSignInService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocalSignInService],
    }).compile();

    service = module.get<LocalSignInService>(LocalSignInService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
