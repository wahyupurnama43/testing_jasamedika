<?php

namespace App\Http\Controllers;

use App\Models\Mobil;
use Illuminate\Http\Request;
use Inertia\Controller;
use Inertia\Inertia;

class MobilController extends Controller
{
    public function show()
    {
        $mobil = Mobil::all();
        return Inertia::render('Mobil/list', compact('mobil'));
    }

    public function create()
    {
        return Inertia::render('Mobil/form');
    }

    public function Store(Request $request)
    {
        $request->validate([
            "merek" => "required|string",
            "status" => "required|string",
            "tarif_sewa" => "required|string",
            "model" => "required|string",
            "plat" => "required|string",
        ]);
        try {
            Mobil::create($request->all());
            return to_route("mobil.show")->with(["success" => "Mobil created successfully"]);
        } catch (\Exception $e) {
            return to_route("mobil.show")->with(["error" => "Mobil failed to create: " . $e->getMessage()]);
        }
    }

    public function edit(string $id)
    {
        $mobil = Mobil::findOrFail($id);
        return Inertia::render('Mobil/form', compact('mobil'));
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            "merek" => "required|string",
            "status" => "required|string",
            "tarif_sewa" => "required|string",
            "model" => "required|string",
            "plat" => "required|string",
        ]);
        try {
            $mobil = Mobil::findOrFail($id);
            $mobil->update($request->all());
            return to_route("mobil.show")->with(["success" => "Mobil update successfully"]);
        } catch (\Exception $e) {
            return to_route("mobil.show")->with(["error" => "Mobil failed to create: " . $e->getMessage()]);
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
