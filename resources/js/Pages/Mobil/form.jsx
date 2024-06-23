import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, useForm } from "@inertiajs/react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/shadcn/ui/select";

export default function List({ auth, mobil }) {
    const { data, setData, post, processing, errors, put } = useForm({
        merek: mobil?.merek ?? "",
        status: mobil?.status ?? "",
        tarif_sewa: mobil?.tarif_sewa ?? "",
        model: mobil?.model ?? "",
        plat: mobil?.plat ?? "",
    });

    const submit = (e) => {
        e.preventDefault();
        if (mobil) {
            put(route("mobil.update", mobil.id));
            return;
        }
        post(route("mobil.store"));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Tambah List Mobil
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-4">
                        <form onSubmit={submit}>
                            <div className="mt-4">
                                <InputLabel htmlFor="merek" value="Merek" />

                                <TextInput
                                    id="merek"
                                    name="merek"
                                    value={data.merek}
                                    className="mt-1 block w-full"
                                    autoComplete="merek"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData("merek", e.target.value)
                                    }
                                    required
                                />

                                <InputError
                                    message={errors.merek}
                                    className="mt-2"
                                />
                            </div>

                            <div className="mt-4">
                                <InputLabel htmlFor="model" value="Model" />

                                <TextInput
                                    id="model"
                                    name="model"
                                    value={data.model}
                                    className="mt-1 block w-full"
                                    autoComplete="model"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData("model", e.target.value)
                                    }
                                    required
                                />

                                <InputError
                                    message={errors.model}
                                    className="mt-2"
                                />
                            </div>

                            <div className="mt-4">
                                <InputLabel htmlFor="plat" value="Plat" />

                                <TextInput
                                    id="plat"
                                    name="plat"
                                    value={data.plat}
                                    className="mt-1 block w-full"
                                    autoComplete="plat"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData("plat", e.target.value)
                                    }
                                    required
                                />

                                <InputError
                                    message={errors.plat}
                                    className="mt-2"
                                />
                            </div>

                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="tarif_sewa"
                                    value="Harga Sewa"
                                />

                                <TextInput
                                    id="tarif_sewa"
                                    type="number"
                                    name="tarif_sewa"
                                    value={data.tarif_sewa}
                                    className="mt-1 block w-full"
                                    autoComplete="tarif_sewa"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData("tarif_sewa", e.target.value)
                                    }
                                    required
                                />

                                <InputError
                                    message={errors.tarif_sewa}
                                    className="mt-2"
                                />
                            </div>

                            <div className="mt-4">
                                <InputLabel htmlFor="status" value="Status" />

                                <Select
                                    className="bg-white"
                                    name="status"
                                    onValueChange={(field) =>
                                        setData("status", field)
                                    }
                                >
                                    <SelectTrigger className="w-full bg-white h-auto">
                                        <SelectValue placeholder="Pilih Status" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white">
                                        <SelectGroup>
                                            <SelectLabel>Status</SelectLabel>
                                            <SelectItem value="ready">
                                                ready
                                            </SelectItem>
                                            <SelectItem value="sewa">
                                                sewa
                                            </SelectItem>
                                            <SelectItem value="rusak">
                                                rusak
                                            </SelectItem>
                                            <SelectItem value="maintenance">
                                                maintenance
                                            </SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>

                                <InputError
                                    message={errors.status}
                                    className="mt-2"
                                />
                            </div>
                            <div className="flex items-center justify-end mt-4">
                                <PrimaryButton
                                    className="ms-4"
                                    disabled={processing}
                                >
                                    Tambah
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
