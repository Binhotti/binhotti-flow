<?php

$pageTitle =
    $pageTitle ?? 'Binhotti Flow';

$pageDescription =
    $pageDescription ?? '';

$activePage =
    $activePage ?? '';

$headerAction =
    $headerAction ?? '';
?>

<!DOCTYPE html>
<html lang="pt-BR">

<head>

    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <title>
        <?= htmlspecialchars($pageTitle) ?> | Binhotti Flow
    </title>

    <link
        rel="stylesheet"
        href="<?= url('/assets/css/app.css') ?>"
    >

    <script
        src="https://unpkg.com/lucide@latest"
        defer
    ></script>

</head>

<body class="dashboard-page">

    <div class="dashboard-shell">


        <!-- SIDEBAR -->

        <?php

        require BASE_PATH .
            '/app/Views/layouts/sidebar.php';

        ?>


        <!-- MAIN -->

        <main class="dashboard-main">


            <!-- HEADER -->

            <header class="dashboard-header">

                <div class="dashboard-header-left">

                    <h1>
                        <?= htmlspecialchars(
                            $pageTitle
                        ) ?>
                    </h1>


                    <?php if ($pageDescription !== ''): ?>

                        <p>
                            <?= htmlspecialchars(
                                $pageDescription
                            ) ?>
                        </p>

                    <?php endif; ?>

                </div>


                <!-- AÇÕES DO HEADER -->

                <div class="dashboard-header-actions">

                    <?= $headerAction ?>

                </div>

            </header>


            <!--
            ============================================================
            CONTEÚDO DA PÁGINA

            IMPORTANTE:
            Essa div começa aqui e só será fechada no footer.php.
            ============================================================
            -->

            <div class="dashboard-content">