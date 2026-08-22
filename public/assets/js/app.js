function updateTransactionType() {

    const selected =
        document.querySelector(
            'input[name="type"]:checked'
        )?.value;

    const accountLabel =
        document.querySelector(
            '#account-label'
        );

    const isTransfer =
        selected === 'transfer';


    // Mostra o destino apenas em transferências
    destination.hidden = !isTransfer;

    destinationSelect.required = isTransfer;


    // Altera o nome da conta principal
    if (selected === 'expense') {

        accountLabel.textContent =
            'Conta de saída';

    } else if (selected === 'income') {

        accountLabel.textContent =
            'Conta de entrada';

    } else if (selected === 'transfer') {

        accountLabel.textContent =
            'Conta de origem';
    }
}