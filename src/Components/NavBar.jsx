import { useState, useRef } from "react";
import { CiBellOn, CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router";
import { useProfileContext } from "../Context/ProfileContext";
import { Link } from "react-router";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

export default function NavBar({ onMenuToggle }) {
    const [query, setQuery] = useState("");
    const [msg, setMsg] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const { formData } = useProfileContext();
    const navigate = useNavigate();
    const container = useRef();

    useGSAP(() => {
        gsap.from(".nav-item", {
            y: -100,
            duration: 1,
            stagger: 0.3,
            ease: "power2.out",
        });
    }, { scope: container });

    useGSAP(() => {
        if (msg) {
            gsap.from(".error-msg", {
                scale: 0.5,
                opacity: 0,
                y: -20,
                duration: 0.4,
                ease: "back.out(1.7)",
            });
            gsap.to(".error-msg", {
                y: -20,
                opacity: 0,
                scale: 0.5,
                duration: 0.3,
                delay: 1.6,
                ease: "power2.in",
            });
        }
    }, { scope: container, dependencies: [msg] });

    const handleFocus = (e) => {
        gsap.to(e.currentTarget, {
            scale: 1.03,
            boxShadow: "0px 10px 20px rgba(0,0,0,0.1)",
            borderColor: "#3b82f6",
            duration: 0.1,
        });
    };

    const handleBlur = (e) => {
        gsap.to(e.currentTarget, {
            scale: 1,
            boxShadow: "0px 0px 0px rgba(0,0,0,0)",
            borderColor: "#d1d5db",
            duration: 0.1,
        });
    };

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
        setSearchOpen(false);
    };

    return (
        <div
            ref={container}
            className="z-20 flex items-center justify-between shadow-lg px-4 lg:px-8 w-full h-16 lg:h-20 mb-3 border-b border-zinc-300 bg-white relative gap-3"
        >
            <button
                onClick={onMenuToggle}
                className="nav-item flex-shrink-0 lg:hidden flex items-center justify-center w-9 h-9 rounded-lg bg-slate-800 text-white hover:bg-slate-700 transition-colors"
            >
                <span className="text-lg">☰</span>
            </button>

            <form
                onSubmit={handleSubmit}
                className={`nav-item flex-1 min-w-0 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg ${searchOpen ? "flex" : "hidden sm:flex"}`}
            >
                <div className="relative w-full">
                    <input
                        type="text"
                        placeholder="Search"
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        className="w-full h-9 lg:h-11 pl-4 pr-10 border border-gray-300 rounded-lg outline-none focus:border-blue-500 text-gray-600 transition-all text-sm"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <CiSearch className="size-5" />
                    </span>
                </div>
            </form>

            <div className="flex items-center gap-2 sm:gap-3 lg:gap-5 flex-shrink-0">
                <button
                    className="nav-item sm:hidden flex items-center justify-center text-zinc-400 hover:text-blue-500 transition-colors"
                    onClick={() => setSearchOpen((v) => !v)}
                    aria-label="Toggle search"
                >
                    <CiSearch className="size-6" />
                </button>

                <div className="nav-item">
                    <CiBellOn className="text-zinc-400 size-6 sm:size-7 lg:size-9 hover:text-blue-500 cursor-pointer transition-colors" />
                </div>

                <Link to="/settings">
                    <div className="nav-item w-8 h-8 sm:w-9 sm:h-9 lg:w-11 lg:h-11 rounded-full overflow-hidden border border-zinc-200 cursor-pointer flex-shrink-0 bg-gray-100">
                        {formData.profileImage ? (
                            <img src={formData.profileImage} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full bg-zinc-300" />
                        )}
                    </div>
                </Link>
            </div>

            {msg && (
                <div className="error-msg absolute top-[72px] left-1/2 -translate-x-1/2 z-50 px-6 py-2 bg-slate-800 text-white rounded-full shadow-xl">
                    <h3 className="text-sm font-bold whitespace-nowrap">Not Found</h3>
                </div>
            )}
        </div>
    );
}