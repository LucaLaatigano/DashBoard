import { useState, useRef } from "react";
import { IoHomeOutline, IoSettingsOutline, IoMenu, IoClose } from "react-icons/io5";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { RiMoneyEuroCircleLine } from "react-icons/ri";
import { LuUsers } from "react-icons/lu";
import { Link, useLocation } from "react-router";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const SideBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation()
    const [activePath, setActivePath] = useState(location.pathname)
    const container = useRef();

    useGSAP(() => {
        if (isOpen || window.innerWidth >= 1024) {
            gsap.from(".anim-item", {
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power2.out",
                force3D: true
            });
        }
    }, { scope: container, dependencies: [isOpen] });
    useGSAP(() => {
        gsap.from(".btn-open", {
            y: -100,
            duration: 1,
            stagger: 0.3,
            ease: "power2.out"
        })
    })
    const onMouseEnter = (e) => {
        gsap.to(e.currentTarget, {
            x: 5,
            scale: 1.001,
            duration: 0.5,
            ease: "power2.out"
        });
    };

    const onMouseLeave = (e) => {
        gsap.to(e.currentTarget, { x: 0, scale: 1, duration: 0.3 });
    };
    const handleNavegation = (path) => {
        setActivePath(path)
        if (isOpen) setIsOpen(!isOpen)
    }
    return (
        <>
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="btn-open lg:hidden fixed top-2 left-2 z-50 p-2 bg-slate-900 text-white rounded-md hover:cursor-pointer shadow-lg"
                >
                    <IoMenu size={28} />
                </button>
            )}
            <div
                ref={container}
                className={`
                    fixed lg:static z-40 flex flex-col gap-5 w-64 xl:w-80 h-screen bg-slate-900 transition-all duration-300
                    ${isOpen ? "left-0" : "-left-full"} lg:left-0
                `}
            >
                <div className="anim-item flex items-center justify-between px-6 pt-8 lg:pt-10">
                    <Link to="/" onClick={() => setIsOpen(false)}>
                        <h2 className="text-white font-bold text-2xl tracking-wider">DASHBOARD</h2>
                    </Link>
                    {isOpen && (
                        <button
                            onClick={() => setIsOpen(false)}
                            className="lg:hidden text-white p-1 hover:bg-white/10 rounded-md transition-colors hover:cursor-pointer"
                        >
                            <IoClose size={30} />
                        </button>
                    )}
                </div>

                <div className="flex flex-col px-4 gap-2 mt-4">
                    <Link to="/" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className="anim-item" onClick={() => handleNavegation("/")}>
                        <div className={`flex items-center gap-3 p-3 rounded-2xl ${activePath === "/" ? "bg-white/10" : "hover:bg-white/5"} transition-all cursor-pointer`}>
                            <IoHomeOutline className="text-slate-50 size-6" />
                            <h3 className="text-white text-xl font-light">Overview</h3>
                        </div>
                    </Link>

                    <div className="flex flex-col mt-6">
                        <h3 className="anim-item text-slate-500 font-bold text-xs tracking-widest px-3 mb-2">REPORTS</h3>

                        <Link to="/analytics" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className="anim-item" onClick={() => handleNavegation("/analytics")}>
                            <div className={`flex items-center gap-3 p-3 rounded-2xl  ${activePath === "/analytics" ? "bg-white/10" : "hover:bg-white/5"} transition-all cursor-pointer`}>
                                <TbBrandGoogleAnalytics className="text-slate-50 size-6" />
                                <h3 className="text-white text-xl font-light">Analytics</h3>
                            </div>
                        </Link>

                        <Link to="/sales" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className="anim-item" onClick={() => handleNavegation("/sales")}>
                            <div className={`flex items-center gap-3 p-3 rounded-2xl ${activePath === "/sales" ? "bg-white/10" : "hover:bg-white/5"} transition-all cursor-pointer`}>
                                <RiMoneyEuroCircleLine className="text-slate-50 size-6" />
                                <h3 className="text-white text-xl font-light">Sales</h3>
                            </div>
                        </Link>
                    </div>

                    <div className="flex flex-col mt-6">
                        <h3 className="anim-item text-slate-500 font-bold text-xs tracking-widest px-3 mb-2">SYSTEM</h3>

                        <Link to="/users" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className="anim-item" onClick={() => handleNavegation("/users")}>
                            <div className={`flex items-center gap-3 p-3 rounded-2xl ${activePath === "/users" ? "bg-white/10" : "hover:bg-white/5"} transition-all cursor-pointer`}>
                                <LuUsers className="text-slate-50 size-6" />
                                <h3 className="text-white text-xl font-light">Users</h3>
                            </div>
                        </Link>

                        <Link to="/settings" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className="anim-item" onClick={() => handleNavegation("/settings")}>
                            <div className={`flex items-center gap-3 p-3 rounded-2xl ${activePath === "/settings" ? "bg-white/10" : "hover:bg-white/5"} transition-all cursor-pointer`}>
                                <IoSettingsOutline className="text-slate-50 size-6" />
                                <h3 className="text-white text-xl font-light">Settings</h3>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-30 lg:hidden backdrop-blur-sm"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
};

export default SideBar;