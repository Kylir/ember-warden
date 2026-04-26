-- CreateTable
CREATE TABLE "RouteRate" (
    "id" SERIAL NOT NULL,
    "departureCode" TEXT,
    "arrivalCode" TEXT,
    "valuePerAvios" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "RouteRate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RouteRate_departureCode_arrivalCode_key" ON "RouteRate"("departureCode", "arrivalCode");
