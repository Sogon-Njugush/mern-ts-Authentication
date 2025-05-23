import mongoose, { Schema } from "mongoose";
import { VerificationEnum } from "../../common/enums/verification-code.enum";
import { generateUniqueCode } from "../../common/utils/uuid";

export interface VerificationCodeDocument extends Document {
  userId: mongoose.Types.ObjectId;
  type: VerificationEnum;
  code: string;
  createdAt: Date;
  expiresAt: Date;
}

const verificationCodeSchema = new Schema<VerificationCodeDocument>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    index: true,
    required: true,
  },
  code: {
    type: String,
    unique: true,
    required: true,
    default: generateUniqueCode,
  },
  type: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
});

const VerificationCodeModel = mongoose.model<VerificationCodeDocument>(
  "VerificationCode",
  verificationCodeSchema,
  "verification_codes"
);
export default VerificationCodeModel;
