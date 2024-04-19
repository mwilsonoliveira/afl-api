-- DropForeignKey
ALTER TABLE "Service" DROP CONSTRAINT "Service_department_id_fkey";

-- CreateTable
CREATE TABLE "_DepartmentToService" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_DepartmentToService_AB_unique" ON "_DepartmentToService"("A", "B");

-- CreateIndex
CREATE INDEX "_DepartmentToService_B_index" ON "_DepartmentToService"("B");

-- AddForeignKey
ALTER TABLE "_DepartmentToService" ADD CONSTRAINT "_DepartmentToService_A_fkey" FOREIGN KEY ("A") REFERENCES "Department"("department_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DepartmentToService" ADD CONSTRAINT "_DepartmentToService_B_fkey" FOREIGN KEY ("B") REFERENCES "Service"("service_id") ON DELETE CASCADE ON UPDATE CASCADE;
