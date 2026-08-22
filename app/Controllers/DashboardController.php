<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Middleware\AuthMiddleware;
use App\Models\Account;

class DashboardController
{
    public function index(): void
    {
        AuthMiddleware::handle();

        $userId = (int) $_SESSION['user_id'];

        $accountModel = new Account();

        $totalBalance =
            $accountModel->getTotalCurrentBalance($userId);

        require BASE_PATH . '/app/Views/dashboard/index.php';
    }
}