<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <title>Entrar | Binhotti Flow</title>

    <link
        rel="stylesheet"
        href="<?= url('/assets/css/app.css') ?>"
    >
</head>

<body class="auth-page">

    <main class="auth-wrapper">

        <div class="auth-brand">

            <div class="auth-brand-symbol">
                BF
            </div>

            <span class="auth-brand-name">
                Binhotti Flow
            </span>

        </div>

        <section class="auth-card">

            <div class="auth-header">

                <h1>
                    Bem-vindo de volta
                </h1>

                <p>
                    Acesse sua conta para continuar acompanhando sua vida financeira.
                </p>

            </div>

            <?php if (!empty($_SESSION['error'])): ?>

                <div class="auth-error">
                    <?= htmlspecialchars($_SESSION['error']) ?>
                </div>

                <?php unset($_SESSION['error']); ?>

            <?php endif; ?>

            <form
                class="auth-form"
                action="<?= url('/login') ?>"
                method="POST"
            >

                <div class="input-group">

                    <label for="email">
                        E-mail
                    </label>

                    <input
                        class="input"
                        id="email"
                        type="email"
                        name="email"
                        placeholder="seu@email.com"
                        required
                    >

                </div>

                <div class="input-group">

                    <label for="password">
                        Senha
                    </label>

                    <input
                        class="input"
                        id="password"
                        type="password"
                        name="password"
                        placeholder="••••••••"
                        required
                    >

                </div>

                <button
                    class="button"
                    type="submit"
                >
                    Entrar
                </button>

            </form>

            <div class="auth-footer">

                Ainda não tem uma conta?

                <a href="<?= url('/register') ?>">
                    Criar conta
                </a>

            </div>

        </section>

    </main>

</body>

</html>