import Image from "next/image";
import { BarChart3, ChartPie, LockKeyhole, ShieldCheck, TrendingUp } from "lucide-react";
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="auth-shell auth-reference">
      <section className="auth-aside">
        <div className="brand auth-brand">
          <span className="brand-mark">
            <BarChart3 />
          </span>
          <span>
            Nexo <b>Finance</b>
          </span>
        </div>
        <Image className="auth-phone-art" src="/images/finance-phone-hero.png" alt="Aplicativo Nexo Finance mostrando um panorama financeiro" width={760} height={900} priority />
        <div className="auth-presentation">
          <p className="eyebrow">CONTROLE SEM COMPLICAÇÃO</p>
          <h1>
            Seu dinheiro.<em>Sob controle.</em>
          </h1>
          <p>
            Organize contas, acompanhe movimentações e enxergue com clareza para onde seu dinheiro está indo.
          </p>
          <div className="auth-features">
            <div>
              <TrendingUp />
              <span>
                <strong>Acompanhe seus gastos</strong>
                <small>Veja tudo em tempo real</small>
              </span>
            </div>
            <div>
              <ChartPie />
              <span>
                <strong>Organize suas contas</strong>
                <small>Tudo no mesmo lugar</small>
              </span>
            </div>
            <div>
              <LockKeyhole />
              <span>
                <strong>Planeje seu futuro</strong>
                <small>Mais controle, menos preocupação</small>
              </span>
            </div>
          </div>
        </div>
        <small className="auth-footer-copy">Planeje hoje. Respire amanhã.</small>
      </section>
      <section className="auth-panel">
        <div className="auth-mobile-brand">
          <span className="brand-mark">
            <BarChart3 />
          </span>
          <span>
            Nexo <b>Finance</b>
          </span>
        </div>
        <p className="auth-security">
          <ShieldCheck /> Seus dados estão seguros
        </p>
        {children}
      </section>
    </main>
  );
}
