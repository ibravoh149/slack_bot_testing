import { Document, Model, Types } from "mongoose";

export interface IBankAccount {
  bankName: string;
  accountNumber: string;
  isDeleted?: Boolean;
  deletedOn?: Date;
  isActive: boolean;
  sortCode: string;
  businessId: string;
  isDefault: boolean;
  accountName?:string | null
}

export interface IBankAccountDocument extends IBankAccount, Document {}

export interface IBankAccountModel extends Model<IBankAccountDocument> {}
