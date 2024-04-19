-- DropForeignKey
ALTER TABLE "Service" DROP CONSTRAINT "Service_department_id_fkey";

-- AlterTable
ALTER TABLE "Service" ALTER COLUMN "department_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "Department"("department_id") ON DELETE SET NULL ON UPDATE CASCADE;
