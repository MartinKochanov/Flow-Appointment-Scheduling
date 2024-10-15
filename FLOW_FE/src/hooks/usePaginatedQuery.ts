import { UseQueryResult } from "@tanstack/react-query";
import { ChangeEvent, MouseEvent, useCallback, useState } from "react";
import Page from "../types/Page";

const usePaginatedQuery = <T>(
    queryHook: (page: number, size: number) => UseQueryResult<Page<T>>,
    initialPage: number = 0,
    initialRowsPerPage: number = 10
) => {
    const [page, setPage] = useState(initialPage);
    const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);

    const { data, isLoading, error } = queryHook(page, rowsPerPage);

    const handlePageChange = useCallback(
        (_: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
            setPage(newPage);
        },
        []
    );

    const handleChangeRowsPerPage = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const newSize = parseInt(event.target.value, 10);
        setRowsPerPage(newSize);
        setPage(0);
    };

    return {
        data,
        isLoading,
        error,
        rowsPerPage,
        page,
        handlePageChange,
        handleChangeRowsPerPage,
    };
};

export default usePaginatedQuery;
