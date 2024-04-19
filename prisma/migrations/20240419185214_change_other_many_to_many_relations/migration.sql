/*
  Warnings:

  - You are about to drop the column `contract_id` on the `Department` table. All the data in the column will be lost.
  - You are about to drop the column `service_id` on the `Department` table. All the data in the column will be lost.
  - You are about to drop the column `department_id` on the `Service` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Department" DROP CONSTRAINT "Department_contract_id_fkey";

-- AlterTable
ALTER TABLE "Department" DROP COLUMN "contract_id",
DROP COLUMN "service_id";

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "department_id";

-- CreateTable
CREATE TABLE "_ContractToDepartment" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ContractToDepartment_AB_unique" ON "_ContractToDepartment"("A", "B");

-- CreateIndex
CREATE INDEX "_ContractToDepartment_B_index" ON "_ContractToDepartment"("B");

-- AddForeignKey
ALTER TABLE "_ContractToDepartment" ADD CONSTRAINT "_ContractToDepartment_A_fkey" FOREIGN KEY ("A") REFERENCES "Contract"("contract_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContractToDepartment" ADD CONSTRAINT "_ContractToDepartment_B_fkey" FOREIGN KEY ("B") REFERENCES "Department"("department_id") ON DELETE CASCADE ON UPDATE CASCADE;
