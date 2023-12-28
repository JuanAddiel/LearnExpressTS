-- CreateTable
CREATE TABLE "todos" (
    "id" SERIAL NOT NULL,
    "test" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "todos_pkey" PRIMARY KEY ("id")
);
