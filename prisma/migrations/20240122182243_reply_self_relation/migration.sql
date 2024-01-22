-- AlterTable
ALTER TABLE "Reply" ADD COLUMN     "reply_id" INTEGER;

-- AddForeignKey
ALTER TABLE "Reply" ADD CONSTRAINT "Reply_reply_id_fkey" FOREIGN KEY ("reply_id") REFERENCES "Reply"("id") ON DELETE SET NULL ON UPDATE CASCADE;
