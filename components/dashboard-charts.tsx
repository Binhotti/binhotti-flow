"use client";

import { useId } from "react";
import { formatMoney } from "@/lib/money";

type MonthPoint = { label: string; income: number; expenses: number };
type CategoryPoint = { label: string; value: number; color: string };

export function CashFlowChart({ data }: { data: MonthPoint[] }) {
  const gradientId = useId();
  const width = 720,
    height = 220,
    padding = 18;
  const max = Math.max(
    ...data.flatMap((item) => [item.income, item.expenses]),
    1,
  );
  const x = (index: number) =>
    padding + index * ((width - padding * 2) / Math.max(data.length - 1, 1));
  const y = (value: number) =>
    height - padding - (value / max) * (height - padding * 2);
  const line = (key: "income" | "expenses") =>
    data
      .map((item, index) => `${index ? "L" : "M"} ${x(index)} ${y(item[key])}`)
      .join(" ");
  return (
    <div className="chart-wrap">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label="Receitas e despesas dos últimos seis meses"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#b8ff45" stopOpacity=".26" />
            <stop offset="1" stopColor="#b8ff45" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75, 1].map((level) => (
          <line
            key={level}
            x1="0"
            x2={width}
            y1={height * level}
            y2={height * level}
            className="chart-grid-line"
          />
        ))}
        <path
          d={`${line("income")} L ${x(data.length - 1)} ${height - padding} L ${padding} ${height - padding} Z`}
          fill={`url(#${gradientId})`}
        />
        <path d={line("income")} className="chart-line chart-income" />
        <path d={line("expenses")} className="chart-line chart-expense" />
        {data.map((item, index) => (
          <g key={item.label}>
            <circle
              cx={x(index)}
              cy={y(item.income)}
              r="4"
              className="chart-point"
            >
              <title>{`${item.label}: ${formatMoney(item.income)}`}</title>
            </circle>
            <text x={x(index)} y={height} textAnchor="middle">
              {item.label}
            </text>
          </g>
        ))}
      </svg>
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
  let offset = 0;
  const slices = data.map((item) => {
    const start = offset;
    const share = total ? (item.value / total) * 100 : 0;
    offset += share;
    return `${item.color} ${start}% ${offset}%`;
  });
  return (
    <div className="donut-layout">
      <div
        className="donut"
        style={{
          background: data.length
            ? `conic-gradient(${slices.join(",")})`
            : "#252b2f",
        }}
      >
        <div>
          <strong>{formatMoney(total)}</strong>
          <span>em despesas</span>
        </div>
      </div>
      <div className="donut-legend">
        {data.length ? (
          data.map((item) => (
            <div key={item.label}>
              <i style={{ background: item.color }} />
              <span>{item.label}</span>
              <b>{total ? Math.round((item.value / total) * 100) : 0}%</b>
            </div>
          ))
        ) : (
          <p>Adicione despesas para visualizar.</p>
        )}
      </div>
    </div>
  );
}
