<?php

namespace App\Models;

use Ramsey\Uuid\Uuid;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ct_hnc extends Model
{
    use HasFactory;

    protected $keyType = 'string';

    public $incrementing = false;

    protected $table = 'ct_hnc';

    protected $primaryKey = 'id';

    protected $fillable = [
        'id',
        'idHNC',
        'idGV',
        'idSV',
        'dateCreate'
    ];

    protected static function boot()
    {
        parent::boot();
        self::creating(function($model){
            $model->{$model->getKeyName()} = Uuid::uuid4()->toString();
        });
    }

    public function HuongNghienCuu()
    {
        return $this->morphToMany(huongnghiencuu::class, 'idHNC');
    }

    public function SinhVien()
    {
        return $this->morphToMany(sinhvien::class, 'idSV');
    }
}
