import mongoose, { Document, mongo, Schema } from "mongoose";
import { compareValue, hashValue } from "../../common/utils/hash";

interface UserPreferences {
  enable2FA: boolean;
  emailNotifications: boolean;
  twoFactorSecret?: string;
}

export interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  isEmailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  userPreferences: UserPreferences;
  comparePassword(value: string): Promise<boolean>;
}

const userPreferencesSchema = new Schema({
  enable2FA: { type: Boolean, default: false },
  emailNotifications: { type: Boolean, default: true },
  twoFactorSecret: { type: String, required: false },
});

const userSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isEmailVerified: { type: Boolean, default: false },
    userPreferences: {
      type: userPreferencesSchema,
      default: {},
    },
  },
  { timestamps: true, toJSON: {} }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await hashValue(this.password, 10);
  }
  next();
});

userSchema.methods.comparePassword = async function (value: string) {
  return await compareValue(value, this.password);
};

userSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.password;
    delete ret.userPreferences.twoFactorSecret;
    return ret;
  },
});

const UserModel = mongoose.model<UserDocument>("User", userSchema);
export default UserModel;
