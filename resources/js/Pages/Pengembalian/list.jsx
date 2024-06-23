import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { formatNumeral } from "cleave-zen";
import { DataTable } from "@/Components/DataTable";

const columns = [
    {
        accessorKey: "id_pengguna",
        header: "Peminjam",
        cell: ({ row }) => <div>{row.original.pengguna.name}</div>,
    },
    {
        accessorKey: "id_mobil",
        header: "Mobil",
        cell: ({ row }) => (
            <div>
                {row.original.mobil.merek + " " + row.original.mobil.model}
            </div>
        ),
    },
    {
        accessorKey: "plat",
        header: "Nomor Plat",
        cell: ({ row }) => <div>{row.original.mobil.plat}</div>,
    },
    {
        accessorKey: "tanggal",
        header: "Tanggal Kembali",
        cell: ({ row }) => <div>{row.original.tanggal_kembali}</div>,
    },
    {
        accessorKey: "total_tarif",
        header: "Harga Sewa",
        cell: ({ row }) => (
            <div>
                Rp.{" "}
                {formatNumeral(row.original.total_tarif, {
                    numeralThousandsGroupStyle: "thousand",
                })}
            </div>
        ),
    },
];

export default function List({ auth, pengembalian }) {
    const { post, data, setData } = useForm({
        plat: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("pengembalian.store"));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    List Mobile
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-4">
                    <div className="mt-4">
                        <form onSubmit={submit}>
                            <InputLabel
                                htmlFor="pengembalian"
                                value="Nomor Plat"
                            />

                            <TextInput
                                id="pengembalian"
                                name="pengembalian"
                                className="mt-1 block w-full"
                                autoComplete="pengembalian"
                                onChange={(e) =>
                                    setData("plat", e.target.value)
                                }
                                isFocused={true}
                            />
                        </form>
                    </div>
                    <DataTable
                        data={pengembalian}
                        columns={columns}
                        columnAsFilter="pengguna"
                        enableColumnsHiding
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
