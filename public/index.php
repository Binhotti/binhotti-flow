<?php

declare(strict_types=1);

require_once dirname(__DIR__) . '/bootstrap.php';

$routes = require dirname(__DIR__) . '/routes/web.php';

$method = $_SERVER['REQUEST_METHOD'];
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH) ?: '/';

$scriptDir = rtrim(str_replace('\\', '/', dirname($_SERVER['SCRIPT_NAME'])), '/');
if ($scriptDir !== '' && $scriptDir !== '/' && str_starts_with($path, $scriptDir)) {
    $path = substr($path, strlen($scriptDir)) ?: '/';
}

$routeKey = $method . ' ' . $path;

if (!isset($routes[$routeKey])) {
    http_response_code(404);
    echo '404 - Página não encontrada';
    exit;
}

$handler = $routes[$routeKey];

if (is_callable($handler)) {
    $handler();
    exit;
}

[$controllerClass, $methodName] = $handler;
$controller = new $controllerClass();
$controller->{$methodName}();
