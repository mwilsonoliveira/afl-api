import { ArrayMinSize, IsArray, IsNotEmpty } from 'class-validator';

export class CreateContract {
  @IsNotEmpty()
  value: number;

  @IsNotEmpty()
  status: string;

  @IsNotEmpty()
  effective_date: string;

  @IsNotEmpty()
  sign_date: string;

  @IsNotEmpty()
  contract_tax: number;

  @IsNotEmpty()
  company_id: string;

  @IsArray()
  @ArrayMinSize(1)
  departments: Department[];
}

export class Department {
  @IsNotEmpty()
  name: string;

  @IsArray()
  @ArrayMinSize(1)
  services: string[];
}
