import {
  BarChart3,
  ChartNoAxesCombined,
  PiggyBank,
  ShieldCheck,
} from "lucide-react";
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="auth-shell">
      <section className="auth-aside">
        <div className="brand">
          <span className="brand-mark">
            <BarChart3 />
          </span>
          <span>
            Binhotti <b>Flow</b>
          </span>
        </div>
        <div className="auth-presentation">
          <p className="eyebrow">FINANÇAS MAIS LEVES</p>
          <h1>
            Clareza para cuidar do que <em>importa.</em>
          </h1>
          <p>
            Contas, investimentos e metas organizados em uma experiência simples
            e segura.
          </p>
          <div className="auth-features">
            <div>
              <ChartNoAxesCombined />
              <span>
                <strong>Visão completa</strong>
                <small>Acompanhe seu dinheiro em tempo real</small>
              </span>
            </div>
            <div>
              <PiggyBank />
              <span>
                <strong>Planeje o futuro</strong>
                <small>Caixinhas e metas no mesmo lugar</small>
              </span>
            </div>
            <div>
              <ShieldCheck />
              <span>
                <strong>Seus dados protegidos</strong>
                <small>Acesso pessoal e seguro</small>
              </span>
            </div>
          </div>
        </div>
        <small>Organize hoje. Conquiste amanhã.</small>
      </section>
      <section className="auth-panel">
        <div className="auth-mobile-brand">
          <span className="brand-mark">
            <BarChart3 />
          </span>
          <span>
            Binhotti <b>Flow</b>
          </span>
        </div>
        {children}
        <p className="auth-security">
          <ShieldCheck /> Ambiente protegido
        </p>
      </section>
    </main>
  );
}
