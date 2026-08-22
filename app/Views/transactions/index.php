<?php

$pageTitle = 'Transações';

$pageDescription =
    'Acompanhe todas as suas movimentações financeiras.';

$activePage =
    'transactions';


ob_start();
?>

<a
    href="<?= url('/transactions/create') ?>"
    class="account-add-button"
>
    <i data-lucide="plus"></i>

    Nova transação
</a>

<?php

$headerAction =
    ob_get_clean();

require BASE_PATH .
    '/app/Views/layouts/header.php';

?>


<?php if (!empty($_SESSION['success'])): ?>

    <div class="flash-message success">

        <?= htmlspecialchars(
            $_SESSION['success']
        ) ?>

    </div>

    <?php unset($_SESSION['success']); ?>

<?php endif; ?>


<section class="transactions-page">


    <?php if (empty($transactions)): ?>

        <div class="accounts-empty">

            <div class="accounts-empty-icon">
                <i data-lucide="arrow-left-right"></i>
            </div>

            <h3>
                Nenhuma transação ainda
            </h3>

            <p>
                Registre sua primeira movimentação
                para começar a acompanhar suas finanças.
            </p>

            <a
                href="<?= url(
                    '/transactions/create'
                ) ?>"
                class="button"
            >
                Adicionar primeira transação
            </a>

        </div>


    <?php else: ?>


        <div class="transactions-page-list">

            <?php foreach (
                $transactions as $transaction
            ): ?>


                <?php

                $type =
                    $transaction['type'];

                $icon =
                    match ($type) {
                        'income' =>
                            'arrow-down-left',

                        'expense' =>
                            'arrow-up-right',

                        'transfer' =>
                            'arrow-left-right',

                        default =>
                            'circle'
                    };


                $typeName =
                    match ($type) {
                        'income' =>
                            'Receita',

                        'expense' =>
                            'Despesa',

                        'transfer' =>
                            'Transferência',

                        default =>
                            'Transação'
                    };

                ?>


                <article class="transaction-row">

                    <div
                        class="
                            transaction-row-icon
                            <?= $type ?>
                        "
                    >
                        <i
                            data-lucide="<?= $icon ?>"
                        ></i>
                    </div>


                    <div class="transaction-row-info">

                        <strong>
                            <?= htmlspecialchars(
                                $transaction[
                                    'description'
                                ]
                            ) ?>
                        </strong>


                        <span>

                            <?= htmlspecialchars(
                                $transaction[
                                    'account_name'
                                ]
                                ?? 'Conta'
                            ) ?>


                            <?php if (
                                $type ===
                                'transfer'
                            ): ?>

                                →

                                <?= htmlspecialchars(
                                    $transaction[
                                        'transfer_account_name'
                                    ]
                                    ?? ''
                                ) ?>

                            <?php endif; ?>


                            •


                            <?= date(
                                'd/m/Y',
                                strtotime(
                                    $transaction[
                                        'transaction_date'
                                    ]
                                )
                            ) ?>

                        </span>

                    </div>


                    <span class="transaction-row-type">
                        <?= $typeName ?>
                    </span>


                    <strong
                        class="
                            transaction-row-value
                            <?= $type ?>
                        "
                    >

                        <?php if (
                            $type === 'expense'
                        ): ?>

                            -

                        <?php elseif (
                            $type === 'income'
                        ): ?>

                            +

                        <?php endif; ?>


                        R$

                        <?= number_format(
                            (float)
                            $transaction['amount'],
                            2,
                            ',',
                            '.'
                        ) ?>

                    </strong>

                </article>


            <?php endforeach; ?>

        </div>


    <?php endif; ?>

</section>


<?php

require BASE_PATH .
    '/app/Views/layouts/footer.php';

?>