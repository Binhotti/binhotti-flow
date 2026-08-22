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

        <a href="<?= url('/') ?>" class="sidebar-link
            <?= $activePage === 'dashboard'
                ? 'active'
                : '' ?>">
            <span class="sidebar-link-icon">
                <i data-lucide="layout-dashboard"></i>
            </span>

            <span class="sidebar-link-text">
                Visão geral
            </span>
        </a>

        <a href="<?= url('/transactions') ?>" class="sidebar-link
            <?= $activePage === 'transactions'
                ? 'active'
                : '' ?>">
            <span class="sidebar-link-icon">
                <i data-lucide="arrow-left-right"></i>
            </span>

            <span class="sidebar-link-text">
                Transações
            </span>
        </a>

        <a href="<?= url('/accounts') ?>" class="sidebar-link
            <?= $activePage === 'accounts'
                ? 'active'
                : '' ?>">
            <span class="sidebar-link-icon">
                <i data-lucide="wallet"></i>
            </span>

            <span class="sidebar-link-text">
                Contas
            </span>
        </a>

        <a href="#" class="sidebar-link
            <?= $activePage === 'cards'
                ? 'active'
                : '' ?>">
            <span class="sidebar-link-icon">
                <i data-lucide="credit-card"></i>
            </span>

            <span class="sidebar-link-text">
                Cartões
            </span>
        </a>

        <a href="#" class="sidebar-link
            <?= $activePage === 'planning'
                ? 'active'
                : '' ?>">
            <span class="sidebar-link-icon">
                <i data-lucide="calendar-range"></i>
            </span>

            <span class="sidebar-link-text">
                Planejamento
            </span>
        </a>

        <a href="#" class="sidebar-link
            <?= $activePage === 'goals'
                ? 'active'
                : '' ?>">
            <span class="sidebar-link-icon">
                <i data-lucide="target"></i>
            </span>

            <span class="sidebar-link-text">
                Metas
            </span>
        </a>

        <a href="#" class="sidebar-link
            <?= $activePage === 'reports'
                ? 'active'
                : '' ?>">
            <span class="sidebar-link-icon">
                <i data-lucide="chart-no-axes-combined"></i>
            </span>

            <span class="sidebar-link-text">
                Relatórios
            </span>
        </a>

        <a href="#" class="sidebar-link
            <?= $activePage === 'assistant'
                ? 'active'
                : '' ?>">
            <span class="sidebar-link-icon">
                <i data-lucide="sparkles"></i>
            </span>

            <span class="sidebar-link-text">
                Assistente
            </span>
        </a>

    </nav>

    <div class="sidebar-bottom">

        <a href="#" class="sidebar-link
            <?= $activePage === 'settings'
                ? 'active'
                : '' ?>">
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