<?php

$pageTitle = 'Visão geral';

$pageDescription =
    'Acompanhe sua vida financeira em um só lugar.';

$activePage = 'dashboard';

/*
|--------------------------------------------------------------------------
| Ações do header
|--------------------------------------------------------------------------
|
| Tudo que aparecer no lado direito do header.
|
*/

ob_start();
?>

<button
    class="header-icon-button"
    type="button"
    aria-label="Notificações"
>
    <i data-lucide="bell"></i>
</button>

<form
    action="<?= url('/logout') ?>"
    method="POST"
>
    <button
        class="header-icon-button"
        type="submit"
        aria-label="Sair"
    >
        <i data-lucide="log-out"></i>
    </button>
</form>

<?php

$headerAction = ob_get_clean();

require BASE_PATH . '/app/Views/layouts/header.php';

?>

<section class="dashboard-welcome">

    <h2>
        Boa noite, Vitor.
    </h2>

    <p>
        Veja como estão suas finanças hoje.
    </p>

</section>


<!-- RESUMO FINANCEIRO -->

<section class="financial-summary">

    <article class="balance-card">

        <div>

            <span class="card-label">
                Patrimônio total
            </span>

            <strong class="balance-value">
                R$
                <?= number_format(
                    $totalBalance,
                    2,
                    ',',
                    '.'
                ) ?>
            </strong>

        </div>

    </article>


    <div class="summary-grid">

        <!-- RECEITAS -->

        <article class="summary-card">

            <div class="summary-card-header">

                <span>
                    Receitas
                </span>

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


        <!-- DESPESAS -->

        <article class="summary-card">

            <div class="summary-card-header">

                <span>
                    Despesas
                </span>

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


        <!-- SALDO DO MÊS -->

        <article class="summary-card">

            <div class="summary-card-header">

                <span>
                    Saldo do mês
                </span>

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


<!-- GASTOS DA SEMANA + ORÇAMENTO -->

<section class="dashboard-grid">

    <!-- GASTOS DA SEMANA -->

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

            <button
                class="card-action-button"
                type="button"
                aria-label="Ver detalhes"
            >
                <i data-lucide="chevron-right"></i>
            </button>

        </div>


        <div class="weekly-chart">

            <div class="chart-scale">

                <span>
                    R$ 200
                </span>

                <span>
                    R$ 0
                </span>

            </div>


            <div class="chart-bars">

                <div class="chart-day">

                    <div class="bar-wrapper">
                        <div
                            class="chart-bar"
                            style="height: 32%;"
                        ></div>
                    </div>

                    <span>
                        Seg
                    </span>

                </div>


                <div class="chart-day">

                    <div class="bar-wrapper">
                        <div
                            class="chart-bar"
                            style="height: 88%;"
                        ></div>
                    </div>

                    <span>
                        Ter
                    </span>

                </div>


                <div class="chart-day">

                    <div class="bar-wrapper">
                        <div
                            class="chart-bar"
                            style="height: 52%;"
                        ></div>
                    </div>

                    <span>
                        Qua
                    </span>

                </div>


                <div class="chart-day">

                    <div class="bar-wrapper">
                        <div
                            class="chart-bar empty"
                            style="height: 10%;"
                        ></div>
                    </div>

                    <span>
                        Qui
                    </span>

                </div>


                <div class="chart-day">

                    <div class="bar-wrapper">
                        <div
                            class="chart-bar empty"
                            style="height: 10%;"
                        ></div>
                    </div>

                    <span>
                        Sex
                    </span>

                </div>


                <div class="chart-day">

                    <div class="bar-wrapper">
                        <div
                            class="chart-bar empty"
                            style="height: 10%;"
                        ></div>
                    </div>

                    <span>
                        Sáb
                    </span>

                </div>


                <div class="chart-day">

                    <div class="bar-wrapper">
                        <div
                            class="chart-bar empty"
                            style="height: 10%;"
                        ></div>
                    </div>

                    <span>
                        Dom
                    </span>

                </div>

            </div>

        </div>

    </article>


    <!-- ORÇAMENTO -->

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

            <button
                class="card-action-button"
                type="button"
                aria-label="Ver orçamentos"
            >
                <i data-lucide="chevron-right"></i>
            </button>

        </div>


        <div class="budget-list">

            <!-- ALIMENTAÇÃO -->

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

                    <div
                        class="budget-progress-bar"
                        style="width: 71%;"
                    ></div>

                </div>

                <small>
                    R$ 175 disponíveis
                </small>

            </div>


            <!-- LAZER -->

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

                    <div
                        class="budget-progress-bar"
                        style="width: 56%;"
                    ></div>

                </div>

                <small>
                    R$ 220 disponíveis
                </small>

            </div>

        </div>

    </article>

</section>


<!-- INSIGHTS + ÚLTIMAS TRANSAÇÕES -->

<section class="dashboard-lower-grid">

    <!-- INSIGHTS -->

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
                        Você gastou 18% mais nesta semana
                        do que na semana anterior.
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
                        Você já utilizou 71% do orçamento
                        de alimentação deste mês.
                    </p>

                </div>

            </div>

        </div>

    </article>


    <!-- TRANSAÇÕES -->

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

            <button
                class="card-action-button"
                type="button"
                aria-label="Ver todas as transações"
            >
                <i data-lucide="chevron-right"></i>
            </button>

        </div>


        <div class="transactions-list">

            <!-- DELIVERY -->

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


            <!-- HOSPEDAGEM -->

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


<?php

require BASE_PATH . '/app/Views/layouts/footer.php';

?>