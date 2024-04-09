<?php

namespace App\Filters\V1;

use App\Filters\ApiFilter;


class GiangVienFilter extends ApiFilter{
    protected $safeParams = [
        'name' => ['lk'],
    ];

    protected $columnMap = [
        'name' => 'tenGV'
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