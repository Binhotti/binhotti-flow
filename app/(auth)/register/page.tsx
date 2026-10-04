import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { register } from "@/app/actions";
import { Flash } from "@/components/flash";
export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  return (
    <div className="auth-card">
      <p className="eyebrow">COMECE AGORA</p>
      <h2>Crie sua conta</h2>
      <p>Leva menos de um minuto.</p>
      <Flash error={error} />
      <form action={register} className="form">
        <label>
          Nome
          <input name="name" placeholder="Como podemos chamar você?" required />
        </label>
        <label>
          E-mail
          <input
            name="email"
            type="email"
            placeholder="voce@email.com"
            required
          />
        </label>
        <label>
          Senha
          <input
            name="password"
            type="password"
            minLength={8}
            placeholder="Mínimo de 8 caracteres"
            required
          />
        </label>
        <button className="button full auth-submit">
          Criar minha conta <ArrowRight />
        </button>
      </form>
      <p className="auth-link">
        Já tem conta? <Link href="/login">Entrar</Link>
      </p>
    </div>
  );
}
