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

    protected $fillable = [
        'id',
        'permisson_id',
        'permisson_list_id',
    ];

    protected static function boot()
    {
        parent::creating(function($model){
            $model->{$model->getKeyName()} = Uuid::uuid4()->toString();
        });
    }

}
