"use client"

import React, { useEffect, useState } from "react";

type PaginationProps = {
    totalItems: number;
    itemsPerPage: number;
    activePage: number;
    onPageChange: (pageNumber: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ totalItems, itemsPerPage, onPageChange, activePage }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const maxVisiblePages = 5;

    useEffect(() => {
        setCurrentPage(activePage)
    }, [activePage])

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        onPageChange(page);
    };

    // محاسبه بازه اعداد صفحه برای نمایش
    const getVisiblePages = () => {
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        // اگر انتهای صفحات بیشتر از کل صفحات باشد، بازه را تنظیم کن
        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        const pages = [];
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        return pages;
    };

    const visiblePages = getVisiblePages();

    return (
        <nav className="flex items-center justify-center pt-3 pb-4">
            <ul className="flex items-center -space-x-px h-9 select-none">
                {/* دکمه قبلی */}
                {currentPage > 1 && (
                    <li>
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            className="flex items-center justify-center px-3 h-9 leading-tight text-gray-500 hover:bg-gray-500 hover:text-white rounded-md"
                        >
                            <span className="sr-only">Previous</span>
                            <svg
                                className="w-3 h-3 rtl:rotate-180"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 6 10"
                            >
                                <path stroke="currentColor" strokeWidth="2" d="M5 1 1 5l4 4" />
                            </svg>
                        </button>
                    </li>
                )}

                {/* اعداد صفحات */}
                {visiblePages.map((page) => (
                    <li key={page}>
                        <button
                            onClick={() => handlePageChange(page)}
                            className={`flex items-center justify-center px-3 h-9 leading-tight rounded-md ${currentPage === page
                                    ? "bg-[var(--primary)] text-white"
                                    : "text-gray-500 hover:bg-gray-500 hover:text-white"
                                }`}
                        >
                            {page}
                        </button>
                    </li>
                ))}

                {/* دکمه بعدی */}
                {currentPage < totalPages && (
                    <li>
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            className="flex items-center justify-center px-3 h-9 leading-tight text-gray-500 hover:bg-gray-500 hover:text-white rounded-md"
                        >
                            <span className="sr-only">Next</span>
                            <svg
                                className="w-3 h-3 rtl:rotate-180"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 6 10"
                            >
                                <path stroke="currentColor" strokeWidth="2" d="m1 9 4-4-4-4" />
                            </svg>
                        </button>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Pagination;