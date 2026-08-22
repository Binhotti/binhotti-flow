<?php

declare(strict_types=1);

require_once dirname(__DIR__) . '/bootstrap.php';

$routes = require dirname(__DIR__) . '/routes/web.php';

$method = $_SERVER['REQUEST_METHOD'];

$path = parse_url(
    $_SERVER['REQUEST_URI'],
    PHP_URL_PATH
) ?: '/';


$scriptDirectory = str_replace(
    '\\',
    '/',
    dirname($_SERVER['SCRIPT_NAME'])
);

$scriptDirectory = rtrim($scriptDirectory, '/');

if (
    $scriptDirectory !== '' &&
    $scriptDirectory !== '/' &&
    str_starts_with($path, $scriptDirectory)
) {
    $path = substr(
        $path,
        strlen($scriptDirectory)
    );

    if ($path === '') {
        $path = '/';
    }
}


$routeKey = $method . ' ' . $path;

if (!isset($routes[$routeKey])) {
    http_response_code(404);

    echo '404 - Página não encontrada';

    exit;
}

[$controllerClass, $methodName] = $routes[$routeKey];

$controller = new $controllerClass();

$controller->{$methodName}();