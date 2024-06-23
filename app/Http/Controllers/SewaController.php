<?php

namespace App\Http\Controllers;

use App\Models\Mobil;
use App\Models\Sewa;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Controller;
use Inertia\Inertia;

class SewaController extends Controller
{
    public function show()
    {
        $sewa = Sewa::where("id_pengguna", Auth::id())->with(['pengguna', 'mobil'])->get();
        return Inertia::render('Sewa/list', compact('sewa'));
    }

    public function create()
    {
        return Inertia::render('Sewa/form');
    }

    public function Store(Request $request)
    {
        $request->validate([
            "mobil" => "required|string",
            "tanggal_mulai" => "required",
            "tanggal_selesai" => "required|after_or_equal:tanggal_mulai",
        ]);

        $mobil = Mobil::where('id', $request->mobil)->first();
        $tanggalMulai = Carbon::parse($request->tanggal_mulai);
        $tanggalSelesai = Carbon::parse($request->tanggal_selesai);
        $selisih = $tanggalSelesai->diff($tanggalMulai);

        try {
            Sewa::create([
                "id_pengguna" => auth::id(),
                "id_mobil" => $request->mobil,
                "tarif_sewa" => $mobil->tarif_sewa * $selisih->days,
                "lama_sewa" => $selisih->days,
                "tanggal_mulai" => $request->tanggal_mulai,
                "tanggal_selesai" => $request->tanggal_selesai,
                "status" => "sewa",
            ]);

            $mobil->update(['status' => 'sewa']);
            $mobil->save();

            return to_route("sewa.show")->with(["success" => "sewa created successfully"]);
        } catch (\Exception $e) {
            return to_route("sewa.show")->with(["error" => "sewa failed to create: " . $e->getMessage()]);
        }
    }

    public function edit(string $id)
    {
        $sewa = Sewa::where(["id_pengguna" => Auth::id(), 'id' => $id])->with(['pengguna', 'mobil'])->first();
        $mobil = Mobil::where("status", "ready")->get();
        return Inertia::render('Sewa/form', compact('mobil', "sewa"));
    }

    public function checkAvailability(Request $request)
    {
        $request->validate([
            "tanggal_mulai" => "required",
            "tanggal_selesai" => "required|after_or_equal:tanggal_mulai",
        ]);

        $start_date = Carbon::parse($request->tanggal_mulai);
        $end_date = Carbon::parse($request->tanggal_selesai);

        $unavailableCarIds = Sewa::where(function ($query) use ($start_date, $end_date) {
            $query->whereBetween('tanggal_mulai', [$start_date, $end_date])
                ->orWhereBetween('tanggal_selesai', [$start_date, $end_date])
                ->orWhere(function ($query) use ($start_date, $end_date) {
                    $query->where('tanggal_mulai', '<', $start_date)
                        ->where('tanggal_selesai', '>', $end_date);
                });
        })->pluck('id_mobil');

        $availableCars = Mobil::whereNotIn('id', $unavailableCarIds)->get();

        return response()->json($availableCars);

    }

    public function update(Request $request, $id)
    {
        $request->validate([
            "mobil" => "string",
            "tanggal_mulai" => "required",
            "tanggal_selesai" => "required|after_or_equal:tanggal_mulai",
        ]);
        $mobil = Mobil::where('id', $request->mobil)->first();
        $tanggalMulai = Carbon::parse($request->tanggal_mulai);
        $tanggalSelesai = Carbon::parse($request->tanggal_selesai);
        $selisih = $tanggalSelesai->diff($tanggalMulai);

        try {
            $sewa = Sewa::firstorFail('id', $id);
            if ($mobil) {
                $sewa->id_mobil = $request->mobil;
                $sewa->tarif_sewa = $mobil->tarif_sewa * $selisih->days;
            }
            $sewa->lama_sewa = $selisih->days;
            $sewa->tanggal_mulai = $request->tanggal_mulai;
            $sewa->tanggal_selesai = $request->tanggal_selesai;
            $sewa->save();
            return to_route("sewa.show")->with(["success" => "sewa update successfully"]);
        } catch (\Exception $e) {
            dd($e);
            return to_route("sewa.edit")->with(["error" => "sewa failed to create: " . $e->getMessage()]);
        }
    }

    public function destroy($id)
    {
        try {
            $mobil = Mobil::findOrFail($id);
            $mobil->delete();
            return to_route("mobil.show")->with(["success" => "mobil deleted successfully"]);
        } catch (\Exception $e) {
            return to_route("mobil.show")->with(["error" => "mobil failed to delete: " . $e->getMessage()]);
        }
    }
}
