<?php

declare(strict_types=1);

use PDO;
use PDOException;

require_once dirname(__DIR__) . '/bootstrap.php';

return (function (): PDO {
    $host = env('DB_HOST', '127.0.0.1');
    $port = env('DB_PORT', '3306');
    $db = env('DB_DATABASE', 'binhotti_flow');
    $user = env('DB_USERNAME', 'root');
    $pass = env('DB_PASSWORD', '');

    $dsn = "mysql:host={$host};port={$port};dbname={$db};charset=utf8mb4";

    try {
        return new PDO($dsn, $user, $pass, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]);
    } catch (PDOException $e) {
        http_response_code(500);
        exit('Erro ao conectar ao banco de dados.');
    }
})();
