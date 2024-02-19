<?php

namespace App\Filters\V1;

use App\Filters\ApiFilter;


class BienBanPhanCongFilter extends ApiFilter{
    protected $safeParams = [
        'it' => ['eq'],
    ];

    protected $columnMap = [
        'it' => 'idBB'
    ];

    protected $operatorMap = [
        'eq' => '=',
        'lt' => '<',
        'lte' => '<=',
        'gt' => '>',
        'gte' => '>=',
    ];

    
}