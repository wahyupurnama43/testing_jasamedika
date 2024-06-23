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
import { formatNumeral } from "cleave-zen";
import { useEffect, useState } from "react";

export default function List({ auth, sewa }) {
    const { data, setData, post, processing, errors, put } = useForm({
        tanggal_mulai: sewa?.tanggal_mulai ?? "",
        tanggal_selesai: sewa?.tanggal_selesai ?? "",
    });

    const [mobil, setMobil] = useState([]);

    const submit = (e) => {
        e.preventDefault();
        if (sewa) {
            put(route("sewa.update", sewa.id));
            return;
        }
        post(route("sewa.store"));
    };

    useEffect(() => {
        if (data.tanggal_mulai && data.tanggal_selesai) {
            axios
                .post("/sewa/available-cars", data)
                .then(function (response) {
                    setMobil(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }, [data.tanggal_mulai, data.tanggal_selesai]);
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Tambah Sewa Mobil
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-4">
                        <form onSubmit={submit}>
                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="pengguna"
                                    value="Pengguna"
                                />

                                <TextInput
                                    id="pengguna"
                                    name="pengguna"
                                    readOnly={true}
                                    value={auth.user.name}
                                    className="mt-1 block w-full"
                                    autoComplete="pengguna"
                                    isFocused={true}
                                />
                            </div>

                            <div className="mt-4">
                                <div className="grid gap-4 grid-cols-2">
                                    <div>
                                        <InputLabel
                                            htmlFor="tanggal_mulai"
                                            value="Tanggal Pinjam"
                                        />

                                        <TextInput
                                            type="datetime-local"
                                            id="tanggal_mulai"
                                            name="tanggal_mulai"
                                            value={data.tanggal_mulai}
                                            className="mt-1 block w-full"
                                            autoComplete="tanggal_mulai"
                                            isFocused={true}
                                            onChange={(e) =>
                                                setData(
                                                    "tanggal_mulai",
                                                    e.target.value
                                                )
                                            }
                                            required
                                        />

                                        <InputError
                                            message={errors.tanggal_mulai}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div>
                                        <InputLabel
                                            htmlFor="tanggal_selesai"
                                            value="Tanggal Selesai"
                                        />

                                        <TextInput
                                            type="datetime-local"
                                            id="tanggal_selesai"
                                            name="tanggal_selesai"
                                            value={data.tanggal_selesai}
                                            className="mt-1 block w-full"
                                            autoComplete="tanggal_selesai"
                                            isFocused={true}
                                            onChange={(e) =>
                                                setData(
                                                    "tanggal_selesai",
                                                    e.target.value
                                                )
                                            }
                                            required
                                        />

                                        <InputError
                                            message={errors.tanggal_selesai}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4">
                                <InputLabel htmlFor="mobil" value="Mobil" />

                                <Select
                                    className="bg-white"
                                    name="mobil"
                                    onValueChange={(field) =>
                                        setData("mobil", field)
                                    }
                                >
                                    <SelectTrigger className="w-full bg-white h-auto">
                                        <SelectValue
                                            placeholder={
                                                sewa?.mobil.merek ??
                                                " Pilih Mobil"
                                            }
                                        />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white">
                                        <SelectGroup>
                                            <SelectLabel>
                                                {sewa?.mobil.merek ?? "Mobil"}
                                            </SelectLabel>
                                            {mobil.map((m) => {
                                                return (
                                                    <SelectItem
                                                        value={m.id.toString()}
                                                        key={m.id}
                                                    >
                                                        {m.merek +
                                                            " " +
                                                            m.model +
                                                            " (Rp." +
                                                            formatNumeral(
                                                                m.tarif_sewa,
                                                                {
                                                                    numeralThousandsGroupStyle:
                                                                        "thousand",
                                                                }
                                                            ) +
                                                            "/hari)"}
                                                    </SelectItem>
                                                );
                                            })}
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
