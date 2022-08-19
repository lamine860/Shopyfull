<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function show(Product $product)
    {
        $similarProducts = Product::with('images')
            ->whereCategory($product->category)
            ->where('id', '!=', $product->id)
            ->get();
        $product->load('images');
        return Inertia::render('Product', [
            'product' => $product,
            'similarProducts' =>  $similarProducts,
        ]);
    }
}
