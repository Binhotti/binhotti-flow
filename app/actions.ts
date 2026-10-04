"use server";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createSession, clearSession, requireUser } from "@/lib/auth";
import { parseMoney } from "@/lib/money";
import { prisma } from "@/lib/prisma";
function fail(path: string, message: string): never {
  redirect(`${path}?error=${encodeURIComponent(message)}`);
}
export async function register(fd: FormData) {
  const p = z
    .object({
      name: z.string().trim().min(2),
      email: z.string().trim().toLowerCase().email(),
      password: z.string().min(8),
    })
    .safeParse(Object.fromEntries(fd));
  if (!p.success)
    fail(
      "/register",
      "Preencha os campos corretamente. A senha deve ter 8 caracteres.",
    );
  if (await prisma.user.findUnique({ where: { email: p.data.email } }))
    fail("/register", "Este e-mail já está cadastrado.");
  const { password, ...data } = p.data;
  const user = await prisma.user.create({
    data: { ...data, passwordHash: await bcrypt.hash(password, 12) },
  });
  await createSession(user.id);
  redirect("/");
}
export async function login(fd: FormData) {
  const email = String(fd.get("email") ?? "")
      .trim()
      .toLowerCase(),
    password = String(fd.get("password") ?? "");
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.passwordHash)))
    fail("/login", "E-mail ou senha inválidos.");
  await createSession(user.id);
  redirect("/");
}
export async function logout() {
  await clearSession();
  redirect("/login");
}
export async function createAccount(fd: FormData) {
  const user = await requireUser(),
    name = String(fd.get("name") ?? "").trim(),
    institution = String(fd.get("institution") ?? "").trim() || null,
    type = String(fd.get("type") ?? ""),
    initialBalance = parseMoney(fd.get("initialBalance"));
  if (
    !name ||
    !["checking", "savings", "cash", "investment", "other"].includes(type) ||
    !Number.isFinite(initialBalance)
  )
    fail("/accounts/new", "Preencha os dados da conta corretamente.");
  await prisma.account.create({
    data: {
      userId: user.id,
      name,
      institution,
      type: type as never,
      initialBalance,
    },
  });
  revalidatePath("/");
  revalidatePath("/accounts");
  redirect("/accounts?success=Conta adicionada com sucesso.");
}
export async function updateAccount(fd: FormData) {
  const user = await requireUser(),
    id = String(fd.get("id") ?? ""),
    name = String(fd.get("name") ?? "").trim(),
    institution = String(fd.get("institution") ?? "").trim() || null,
    type = String(fd.get("type") ?? "");
  if (
    !id ||
    !name ||
    !["checking", "savings", "cash", "investment", "other"].includes(type)
  )
    fail("/accounts", "Dados inválidos.");
  await prisma.account.updateMany({
    where: { id, userId: user.id },
    data: { name, institution, type: type as never },
  });
  revalidatePath("/");
  revalidatePath("/accounts");
  redirect("/accounts?success=Conta atualizada com sucesso.");
}
export async function toggleAccount(fd: FormData) {
  const user = await requireUser(),
    id = String(fd.get("id") ?? "");
  const account = await prisma.account.findFirst({
    where: { id, userId: user.id },
  });
  if (account)
    await prisma.account.update({
      where: { id },
      data: { isActive: !account.isActive },
    });
  revalidatePath("/");
  revalidatePath("/accounts");
}
export async function createTransaction(fd: FormData) {
  const user = await requireUser(),
    type = String(fd.get("type") ?? ""),
    description = String(fd.get("description") ?? "").trim(),
    accountId = String(fd.get("accountId") ?? ""),
    transferAccountId = String(fd.get("transferAccountId") ?? "") || null,
    amount = parseMoney(fd.get("amount")),
    notes = String(fd.get("notes") ?? "").trim() || null,
    status = String(fd.get("status") ?? "paid"),
    transactionDate = new Date(
      `${String(fd.get("transactionDate") ?? "")}T12:00:00Z`,
    );
  const accounts = await prisma.account.findMany({
    where: {
      userId: user.id,
      id: { in: [accountId, transferAccountId ?? ""] },
    },
  });
  if (
    !description ||
    !["income", "expense", "transfer"].includes(type) ||
    !["pending", "paid"].includes(status) ||
    !(amount > 0) ||
    Number.isNaN(transactionDate.valueOf()) ||
    !accounts.some((a) => a.id === accountId)
  )
    fail("/transactions/new", "Preencha os dados da transação corretamente.");
  if (
    type === "transfer" &&
    (!transferAccountId ||
      transferAccountId === accountId ||
      !accounts.some((a) => a.id === transferAccountId))
  )
    fail(
      "/transactions/new",
      "Selecione uma conta de destino válida e diferente da origem.",
    );
  await prisma.transaction.create({
    data: {
      userId: user.id,
      accountId,
      transferAccountId: type === "transfer" ? transferAccountId : null,
      type: type as never,
      description,
      amount,
      transactionDate,
      notes,
      status: status as never,
    },
  });
  revalidatePath("/");
  revalidatePath("/accounts");
  revalidatePath("/transactions");
  redirect("/transactions?success=Transação adicionada com sucesso.");
}

