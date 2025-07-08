import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const Breadcrumb = ({ items }) => (
  <nav className=" py-3 mb-6 flex items-center" aria-label="Breadcrumb">
    <ol className="flex items-center space-x-0 text-gray-600 text-[12px]">
      {items.map((item, idx) => (
        <li key={idx} className="flex items-center">
          {item.to ? (
            <Link to={item.to} className="hover:underline text-[rgba(0, 0, 0, 0.72)] capitalize">
              {item.label}
            </Link>
          ) : (
            <span className={item.active ? "text-orange-500 font-semibold capitalize" : ""} aria-current={item.active ? "page" : undefined}>
              {item.label}
            </span>
          )}
          {idx < items.length - 1 && (
            <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />
          )}
        </li>
      ))}
    </ol>
  </nav>
);

export default Breadcrumb;