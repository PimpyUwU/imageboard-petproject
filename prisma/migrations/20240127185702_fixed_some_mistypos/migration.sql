/*
  Warnings:

  - You are about to drop the `Deleted_replyes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Deleted_replyes" DROP CONSTRAINT "Deleted_replyes_admin_id_fkey";

-- DropForeignKey
ALTER TABLE "Deleted_replyes" DROP CONSTRAINT "Deleted_replyes_reply_id_fkey";

-- DropTable
DROP TABLE "Deleted_replyes";

-- CreateTable
CREATE TABLE "Deleted_replies" (
    "reply_id" INTEGER NOT NULL,
    "admin_id" INTEGER NOT NULL,

    CONSTRAINT "Deleted_replies_pkey" PRIMARY KEY ("reply_id")
);

-- AddForeignKey
ALTER TABLE "Deleted_replies" ADD CONSTRAINT "Deleted_replies_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Deleted_replies" ADD CONSTRAINT "Deleted_replies_reply_id_fkey" FOREIGN KEY ("reply_id") REFERENCES "Reply"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
