"use client";

import { useState } from "react";

function formatTypedMoney(value: string) {
  const clean = value.replace(/[^\d,]/g, "");
  const [integerRaw = "", ...decimalParts] = clean.split(",");
  const integer = integerRaw.replace(/^0+(?=\d)/, "") || "0";
  const grouped = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  if (!decimalParts.length) return grouped;
  return `${grouped},${decimalParts.join("").slice(0, 2)}`;
}

function normalizeDefault(value?: number | string) {
  if (value === undefined || value === "") return "";
  const number = Number(value);
  if (!Number.isFinite(number)) return String(value);
  return number.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function MoneyInput({
  name,
  defaultValue,
  placeholder = "0,00",
  required = false,
}: {
  name: string;
  defaultValue?: number | string;
  placeholder?: string;
  required?: boolean;
}) {
  const [value, setValue] = useState(() => normalizeDefault(defaultValue));
  function finishFormatting() {
    if (!value) return;
    const [integer, decimal = ""] = value.split(",");
    setValue(`${integer},${decimal.padEnd(2, "0")}`);
  }
  return (
    <input
      name={name}
      value={value}
      inputMode="decimal"
      placeholder={placeholder}
      required={required}
      onChange={(event) => setValue(formatTypedMoney(event.target.value))}
      onBlur={finishFormatting}
    />
  );
}
