-- Base inicial do banco de dados

CREATE DATABASE IF NOT EXISTS binhotti_flow
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE binhotti_flow;

SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS goal_contributions;
DROP TABLE IF EXISTS goals;
DROP TABLE IF EXISTS budgets;
DROP TABLE IF EXISTS recurring_transactions;
DROP TABLE IF EXISTS installments;
DROP TABLE IF EXISTS transactions;
DROP TABLE IF EXISTS credit_cards;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS accounts;
DROP TABLE IF EXISTS users;

SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE users (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    email VARCHAR(190) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    avatar VARCHAR(255) NULL,
    currency CHAR(3) NOT NULL DEFAULT 'BRL',
    timezone VARCHAR(80) NOT NULL DEFAULT 'America/Sao_Paulo',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE accounts (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    name VARCHAR(100) NOT NULL,
    institution VARCHAR(120) NULL,
    type ENUM('checking', 'savings', 'cash', 'investment', 'other') NOT NULL DEFAULT 'checking',
    initial_balance DECIMAL(15,2) NOT NULL DEFAULT 0.00,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_accounts_user
        FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE,

    INDEX idx_accounts_user (user_id),
    INDEX idx_accounts_active (user_id, is_active)
) ENGINE=InnoDB;

CREATE TABLE categories (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    parent_id BIGINT UNSIGNED NULL,
    name VARCHAR(100) NOT NULL,
    type ENUM('income', 'expense') NOT NULL,
    icon VARCHAR(80) NULL,
    color VARCHAR(20) NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_categories_user
        FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_categories_parent
        FOREIGN KEY (parent_id) REFERENCES categories(id)
        ON DELETE SET NULL,

    INDEX idx_categories_user_type (user_id, type),
    INDEX idx_categories_parent (parent_id)
) ENGINE=InnoDB;

CREATE TABLE credit_cards (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    account_id BIGINT UNSIGNED NULL,
    name VARCHAR(100) NOT NULL,
    brand VARCHAR(50) NULL,
    last_four CHAR(4) NULL,
    limit_amount DECIMAL(15,2) NOT NULL DEFAULT 0.00,
    closing_day TINYINT UNSIGNED NOT NULL,
    due_day TINYINT UNSIGNED NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_cards_user
        FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_cards_account
        FOREIGN KEY (account_id) REFERENCES accounts(id)
        ON DELETE SET NULL,

    INDEX idx_cards_user (user_id),
    INDEX idx_cards_account (account_id)
) ENGINE=InnoDB;

CREATE TABLE transactions (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    account_id BIGINT UNSIGNED NULL,
    credit_card_id BIGINT UNSIGNED NULL,
    category_id BIGINT UNSIGNED NULL,
    transfer_account_id BIGINT UNSIGNED NULL,

    type ENUM('income', 'expense', 'transfer') NOT NULL,
    description VARCHAR(180) NOT NULL,
    amount DECIMAL(15,2) NOT NULL,

    transaction_date DATE NOT NULL,
    due_date DATE NULL,
    paid_at DATETIME NULL,
    invoice_month DATE NULL,

    status ENUM('pending', 'paid', 'cancelled') NOT NULL DEFAULT 'paid',
    notes TEXT NULL,

    installment_group CHAR(36) NULL,
    recurring_id BIGINT UNSIGNED NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_transactions_user
        FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_transactions_account
        FOREIGN KEY (account_id) REFERENCES accounts(id)
        ON DELETE SET NULL,

    CONSTRAINT fk_transactions_card
        FOREIGN KEY (credit_card_id) REFERENCES credit_cards(id)
        ON DELETE SET NULL,

    CONSTRAINT fk_transactions_category
        FOREIGN KEY (category_id) REFERENCES categories(id)
        ON DELETE SET NULL,

    CONSTRAINT fk_transactions_transfer_account
        FOREIGN KEY (transfer_account_id) REFERENCES accounts(id)
        ON DELETE SET NULL,

    INDEX idx_transactions_user_date (user_id, transaction_date),
    INDEX idx_transactions_user_type (user_id, type),
    INDEX idx_transactions_account (account_id),
    INDEX idx_transactions_card (credit_card_id),
    INDEX idx_transactions_category (category_id),
    INDEX idx_transactions_status_due (status, due_date),
    INDEX idx_transactions_installment_group (installment_group)
) ENGINE=InnoDB;

CREATE TABLE installments (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    transaction_id BIGINT UNSIGNED NOT NULL,
    installment_number SMALLINT UNSIGNED NOT NULL,
    total_installments SMALLINT UNSIGNED NOT NULL,
    amount DECIMAL(15,2) NOT NULL,
    due_date DATE NOT NULL,
    invoice_month DATE NULL,
    status ENUM('pending', 'paid', 'cancelled') NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_installments_user
        FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_installments_transaction
        FOREIGN KEY (transaction_id) REFERENCES transactions(id)
        ON DELETE CASCADE,

    UNIQUE KEY uq_installment_number (transaction_id, installment_number),
    INDEX idx_installments_user_due (user_id, due_date),
    INDEX idx_installments_status (status)
) ENGINE=InnoDB;

CREATE TABLE recurring_transactions (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    account_id BIGINT UNSIGNED NULL,
    credit_card_id BIGINT UNSIGNED NULL,
    category_id BIGINT UNSIGNED NULL,

    type ENUM('income', 'expense') NOT NULL,
    description VARCHAR(180) NOT NULL,
    amount DECIMAL(15,2) NOT NULL,

    frequency ENUM('weekly', 'monthly', 'yearly') NOT NULL DEFAULT 'monthly',
    interval_value SMALLINT UNSIGNED NOT NULL DEFAULT 1,
    next_date DATE NOT NULL,
    end_date DATE NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_recurring_user
        FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_recurring_account
        FOREIGN KEY (account_id) REFERENCES accounts(id)
        ON DELETE SET NULL,

    CONSTRAINT fk_recurring_card
        FOREIGN KEY (credit_card_id) REFERENCES credit_cards(id)
        ON DELETE SET NULL,

    CONSTRAINT fk_recurring_category
        FOREIGN KEY (category_id) REFERENCES categories(id)
        ON DELETE SET NULL,

    INDEX idx_recurring_next (user_id, is_active, next_date)
) ENGINE=InnoDB;

CREATE TABLE budgets (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    category_id BIGINT UNSIGNED NOT NULL,
    reference_month DATE NOT NULL,
    limit_amount DECIMAL(15,2) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_budgets_user
        FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_budgets_category
        FOREIGN KEY (category_id) REFERENCES categories(id)
        ON DELETE CASCADE,

    UNIQUE KEY uq_budget_month_category (user_id, category_id, reference_month),
    INDEX idx_budgets_user_month (user_id, reference_month)
) ENGINE=InnoDB;

CREATE TABLE goals (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    name VARCHAR(140) NOT NULL,
    target_amount DECIMAL(15,2) NOT NULL,
    target_date DATE NULL,
    icon VARCHAR(80) NULL,
    status ENUM('active', 'completed', 'paused', 'cancelled') NOT NULL DEFAULT 'active',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_goals_user
        FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE,

    INDEX idx_goals_user_status (user_id, status)
) ENGINE=InnoDB;

CREATE TABLE goal_contributions (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    goal_id BIGINT UNSIGNED NOT NULL,
    amount DECIMAL(15,2) NOT NULL,
    contributed_at DATE NOT NULL,
    notes VARCHAR(255) NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_goal_contributions_user
        FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_goal_contributions_goal
        FOREIGN KEY (goal_id) REFERENCES goals(id)
        ON DELETE CASCADE,

    INDEX idx_goal_contributions_goal (goal_id, contributed_at)
) ENGINE=InnoDB;
