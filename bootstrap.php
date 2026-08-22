<?php

declare(strict_types=1);

session_start();

define('BASE_PATH', __DIR__);

spl_autoload_register(function (string $class): void {
    $prefix = 'App\\';
    $baseDir = BASE_PATH . '/app/';

    if (!str_starts_with($class, $prefix)) {
        return;
    }

    $relativeClass = substr($class, strlen($prefix));
    $file = $baseDir . str_replace('\\', '/', $relativeClass) . '.php';

    if (file_exists($file)) {
        require $file;
    }
});

function env(string $key, mixed $default = null): mixed
{
    static $values = null;

    if ($values === null) {
        $values = [];
        $envFile = BASE_PATH . '/.env';

        if (file_exists($envFile)) {
            foreach (file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) as $line) {
                $line = trim($line);

                if ($line === '' || str_starts_with($line, '#') || !str_contains($line, '=')) {
                    continue;
                }

                [$envKey, $envValue] = array_map('trim', explode('=', $line, 2));
                $envValue = trim($envValue, "\"'");
                $values[$envKey] = $envValue;
            }
        }
    }

    return $values[$key] ?? $default;
}
