"use client";

import { formatMoney } from "@/lib/money";

type MonthPoint = { label: string; income: number; expenses: number };
type CategoryPoint = { label: string; value: number; color: string };

export function CashFlowChart({ data }: { data: MonthPoint[] }) {
  const max = Math.max(
    ...data.flatMap((item) => [item.income, item.expenses]),
    1,
  );
  const ceiling = Math.ceil(max / 2000) * 2000 || 2000;
  const levels = [ceiling, ceiling * 0.75, ceiling * 0.5, ceiling * 0.25, 0];
  return (
    <div className="cash-bars" role="img" aria-label="Receitas e despesas dos últimos seis meses">
      <div className="bar-scale">
        {levels.map((level) => (
          <span key={level}>{formatMoney(level).replace(",00", "")}</span>
        ))}
      </div>
      <div className="bar-plot">
        <div className="bar-grid" aria-hidden="true">
          {levels.map((level) => <i key={level} />)}
        </div>
        <div className="bar-groups">
          {data.map((item) => (
            <div className="bar-month" key={item.label}>
              <div className="bar-pair">
                <i className="income-bar" style={{ height: `${(item.income / ceiling) * 100}%` }} title={`Receitas: ${formatMoney(item.income)}`} />
                <i className="expense-bar" style={{ height: `${(item.expenses / ceiling) * 100}%` }} title={`Despesas: ${formatMoney(item.expenses)}`} />
              </div>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="chart-legend">
        <span>
          <i className="income-dot" />
          Receitas
        </span>
        <span>
          <i className="expense-dot" />
          Despesas
        </span>
      </div>
    </div>
  );
}

export function CategoryChart({
  data,
  total,
}: {
  data: CategoryPoint[];
  total: number;
}) {
  return (
    <div className="expense-ranking">
        {data.length ? (
          data.map((item) => (
            <div className="expense-rank" key={item.label}>
              <div><strong>{item.label}</strong><span>{total ? Math.round((item.value / total) * 100) : 0}%</span><b>{formatMoney(item.value)}</b></div>
              <i><span style={{ width: `${total ? (item.value / total) * 100 : 0}%`, background: item.color }} /></i>
            </div>
          ))
        ) : (
          <p>Adicione despesas para visualizar.</p>
        )}
    </div>
  );
}
