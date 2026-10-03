import Link from "next/link";
import { createGoal } from "@/app/actions";
import { Flash } from "@/components/flash";
import { Shell } from "@/components/shell";
import { requireUser } from "@/lib/auth";

export default async function NewGoal({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  await requireUser();
  const { error } = await searchParams;
  return (
    <Shell
      title="Nova meta"
      description="Defina o objetivo e acompanhe cada passo até conquistá-lo."
    >
      <div className="form-card">
        <Flash error={error} />
        <form action={createGoal} className="form">
          <label>
            Nome da meta
            <input
              name="name"
              placeholder="Ex.: Viagem, carro, casa própria"
              required
            />
          </label>
          <div className="form-grid">
            <label>
              Valor do objetivo
              <input
                name="targetAmount"
                inputMode="decimal"
                placeholder="0,00"
                required
              />
            </label>
            <label>
              Valor já guardado
              <input
                name="currentAmount"
                inputMode="decimal"
                defaultValue="0,00"
                required
              />
            </label>
            <label>
              Prazo <span>Opcional</span>
              <input name="deadline" type="date" />
            </label>
            <label>
              Cor da meta
              <input name="color" type="color" defaultValue="#b8ff45" />
            </label>
          </div>
          <div className="form-actions">
            <Link href="/goals" className="secondary-button">
              Cancelar
            </Link>
            <button className="button">Criar meta</button>
          </div>
        </form>
      </div>
    </Shell>
  );
}
