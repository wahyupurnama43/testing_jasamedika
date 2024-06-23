<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('sewa', function (Blueprint $table) {
            $table->id();
            $table->string("id_pengguna");
            $table->string("id_mobil");
            $table->string("tarif_sewa");
            $table->string("lama_sewa");
            $table->dateTime("tanggal_mulai", precision: 0);
            $table->dateTime("tanggal_selesai", precision: 0);
            $table->enum("status", ['selesai', 'sewa']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sewa');
    }
};
