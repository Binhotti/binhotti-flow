<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Middleware\AuthMiddleware;
use App\Models\Account;
use App\Models\Transaction;

class TransactionController
{
    public function index(): void
    {
        AuthMiddleware::handle();

        $userId =
            (int) $_SESSION['user_id'];

        $transactionModel =
            new Transaction();

        $transactions =
            $transactionModel->allByUser(
                $userId
            );

        require BASE_PATH .
            '/app/Views/transactions/index.php';
    }


    public function create(): void
    {
        AuthMiddleware::handle();

        $userId =
            (int) $_SESSION['user_id'];

        $accountModel =
            new Account();

        $accounts =
            $accountModel->allByUser(
                $userId
            );

        /*
         * Só deixamos contas ativas
         * disponíveis para movimentação.
         */

        $accounts = array_filter(
            $accounts,
            fn ($account) =>
                (bool) $account['is_active']
        );

        require BASE_PATH .
            '/app/Views/transactions/create.php';
    }


    public function store(): void
    {
        AuthMiddleware::handle();

        $userId =
            (int) $_SESSION['user_id'];

        $type =
            $_POST['type'] ?? '';

        $description =
            trim(
                $_POST['description'] ?? ''
            );

        $accountId =
            (int) (
                $_POST['account_id']
                ?? 0
            );

        $transferAccountId =
            !empty(
                $_POST['transfer_account_id']
            )
                ? (int)
                    $_POST['transfer_account_id']
                : null;

        $transactionDate =
            $_POST['transaction_date']
            ?? date('Y-m-d');


        /*
         * Converte:
         *
         * 1.695,53
         *
         * para:
         *
         * 1695.53
         */

        $amountInput =
            $_POST['amount'] ?? '0';

        $amountInput =
            str_replace(
                '.',
                '',
                $amountInput
            );

        $amountInput =
            str_replace(
                ',',
                '.',
                $amountInput
            );

        $amount =
            (float) $amountInput;


        $allowedTypes = [
            'income',
            'expense',
            'transfer'
        ];


        if (
            !in_array(
                $type,
                $allowedTypes,
                true
            )
            ||
            $description === ''
            ||
            $accountId <= 0
            ||
            $amount <= 0
        ) {

            $_SESSION['error'] =
                'Preencha os dados da transação corretamente.';

            redirect(
                '/transactions/create'
            );
        }


        /*
         * Transferência precisa
         * obrigatoriamente de destino.
         */

        if (
            $type === 'transfer'
            &&
            (
                !$transferAccountId
                ||
                $transferAccountId ===
                    $accountId
            )
        ) {

            $_SESSION['error'] =
                'Selecione uma conta de destino diferente da conta de origem.';

            redirect(
                '/transactions/create'
            );
        }


        /*
         * Receita/despesa não usa
         * conta de destino.
         */

        if ($type !== 'transfer') {
            $transferAccountId = null;
        }


        /*
         * Segurança:
         * confirma que as contas realmente
         * pertencem ao usuário logado.
         */

        $accountModel =
            new Account();

        $account =
            $accountModel->findByUser(
                $accountId,
                $userId
            );


        if (!$account) {

            $_SESSION['error'] =
                'Conta inválida.';

            redirect(
                '/transactions/create'
            );
        }


        if ($transferAccountId) {

            $destinationAccount =
                $accountModel->findByUser(
                    $transferAccountId,
                    $userId
                );

            if (!$destinationAccount) {

                $_SESSION['error'] =
                    'Conta de destino inválida.';

                redirect(
                    '/transactions/create'
                );
            }
        }


        $transactionModel =
            new Transaction();

        $transactionModel->create(
            $userId,
            $accountId,
            $transferAccountId,
            $type,
            $description,
            $amount,
            $transactionDate
        );


        $_SESSION['success'] =
            'Transação adicionada com sucesso.';


        redirect('/transactions');
    }
}