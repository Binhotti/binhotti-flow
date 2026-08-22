<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Visão geral | Binhotti Flow</title>

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

                <a href="<?= url('/') ?>" class="sidebar-link active">
                    <span class="sidebar-link-icon">
                        <i data-lucide="layout-dashboard"></i>
                    </span>

                    <span class="sidebar-link-text">
                        Visão geral
                    </span>
                </a>

                <a href="<?= url('/accounts') ?>" class="sidebar-link">
                    <span class="sidebar-link-icon">
                        <i data-lucide="arrow-left-right"></i>
                    </span>

                    <span class="sidebar-link-text">
                        Transações
                    </span>
                </a>

                <a href="<?= url('/accounts') ?>" class="sidebar-link">
                    <span class="sidebar-link-icon">
                        <i data-lucide="wallet"></i>
                    </span>

                    <span class="sidebar-link-text">
                        Contas
                    </span>
                </a>

                <a href="<?= url('/accounts') ?>" class="sidebar-link">
                    <span class="sidebar-link-icon">
                        <i data-lucide="credit-card"></i>
                    </span>

                    <span class="sidebar-link-text">
                        Cartões
                    </span>
                </a>

                <a href="<?= url('/accounts') ?>" class="sidebar-link">
                    <span class="sidebar-link-icon">
                        <i data-lucide="calendar-range"></i>
                    </span>

                    <span class="sidebar-link-text">
                        Planejamento
                    </span>
                </a>

                <a href="<?= url('/accounts') ?>" class="sidebar-link">
                    <span class="sidebar-link-icon">
                        <i data-lucide="target"></i>
                    </span>

                    <span class="sidebar-link-text">
                        Metas
                    </span>
                </a>

                <a href="<?= url('/accounts') ?>" class="sidebar-link">
                    <span class="sidebar-link-icon">
                        <i data-lucide="chart-no-axes-combined"></i>
                    </span>

                    <span class="sidebar-link-text">
                        Relatórios
                    </span>
                </a>

                <a href="<?= url('/accounts') ?>" class="sidebar-link">
                    <span class="sidebar-link-icon">
                        <i data-lucide="sparkles"></i>
                    </span>

                    <span class="sidebar-link-text">
                        Assistente
                    </span>
                </a>

            </nav>

            <div class="sidebar-bottom">

                <a href="#" class="sidebar-link">
                    <span class="sidebar-link-icon">
                        <i data-lucide="settings"></i>
                    </span>

                    <span class="sidebar-link-text">
                        Configurações
                    </span>
                </a>

                <div class="sidebar-profile">

                    <div class="sidebar-avatar">
                        V
                    </div>

                    <div class="sidebar-profile-info">

                        <span class="sidebar-profile-name">
                            Vitor
                        </span>

                        <span class="sidebar-profile-email">
                            Sua conta
                        </span>

                    </div>

                </div>

            </div>

        </aside>

        <main class="dashboard-main">

            <header class="dashboard-header">

                <div class="dashboard-header-left">

                    <h1>
                        Visão geral
                    </h1>

                    <p>
                        Acompanhe sua vida financeira em um só lugar.
                    </p>

                </div>

                <div class="dashboard-header-actions">

                    <button class="header-icon-button" type="button" aria-label="Notificações">
                        <i data-lucide="bell"></i>
                    </button>

                    <form action="<?= url('/logout') ?>" method="POST">

                        <button class="header-icon-button" type="submit" aria-label="Sair">
                            <i data-lucide="log-out"></i>
                        </button>

                    </form>

                </div>

            </header>

            <div class="dashboard-content">

                <section class="dashboard-welcome">

                    <h2>
                        Boa noite, Vitor.
                    </h2>

                    <p>
                        Veja como estão suas finanças hoje.
                    </p>

                </section>

                <section class="financial-summary">

                    <article class="balance-card">

                        <div>
                            <span class="card-label">
                                Patrimônio total
                            </span>

                            <strong class="balance-value">
                                R$ 8.420,50
                            </strong>
                        </div>

                        <span class="balance-growth">
                            <i data-lucide="trending-up"></i>
                            6,8%
                        </span>

                    </article>

                    <div class="summary-grid">

                        <article class="summary-card">

                            <div class="summary-card-header">
                                <span>Receitas</span>

                                <div class="summary-icon success">
                                    <i data-lucide="arrow-down-left"></i>
                                </div>
                            </div>

                            <strong>
                                R$ 3.200,00
                            </strong>

                            <small>
                                Agosto
                            </small>

                        </article>

                        <article class="summary-card">

                            <div class="summary-card-header">
                                <span>Despesas</span>

                                <div class="summary-icon danger">
                                    <i data-lucide="arrow-up-right"></i>
                                </div>
                            </div>

                            <strong>
                                R$ 2.312,00
                            </strong>

                            <small>
                                Agosto
                            </small>

                        </article>

                        <article class="summary-card">

                            <div class="summary-card-header">
                                <span>Saldo do mês</span>

                                <div class="summary-icon">
                                    <i data-lucide="wallet"></i>
                                </div>
                            </div>

                            <strong>
                                R$ 888,00
                            </strong>

                            <small class="positive">
                                +27,7% da receita
                            </small>

                        </article>

                    </div>

                </section>

                <section class="dashboard-grid">

                    <article class="dashboard-card weekly-spending-card">

                        <div class="dashboard-card-header">
                            <div>
                                <span class="dashboard-card-label">
                                    Gastos essa semana
                                </span>

                                <div class="weekly-spending-value">
                                    R$ 1.200,00

                                    <span class="weekly-spending-growth">
                                        <i data-lucide="trending-up"></i>
                                        60%
                                    </span>
                                </div>
                            </div>

                            <button class="card-action-button" type="button" aria-label="Ver detalhes">
                                <i data-lucide="chevron-right"></i>
                            </button>
                        </div>

                        <div class="weekly-chart">

                            <div class="chart-scale">
                                <span>R$ 200</span>
                                <span>R$ 0</span>
                            </div>

                            <div class="chart-bars">

                                <div class="chart-day">
                                    <div class="bar-wrapper">
                                        <div class="chart-bar" style="height: 32%;"></div>
                                    </div>

                                    <span>Seg</span>
                                </div>

                                <div class="chart-day">
                                    <div class="bar-wrapper">
                                        <div class="chart-bar" style="height: 88%;"></div>
                                    </div>

                                    <span>Ter</span>
                                </div>

                                <div class="chart-day">
                                    <div class="bar-wrapper">
                                        <div class="chart-bar" style="height: 52%;"></div>
                                    </div>

                                    <span>Qua</span>
                                </div>

                                <div class="chart-day">
                                    <div class="bar-wrapper">
                                        <div class="chart-bar empty" style="height: 10%;"></div>
                                    </div>

                                    <span>Qui</span>
                                </div>

                                <div class="chart-day">
                                    <div class="bar-wrapper">
                                        <div class="chart-bar empty" style="height: 10%;"></div>
                                    </div>

                                    <span>Sex</span>
                                </div>

                                <div class="chart-day">
                                    <div class="bar-wrapper">
                                        <div class="chart-bar empty" style="height: 10%;"></div>
                                    </div>

                                    <span>Sáb</span>
                                </div>

                                <div class="chart-day">
                                    <div class="bar-wrapper">
                                        <div class="chart-bar empty" style="height: 10%;"></div>
                                    </div>

                                    <span>Dom</span>
                                </div>

                            </div>

                        </div>

                    </article>

                    <article class="dashboard-card budget-card">

                        <div class="dashboard-card-header">

                            <div>
                                <span class="dashboard-card-label">
                                    Orçamento mensal
                                </span>

                                <h3>
                                    Agosto
                                </h3>
                            </div>

                            <button class="card-action-button" type="button" aria-label="Ver orçamentos">
                                <i data-lucide="chevron-right"></i>
                            </button>

                        </div>

                        <div class="budget-list">

                            <div class="budget-item">

                                <div class="budget-item-header">
                                    <div>
                                        <strong>
                                            Alimentação
                                        </strong>

                                        <span>
                                            R$ 425 de R$ 600
                                        </span>
                                    </div>

                                    <strong class="budget-percentage">
                                        71%
                                    </strong>
                                </div>

                                <div class="budget-progress">
                                    <div class="budget-progress-bar" style="width: 71%;"></div>
                                </div>

                                <small>
                                    R$ 175 disponíveis
                                </small>

                            </div>

                            <div class="budget-item">

                                <div class="budget-item-header">
                                    <div>
                                        <strong>
                                            Lazer
                                        </strong>

                                        <span>
                                            R$ 280 de R$ 500
                                        </span>
                                    </div>

                                    <strong class="budget-percentage">
                                        56%
                                    </strong>
                                </div>

                                <div class="budget-progress">
                                    <div class="budget-progress-bar" style="width: 56%;"></div>
                                </div>

                                <small>
                                    R$ 220 disponíveis
                                </small>

                            </div>

                        </div>

                    </article>

                </section>

                <section class="dashboard-lower-grid">

                    <article class="dashboard-card insights-card">

                        <div class="section-title">
                            <div class="section-title-icon">
                                <i data-lucide="sparkles"></i>
                            </div>

                            <div>
                                <span>
                                    Insights financeiros
                                </span>

                                <small>
                                    Com base nos seus gastos
                                </small>
                            </div>
                        </div>

                        <div class="insights-list">

                            <div class="insight-item">
                                <div class="insight-icon">
                                    <i data-lucide="trending-up"></i>
                                </div>

                                <div>
                                    <strong>
                                        Seus gastos aumentaram
                                    </strong>

                                    <p>
                                        Você gastou 18% mais nesta semana do que na semana anterior.
                                    </p>
                                </div>
                            </div>

                            <div class="insight-item">
                                <div class="insight-icon">
                                    <i data-lucide="utensils"></i>
                                </div>

                                <div>
                                    <strong>
                                        Atenção ao orçamento
                                    </strong>

                                    <p>
                                        Você já utilizou 71% do orçamento de alimentação deste mês.
                                    </p>
                                </div>
                            </div>

                        </div>

                    </article>

                    <article class="dashboard-card transactions-card">

                        <div class="dashboard-card-header">

                            <div>
                                <span class="dashboard-card-label">
                                    Últimas transações
                                </span>

                                <h3>
                                    Movimentações recentes
                                </h3>
                            </div>

                            <button class="card-action-button" type="button" aria-label="Ver todas as transações">
                                <i data-lucide="chevron-right"></i>
                            </button>

                        </div>

                        <div class="transactions-list">

                            <div class="transaction-item">

                                <div class="transaction-icon">
                                    <i data-lucide="utensils"></i>
                                </div>

                                <div class="transaction-info">
                                    <strong>
                                        Delivery de comida
                                    </strong>

                                    <span>
                                        Alimentação • Hoje
                                    </span>
                                </div>

                                <strong class="transaction-value expense">
                                    - R$ 42,00
                                </strong>

                            </div>

                            <div class="transaction-item">

                                <div class="transaction-icon">
                                    <i data-lucide="house"></i>
                                </div>

                                <div class="transaction-info">
                                    <strong>
                                        Hospedagem
                                    </strong>

                                    <span>
                                        Viagens • 24 de Ago
                                    </span>
                                </div>

                                <strong class="transaction-value expense">
                                    - R$ 120,00
                                </strong>

                            </div>

                        </div>

                    </article>

                </section>

            </div>

        </main>

    </div>

    <script>
        document.addEventListener(
            'DOMContentLoaded',
            () => {
                lucide.createIcons();
            }
        );
    </script>

</body>

</html>