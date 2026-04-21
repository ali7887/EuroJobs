// src/lib/mail/send-password-reset.ts

// NOTE: In production connect to Resend / Nodemailer.
// For now we only fake-deliver emails (useful for dev).

export async function sendPasswordResetEmail({
  to,
  token,
}: {
  to: string;
  token: string;
}) {
  const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;

  console.log("=== PASSWORD RESET EMAIL ===");
  console.log("To:", to);
  console.log("Link:", resetLink);
  console.log("============================");

  return { success: true };
}
