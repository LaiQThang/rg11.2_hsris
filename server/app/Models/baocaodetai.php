<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Ramsey\Uuid\Uuid;

class baocaodetai extends Model
{
    use HasFactory;

    protected $keyType = 'string';

    public $incrementing = false;

    protected $table = 'baocaodetais';

    protected $fillable = [
        'idBC',
        'tenBC',
        'ngayLap',
        'ngayKetThuc',
        'tinhTrang',
        'ghiChu',
        'idGV',
    ];

    protected static function boot()
    {
        parent::creating(function($model){
            $model->{$model->getKeyName()} = Uuid::uuid4()->toString();
        });
    }

    public function nhanXetBaoCao() : HasMany 
    {
        return $this->hasMany(nhanxetbaocao::class, 'idBC', 'idBC');
    }
}
