<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Entrar | Binhotti Flow</title>
    <link rel="stylesheet" href="/assets/css/app.css">
</head>
<body class="auth-page">
    <main class="auth-card">
        <p class="brand">Binhotti Flow</p>
        <h1>Bem-vindo de volta</h1>

        <?php if (!empty($_SESSION['error'])): ?>
            <p class="error"><?= htmlspecialchars($_SESSION['error']) ?></p>
            <?php unset($_SESSION['error']); ?>
        <?php endif; ?>

        <form method="POST" action="/login">
            <label>
                E-mail
                <input type="email" name="email" required>
            </label>

            <label>
                Senha
                <input type="password" name="password" required>
            </label>

            <button type="submit">Entrar</button>
        </form>

        <a href="/register">Criar conta</a>
    </main>
</body>
</html>
