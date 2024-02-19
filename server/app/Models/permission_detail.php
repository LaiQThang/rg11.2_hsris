<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Ramsey\Uuid\Uuid;

class permission_detail extends Model
{
    use HasFactory;
    protected $keyType = 'string';

    public $incrementing = false;

    protected $table = 'permission_details';

    protected $primaryKey = 'id';

    protected $fillable = [
        'id',
        'permission_id',
        'permission_list_id',
    ];

    protected static function boot()
    {
        parent::boot();
        self::creating(function($model){
            $model->{$model->getKeyName()} = Uuid::uuid4()->toString();
        });
    }

}
