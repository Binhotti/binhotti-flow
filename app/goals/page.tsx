import Link from "next/link";
import { CalendarDays, Pencil, PiggyBank, Plus, Target } from "lucide-react";
import { addGoalAmount, deleteGoal } from "@/app/actions";
import { Flash } from "@/components/flash";
import { ConfirmButton } from "@/components/confirm-button";
import { MoneyInput } from "@/components/money-input";
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
    include: { investment: true },
    orderBy: { createdAt: "desc" },
  });
  const allInvestments = await prisma.investment.aggregate({
    where: { userId: user.id },
    _sum: { amount: true },
  });
  const allInvestmentsAmount = Number(allInvestments._sum.amount ?? 0);
  return (
    <Shell
      title="Metas"
      description="Transforme seus planos em objetivos financeiros possíveis."
      action={{ href: "/goals/new", label: "Nova meta" }}
    >
      <Flash {...params} />
      <div className="goals-grid">
        {goals.map((goal) => {
          const current = goal.allInvestments
              ? allInvestmentsAmount
              : goal.investment
              ? Number(goal.investment.amount)
              : Number(goal.currentAmount),
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
              {goal.investment && (
                <p className="goal-linked">
                  <PiggyBank /> Vinculada a {goal.investment.name}
                </p>
              )}
              {goal.allInvestments && (
                <p className="goal-linked">
                  <PiggyBank /> Vinculada a todas as caixinhas
                </p>
              )}
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
              {goal.allInvestments ? (
                <p className="goal-all-hint">
                  O progresso é atualizado pelas suas caixinhas.
                </p>
              ) : (
                <form action={addGoalAmount} className="goal-add">
                  <input type="hidden" name="id" value={goal.id} />
                  <MoneyInput
                    name="amount"
                    placeholder="Adicionar valor"
                    required
                  />
                  <button type="submit" aria-label="Adicionar valor">
                    <Plus />
                  </button>
                </form>
              )}
              <div className="investment-actions">
                <Link href={`/goals/${goal.id}/edit`}>
                  <Pencil /> Editar
                </Link>
                <form action={deleteGoal} className="card-delete">
                  <input type="hidden" name="id" value={goal.id} />
                  <ConfirmButton
                    message={`Excluir a meta “${goal.name}”? A caixinha vinculada não será apagada.`}
                  />
                </form>
              </div>
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
