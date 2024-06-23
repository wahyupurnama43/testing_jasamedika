import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { DataTable } from "@/Components/DataTable";
import ActionsTable from "@/Components/ActionsTable";
import { formatNumeral } from "cleave-zen";

const columns = [
    {
        accessorKey: "merek",
        header: "Merek",
        cell: ({ row }) => <div>{row.getValue("merek")}</div>,
    },
    {
        accessorKey: "model",
        header: "Model",
        cell: ({ row }) => <div>{row.getValue("model")}</div>,
    },
    {
        accessorKey: "plat",
        header: "Nomor Plat",
        cell: ({ row }) => <div>{row.getValue("plat")}</div>,
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
                    deleteAction={route("mobil.destroy", row.original.id)}
                    editAction={route("mobil.edit", row.original.id)}
                />
            );
        },
    },
];

export default function List({ auth, mobil }) {
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
                        data={mobil}
                        columns={columns}
                        columnAsFilter="merek"
                        enableColumnsHiding
                        addRoute="mobil.create"
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
