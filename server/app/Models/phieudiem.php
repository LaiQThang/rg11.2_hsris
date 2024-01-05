<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Ramsey\Uuid\Uuid;

class phieudiem extends Model
{
    use HasFactory;

    protected $keyType = 'string';

    public $incrementing = false;

    protected $table = 'phieudiems';

    protected $fillable = [
        'idPD',
        'tenPD',
        'ngayLap',
        'idGV',
        'idDT',
        'idHD',
        'diem',
        'delete',
        'ghiChu',
    ];

    protected static function boot()
    {
        parent::creating(function($model){
            $model->{$model->getKeyName()} = Uuid::uuid4()->toString();
        });
    }
}
