import { Cross2Icon, PlusIcon } from "@radix-ui/react-icons";

import { Button } from "@/shadcn/ui/button";
import { Input } from "@/shadcn/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";

import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { router } from "@inertiajs/react";

export function DataTableToolbar({
    table,
    filterDatas,
    columnAsFilter,
    addRoute,
}) {
    const isFiltered = table.getState().columnFilters.length > 0;

    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center space-x-2">
                {addRoute && (
                    <Button
                        size="sm"
                        className="px-3"
                        onClick={() => router.visit(route(addRoute))}
                    >
                        <PlusIcon className="mr-2" /> Add data
                    </Button>
                )}
                <Input
                    placeholder={`Search by ${columnAsFilter}...`}
                    value={
                        table.getColumn(columnAsFilter)?.getFilterValue() ?? ""
                    }
                    onChange={(event) =>
                        table
                            .getColumn(columnAsFilter)
                            ?.setFilterValue(event.target.value)
                    }
                    className="h-8 w-[150px] lg:w-[250px]"
                />
                {filterDatas.map((data) => {
                    return (
                        <DataTableFacetedFilter
                            key={data.column}
                            column={table.getColumn(data.column)}
                            title={data.title}
                            options={data.options}
                        />
                    );
                })}
                {isFiltered && (
                    <Button
                        variant="ghost"
                        onClick={() => table.resetColumnFilters()}
                        className="h-8 px-2 lg:px-3"
                    >
                        Reset
                        <Cross2Icon className="ml-2 h-4 w-4" />
                    </Button>
                )}
            </div>
            <DataTableViewOptions table={table} />
        </div>
    );
}
