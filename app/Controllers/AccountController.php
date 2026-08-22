<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Middleware\AuthMiddleware;
use App\Models\Account;

class AccountController
{
    public function index(): void
    {
        AuthMiddleware::handle();

        $userId = (int) $_SESSION['user_id'];

        $accountModel = new Account();

        $accounts = $accountModel->allByUser($userId);

        $totalBalance =
            $accountModel->getTotalInitialBalance($userId);

        require BASE_PATH . '/app/Views/accounts/index.php';
    }

    public function create(): void
    {
        AuthMiddleware::handle();

        require BASE_PATH . '/app/Views/accounts/create.php';
    }

    public function store(): void
    {
        AuthMiddleware::handle();

        $userId = (int) $_SESSION['user_id'];

        $name = trim($_POST['name'] ?? '');
        $institution = trim($_POST['institution'] ?? '');
        $type = $_POST['type'] ?? '';

        $balanceInput =
            $_POST['initial_balance'] ?? '0';

        $balanceInput =
            str_replace('.', '', $balanceInput);

        $balanceInput =
            str_replace(',', '.', $balanceInput);

        $initialBalance =
            (float) $balanceInput;

        $allowedTypes = [
            'checking',
            'savings',
            'cash',
            'investment',
            'other'
        ];

        if (
            $name === '' ||
            !in_array(
                $type,
                $allowedTypes,
                true
            )
        ) {
            $_SESSION['error'] =
                'Preencha os dados da conta corretamente.';

            redirect('/accounts/create');
        }

        $institution =
            $institution !== ''
            ? $institution
            : null;

        $accountModel =
            new Account();

        $accountModel->create(
            $userId,
            $name,
            $institution,
            $type,
            $initialBalance
        );

        $_SESSION['success'] =
            'Conta adicionada com sucesso.';

        redirect('/accounts');
    }

    public function edit(): void
    {
        AuthMiddleware::handle();

        $userId = (int) $_SESSION['user_id'];
        $accountId = (int) ($_GET['id'] ?? 0);

        $account =
            (new Account())->findByUser(
                $accountId,
                $userId
            );

        if (!$account) {
            http_response_code(404);

            exit('Conta não encontrada.');
        }

        require BASE_PATH . '/app/Views/accounts/edit.php';
    }

    public function update(): void
    {
        AuthMiddleware::handle();

        $userId = (int) $_SESSION['user_id'];
        $accountId = (int) ($_POST['id'] ?? 0);

        $name = trim($_POST['name'] ?? '');
        $institution = trim($_POST['institution'] ?? '');
        $type = $_POST['type'] ?? '';

        $allowedTypes = [
            'checking',
            'savings',
            'cash',
            'investment',
            'other'
        ];

        if (
            $accountId <= 0 ||
            $name === '' ||
            !in_array($type, $allowedTypes, true)
        ) {
            $_SESSION['error'] =
                'Dados inválidos.';

            redirect('/accounts');
        }

        $institution =
            $institution !== ''
            ? $institution
            : null;

        (new Account())->update(
            $accountId,
            $userId,
            $name,
            $institution,
            $type
        );

        $_SESSION['success'] =
            'Conta atualizada com sucesso.';

        redirect('/accounts');
    }

    public function toggle(): void
    {
        AuthMiddleware::handle();

        $userId = (int) $_SESSION['user_id'];
        $accountId = (int) ($_POST['id'] ?? 0);

        if ($accountId > 0) {
            (new Account())->toggleActive(
                $accountId,
                $userId
            );
        }

        redirect('/accounts');
    }
}