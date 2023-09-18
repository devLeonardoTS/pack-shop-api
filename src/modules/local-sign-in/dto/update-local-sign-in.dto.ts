import { PartialType } from '@nestjs/swagger';
import { CreateLocalSignInDto } from './create-local-sign-in.dto';

export class UpdateLocalSignInDto extends PartialType(CreateLocalSignInDto) {}
