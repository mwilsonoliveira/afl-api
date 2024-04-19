import { IsNotEmpty } from 'class-validator';

export class CreateContractDto {
  @IsNotEmpty()
  value: number;

  @IsNotEmpty()
  status: string;

  @IsNotEmpty()
  effective_date: Date;

  @IsNotEmpty()
  sign_date: Date;

  @IsNotEmpty()
  contract_tax: number;

  @IsNotEmpty()
  company_id: string;

  @IsNotEmpty()
  departments: {
    department_id: string;
    services: {
      service_id: string;
    }[];
  }[];
}
