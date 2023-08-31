-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "flow_options" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "flow_duration" INTEGER NOT NULL,
    "break_duration" INTEGER NOT NULL,
    "session_count" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "flow_options_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "log_active_day" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "session_count" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "log_active_day_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_password_key" ON "User"("password");

-- CreateIndex
CREATE UNIQUE INDEX "flow_options_user_id_key" ON "flow_options"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "log_active_day_user_id_key" ON "log_active_day"("user_id");

-- AddForeignKey
ALTER TABLE "flow_options" ADD CONSTRAINT "flow_options_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "log_active_day" ADD CONSTRAINT "log_active_day_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
