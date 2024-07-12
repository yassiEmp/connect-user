/*
  Warnings:

  - Made the column `dateDeconnexion` on table `User` required. This step will fail if there are existing NULL values in that column.

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
    "heureConnection" TEXT NOT NULL,
    "dateDeconnexion" DATETIME NOT NULL
);
INSERT INTO "new_User" ("dateConnection", "dateDeconnexion", "dureeDeConnexion", "heureConnection", "id", "mac", "noms", "numero") SELECT "dateConnection", "dateDeconnexion", "dureeDeConnexion", "heureConnection", "id", "mac", "noms", "numero" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
