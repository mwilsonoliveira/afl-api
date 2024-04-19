/*
  Warnings:

  - You are about to drop the `Companies` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Contracts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Departments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Services` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Contracts" DROP CONSTRAINT "Contracts_company_id_fkey";

-- DropForeignKey
ALTER TABLE "Departments" DROP CONSTRAINT "Departments_contracts_id_fkey";

-- DropForeignKey
ALTER TABLE "Services" DROP CONSTRAINT "Services_departments_id_fkey";

-- DropTable
DROP TABLE "Companies";

-- DropTable
DROP TABLE "Contracts";

-- DropTable
DROP TABLE "Departments";

-- DropTable
DROP TABLE "Services";

-- CreateTable
CREATE TABLE "Company" (
    "company_id" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "trade_name" TEXT NOT NULL,
    "legal_name" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "uf" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "logo" TEXT NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("company_id")
);

-- CreateTable
CREATE TABLE "Contract" (
    "contract_id" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL,
    "effective_date" TIMESTAMP(3) NOT NULL,
    "sign_date" TIMESTAMP(3) NOT NULL,
    "contract_tax" DOUBLE PRECISION NOT NULL,
    "company_id" TEXT NOT NULL,

    CONSTRAINT "Contract_pkey" PRIMARY KEY ("contract_id")
);

-- CreateTable
CREATE TABLE "Department" (
    "department_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "service_id" TEXT NOT NULL,
    "contract_id" TEXT NOT NULL,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("department_id")
);

-- CreateTable
CREATE TABLE "Service" (
    "service_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "department_id" TEXT NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("service_id")
);

-- AddForeignKey
ALTER TABLE "Contract" ADD CONSTRAINT "Contract_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("company_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Department" ADD CONSTRAINT "Department_contract_id_fkey" FOREIGN KEY ("contract_id") REFERENCES "Contract"("contract_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "Department"("department_id") ON DELETE RESTRICT ON UPDATE CASCADE;
