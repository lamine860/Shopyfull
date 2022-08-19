<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'tax', 'total', 'status', 'delivered',
        'delivered_at', 'paid',
        'paid_at', 'payment_id',
        'reference', 'items_count',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function addresses()
    {
        return $this->hasMany(Address::class);
    }

    public function products()
    {
        return $this->belongsToMany(Product::class)->withPivot(['total', 'quantity']);
    }
}
