<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard | Binhotti Flow</title>
    <link rel="stylesheet" href="/assets/css/app.css">
</head>
<body>
    <main class="dashboard-shell">
        <aside class="sidebar">
            <div class="brand">Binhotti Flow</div>

            <nav>
                <a class="active" href="/">Visão geral</a>
                <a href="#">Transações</a>
                <a href="#">Contas</a>
                <a href="#">Cartões</a>
                <a href="#">Planejamento</a>
                <a href="#">Metas</a>
                <a href="#">Relatórios</a>
                <a href="#">Assistente</a>
            </nav>

            <form method="POST" action="/logout">
                <button class="secondary" type="submit">Sair</button>
            </form>
        </aside>

        <section class="content">
            <p class="eyebrow">BINHOTTI FLOW</p>
            <h1>Visão geral</h1>
            <p class="muted">Sua base já está funcionando. Agora começamos a alimentar o dashboard.</p>

            <div class="grid">
                <article class="card">
                    <span>Patrimônio</span>
                    <strong>R$ 0,00</strong>
                </article>

                <article class="card">
                    <span>Receitas</span>
                    <strong>R$ 0,00</strong>
                </article>

                <article class="card">
                    <span>Despesas</span>
                    <strong>R$ 0,00</strong>
                </article>
            </div>
        </section>
    </main>
</body>
</html>
