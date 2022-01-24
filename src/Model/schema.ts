import { Schema } from "mongoose";
import schemaOptions from "../schemOptions";

const BankAccountSchema = new Schema(
  {
    bankName: {
      type: String,
      required: true,
    },
    accountNumber: {
      type: String,
    },
    accountName: {
      type: String,
      default: null,
    },
    businessId: {
      required: true,
      type: Schema.Types.ObjectId,
      // ref: "businesses",
    },
    sortCode: {
      type: String,
      default: null,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedOn: {
      type: Date,
      default: null,
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  schemaOptions
);

export default BankAccountSchema;
