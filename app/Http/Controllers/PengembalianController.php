<?php

namespace App\Http\Controllers;

use App\Models\Mobil;
use App\Models\Pengembalian;
use App\Models\Sewa;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Controller;
use Inertia\Inertia;

class PengembalianController extends Controller
{
    public function show()
    {
        $pengembalian = Pengembalian::where("id_pengguna", Auth::id())->with(['pengguna', 'mobil'])->get();
        return Inertia::render('Pengembalian/list', compact('pengembalian'));
    }

    public function store(Request $request)
    {
        $mobil = Mobil::where('plat', $request->plat)->first();
        $sewa = Sewa::where(['id_mobil' => $mobil->id, 'id_pengguna' => Auth::id()])->first();
        dd($sewa);
        $tanggalMulai = Carbon::parse($sewa->tanggal_mulai);
        $tanggalSelesai = Carbon::now();
        $selisih = $tanggalSelesai->diff($tanggalMulai)->days;
        if (Carbon::now() > Carbon::parse($sewa->tanggal_selesai)) {
            $total_harga = $mobil->tarif_sewa * $selisih;
        } else {
            $total_harga = $mobil->tarif_sewa;
        }
        try {
            Pengembalian::create([
                "id_pengguna" => auth::id(),
                "id_mobil" => $mobil->id,
                "total_tarif" => $total_harga,
                "lama_sewa" => $selisih,
                "tanggal_sewa" => $sewa->tanggal_mulai,
                "tanggal_kembali" => $tanggalSelesai,
            ]);

            $sewa = Sewa::where('id_mobil', $mobil->id)->delete();
            return to_route("pengembalian.show")->with(["success" => "Pengembalian created successfully"]);
        } catch (\Exception $e) {
            return to_route("pengembalian.show")->with(["error" => "Pengembalian failed to create: " . $e->getMessage()]);
        }

    }
}
