import Link from "next/link";
import { login } from "@/app/actions";
import { Flash } from "@/components/flash";
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
      <form action={login} className="form">
        <label>
          E-mail
          <input
            name="email"
            type="email"
            placeholder="voce@email.com"
            required
            autoComplete="email"
          />
        </label>
        <label>
          Senha
          <input
            name="password"
            type="password"
            placeholder="••••••••"
            required
            autoComplete="current-password"
          />
        </label>
        <button className="button full">Entrar</button>
      </form>
      <p className="auth-link">
        Ainda não tem conta? <Link href="/register">Criar gratuitamente</Link>
      </p>
    </div>
  );
}
