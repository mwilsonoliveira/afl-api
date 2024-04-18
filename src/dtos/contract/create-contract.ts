import { IsNotEmpty } from 'class-validator';

export class CreateContract {
  @IsNotEmpty()
  effective_date: string;

  @IsNotEmpty()
  sign_date: string;

  @IsNotEmpty()
  contract_tax: number;

  @IsNotEmpty()
  company_id: string;

  @IsNotEmpty()
  service_id: string;
}
