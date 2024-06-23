<?php

namespace App\Models;

use App\Models\Mobil;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Pengembalian extends Model
{
    use HasFactory;

    protected $table = "pengembalian";
    protected $fillable = ["id_pengguna", "id_mobil", "total_tarif", "lama_sewa", "tanggal_sewa", "tanggal_kembali"];

    public function pengguna(): BelongsTo
    {
        return $this->belongsTo(User::class, "id_pengguna");
    }

    public function mobil(): BelongsTo
    {
        return $this->belongsTo(Mobil::class, "id_mobil");
    }
}
