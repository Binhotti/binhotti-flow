<?php

declare(strict_types=1);

namespace App\Models;

use PDO;

class User
{
    private PDO $db;

    public function __construct()
    {
        $this->db = require BASE_PATH . '/config/database.php';
    }

    public function findByEmail(string $email): array|false
    {
        $sql = '
            SELECT
                id,
                name,
                email,
                password_hash
            FROM users
            WHERE email = :email
            LIMIT 1
        ';

        $stmt = $this->db->prepare($sql);

        $stmt->execute([
            'email' => $email
        ]);

        return $stmt->fetch();
    }

    public function create(
        string $name,
        string $email,
        string $passwordHash
    ): int {
        $sql = '
            INSERT INTO users (
                name,
                email,
                password_hash
            )
            VALUES (
                :name,
                :email,
                :password_hash
            )
        ';

        $stmt = $this->db->prepare($sql);

        $stmt->execute([
            'name' => $name,
            'email' => $email,
            'password_hash' => $passwordHash
        ]);

        return (int) $this->db->lastInsertId();
    }
}