<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Sewa extends Model
{
    use HasFactory;
    protected $table = "sewa";
    protected $fillable = ["id_pengguna", "id_mobil", "tarif_sewa", "lama_sewa", "tanggal_mulai", "tanggal_selesai", "status"];

    public function pengguna(): BelongsTo
    {
        return $this->belongsTo(User::class, "id_pengguna");
    }

    public function mobil(): BelongsTo
    {
        return $this->belongsTo(Mobil::class, "id_mobil");
    }
}
