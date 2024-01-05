<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Ramsey\Uuid\Uuid;

class detai extends Model
{
    use HasFactory;

    protected $keyType = 'string';

    public $incrementing = false;

    protected $table = 'detais';

    protected $fillable = [
        'idDT',
        'tenDT',
        'tomTat',
        'mucTieu',
        'phamVi',
        'nhanXet',
        'ngayLap',
        'ngayHoanThanh',
        'idGV',
        'idHNC',
        'idHD',
        'idGT',
        'diemF',
        'trangThaiGV',
        'trangThaiQT',
        'delete',
    ];

    protected static function boot()
    {
        parent::creating(function($model){
            $model->{$model->getKeyName()} = Uuid::uuid4()->toString();
        });
    }

    public function phieuDiem() : HasMany 
    {
        return $this->hasMany(phieudiem::class, 'idDT', 'idDT');    
    }
}
