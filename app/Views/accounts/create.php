<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Nova conta | Binhotti Flow</title>

    <link rel="stylesheet" href="<?= url('/assets/css/app.css') ?>">

    <script src="https://unpkg.com/lucide@latest" defer></script>
</head>

<body class="dashboard-page">

    <div class="dashboard-shell">

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
                        Nova conta
                    </h1>

                    <p>
                        Adicione uma conta para começar a acompanhar seu saldo.
                    </p>

                </div>

                <a href="<?= url('/accounts') ?>" class="header-icon-button" aria-label="Voltar">
                    <i data-lucide="arrow-left"></i>
                </a>

            </header>

            <div class="dashboard-content">

                <section class="account-form-wrapper">

                    <div class="account-form-intro">

                        <div class="account-form-icon">
                            <i data-lucide="wallet-cards"></i>
                        </div>

                        <div>
                            <h2>
                                Informações da conta
                            </h2>

                            <p>
                                Você poderá editar esses dados depois.
                            </p>
                        </div>

                    </div>

                    <?php if (!empty($_SESSION['error'])): ?>

                        <div class="flash-message error">

                            <?= htmlspecialchars(
                                $_SESSION['error']
                            ) ?>

                        </div>

                        <?php unset($_SESSION['error']); ?>

                    <?php endif; ?>

                    <form class="account-form" action="<?= url('/accounts') ?>" method="POST">

                        <div class="input-group">

                            <label for="name">
                                Nome da conta
                            </label>

                            <input class="input" id="name" name="name" type="text"
                                placeholder="Ex.: Nubank, Inter, Carteira" required>

                            <small class="input-help">
                                O nome que você quer ver no Binhotti Flow.
                            </small>

                        </div>

                        <div class="input-group">

                            <label for="institution">
                                Instituição
                            </label>

                            <input class="input" id="institution" name="institution" type="text"
                                placeholder="Ex.: Nubank, Itaú, Banco Inter">

                            <small class="input-help">
                                Esse campo é opcional.
                            </small>

                        </div>

                        <div class="account-form-grid">

                            <div class="input-group">

                                <label for="type">
                                    Tipo da conta
                                </label>

                                <select class="input" id="type" name="type" required>
                                    <option value="">
                                        Selecione
                                    </option>

                                    <option value="checking">
                                        Conta corrente
                                    </option>

                                    <option value="savings">
                                        Poupança
                                    </option>

                                    <option value="cash">
                                        Dinheiro
                                    </option>

                                    <option value="investment">
                                        Investimentos
                                    </option>

                                    <option value="other">
                                        Outra
                                    </option>
                                </select>

                            </div>

                            <div class="input-group">

                                <label for="initial_balance">
                                    Saldo atual
                                </label>

                                <div class="money-input">

                                    <span>
                                        R$
                                    </span>

                                    <input id="initial_balance" name="initial_balance" type="text" inputmode="decimal"
                                        placeholder="0,00" value="0,00" required>

                                </div>

                                <small class="input-help">
                                    Informe quanto existe nessa conta hoje.
                                </small>

                            </div>

                        </div>

                        <div class="account-form-note">

                            <i data-lucide="info"></i>

                            <p>
                                Esse saldo será usado como ponto de partida.
                                Depois, o Binhotti Flow calculará o saldo com base
                                nas suas movimentações.
                            </p>

                        </div>

                        <div class="account-form-actions">

                            <a href="<?= url('/accounts') ?>" class="account-cancel-button">
                                Cancelar
                            </a>

                            <button class="button account-save-button" type="submit">
                                <i data-lucide="plus"></i>

                                Adicionar conta
                            </button>

                        </div>

                    </form>

                </section>

            </div>

        </main>

    </div>

    <script>
        document.addEventListener(
            'DOMContentLoaded',
            () => {
                lucide.createIcons();

                const balanceInput =
                    document.querySelector('#initial_balance');

                if (!balanceInput) {
                    return;
                }

                balanceInput.addEventListener(
                    'input',
                    event => {
                        let value =
                            event.target.value.replace(/\D/g, '');

                        if (value === '') {
                            event.target.value = '0,00';
                            return;
                        }

                        value =
                            (Number(value) / 100).toLocaleString(
                                'pt-BR',
                                {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                }
                            );

                        event.target.value = value;
                    }
                );
            }
        );
    </script>

</body>

</html>