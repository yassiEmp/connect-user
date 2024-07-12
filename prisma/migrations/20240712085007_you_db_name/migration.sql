/*
  Warnings:

  - You are about to drop the column `heureConnection` on the `User` table. All the data in the column will be lost.
  - Added the required column `heureDeconnection` to the `User` table without a default value. This is not possible if the table is not empty.

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
    "dateConnection" TEXT NOT NULL,
    "heureDeconnection" TEXT NOT NULL,
    "dateDeconnexion" DATETIME NOT NULL
);
INSERT INTO "new_User" ("dateConnection", "dateDeconnexion", "dureeDeConnexion", "id", "mac", "noms", "numero") SELECT "dateConnection", "dateDeconnexion", "dureeDeConnexion", "id", "mac", "noms", "numero" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
