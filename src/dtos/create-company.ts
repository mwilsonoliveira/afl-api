import { IsNotEmpty } from 'class-validator';

export class CreateCompany {
  @IsNotEmpty()
  nickname: string;

  @IsNotEmpty()
  trade_name: string;

  @IsNotEmpty()
  legal_name: string;

  @IsNotEmpty()
  cnpj: string;

  @IsNotEmpty()
  uf: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  logo: string;
}
