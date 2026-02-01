-- CreateTable
CREATE TABLE "User" (
    "ID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "role" TEXT NOT NULL DEFAULT 'STUDENT',
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "cursosVisitados" TEXT DEFAULT '{}'
);
