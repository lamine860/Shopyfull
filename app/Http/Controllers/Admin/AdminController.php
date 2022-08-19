<?php

namespace App\Http\Controllers\Admin;

use App\Models\User;
use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;

class AdminController extends Controller
{
    public function index()
    {
        $users = User::whereAdmin(false);
        $products = Product::all();
        $orders = Order::all();


        return  Inertia::render('Dashboard', [
            'users' => $users,
            'products' => $products,
            'orders' => $orders,
        ]);
    }
}
