import ResetPasswordPage from '@/module/auth/pages/ResetPasswordPage';

export default async function Page({ params }: { params: Promise<{ token: string }> }) {
  const resolvedParams = await params;
  const token = resolvedParams.token;
  console.log(token);

  return (
    <>
      <ResetPasswordPage token={token} />
    </>
  );
}
