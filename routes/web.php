<?php

declare(strict_types=1);

use App\Controllers\AuthController;
use App\Controllers\DashboardController;
use App\Controllers\AccountController;
use App\Controllers\TransactionController;

return [
    'GET /' => [
        DashboardController::class,
        'index'
    ],

    'GET /login' => [
        AuthController::class,
        'showLogin'
    ],

    'POST /login' => [
        AuthController::class,
        'login'
    ],

    'GET /register' => [
        AuthController::class,
        'showRegister'
    ],

    'POST /register' => [
        AuthController::class,
        'register'
    ],

    'POST /logout' => [
        AuthController::class,
        'logout'
    ],

    'GET /accounts' => [
        AccountController::class,
        'index'
    ],

    'GET /accounts/create' => [
        AccountController::class,
        'create'
    ],

    'POST /accounts' => [
        AccountController::class,
        'store'
    ],

    'GET /accounts/edit' => [
        AccountController::class,
        'edit'
    ],

    'POST /accounts/update' => [
        AccountController::class,
        'update'
    ],

    'POST /accounts/toggle' => [
        AccountController::class,
        'toggle'
    ],
    
    'GET /transactions' => [
        TransactionController::class,
        'index'
    ],

    'GET /transactions/create' => [
        TransactionController::class,
        'create'
    ],

    'POST /transactions' => [
        TransactionController::class,
        'store'
    ],
];