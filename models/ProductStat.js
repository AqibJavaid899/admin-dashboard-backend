import mongoose from "mongoose";

const ProductStatSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: true,
    },
    yearlySalesTotal: {
      type: Number,
      required: true,
    },
    yearlyTotalSoldUnits: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
    },
    monthlyData: {
      type: Array({
        month: String,
        totalSales: Number,
        totalUnits: Number,
      }),
      required: true,
    },
    dailyData: {
      type: Array({
        date: String,
        totalSales: Number,
        totalUnits: Number,
      }),
    },
  },
  { timestamps: true }
);

const ProductStat = mongoose.model("ProductStat", ProductStatSchema);
export default ProductStat;
