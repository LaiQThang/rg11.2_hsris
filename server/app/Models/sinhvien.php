<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Ramsey\Uuid\Uuid;

class sinhvien extends Model
{
    use HasFactory;

    protected $keyType = 'string';

    public $incrementing = false; // Bật/tắt tự động tăng giá trị của khoá chính

    protected $table = 'sinhviens';

    protected $fillable = [
        'idSV',
        'maSV',
        'tenSV',
        'anhDD',
        'lopHC',
        'tinhTrang',
        'soThich',
        'ngaySinh',
        'soCCCD',
        'soDT',
        'email',
        'gioiTinh',
        'diaChi',
        'delete',
        'matKhau',
        'permissionId',
    ];

    protected static function boot()
    {
        parent::creating(function($model){
            $model->{$model->getKeyName()} = Uuid::uuid4()->toString();
        });
    }

}
