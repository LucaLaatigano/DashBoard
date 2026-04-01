import { useState } from "react";
import { CiBellOn, CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router";
import { useProfileContext } from "../Context/ProfileContext";
import { Link } from "react-router";

export default function NavBar() {
    const [query, setQuery] = useState("");
    const [msg, setMsg] = useState(false);
    const { formData } = useProfileContext();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const route = query.toLowerCase();
        const routes = ["analytics", "sales", "users", "settings"];
        if (route === "overview" || route === "") {
            navigate("/");
        } else if (routes.includes(route)) {
            navigate(`/${route}`);
        } else {
            setMsg(true);
            setTimeout(() => setMsg(false), 2000);
        }
        setQuery("");
    };

    return (
        <div className="z-20 flex lg:justify-between items-center gap-20 sm:gap-55 md:gap-75 shadow-lg px-4 lg:px-8 w-full h-20 mb-3 border-b border-zinc-300 bg-white relative">
            <div className="flex-1 max-w-50 sm:max-w-80 md:max-w-100 lg:max-110 items-center mr-0">
                <form onSubmit={handleSubmit} className="w-full max-w-md ml-15 sm:ml-30 md:ml-45 lg:ml-0">
                    <div className="relative w-full">
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-full h-10 lg:h-12 pl-4 pr-10 border border-gray-300 rounded-lg outline-none focus:border-blue-500 text-gray-600 transition-all text-sm"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                            <CiSearch className="size-5" />
                        </span>
                    </div>
                </form>
            </div>
            <div className="flex items-center gap-3 lg:gap-5 flex-nowrap shrink-0">
                <div className="shrink-0">
                    <CiBellOn className="text-zinc-400 size-7 lg:size-9 hover:text-blue-500 cursor-pointer transition-colors" />
                </div>
                <Link to="/settings">
                    <div className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full overflow-hidden border border-zinc-200 cursor-pointer shrink-0 bg-gray-100">
                        {formData.profileImage ? (
                            <img src={formData.profileImage} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full bg-zinc-300" />
                        )}
                    </div>
                </Link>
            </div>
            {msg && (
                <div className="absolute top-24 left-1/2 -translate-x-1/2 z-50 px-6 py-2 bg-slate-800 text-white rounded-full shadow-xl">
                    <h3 className="text-sm font-bold">Not Found</h3>
                </div>
            )}
        </div>
    );
}