"use client";

import { useState } from "react";
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import { login } from "@/app/actions";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form action={login} className="form auth-form">
      <label>
        E-mail
        <span className="auth-input-wrap">
          <Mail aria-hidden="true" />
          <input name="email" type="email" placeholder="voce@email.com" required autoComplete="email" />
        </span>
      </label>
      <label>
        Senha
        <span className="auth-input-wrap">
          <LockKeyhole aria-hidden="true" />
          <input name="password" type={showPassword ? "text" : "password"} placeholder="••••••••" required autoComplete="current-password" />
          <button type="button" className="password-toggle" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}>
            {showPassword ? <EyeOff /> : <Eye />}
          </button>
        </span>
      </label>
      <div className="auth-options">
        <label className="remember-option">
          <input name="remember" type="checkbox" defaultChecked />
          <span aria-hidden="true">✓</span>
          Lembrar de mim
        </label>
        <button type="button" className="forgot-password" onClick={() => window.alert("A recuperação de senha estará disponível em breve. Por enquanto, entre em contato com o suporte.")}>
          Esqueceu a senha?
        </button>
      </div>
      <button className="button full auth-submit">
        Entrar <ArrowRight />
      </button>
    </form>
  );
}
