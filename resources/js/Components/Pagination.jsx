import { Link } from "@inertiajs/react";

const Pagination = ({ data, type = "paginate()" }) => {
    if (!data) return null;

    // pagination with paginate()
    return (
        <div className="mt-6 flex float-right">           
            <div class="flex items-center gap-x-1">
                    {data.links.map((link, i) => (
                     <Link
                         key={i}
                        href={link.url}
                         preserveScroll
                         className={`mr-1 px-2 py-1 text-xs ${
                             link.active
                                 ? "bg-blue-500 text-white"
                                 : "bg-white text-gray-700"
                         } ${
                          link.url === null
                                ? "text-gray-300 cursor-not-allowed"
                                : "text-gray-700"
                     }`}
                    >
                         {link.label
                             .replace(/&laquo;/g, "<")
                             .replace(/&raquo;/g, ">")}
                    </Link>
                 ))}
            </div>
        </div>
    );
};

export default Pagination;
