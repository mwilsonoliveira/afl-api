/*
  Warnings:

  - You are about to drop the column `service_id` on the `Contracts` table. All the data in the column will be lost.
  - You are about to drop the `DepartmentsServices` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `logo` on table `Companies` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `status` to the `Contracts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `Contracts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contracts_id` to the `Departments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `departments_id` to the `Services` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Contracts" DROP CONSTRAINT "Contracts_service_id_fkey";

-- DropForeignKey
ALTER TABLE "DepartmentsServices" DROP CONSTRAINT "DepartmentsServices_department_id_fkey";

-- DropForeignKey
ALTER TABLE "DepartmentsServices" DROP CONSTRAINT "DepartmentsServices_service_id_fkey";

-- AlterTable
ALTER TABLE "Companies" ALTER COLUMN "logo" SET NOT NULL;

-- AlterTable
ALTER TABLE "Contracts" DROP COLUMN "service_id",
ADD COLUMN     "status" TEXT NOT NULL,
ADD COLUMN     "value" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Departments" ADD COLUMN     "contracts_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Services" ADD COLUMN     "departments_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "DepartmentsServices";

-- AddForeignKey
ALTER TABLE "Departments" ADD CONSTRAINT "Departments_contracts_id_fkey" FOREIGN KEY ("contracts_id") REFERENCES "Contracts"("contract_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Services" ADD CONSTRAINT "Services_departments_id_fkey" FOREIGN KEY ("departments_id") REFERENCES "Departments"("department_id") ON DELETE RESTRICT ON UPDATE CASCADE;
