<?php

use App\Http\Controllers\Admin\AdminController;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CartController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\Admin\ProductAdminController;
use App\Http\Controllers\Admin\OrderAdminController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PaymentController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/



Route::get('/', HomeController::class)->name('home');
Route::get('create-intent/{order}',  [PaymentController::class, 'createIntent'])->name('create-intent');
Route::post('{order}/pay', [PaymentController::class, 'pay'])->name('order.pay');
Route::get('payment{order}/confirm', [PaymentController::class, 'confirm'])->name('payment.confirm');
Route::post('order/{order}/paid', [OrderController::class, 'OrderPaid'])->name('order.paid');
Route::get('category/{category}/products', HomeController::class)->name('by.category');
Route::get('products/{product:slug}', [ProductController::class, 'show'])->name('products.detail');
Route::get('cart', CartController::class)->name('cart');

Route::middleware('auth')->group(function () {
    Route::resource('orders', OrderController::class)
        ->only(['index', 'store', 'show']);
});

Route::prefix('admin')->middleware(['admin'])->group(function () {
    Route::get('/', [AdminController::class, 'index'])->name('dashboard');

    Route::resource('products', ProductAdminController::class);
    Route::get('orders', [OrderAdminController::class, 'index'])->name('admin.orders.index');
    Route::delete('orders/{order}', [OrderAdminController::class, 'destroy'])->name('admin.orders.destroy');
    Route::put('orders/{order}', [OrderAdminController::class, 'delivered'])->name('admin.orders.delivered');
});


require __DIR__ . '/auth.php';
