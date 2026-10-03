import Link from "next/link";
import { CalendarDays, Plus, Target, Trash2 } from "lucide-react";
import { addGoalAmount, deleteGoal } from "@/app/actions";
import { Flash } from "@/components/flash";
import { Shell } from "@/components/shell";
import { requireUser } from "@/lib/auth";
import { formatDate, formatMoney } from "@/lib/money";
import { prisma } from "@/lib/prisma";

export default async function GoalsPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; error?: string }>;
}) {
  const user = await requireUser();
  const params = await searchParams;
  const goals = await prisma.goal.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });
  return (
    <Shell
      title="Metas"
      description="Transforme seus planos em objetivos financeiros possíveis."
      action={{ href: "/goals/new", label: "Nova meta" }}
    >
      <Flash {...params} />
      <div className="goals-grid">
        {goals.map((goal) => {
          const current = Number(goal.currentAmount),
            target = Number(goal.targetAmount),
            progress = Math.min(100, Math.round((current / target) * 100));
          return (
            <article className="goal-card" key={goal.id}>
              <div className="goal-top">
                <span
                  className="goal-icon"
                  style={{ color: goal.color, background: `${goal.color}18` }}
                >
                  <Target />
                </span>
                <span className="goal-percent">{progress}%</span>
              </div>
              <h2>{goal.name}</h2>
              {goal.deadline && (
                <p>
                  <CalendarDays /> Até {formatDate(goal.deadline)}
                </p>
              )}
              <div className="goal-values">
                <strong>{formatMoney(current)}</strong>
                <span>de {formatMoney(target)}</span>
              </div>
              <div className="goal-progress">
                <i style={{ width: `${progress}%`, background: goal.color }} />
              </div>
              <form action={addGoalAmount} className="goal-add">
                <input type="hidden" name="id" value={goal.id} />
                <input
                  name="amount"
                  inputMode="decimal"
                  placeholder="Adicionar valor"
                  required
                />
                <button type="submit" aria-label="Adicionar valor">
                  <Plus />
                </button>
              </form>
              <form action={deleteGoal} className="card-delete">
                <input type="hidden" name="id" value={goal.id} />
                <button type="submit">
                  <Trash2 /> Excluir
                </button>
              </form>
            </article>
          );
        })}
        {!goals.length && (
          <div className="card empty wide">
            <Target />
            <p>Você ainda não criou nenhuma meta.</p>
            <Link className="button" href="/goals/new">
              Criar primeira meta
            </Link>
          </div>
        )}
      </div>
    </Shell>
  );
}
