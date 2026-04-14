import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

export default function ResetPasswordPage({
  searchParams,
}: {
  searchParams: { token?: string };
}) {
  const token = searchParams.token || "";
  return <ResetPasswordForm token={token} />;
}
