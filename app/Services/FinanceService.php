<?php

declare(strict_types=1);

namespace App\Services;

class FinanceService
{
    public function calculateAvailableBudget(float $limit, float $spent): float
    {
        return max(0, $limit - $spent);
    }

    public function calculateUsagePercentage(float $limit, float $spent): float
    {
        if ($limit <= 0) {
            return 0;
        }

        return min(100, ($spent / $limit) * 100);
    }
}
