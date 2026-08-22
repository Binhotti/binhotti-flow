<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Dashboard | Binhotti Flow</title>
</head>

<body>

    <h1>Binhotti Flow</h1>

    <p>
        Login realizado com sucesso.
    </p>

    <form action="<?= url('/logout') ?>" method="POST">
        <button type="submit">
            Sair
        </button>
    </form>

</body>

</html>