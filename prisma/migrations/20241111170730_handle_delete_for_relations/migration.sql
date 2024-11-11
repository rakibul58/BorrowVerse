-- DropForeignKey
ALTER TABLE "borrow" DROP CONSTRAINT "borrow_bookId_fkey";

-- DropForeignKey
ALTER TABLE "borrow" DROP CONSTRAINT "borrow_memberId_fkey";

-- AddForeignKey
ALTER TABLE "borrow" ADD CONSTRAINT "borrow_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "books"("bookId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "borrow" ADD CONSTRAINT "borrow_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "members"("memberId") ON DELETE CASCADE ON UPDATE CASCADE;
