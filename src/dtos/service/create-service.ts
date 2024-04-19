import { IsNotEmpty } from 'class-validator';

export class CreateService {
  @IsNotEmpty()
  name: string;
}
