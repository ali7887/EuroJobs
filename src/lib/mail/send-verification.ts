// src/lib/mail/send-verification.ts

export async function sendVerificationEmail({
  to,
  token,
}: {
  to: string;
  token: string;
}) {
  const verifyLink = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${token}`;

  console.log("=== EMAIL VERIFICATION ===");
  console.log("To:", to);
  console.log("Link:", verifyLink);
  console.log("==========================");

  return { success: true };
}
