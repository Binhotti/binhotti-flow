<?php

declare(strict_types=1);

namespace App\Models;

use PDO;

class Transaction
{
    private PDO $db;

    public function __construct()
    {
        $this->db =
            require BASE_PATH . '/config/database.php';
    }

    /**
     * Retorna as transações do usuário.
     */
    public function allByUser(
        int $userId,
        int $limit = 100
    ): array {
        $sql = '
            SELECT
                t.id,
                t.type,
                t.description,
                t.amount,
                t.transaction_date,
                t.status,

                a.name AS account_name,

                ta.name AS transfer_account_name

            FROM transactions t

            LEFT JOIN accounts a
                ON a.id = t.account_id

            LEFT JOIN accounts ta
                ON ta.id = t.transfer_account_id

            WHERE t.user_id = :user_id

            ORDER BY
                t.transaction_date DESC,
                t.id DESC

            LIMIT :limit
        ';

        $stmt = $this->db->prepare($sql);

        $stmt->bindValue(
            ':user_id',
            $userId,
            PDO::PARAM_INT
        );

        $stmt->bindValue(
            ':limit',
            $limit,
            PDO::PARAM_INT
        );

        $stmt->execute();

        return $stmt->fetchAll();
    }

    /**
     * Cria uma nova transação.
     */
    public function create(
        int $userId,
        int $accountId,
        ?int $transferAccountId,
        string $type,
        string $description,
        float $amount,
        string $transactionDate,
        string $status = 'paid'
    ): int {
        $sql = '
            INSERT INTO transactions (
                user_id,
                account_id,
                transfer_account_id,
                type,
                description,
                amount,
                transaction_date,
                status
            )
            VALUES (
                :user_id,
                :account_id,
                :transfer_account_id,
                :type,
                :description,
                :amount,
                :transaction_date,
                :status
            )
        ';

        $stmt = $this->db->prepare($sql);

        $stmt->execute([
            'user_id' => $userId,
            'account_id' => $accountId,
            'transfer_account_id' => $transferAccountId,
            'type' => $type,
            'description' => $description,
            'amount' => $amount,
            'transaction_date' => $transactionDate,
            'status' => $status
        ]);

        return (int)
            $this->db->lastInsertId();
    }

    /**
     * Soma as receitas de um mês.
     *
     * $month deve vir no formato:
     * 2026-08
     */
    public function getMonthlyIncome(
        int $userId,
        string $month
    ): float {
        $sql = '
            SELECT
                COALESCE(
                    SUM(amount),
                    0
                )

            FROM transactions

            WHERE user_id = :user_id
            AND type = "income"
            AND status = "paid"

            AND DATE_FORMAT(
                transaction_date,
                "%Y-%m"
            ) = :month
        ';

        $stmt = $this->db->prepare($sql);

        $stmt->execute([
            'user_id' => $userId,
            'month' => $month
        ]);

        return (float)
            $stmt->fetchColumn();
    }

    /**
     * Soma as despesas de um mês.
     */
    public function getMonthlyExpenses(
        int $userId,
        string $month
    ): float {
        $sql = '
            SELECT
                COALESCE(
                    SUM(amount),
                    0
                )

            FROM transactions

            WHERE user_id = :user_id
            AND type = "expense"
            AND status = "paid"

            AND DATE_FORMAT(
                transaction_date,
                "%Y-%m"
            ) = :month
        ';

        $stmt = $this->db->prepare($sql);

        $stmt->execute([
            'user_id' => $userId,
            'month' => $month
        ]);

        return (float)
            $stmt->fetchColumn();
    }

    /**
     * Retorna as transações mais recentes.
     */
    public function latest(
        int $userId,
        int $limit = 5
    ): array {
        return $this->allByUser(
            $userId,
            $limit
        );
    }
}