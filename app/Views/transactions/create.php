<?php

$pageTitle =
    'Nova transação';

$pageDescription =
    'Registre uma movimentação financeira.';

$activePage =
    'transactions';


ob_start();
?>

<a href="<?= url('/transactions') ?>" class="header-icon-button" aria-label="Voltar">
    <i data-lucide="arrow-left"></i>
</a>

<?php

$headerAction =
    ob_get_clean();

require BASE_PATH .
    '/app/Views/layouts/header.php';

?>


<section class="account-form-wrapper">

    <div class="account-form-intro">

        <div class="account-form-icon">
            <i data-lucide="arrow-left-right"></i>
        </div>

        <div>

            <h2>
                Informações da transação
            </h2>

            <p>
                Registre uma receita, despesa ou transferência.
            </p>

        </div>

    </div>


    <?php if (!empty($_SESSION['error'])): ?>

        <div class="flash-message error">

            <?= htmlspecialchars(
                $_SESSION['error']
            ) ?>

        </div>

        <?php unset($_SESSION['error']); ?>

    <?php endif; ?>


    <form class="account-form" action="<?= url('/transactions') ?>" method="POST">


        <!-- TIPO -->

        <div class="transaction-type-selector">

            <label class="transaction-type-option">

                <input type="radio" name="type" value="expense" checked>

                <span>
                    <i data-lucide="arrow-up-right"></i>

                    Despesa
                </span>

            </label>


            <label class="transaction-type-option">

                <input type="radio" name="type" value="income">

                <span>
                    <i data-lucide="arrow-down-left"></i>

                    Receita
                </span>

            </label>


            <label class="transaction-type-option">

                <input type="radio" name="type" value="transfer">

                <span>
                    <i data-lucide="arrow-left-right"></i>

                    Transferência
                </span>

            </label>

        </div>


        <!-- DESCRIÇÃO -->

        <div class="input-group">

            <label for="description">
                Descrição
            </label>

            <input class="input" id="description" name="description" type="text" placeholder="Ex.: Supermercado"
                required>

        </div>


        <!-- VALOR -->

        <div class="input-group">

            <label for="amount">
                Valor
            </label>

            <div class="money-input">

                <span>
                    R$
                </span>

                <input id="amount" name="amount" type="text" inputmode="decimal" value="0,00" required>

            </div>

        </div>


        <div class="account-form-grid">


            <!-- CONTA -->

            <div class="input-group">

                <label for="account_id" id="account-label">
                    Conta de saída
                </label>

                <select class="input" id="account_id" name="account_id" required>

                    <option value="">
                        Selecione
                    </option>


                    <?php foreach (
                        $accounts as $account
                    ): ?>

                        <option value="<?= $account['id'] ?>">
                            <?= htmlspecialchars(
                                $account['name']
                            ) ?>
                        </option>

                    <?php endforeach; ?>

                </select>

            </div>


            <!-- DATA -->

            <div class="input-group">

                <label for="transaction_date">
                    Data
                </label>

                <input class="input" id="transaction_date" name="transaction_date" type="date"
                    value="<?= date('Y-m-d') ?>" required>

            </div>

        </div>


        <!-- DESTINO -->

        <div class="input-group" id="destination-account" hidden>

            <label for="transfer_account_id">
                Conta de destino
            </label>

            <select class="input" id="transfer_account_id" name="transfer_account_id">

                <option value="">
                    Selecione
                </option>


                <?php foreach (
                    $accounts as $account
                ): ?>

                    <option value="<?= $account['id'] ?>">
                        <?= htmlspecialchars(
                            $account['name']
                        ) ?>
                    </option>

                <?php endforeach; ?>

            </select>

        </div>


        <div class="account-form-actions">

            <a href="<?= url('/transactions') ?>" class="account-cancel-button">
                Cancelar
            </a>

            <button class="button account-save-button" type="submit">
                <i data-lucide="check"></i>

                Salvar transação
            </button>

        </div>

    </form>

</section>


<script>

    const originAccount =
    document.querySelector('#account_id');

const destinationAccount =
    document.querySelector('#transfer_account_id');


function updateDestinationOptions() {

    const originValue =
        originAccount.value;

    const options =
        destinationAccount.querySelectorAll('option');


    options.forEach(option => {

        if (option.value === '') {
            return;
        }

        option.disabled =
            option.value === originValue;
    });

    if (
        destinationAccount.value ===
        originValue
    ) {
        destinationAccount.value = '';
    }
}


originAccount.addEventListener(
    'change',
    updateDestinationOptions
);


updateDestinationOptions();

    document.addEventListener(
        'DOMContentLoaded',
        () => {

            const typeInputs =
                document.querySelectorAll(
                    'input[name="type"]'
                );

            const destination =
                document.querySelector(
                    '#destination-account'
                );

            const destinationSelect =
                document.querySelector(
                    '#transfer_account_id'
                );


            function updateTransactionType() {

                const selected =
                    document.querySelector(
                        'input[name="type"]:checked'
                    )?.value;


                const isTransfer =
                    selected === 'transfer';


                destination.hidden =
                    !isTransfer;


                destinationSelect.required =
                    isTransfer;
            }


            typeInputs.forEach(
                input => {
                    input.addEventListener(
                        'change',
                        updateTransactionType
                    );
                }
            );


            updateTransactionType();


            /*
             * Formatação monetária
             */

            const amountInput =
                document.querySelector(
                    '#amount'
                );


            amountInput.addEventListener(
                'input',
                event => {

                    let value =
                        event.target.value
                            .replace(/\D/g, '');


                    if (value === '') {

                        event.target.value =
                            '0,00';

                        return;
                    }


                    event.target.value =
                        (
                            Number(value) / 100
                        ).toLocaleString(
                            'pt-BR',
                            {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            }
                        );
                }
            );

        }
    );

</script>


<?php

require BASE_PATH .
    '/app/Views/layouts/footer.php';

?>