"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../../components/ui/table";
import { Skeleton } from "../../../components/ui/skeleton";
// 1. IMPORT useState
import React, { useState } from "react";
import type { GlobalTableProps } from "@/types/global-table-types";
// 2. IMPORT ICONS & BUTTON
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../../../components/ui/button";

export function GlobalTable3<T>({
    columns,
    data,
    loading = false,
    emptyMessage = "No data found",
    maxHeight = 440,
    className,
    variant = "normal",
}: GlobalTableProps<T>) {
    // --- 3. ADD PAGINATION STATE ---
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 20; // You can adjust this number
    const totalPages = Math.ceil(data.length / rowsPerPage);

    // --- 4. SLICE THE DATA ---
    const paginatedData = data.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    const alignClass = (align?: "left" | "center" | "right") => { 
        switch (align) {
            case "center":
                return "text-center";
            case "right":
                return "text-right";
            default:
                return "text-left";
        }
    };

    return (
        // Wrap component in div to hold table + pagination 
        <div className={className}>
            <div className="overflow-auto" style={{ maxHeight }}>
                <Table className="table-auto min-w-max w-full border-collapse">
                    <TableHeader
                        className={`${variant === "rounded" ? "bg-transparent" : "bg-background"
                            } sticky top-0 z-10`}
                    >
                        <TableRow>
                            {columns.map((col) => (
                                <TableHead
                                    key={String(col.key)}
                                    className={`${alignClass(
                                        col.align
                                    )} font-semibold text-foreground-muted`}
                                >
                                    {col.label}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {loading ? (
                            [...Array(5)].map((_, i) => (
                                <TableRow
                                    key={i}
                                    className={
                                        i % 2 === 0
                                            ? variant === "rounded"
                                                ? "bg-background-2 hover:bg-background-1 rounded-lg"
                                                : "bg-sidebar"
                                            : variant === "rounded"
                                                ? "bg-transparent hover:bg-background-1 rounded-lg"
                                                : "bg-background"
                                    }
                                >
                                    {columns.map((col, j) => (
                                        <TableCell key={j} className={alignClass(col.align)}>
                                            <Skeleton className="h-4 w-24" />
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : data.length === 0 ? (
                            typeof emptyMessage === "string" ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="text-center py-6 border border-border"
                                    >
                                        <div className="size-10 bg-background-2 flex items-center justify-center rounded-lg mx-auto">
                                            <X className="text-white/55" />
                                        </div>
                                        <div className="pt-5">{emptyMessage}</div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columns.length}>{emptyMessage}</TableCell>
                                </TableRow>
                            )
                        ) : (
                            // --- 5. MAP OVER PAGINATED DATA ---
                            paginatedData.map((row, i) => (
                                <TableRow
                                    key={i}
                                    className={
                                        i % 2 === 0
                                            ? variant === "rounded"
                                                ? "bg-background-2 hover:bg-background-1"
                                                : "bg-sidebar"
                                            : variant === "rounded"
                                                ? "bg-transparent hover:bg-background"
                                                : "bg-background"
                                    }
                                >
                                    {columns.map((col, j) => (
                                        <TableCell
                                            key={String(col.key)}
                                            className={`${alignClass(col.align)} ${variant === "rounded" && j === 0 ? "rounded-l-lg" : ""
                                                } ${variant === "rounded" && j === columns.length - 1
                                                    ? "rounded-r-lg"
                                                    : ""
                                                }`}
                                        >
                                            {col.render ? col.render(row) : (row[col.key] as any)}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* --- 6. ADD PAGINATION CONTROLS --- */}
            {data.length > rowsPerPage && (
                <div className="flex items-center justify-end gap-2 py-4">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        <ChevronLeft className="h-4 w-4" />
                        Previous
                    </Button>
                    <span className="text-sm text-foreground-muted">
                        Page {currentPage} of {totalPages}
                    </span>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                        disabled={currentPage === totalPages}
                    >
                        Next
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            )}
        </div>
    );
}