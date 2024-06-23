import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { DataTable } from "@/Components/DataTable";
import ActionsTable from "@/Components/ActionsTable";
import { formatNumeral } from "cleave-zen";

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
        header: "Tanggal Sewa",
        cell: ({ row }) => (
            <div>
                {row.original.tanggal_mulai +
                    " sampai " +
                    row.original.tanggal_selesai}
            </div>
        ),
    },
    {
        accessorKey: "tarif_sewa",
        header: "Harga Sewa",
        cell: ({ row }) => (
            <div>
                Rp.{" "}
                {formatNumeral(row.original.tarif_sewa, {
                    numeralThousandsGroupStyle: "thousand",
                })}
            </div>
        ),
    },
    {
        accessorKey: "status",
        header: "status",
        cell: ({ row }) => <div>{row.getValue("status")}</div>,
    },
    {
        id: "actions",
        cell: ({ row }) => {
            return (
                <ActionsTable
                    editAction={route("sewa.edit", row.original.id)}
                />
            );
        },
    },
];

export default function List({ auth, sewa }) {
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
                    <DataTable
                        data={sewa}
                        columns={columns}
                        columnAsFilter="pengguna"
                        enableColumnsHiding
                        addRoute="sewa.create"
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
