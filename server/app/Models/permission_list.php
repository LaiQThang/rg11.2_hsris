<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Ramsey\Uuid\Uuid;

class permission_list extends Model
{
    use HasFactory;

    protected $keyType = 'string';

    public $incrementing = false;

    protected $table = 'permission_lists';

    protected $primaryKey = 'id';

    protected $fillable = [
        'id',
        'tenQuyen',
        'tokenBase',
    ];

    protected static function boot()
    {
        parent::boot();
        self::creating(function($model){
            $model->{$model->getKeyName()} = Uuid::uuid4()->toString();
        });
    }

    public function permissionDetail() : HasMany
    {
        return $this->hasMany(permission_detail::class, 'permission_list_id', 'id');
    }

    public function permission() : BelongsToMany 
    {
        return $this->belongsToMany(permission::class, 'permission_details', 'permission_list_id', 'permission_id');
    }
}
