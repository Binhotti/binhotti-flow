<?php

declare(strict_types=1);

namespace App\Models;

use PDO;

class Account
{
    private PDO $db;

    public function __construct()
    {
        $this->db = require BASE_PATH . '/config/database.php';
    }

    public function allByUser(int $userId): array
    {
        $sql = '
            SELECT
                id,
                name,
                institution,
                type,
                initial_balance,
                is_active,
                created_at
            FROM accounts
            WHERE user_id = :user_id
            ORDER BY is_active DESC, created_at ASC
        ';

        $stmt = $this->db->prepare($sql);

        $stmt->execute([
            'user_id' => $userId
        ]);

        return $stmt->fetchAll();
    }

    public function findByUser(
        int $accountId,
        int $userId
    ): array|false {
        $sql = '
            SELECT
                id,
                name,
                institution,
                type,
                initial_balance,
                is_active
            FROM accounts
            WHERE id = :id
            AND user_id = :user_id
            LIMIT 1
        ';

        $stmt = $this->db->prepare($sql);

        $stmt->execute([
            'id' => $accountId,
            'user_id' => $userId
        ]);

        return $stmt->fetch();
    }

    public function create(
        int $userId,
        string $name,
        ?string $institution,
        string $type,
        float $initialBalance
    ): int {
        $sql = '
            INSERT INTO accounts (
                user_id,
                name,
                institution,
                type,
                initial_balance
            )
            VALUES (
                :user_id,
                :name,
                :institution,
                :type,
                :initial_balance
            )
        ';

        $stmt = $this->db->prepare($sql);

        $stmt->execute([
            'user_id' => $userId,
            'name' => $name,
            'institution' => $institution,
            'type' => $type,
            'initial_balance' => $initialBalance
        ]);

        return (int) $this->db->lastInsertId();
    }

    public function update(
        int $accountId,
        int $userId,
        string $name,
        ?string $institution,
        string $type
    ): bool {
        $sql = '
            UPDATE accounts
            SET
                name = :name,
                institution = :institution,
                type = :type
            WHERE id = :id
            AND user_id = :user_id
        ';

        $stmt = $this->db->prepare($sql);

        return $stmt->execute([
            'id' => $accountId,
            'user_id' => $userId,
            'name' => $name,
            'institution' => $institution,
            'type' => $type
        ]);
    }

    public function toggleActive(
        int $accountId,
        int $userId
    ): bool {
        $sql = '
            UPDATE accounts
            SET is_active = NOT is_active
            WHERE id = :id
            AND user_id = :user_id
        ';

        $stmt = $this->db->prepare($sql);

        return $stmt->execute([
            'id' => $accountId,
            'user_id' => $userId
        ]);
    }

    public function getTotalInitialBalance(int $userId): float
    {
        $sql = '
            SELECT
                COALESCE(SUM(initial_balance), 0) AS total
            FROM accounts
            WHERE user_id = :user_id
            AND is_active = 1
        ';

        $stmt = $this->db->prepare($sql);

        $stmt->execute([
            'user_id' => $userId
        ]);

        return (float) $stmt->fetchColumn();
    }
}