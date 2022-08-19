<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderAdminController extends Controller
{
    public function index(Request $request)
    {
        $orders =  Order::paginate(10);
        return Inertia::render('Admin/Orders', [
            'orders' => $orders,
        ]);
    }
    public function destroy(Request $request, Order $order)
    {
        $order->delete();
        return redirect()->back();
    }
    public function delivered(Request $request, Order $order)
    {
        if (!$order->paid) return  redirect()->back();
        $order->update([
            'delivered' => true,
            'delivered_at' => now(),
        ]);
        return redirect()->back();
    }
}
