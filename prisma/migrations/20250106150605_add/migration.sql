-- CreateEnum
CREATE TYPE "TaskHours" AS ENUM ('MORNING', 'AFTERNOON', 'NIGHT');

-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('NOT_STARTED', 'IN_PROGRESS', 'DONE');

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "name" VARCHAR(25) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tasks" (
    "id" UUID NOT NULL,
    "name" VARCHAR(55) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "hour" "TaskHours" NOT NULL,
    "status" "TaskStatus" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" UUID NOT NULL,

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_name_key" ON "users"("name");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "tasks_name_key" ON "tasks"("name");

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
