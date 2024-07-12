/*
  Warnings:

  - You are about to alter the column `heureDeconnection` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Int` to `BigInt`.

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
    "heureDeconnection" BIGINT NOT NULL,
    "dateDeconnexion" DATETIME NOT NULL
);
INSERT INTO "new_User" ("dateConnection", "dateDeconnexion", "dureeDeConnexion", "heureDeconnection", "id", "mac", "noms", "numero") SELECT "dateConnection", "dateDeconnexion", "dureeDeConnexion", "heureDeconnection", "id", "mac", "noms", "numero" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
