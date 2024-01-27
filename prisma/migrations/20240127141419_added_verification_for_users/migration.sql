-- AlterTable
ALTER TABLE "Reply" ALTER COLUMN "reply_id" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "is_verified" BOOLEAN NOT NULL DEFAULT false;
