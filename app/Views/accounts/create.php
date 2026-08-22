<?php

$pageTitle = 'Nova conta';

$pageDescription =
    'Adicione uma conta para começar a acompanhar seu saldo.';

$activePage = 'accounts';


/*
|--------------------------------------------------------------------------
| Ação do header
|--------------------------------------------------------------------------
*/

ob_start();
?>

<a
    href="<?= url('/accounts') ?>"
    class="header-icon-button"
    aria-label="Voltar"
>
    <i data-lucide="arrow-left"></i>
</a>

<?php

$headerAction = ob_get_clean();


require BASE_PATH . '/app/Views/layouts/header.php';

?>


<section class="account-form-wrapper">

    <div class="account-form-intro">

        <div class="account-form-icon">
            <i data-lucide="wallet-cards"></i>
        </div>

        <div>

            <h2>
                Informações da conta
            </h2>

            <p>
                Você poderá editar esses dados depois.
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


    <form
        class="account-form"
        action="<?= url('/accounts') ?>"
        method="POST"
    >

        <!-- NOME -->

        <div class="input-group">

            <label for="name">
                Nome da conta
            </label>

            <input
                class="input"
                id="name"
                name="name"
                type="text"
                placeholder="Ex.: Nubank, Inter, Carteira"
                required
            >

            <small class="input-help">
                O nome que você quer ver no Binhotti Flow.
            </small>

        </div>


        <!-- INSTITUIÇÃO -->

        <div class="input-group">

            <label for="institution">
                Instituição
            </label>

            <input
                class="input"
                id="institution"
                name="institution"
                type="text"
                placeholder="Ex.: Nubank, Itaú, Banco Inter"
            >

            <small class="input-help">
                Esse campo é opcional.
            </small>

        </div>


        <div class="account-form-grid">

            <!-- TIPO -->

            <div class="input-group">

                <label for="type">
                    Tipo da conta
                </label>

                <select
                    class="input"
                    id="type"
                    name="type"
                    required
                >

                    <option value="">
                        Selecione
                    </option>

                    <option value="checking">
                        Conta corrente
                    </option>

                    <option value="savings">
                        Poupança
                    </option>

                    <option value="cash">
                        Dinheiro
                    </option>

                    <option value="investment">
                        Investimentos
                    </option>

                    <option value="other">
                        Outra
                    </option>

                </select>

            </div>


            <!-- SALDO -->

            <div class="input-group">

                <label for="initial_balance">
                    Saldo atual
                </label>

                <div class="money-input">

                    <span>
                        R$
                    </span>

                    <input
                        id="initial_balance"
                        name="initial_balance"
                        type="text"
                        inputmode="decimal"
                        placeholder="0,00"
                        value="0,00"
                        required
                    >

                </div>

                <small class="input-help">
                    Informe quanto existe nessa conta hoje.
                </small>

            </div>

        </div>


        <!-- NOTA -->

        <div class="account-form-note">

            <i data-lucide="info"></i>

            <p>
                Esse saldo será usado como ponto de partida.
                Depois, o Binhotti Flow calculará o saldo
                com base nas suas movimentações.
            </p>

        </div>


        <!-- AÇÕES -->

        <div class="account-form-actions">

            <a
                href="<?= url('/accounts') ?>"
                class="account-cancel-button"
            >
                Cancelar
            </a>

            <button
                class="button account-save-button"
                type="submit"
            >
                <i data-lucide="plus"></i>

                Adicionar conta
            </button>

        </div>

    </form>

</section>


<script>
    document.addEventListener(
        'DOMContentLoaded',
        () => {
            const balanceInput =
                document.querySelector('#initial_balance');

            if (!balanceInput) {
                return;
            }

            balanceInput.addEventListener(
                'input',
                event => {
                    let value =
                        event.target.value.replace(/\D/g, '');

                    if (value === '') {
                        event.target.value = '0,00';
                        return;
                    }

                    value =
                        (Number(value) / 100).toLocaleString(
                            'pt-BR',
                            {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            }
                        );

                    event.target.value = value;
                }
            );
        }
    );
</script>


<?php

require BASE_PATH . '/app/Views/layouts/footer.php';

?>