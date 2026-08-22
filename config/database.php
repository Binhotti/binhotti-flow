<?php

declare(strict_types=1);

use PDO;
use PDOException;

require_once dirname(__DIR__) . '/bootstrap.php';

return (function (): PDO {
    $host = env('DB_HOST', '127.0.0.1');
    $port = env('DB_PORT', '4406');
    $database = env('DB_DATABASE', 'binhotti_flow');
    $username = env('DB_USERNAME', 'root');
    $password = env('DB_PASSWORD', '');

    $dsn = "mysql:host={$host};port={$port};dbname={$database};charset=utf8mb4";

    try {
        return new PDO($dsn, $username, $password, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]);
    } catch (PDOException $e) {
        die('Erro ao conectar ao banco de dados.');
    }
})();