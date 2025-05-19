import * as React from "react"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { usePagination } from "@/hooks/use-pagination"
import { cn } from "@/lib/utils"

interface DataTableProps<T> {
    data: T[]
    columns: {
        header: string
        accessorKey: keyof T
        cell?: (value: T[keyof T], row: T) => React.ReactNode
    }[]
    pageSize?: number
    totalItems: number
    currentPage: number
    onPageChange: (page: number) => void
    className?: string
}

export function DataTable<T>({
    data,
    columns,
    pageSize = 10,
    totalItems,
    currentPage,
    onPageChange,
    className,
}: DataTableProps<T>) {
    const paginationRange = usePagination({
        totalItems,
        pageSize,
        currentPage,
    })

    const totalPages = Math.ceil(totalItems / pageSize)

    return (
        <div className={cn("space-y-4", className)}>
            <div className="rounded-md border">
                <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                        <thead className="[&_tr]:border-b">
                            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                {columns.map((column, index) => (
                                    <th
                                        key={index}
                                        className="h-12 px-4 text-left align-middle font-medium text-muted-foreground"
                                    >
                                        {column.header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                            {data.map((row, rowIndex) => (
                                <tr
                                    key={rowIndex}
                                    className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                                >
                                    {columns.map((column, colIndex) => (
                                        <td
                                            key={colIndex}
                                            className="p-4 align-middle [&:has([role=checkbox])]:pr-0"
                                        >
                                            {column.cell
                                                ? column.cell(row[column.accessorKey], row)
                                                : String(row[column.accessorKey])}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {totalPages > 1 && (
                <div className="flex items-center justify-between p-2">
                    <div className="flex-1 text-sm text-muted-foreground">
                        Showing {((currentPage - 1) * pageSize) + 1} to{" "}
                        {Math.min(currentPage * pageSize, totalItems)} of{" "}
                        {totalItems} results
                    </div>
                    <div className="w-fit">
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious
                                        onClick={() => onPageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                    />
                                </PaginationItem>

                                {paginationRange.map((pageNumber, index) => {
                                    if (pageNumber === "...") {
                                        return (
                                            <PaginationItem key={`ellipsis-${index}`}>
                                                <PaginationEllipsis />
                                            </PaginationItem>
                                        )
                                    }

                                    return (
                                        <PaginationItem key={pageNumber}>
                                            <PaginationLink
                                                onClick={() => onPageChange(Number(pageNumber))}
                                                isActive={currentPage === pageNumber}
                                            >
                                                {pageNumber}
                                            </PaginationLink>
                                        </PaginationItem>
                                    )
                                })}

                                <PaginationItem>
                                    <PaginationNext
                                        onClick={() => onPageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>

                </div>
            )}
        </div>
    )
} 