export async function deleteTransaction(fd: FormData) {
  const user = await requireUser();
  const id = String(fd.get("id") ?? "");
  if (!id) fail("/transactions", "Transação inválida.");
  await prisma.transaction.deleteMany({ where: { id, userId: user.id } });
  revalidatePath("/");
  revalidatePath("/accounts");
  revalidatePath("/transactions");
  redirect("/transactions?success=Transação excluída com sucesso.");
}

export async function createInvestment(fd: FormData) {
  const user = await requireUser();
  const name = String(fd.get("name") ?? "").trim();
  const institution = String(fd.get("institution") ?? "").trim() || null;
  const amount = parseMoney(fd.get("amount"));
  const annualRateText = String(fd.get("annualRate") ?? "").replace(",", ".");
  const annualRate = annualRateText ? Number(annualRateText) : null;
  const maturityText = String(fd.get("maturityDate") ?? "");
  const maturityDate = maturityText
    ? new Date(`${maturityText}T12:00:00Z`)
    : null;
  const notes = String(fd.get("notes") ?? "").trim() || null;
  if (
    !name ||
    !(amount >= 0) ||
    (annualRate !== null && !Number.isFinite(annualRate))
  )
    fail("/investments/new", "Preencha os dados da caixinha corretamente.");
  await prisma.investment.create({
    data: {
      userId: user.id,
      name,
      institution,
      amount,
      annualRate,
      maturityDate,
      notes,
    },
  });
  revalidatePath("/");
  revalidatePath("/investments");
  redirect("/investments?success=Caixinha adicionada com sucesso.");
}

export async function deleteInvestment(fd: FormData) {
  const user = await requireUser();
  await prisma.investment.deleteMany({
    where: { id: String(fd.get("id") ?? ""), userId: user.id },
  });
  revalidatePath("/");
  revalidatePath("/investments");
}

export async function createGoal(fd: FormData) {
  const user = await requireUser();
  const name = String(fd.get("name") ?? "").trim();
  const targetAmount = parseMoney(fd.get("targetAmount"));
  const currentAmount = parseMoney(fd.get("currentAmount"));
  const deadlineText = String(fd.get("deadline") ?? "");
  const deadline = deadlineText ? new Date(`${deadlineText}T12:00:00Z`) : null;
  const color = String(fd.get("color") ?? "#b8ff45");
  if (!name || !(targetAmount > 0) || !(currentAmount >= 0))
    fail("/goals/new", "Preencha os dados da meta corretamente.");
  await prisma.goal.create({
    data: {
      userId: user.id,
      name,
      targetAmount,
      currentAmount,
      deadline,
      color,
    },
  });
  revalidatePath("/");
  revalidatePath("/goals");
  redirect("/goals?success=Meta criada com sucesso.");
}

export async function addGoalAmount(fd: FormData) {
  const user = await requireUser();
  const id = String(fd.get("id") ?? "");
  const amount = parseMoney(fd.get("amount"));
  const goal = await prisma.goal.findFirst({ where: { id, userId: user.id } });
  if (!goal || !(amount > 0)) fail("/goals", "Informe um valor válido.");
  await prisma.goal.update({
    where: { id },
    data: { currentAmount: { increment: amount } },
  });
  revalidatePath("/");
  revalidatePath("/goals");
}

export async function deleteGoal(fd: FormData) {
  const user = await requireUser();
  await prisma.goal.deleteMany({
    where: { id: String(fd.get("id") ?? ""), userId: user.id },
  });
  revalidatePath("/");
  revalidatePath("/goals");
}
