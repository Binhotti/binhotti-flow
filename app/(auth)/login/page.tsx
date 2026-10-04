import Link from "next/link";
import { Flash } from "@/components/flash";
import { LoginForm } from "@/components/login-form";
export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  return (
    <div className="auth-card">
      <p className="eyebrow">BEM-VINDO DE VOLTA</p>
      <h2>Entre na sua conta</h2>
      <p>Acesse sua visão financeira completa.</p>
      <Flash error={error} />
      <LoginForm />
      <p className="auth-link">
        Ainda não tem conta? <Link href="/register">Criar gratuitamente</Link>
      </p>
    </div>
  );
}
