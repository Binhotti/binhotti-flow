<?php

$pageTitle = 'Contas';

$pageDescription =
    'Gerencie onde seu dinheiro está.';

$activePage = 'accounts';


/*
|--------------------------------------------------------------------------
| Botão do header
|--------------------------------------------------------------------------
*/

ob_start();
?>

<a
    href="<?= url('/accounts/create') ?>"
    class="account-add-button"
>
    <i data-lucide="plus"></i>

    Nova conta
</a>

<?php

$headerAction = ob_get_clean();

require BASE_PATH . '/app/Views/layouts/header.php';

?>


<!-- MENSAGEM DE SUCESSO -->

<?php if (!empty($_SESSION['success'])): ?>

    <div class="flash-message success">

        <?= htmlspecialchars(
            $_SESSION['success']
        ) ?>

    </div>

    <?php unset($_SESSION['success']); ?>

<?php endif; ?>


<!-- SALDO TOTAL -->

<section class="accounts-overview">

    <span>
        Saldo atual
    </span>

    <strong>
        R$
        <?= number_format(
            $totalBalance,
            2,
            ',',
            '.'
        ) ?>
    </strong>

    <small>
        Somando todas as contas ativas
    </small>

</section>


<!-- CONTAS -->

<section class="accounts-section">

    <div class="accounts-section-header">

        <div>

            <h2>
                Minhas contas
            </h2>

            <p>
                <?= count($accounts) ?>

                <?= count($accounts) === 1
                    ? 'conta cadastrada'
                    : 'contas cadastradas' ?>
            </p>

        </div>

    </div>


    <?php if (empty($accounts)): ?>


        <!-- ESTADO VAZIO -->

        <div class="accounts-empty">

            <div class="accounts-empty-icon">
                <i data-lucide="wallet"></i>
            </div>

            <h3>
                Nenhuma conta cadastrada
            </h3>

            <p>
                Adicione sua primeira conta para começar
                a acompanhar seu patrimônio.
            </p>

            <a
                href="<?= url('/accounts/create') ?>"
                class="button"
            >
                Adicionar primeira conta
            </a>

        </div>


    <?php else: ?>


        <!-- GRID DAS CONTAS -->

        <div class="accounts-grid">

            <?php foreach ($accounts as $account): ?>

                <article
                    class="account-card
                    <?= !$account['is_active']
                        ? 'inactive'
                        : '' ?>"
                >

                    <!-- TOPO -->

                    <div class="account-card-top">

                        <div class="account-icon">
                            <i data-lucide="wallet"></i>
                        </div>

                        <span class="account-status">

                            <?= $account['is_active']
                                ? 'Ativa'
                                : 'Inativa' ?>

                        </span>

                    </div>


                    <!-- NOME / BANCO -->

                    <div class="account-card-info">

                        <strong>
                            <?= htmlspecialchars(
                                $account['name']
                            ) ?>
                        </strong>

                        <span>
                            <?= htmlspecialchars(
                                $account['institution']
                                ?? 'Conta pessoal'
                            ) ?>
                        </span>

                    </div>


                    <!-- SALDO -->

                    <div class="account-card-balance">

                        <span>
                            Saldo atual
                        </span>

                        <strong>
                            R$
                            <?= number_format(
                                (float)
                                $account['initial_balance'],
                                2,
                                ',',
                                '.'
                            ) ?>
                        </strong>

                    </div>


                    <!-- AÇÕES -->

                    <div class="account-card-footer">

                        <a
                            href="<?= url(
                                '/accounts/edit?id='
                                . $account['id']
                            ) ?>"
                            class="account-action"
                        >
                            <i data-lucide="pencil"></i>

                            Editar
                        </a>


                        <form
                            method="POST"
                            action="<?= url(
                                '/accounts/toggle'
                            ) ?>"
                        >

                            <input
                                type="hidden"
                                name="id"
                                value="<?= $account['id'] ?>"
                            >

                            <button
                                type="submit"
                                class="account-action"
                            >

                                <i
                                    data-lucide="<?= $account['is_active']
                                        ? 'eye-off'
                                        : 'eye' ?>"
                                ></i>

                                <?= $account['is_active']
                                    ? 'Desativar'
                                    : 'Ativar' ?>

                            </button>

                        </form>

                    </div>

                </article>

            <?php endforeach; ?>

        </div>

    <?php endif; ?>

</section>


<?php

require BASE_PATH . '/app/Views/layouts/footer.php';

?>