/*
  Warnings:

  - Added the required column `service_id` to the `Departments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Departments" ADD COLUMN     "service_id" TEXT NOT NULL;
