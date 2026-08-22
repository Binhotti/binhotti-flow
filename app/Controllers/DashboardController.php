<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Middleware\AuthMiddleware;

class DashboardController
{
    public function index(): void
    {
        AuthMiddleware::handle();

        require BASE_PATH . '/app/Views/dashboard/index.php';
    }
}