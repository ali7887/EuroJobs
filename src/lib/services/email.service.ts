export const emailService = {
  async sendPasswordResetEmail(email: string, token: string) {
    // در نسخه مینیمال، توکن را در console چاپ می‌کنیم
    console.log("RESET PASSWORD LINK:");
    console.log(`http://localhost:3000/reset-password?token=${token}`);

    return true;
  }
};
