<?php

namespace App\Filters\V1;

use App\Filters\ApiFilter;
use Illuminate\Http\Request;


class HuongNghienCuuFilter extends ApiFilter{
    protected $safeParams = [
        'name' => ['eq'],
        'dateCreated' => ['eq'],
        'quantity' => ['eq', 'gt', 'lt'],
        'summary' => ['eq'],
        'target' => ['eq'],
        'limit' => ['eq'],
        'note' => ['eq'],
        'type' => ['eq']
    ];

    protected $columnMap = [
        'name' => 'tenHNC',
        'dateCreated' => 'ngayTao',
        'quantity' => 'soLuong', //url nhập vào quantity thì query là soLuong
        'summary' => 'tomTat',
        'target' => 'mucTieu',
        'limit' => 'phamVi',
        'note' => 'ghiChu',
        'type' => 'soLuong'
    ];

    protected $operatorMap = [
        'eq' => '=',
        'lt' => '<',
        'lte' => '<=',
        'gt' => '>',
        'gte' => '>=',
    ];

    
}