"use client";

import { Trash2 } from "lucide-react";

export function ConfirmButton({
  message,
  label = "Excluir",
}: {
  message: string;
  label?: string;
}) {
  return (
    <button
      type="submit"
      onClick={(event) => {
        if (!window.confirm(message)) event.preventDefault();
      }}
    >
      <Trash2 /> {label}
    </button>
  );
}
