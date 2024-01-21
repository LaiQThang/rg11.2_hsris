<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Ramsey\Uuid\Uuid;

class giaithuong extends Model
{
    use HasFactory;

    protected $keyType = 'string';

    public $incrementing = false;

    protected $table = 'giaithuongs';

    protected $primaryKey = 'idGT';

    protected $fillable = [
        'idGT',
        'tenGiai',
        'giaTriGiai',
        'ngayLap',
        'moTa',
        'delete',
    ];

    protected static function boot()
    {
        parent::boot();
        self::creating(function($model){
            $model->{$model->getKeyName()} = Uuid::uuid4()->toString();
        });
    }

    public function deTai() : HasMany 
    {
        return $this->hasMany(detai::class, 'idGT', 'idGT');
    }
}
