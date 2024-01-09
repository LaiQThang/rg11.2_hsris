<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Ramsey\Uuid\Uuid;

class ct_hncgv extends Model
{
    use HasFactory;
    
    protected $keyType = 'string';

    public $incrementing = false;

    protected $table = 'ct_hncgv';

    protected $primaryKey = 'id';

    protected $fillable = [
        'id',
        'idHNC',
        'idGV',
    ];

    protected static function boot()
    {
        parent::boot();
        self::creating(function($model){
            $model->{$model->getKeyName()} = Uuid::uuid4()->toString();
        });
    }

    // public function chitiet() : HasMany 
    // {
    //     return $this->hasMany(huongnghiencuu::class, 'idHNC', 'idHNC');
    // }
}
