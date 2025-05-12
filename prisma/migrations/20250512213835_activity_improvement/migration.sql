/*
  Warnings:

  - You are about to drop the column `description` on the `Activity` table. All the data in the column will be lost.
  - Made the column `entityType` on table `Activity` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Activity" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" INTEGER,
    "details" TEXT,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER,
    CONSTRAINT "Activity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Activity" ("createdAt", "entityId", "entityType", "id", "type", "userId") SELECT "createdAt", "entityId", "entityType", "id", "type", "userId" FROM "Activity";
DROP TABLE "Activity";
ALTER TABLE "new_Activity" RENAME TO "Activity";
CREATE INDEX "Activity_userId_idx" ON "Activity"("userId");
CREATE INDEX "Activity_entityType_entityId_idx" ON "Activity"("entityType", "entityId");
CREATE INDEX "Activity_createdAt_idx" ON "Activity"("createdAt");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
