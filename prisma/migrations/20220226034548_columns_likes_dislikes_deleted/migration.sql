/*
  Warnings:

  - You are about to drop the column `dislikes` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `likes` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `dislikes` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `likes` on the `posts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "comments" DROP COLUMN "dislikes",
DROP COLUMN "likes";

-- AlterTable
ALTER TABLE "posts" DROP COLUMN "dislikes",
DROP COLUMN "likes";
