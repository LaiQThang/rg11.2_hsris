<?php

namespace App\Filters\V1;

use App\Filters\ApiFilter;


class SinhVienFilter extends ApiFilter{
    protected $safeParams = [
        'name' => ['lk'],
    ];

    protected $columnMap = [
        'name' => 'tenSV'
    ];

    protected $operatorMap = [
        'eq' => '=',
        'lt' => '<',
        'lte' => '<=',
        'gt' => '>',
        'gte' => '>=',
        'lk' => 'like',
    ];

    
}