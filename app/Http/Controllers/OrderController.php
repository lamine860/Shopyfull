<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Support\Str;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $orders = $request->user()->orders()->paginate(10);
        return Inertia::render('Orders', [
            'orders' => $orders,
        ]);
    }
    public function store(Request $request)
    {
        $request->validate([
            'items' => 'required|array',
            'itemsCount' => 'required|integer',
            'total' => 'required',
        ]);
        $tax =  $request->total * .015;
        $order = $request->user()->orders()->create([
            'total' => $request->total  + $tax,
            'reference' => Str::random(),
            'tax' => $tax,
            'items_count' => $request->itemsCount,
        ]);
        foreach ($request->get('items') as $item) {
            $product = Product::findOrFail($item['id']);
            $order->products()->attach($item['id'], [
                'total' => ($item['price'] * $item['quantity']),
                'quantity' => $item['quantity'],
            ]);
            $product->quantity -= $item['quantity'];
            $product->save();
        }
        return redirect()->route('orders.show', $order);
    }
    public function Show(Order $order)
    {
        $order->load('user', 'products.images', 'addresses');
        return Inertia::render('Order', [
            'order' => $order
        ]);
    }
}
