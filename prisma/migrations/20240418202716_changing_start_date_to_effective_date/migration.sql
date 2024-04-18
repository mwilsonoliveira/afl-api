/*
  Warnings:

  - You are about to drop the column `start_date` on the `Contract` table. All the data in the column will be lost.
  - Added the required column `effective_date` to the `Contract` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Contract" DROP COLUMN "start_date",
ADD COLUMN     "effective_date" TIMESTAMP(3) NOT NULL;
