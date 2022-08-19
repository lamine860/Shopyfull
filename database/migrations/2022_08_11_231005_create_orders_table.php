<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->decimal('total');
            $table->decimal('tax');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->dateTime('delivered_at')->nullable();
            $table->boolean('delivered')->default(false);
            $table->dateTime('paid_at')->nullable();
            $table->boolean('paid')->default(false);
            $table->string('payment_id')->nullable();
            $table->string('status')->default('pending');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('orders');
    }
};
