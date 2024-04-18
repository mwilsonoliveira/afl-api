/*
  Warnings:

  - You are about to drop the `Company` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Contract` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Department` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DepartmentService` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Service` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Contract" DROP CONSTRAINT "Contract_company_id_fkey";

-- DropForeignKey
ALTER TABLE "Contract" DROP CONSTRAINT "Contract_service_id_fkey";

-- DropForeignKey
ALTER TABLE "DepartmentService" DROP CONSTRAINT "DepartmentService_department_id_fkey";

-- DropForeignKey
ALTER TABLE "DepartmentService" DROP CONSTRAINT "DepartmentService_service_id_fkey";

-- DropTable
DROP TABLE "Company";

-- DropTable
DROP TABLE "Contract";

-- DropTable
DROP TABLE "Department";

-- DropTable
DROP TABLE "DepartmentService";

-- DropTable
DROP TABLE "Service";

-- CreateTable
CREATE TABLE "Companies" (
    "company_id" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "trade_name" TEXT NOT NULL,
    "legal_name" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "uf" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "logo" TEXT,

    CONSTRAINT "Companies_pkey" PRIMARY KEY ("company_id")
);

-- CreateTable
CREATE TABLE "Contracts" (
    "contract_id" TEXT NOT NULL,
    "effective_date" TIMESTAMP(3) NOT NULL,
    "sign_date" TIMESTAMP(3) NOT NULL,
    "contract_tax" DOUBLE PRECISION NOT NULL,
    "company_id" TEXT NOT NULL,
    "service_id" TEXT NOT NULL,

    CONSTRAINT "Contracts_pkey" PRIMARY KEY ("contract_id")
);

-- CreateTable
CREATE TABLE "Departments" (
    "department_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Departments_pkey" PRIMARY KEY ("department_id")
);

-- CreateTable
CREATE TABLE "Services" (
    "service_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Services_pkey" PRIMARY KEY ("service_id")
);

-- CreateTable
CREATE TABLE "DepartmentsServices" (
    "department_id" TEXT NOT NULL,
    "service_id" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "DepartmentsServices_department_id_service_id_key" ON "DepartmentsServices"("department_id", "service_id");

-- AddForeignKey
ALTER TABLE "Contracts" ADD CONSTRAINT "Contracts_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Companies"("company_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contracts" ADD CONSTRAINT "Contracts_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "Services"("service_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DepartmentsServices" ADD CONSTRAINT "DepartmentsServices_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "Departments"("department_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DepartmentsServices" ADD CONSTRAINT "DepartmentsServices_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "Services"("service_id") ON DELETE RESTRICT ON UPDATE CASCADE;
