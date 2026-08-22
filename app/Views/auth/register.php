<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <title>Criar conta | Binhotti Flow</title>

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
                    Crie sua conta
                </h1>

                <p>
                    Comece a organizar sua vida financeira de forma simples e inteligente.
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
                action="<?= url('/register') ?>"
                method="POST"
            >

                <div class="input-group">

                    <label for="name">
                        Nome
                    </label>

                    <input
                        class="input"
                        id="name"
                        type="text"
                        name="name"
                        placeholder="Seu nome"
                        required
                    >

                </div>

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
                        placeholder="Mínimo de 8 caracteres"
                        minlength="8"
                        required
                    >

                </div>

                <button
                    class="button"
                    type="submit"
                >
                    Criar conta
                </button>

            </form>

            <div class="auth-footer">

                Já possui uma conta?

                <a href="<?= url('/login') ?>">
                    Entrar
                </a>

            </div>

        </section>

    </main>

</body>

</html>