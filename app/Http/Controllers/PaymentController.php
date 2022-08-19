<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Stripe\StripeClient;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function createIntent(Order $order)
    {
        $stripe = new StripeClient(env('STRIPE_SECRET_KEY'));
        $paymentItent = $stripe->paymentIntents->create([
            'amount' => $order->total * 100,
            'currency' => 'usd',
            'payment_method_types' => ['card'],

        ]);
        return $paymentItent->client_secret;
    }
    public function pay(Request $request, Order $order)
    {
        $data = $request->validate([
            'address' => 'required',
            'city' => 'required',
            'country' => 'required',
            'phone' => 'required',
            'postal_code' => 'required',
        ]);
        $order->addresses()->create($data);
        $order->load('addresses');
        return $order;
    }
    public function confirm(Request $request, Order $order)
    {
        $stripe = new StripeClient(env('STRIPE_SECRET_KEY'));
        $paymentResponse = $stripe->paymentIntents->retrieve($request->query('payment_intent'));
        $order->update([
            'payment_id' => $paymentResponse->id,
            'status' => $paymentResponse->status,
            'paid' => true,
            'paid_at' => now(),
        ]);
        return redirect()->route('orders.show', $order);
    }
}
