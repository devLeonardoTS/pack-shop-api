import { Injectable } from '@nestjs/common';
import { CreateLocalSignInDto } from './dto/create-local-sign-in.dto';
import { UpdateLocalSignInDto } from './dto/update-local-sign-in.dto';

@Injectable()
export class LocalSignInService {
  create(createLocalSignInDto: CreateLocalSignInDto) {
    return 'This action adds a new localSignIn';
  }

  findAll() {
    return `This action returns all localSignIn`;
  }

  findOne(id: number) {
    return `This action returns a #${id} localSignIn`;
  }

  update(id: number, updateLocalSignInDto: UpdateLocalSignInDto) {
    return `This action updates a #${id} localSignIn`;
  }

  remove(id: number) {
    return `This action removes a #${id} localSignIn`;
  }
}
