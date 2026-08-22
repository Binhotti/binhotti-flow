<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Contas | Binhotti Flow</title>

    <link rel="stylesheet" href="<?= url('/assets/css/app.css') ?>">

    <script src="https://unpkg.com/lucide@latest" defer></script>
</head>

<body class="dashboard-page">

    <div class="dashboard-shell">

        <!-- depois vamos transformar isso em layout reutilizável -->

        <aside class="sidebar">

            <div class="sidebar-brand">

                <div class="sidebar-brand-symbol">
                    BF
                </div>

                <span class="sidebar-brand-name">
                    Binhotti Flow
                </span>

            </div>

            <nav class="sidebar-nav">

                <a href="<?= url('/') ?>" class="sidebar-link">
                    <span class="sidebar-link-icon">
                        <i data-lucide="layout-dashboard"></i>
                    </span>

                    <span class="sidebar-link-text">
                        Visão geral
                    </span>
                </a>

                <a href="#" class="sidebar-link">
                    <span class="sidebar-link-icon">
                        <i data-lucide="arrow-left-right"></i>
                    </span>

                    <span class="sidebar-link-text">
                        Transações
                    </span>
                </a>

                <a href="<?= url('/accounts') ?>" class="sidebar-link active">
                    <span class="sidebar-link-icon">
                        <i data-lucide="wallet"></i>
                    </span>

                    <span class="sidebar-link-text">
                        Contas
                    </span>
                </a>

            </nav>

        </aside>

        <main class="dashboard-main">

            <header class="dashboard-header">

                <div class="dashboard-header-left">

                    <h1>
                        Contas
                    </h1>

                    <p>
                        Gerencie onde seu dinheiro está.
                    </p>

                </div>

                <a href="<?= url('/accounts/create') ?>" class="account-add-button">
                    <i data-lucide="plus"></i>

                    Nova conta
                </a>

            </header>

            <div class="dashboard-content">

                <?php if (!empty($_SESSION['success'])): ?>

                    <div class="flash-message success">

                        <?= htmlspecialchars(
                            $_SESSION['success']
                        ) ?>

                    </div>

                    <?php unset($_SESSION['success']); ?>

                <?php endif; ?>

                <section class="accounts-overview">

                    <span>
                        Saldo Atual
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

                <section class="accounts-section">

                    <div class="accounts-section-header">

                        <div>
                            <h2>
                                Minhas contas
                            </h2>

                            <p>
                                <?= count($accounts) ?>
                                conta(s) cadastrada(s)
                            </p>
                        </div>

                    </div>

                    <?php if (empty($accounts)): ?>

                        <div class="accounts-empty">

                            <div class="accounts-empty-icon">
                                <i data-lucide="wallet"></i>
                            </div>

                            <h3>
                                Nenhuma conta cadastrada
                            </h3>

                            <p>
                                Adicione sua primeira conta para começar a acompanhar seu patrimônio.
                            </p>

                            <a href="<?= url('/accounts/create') ?>" class="button">
                                Adicionar primeira conta
                            </a>

                        </div>

                    <?php else: ?>

                        <div class="accounts-grid">

                            <?php foreach ($accounts as $account): ?>

                                <article class="account-card
                                <?= !$account['is_active']
                                    ? 'inactive'
                                    : '' ?>">

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

                                    <div class="account-card-balance">

                                        <span>
                                            Saldo Atual
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

                                    <div class="account-card-footer">

                                        <a href="<?= url(
                                            '/accounts/edit?id='
                                            . $account['id']
                                        ) ?>" class="account-action">
                                            <i data-lucide="pencil"></i>

                                            Editar
                                        </a>

                                        <form method="POST" action="<?= url(
                                            '/accounts/toggle'
                                        ) ?>">

                                            <input type="hidden" name="id" value="<?= $account['id'] ?>">

                                            <button type="submit" class="account-action">
                                                <i data-lucide="<?= $account['is_active']
                                                    ? 'eye-off'
                                                    : 'eye' ?>"></i>

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

            </div>

        </main>

    </div>

    <script>
        document.addEventListener(
            'DOMContentLoaded',
            () => lucide.createIcons()
        );
    </script>

</body>

</html>