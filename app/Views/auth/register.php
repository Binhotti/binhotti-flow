<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Criar conta | Binhotti Flow</title>
    <link rel="stylesheet" href="/assets/css/app.css">
</head>
<body class="auth-page">
    <main class="auth-card">
        <p class="brand">Binhotti Flow</p>
        <h1>Crie sua conta</h1>

        <?php if (!empty($_SESSION['error'])): ?>
            <p class="error"><?= htmlspecialchars($_SESSION['error']) ?></p>
            <?php unset($_SESSION['error']); ?>
        <?php endif; ?>

        <form method="POST" action="/register">
            <label>
                Nome
                <input type="text" name="name" required>
            </label>

            <label>
                E-mail
                <input type="email" name="email" required>
            </label>

            <label>
                Senha
                <input type="password" name="password" minlength="8" required>
            </label>

            <button type="submit">Criar conta</button>
        </form>

        <a href="/login">Já tenho uma conta</a>
    </main>
</body>
</html>
