<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Product;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function __invoke(Request $request, string $category = null)
    {
        $products = Product::with('images')
            ->when($category, function ($query) use ($category) {
                return $query->whereCategory($category);
            })->paginate(5);
        $categories = Product::all(
            'category'
        )->map(fn ($item) => $item['category'])
            ->unique();
        return Inertia::render(
            'Home',
            [
                'products' => $products,
                'category' => $category,
                'categories' => $categories,
            ]

        );
    }
}
