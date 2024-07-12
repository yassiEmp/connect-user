/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - Added the required column `dateDeconnexion` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mac` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `noms` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numero` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "noms" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "mac" TEXT NOT NULL,
    "dureeDeConnexion" INTEGER NOT NULL DEFAULT 1,
    "dateConnection" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "heureConnection" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateDeconnexion" DATETIME NOT NULL
);
INSERT INTO "new_User" ("id") SELECT "id" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
