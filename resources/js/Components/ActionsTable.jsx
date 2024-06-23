import { Button } from "@/shadcn/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/shadcn/ui/dropdown-menu";
import { router } from "@inertiajs/react";

import {
    DotsHorizontalIcon,
    EyeOpenIcon,
    Pencil1Icon,
    TrashIcon,
} from "@radix-ui/react-icons";

export default function ActionsTable({
    items = [],
    editAction = null,
    deleteAction = null,
    viewAction = null,
    className = null,
}) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <DotsHorizontalIcon className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>

                <DropdownMenuSeparator />
                {editAction && (
                    <DropdownMenuItem
                        className="text-orange-500 cursor-pointer"
                        onClick={() => router.visit(editAction)}
                    >
                        <Pencil1Icon className="mr-2" /> Edit
                    </DropdownMenuItem>
                )}
                {viewAction && (
                    <DropdownMenuItem
                        className="text-blue-500 cursor-pointer"
                        onClick={() => router.visit(viewAction)}
                    >
                        <EyeOpenIcon className="mr-2" /> View
                    </DropdownMenuItem>
                )}
                {deleteAction && (
                    <DropdownMenuItem
                        className="text-red-600 cursor-pointer"
                        onClick={() => router.delete(deleteAction)}
                    >
                        <TrashIcon className="mr-2" /> Delete
                    </DropdownMenuItem>
                )}
                {items.map((item) => (
                    <DropdownMenuItem
                        key={item.label}
                        className={item.className}
                        onClick={item.onClick}
                    >
                        {item.label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
