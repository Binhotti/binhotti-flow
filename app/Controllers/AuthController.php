<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Models\User;

class AuthController
{
    public function showLogin(): void
    {
        require BASE_PATH . '/app/Views/auth/login.php';
    }

    public function showRegister(): void
    {
        require BASE_PATH . '/app/Views/auth/register.php';
    }

    public function register(): void
    {
        $name = trim($_POST['name'] ?? '');
        $email = trim($_POST['email'] ?? '');
        $password = $_POST['password'] ?? '';

        if ($name === '' || !filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($password) < 8) {
            $_SESSION['error'] = 'Preencha os campos corretamente.';
            header('Location: /register');
            exit;
        }

        $userModel = new User();

        if ($userModel->findByEmail($email)) {
            $_SESSION['error'] = 'Este e-mail já está cadastrado.';
            header('Location: /register');
            exit;
        }

        $userId = $userModel->create($name, $email, password_hash($password, PASSWORD_DEFAULT));

        $_SESSION['user_id'] = $userId;
        header('Location: /');
        exit;
    }

    public function login(): void
    {
        $email = trim($_POST['email'] ?? '');
        $password = $_POST['password'] ?? '';

        $user = (new User())->findByEmail($email);

        if (!$user || !password_verify($password, $user['password_hash'])) {
            $_SESSION['error'] = 'E-mail ou senha inválidos.';
            header('Location: /login');
            exit;
        }

        session_regenerate_id(true);
        $_SESSION['user_id'] = (int) $user['id'];

        header('Location: /');
        exit;
    }

    public function logout(): void
    {
        $_SESSION = [];
        session_destroy();

        header('Location: /login');
        exit;
    }
}
