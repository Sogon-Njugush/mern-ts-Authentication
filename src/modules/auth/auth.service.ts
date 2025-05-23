import jwt from "jsonwebtoken";
import { ErrorCode } from "../../common/enums/error-code.enum";
import { VerificationEnum } from "../../common/enums/verification-code.enum";
import { LoginDto, RegisterDto } from "../../common/interface/auth.interface";
import {
  BadRequestException,
  UnauthorizedException,
} from "../../common/utils/catch-errors";
import {
  calculateExpirationDate,
  fortyFiveMinutesFromNow,
  ONE_DAY_IN_MS,
} from "../../common/utils/date-time";
import SessionModel from "../../database/models/session.model";
import UserModel from "../../database/models/user.model";
import VerificationCodeModel from "../../database/models/verification.model";
import { config } from "../../config/app.config";
import {
  refreshTokenSignOptions,
  RefreshTPayload,
  signJwtToken,
  verifyJwtToken,
} from "../../common/utils/jwt";

export class AuthService {
  public async register(registerData: RegisterDto) {
    const { name, email, password } = registerData;

    const existingUser = await UserModel.exists({ email });

    if (existingUser) {
      throw new BadRequestException(
        "User already exists",
        ErrorCode.AUTH_EMAIL_ALREADY_EXISTS
      );
    }

    const newUser = await UserModel.create({
      name,
      email,
      password,
    });

    const userId = newUser._id;
    // create a verification code for the user
    const verification = await VerificationCodeModel.create({
      userId,
      type: VerificationEnum.EMAIL_VERIFICATION,
      expiresAt: fortyFiveMinutesFromNow(),
    });
    //send verification email link
    return { user: newUser };
  }

  public async login(loginData: LoginDto) {
    const { email, password, userAgent } = loginData;

    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new BadRequestException(
        "Invalid credentials",
        ErrorCode.AUTH_USER_NOT_FOUND
      );
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new BadRequestException(
        "Invalid password",
        ErrorCode.AUTH_USER_NOT_FOUND
      );
    }

    //check if  the user enable 2fa retutn user= null
    const session = await SessionModel.create({
      userId: user._id,
      userAgent,
    });

    const accessToken = signJwtToken({
      userId: user._id,
      sessionId: session._id,
    });

    const refreshToken = signJwtToken(
      {
        sessionId: session._id,
      },
      refreshTokenSignOptions
    );

    return {
      accessToken,
      refreshToken,
      user,
      mfaRequired: false,
    };
  }

  public async refreshToken(refreshToken: string) {
    const { payload } = verifyJwtToken<RefreshTPayload>(refreshToken, {
      secret: refreshTokenSignOptions.secret,
    });
    if (!payload) {
      throw new UnauthorizedException("Invalid refresh token");
    }

    const session = await SessionModel.findById(payload.sessionId);
    const now = Date.now();
    if (!session) {
      throw new UnauthorizedException("Session not found");
    }

    if (session.expiredAt.getTime() <= now) {
      throw new UnauthorizedException("Session expired");
    }

    const sessionRequireRefresh =
      session.expiredAt.getTime() - now <= ONE_DAY_IN_MS;
    if (sessionRequireRefresh) {
      session.expiredAt = calculateExpirationDate(config.JWT.EXPIRES_IN);
      await session.save();
    }

    const newRefreshToken = sessionRequireRefresh
      ? signJwtToken(
          {
            sessionId: session._id,
          },
          refreshTokenSignOptions
        )
      : undefined;

    const accessToken = signJwtToken({
      sessionId: session._id,
      userId: session.userId,
    });

    return {
      accessToken,
      newRefreshToken,
    };
  }
}
