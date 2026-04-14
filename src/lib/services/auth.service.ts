import { signResetToken, verifyResetToken } from "../jwt/jwt.utils";
import { emailService } from "./email.service";
import { userService } from "./user.service";

export const authService = {
  async sendResetPasswordEmail(email: string) {
    const user = await userService.findByEmail(email);
    if (!user) throw new Error("User not found");

    const token = await signResetToken({ userId: String(user.id) });

    await emailService.sendPasswordResetEmail(email, token);

    return { message: "Password reset link sent" };
  },

  async resetPassword(token: string, newPassword: string) {
    const payload = await verifyResetToken(token);

    await userService.updatePassword(Number(payload.userId), newPassword);

    return { message: "Password updated successfully" };
  },
};
