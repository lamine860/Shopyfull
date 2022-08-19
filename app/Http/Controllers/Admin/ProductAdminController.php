<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProductRequest;
use App\Models\Product;
use Inertia\Inertia;

class ProductAdminController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Products/ProductList', [
            'products' => Product::with('images')->get(),
        ]);
    }
    public function create()
    {
        return Inertia::render('Admin/Products/CreateProduct', []);
    }
    public function edit(Product $product)
    {
        $product->load('images');
        return Inertia::render('Admin/Products/EditProduct', [
            'product' => $product
        ]);
    }
    public function store(ProductRequest $request)
    {
        $product = Product::create($request->only([
            'name', 'price', 'category', 'brand', 'description', 'quantity',
        ]));
        foreach ($request->images as $url) {
            $product->images()->create([
                'url' => $url
            ]);
        }
        return redirect()->route('products.index');
    }
    public function update(ProductRequest $request, Product $product)
    {
        $product->update($request->only([
            'name', 'price', 'category', 'brand', 'description', 'quantity',
        ]));
        foreach ($request->images as $url) {
            $product->images()->create([
                'url' => $url
            ]);
        }
        return redirect()->route('products.index');
    }

    public function destroy(Product $product)
    {
        $product->delete();
        return redirect()->route('products.index');
    }
}
