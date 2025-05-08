import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import localizedFormat from "dayjs/plugin/localizedFormat";
import 'notyf/notyf.min.css';

dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

export default function Index(props) {
  const cards = Array.from({ length: 13 }, (_, i) => ({
    id: i + 1,
    title: `Step ${i + 1}`,
    description: `This is a description for step ${i + 1}.`,
    status: 'Active',
  }));

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 10;

  const term = searchTerm.trim();

  const filteredCards =
    term === ''
      ? cards
      : cards
          .filter(
            card =>
              card.title.includes(term) || card.description.includes(term)
          )
          .slice(0, 1); // Return only the first match
  
  

  const totalPages = Math.ceil(filteredCards.length / itemsPerPage);
  const paginatedCards = filteredCards.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to page 1 on search
  };

  function highlightMatch(text, term) {
    if (!term) return text;
  
    const parts = text.split(new RegExp(`(${term})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === term.toLowerCase() ? (
        <span key={index} className="bg-yellow-200 dark:bg-yellow-600 font-semibold">
          {part}
        </span>
      ) : (
        part
      )
    );
  }

  return (
    <AuthenticatedLayout
      header={
        <div className="flex text-white">
          <h2 className="text-xl text-white font-extrabold leading-none tracking-tight">
            Manage Instructions
          </h2>
        </div>
      }
    >
      <Head title="Application Tracking" />

      <div className="py-2">
        <div className="mx-auto sm:px-6 lg:px-8">
          <div className="mb-4 mt-3">
            <input
              type="text"
              placeholder="Search instructions..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-80 px-4 py-2 border rounded-md shadow-sm dark:bg-neutral-900 dark:border-neutral-700 dark:text-white"
            />
          </div>

          <div className="overflow-x-auto card p-2">
            <table className="min-w-full table-auto shadow-lg border border-gray-300 dark:border-neutral-700">
              <thead className="bg-gray-400 dark:bg-neutral-700">
                <tr className="bg-gray-800 text-white dark:bg-neutral-900">
                  <th className="px-4 py-3 text-left text-sm font-semibold uppercase">Instructions</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold uppercase">Description</th>
                  <th className="px-4 py-3 w-24"></th>
                </tr>
              </thead>
              <tbody>
                {paginatedCards.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="text-center py-4 text-gray-500 dark:text-neutral-400">
                      No results found.
                    </td>
                  </tr>
                ) : (
                  paginatedCards.map((card, index) => (
                    <tr key={card.id} className={index % 2 !== 0 ? "bg-gray-50 dark:bg-gray-800" : "bg-gray-200 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-neutral-800"}>
                     <td className="px-2 truncate max-w-xs text-sm font-medium text-gray-700 dark:text-neutral-200 border-b">
  {highlightMatch(card.title, searchTerm)}
</td>

                      <td className="px-2 truncate max-w-xs text-sm font-medium text-gray-700 dark:text-neutral-200 border-b">{card.description}</td>
                      <td className="px-2 border-b">
                        <div className="flex flex-col items-end gap-x-2 gap-y-0.5 m-3">
                          <Link href={route('instructions.show', card.id)}>
                            <button className="btn btn-xs bg-gray-500 text-white rounded-md text-xs">
                              <span className="icon-[tabler--eye]"></span>
                            </button>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-4">
              <span className="text-sm text-gray-700">
                Showing {paginatedCards.length} of {filteredCards.length} result{filteredCards.length !== 1 ? 's' : ''}
              </span>
              <div className="space-x-2">
                <button
                  onClick={handlePrev}
                  disabled={currentPage === 1}
                  className="px-3 py-1 text-sm bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
                >
                  Prev
                </button>
                <span className="text-sm text-gray-700">
                  Page {currentPage} of {totalPages || 1}
                </span>
                <button
                  onClick={handleNext}
                  disabled={currentPage === totalPages || totalPages === 0}
                  className="px-3 py-1 text-sm bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
