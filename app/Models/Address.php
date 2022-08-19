<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    use HasFactory;

    protected $fillable = [
        'address', 'city', 'country',
        'postal_code', 'phone',
    ];


    public function order()
    {
        return $this->belongsTo(Order::class);
    }
}
