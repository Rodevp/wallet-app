-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(254) NOT NULL,
    "status" VARCHAR(10) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Wallets" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "address" VARCHAR(254) NOT NULL,
    "encrypted_private_key" VARCHAR(254) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Wallets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transactions" (
    "id" SERIAL NOT NULL,
    "type" VARCHAR(10) NOT NULL,
    "status" VARCHAR(10) NOT NULL,
    "from_wallet_id" VARCHAR(254) NOT NULL,
    "to_wallet_id" VARCHAR(254) NOT NULL,
    "amount" DECIMAL(18,8) NOT NULL,
    "asset" VARCHAR(10) NOT NULL,
    "tx_hash" VARCHAR(68) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LedgerEntries" (
    "id" SERIAL NOT NULL,
    "wallet_id" INTEGER NOT NULL,
    "amount" DECIMAL(18,8) NOT NULL,
    "type" VARCHAR(10) NOT NULL,
    "asset" VARCHAR(10) NOT NULL,
    "reference_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LedgerEntries_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");
