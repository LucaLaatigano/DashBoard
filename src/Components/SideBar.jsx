import { useState } from "react";
import { IoHomeOutline, IoSettingsOutline, IoMenu, IoClose } from "react-icons/io5";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { RiMoneyEuroCircleLine } from "react-icons/ri";
import { LuUsers } from "react-icons/lu";
import { Link } from "react-router";

const SideBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="lg:hidden fixed top-5 left-4 z-50 p-2 bg-slate-900 text-white rounded-md hover:cursor-pointer shadow-lg"
                >
                    <IoMenu size={28} />
                </button>
            )}
            <div className={`
                fixed lg:static z-40 flex flex-col gap-5 w-64 xl:w-80 h-screen bg-slate-900 transition-all duration-300
                ${isOpen ? "left-0" : "-left-full"} lg:left-0
            `}>
                <div className="flex items-center justify-between px-6 pt-8 lg:pt-10">
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
                    <Link to="/" onClick={() => setIsOpen(false)}>
                        <div className="flex items-center gap-3 p-3 rounded-2xl hover:bg-white/10 transition-all cursor-pointer">
                            <IoHomeOutline className="text-slate-50 size-6" />
                            <h3 className="text-white text-xl font-light">Overview</h3>
                        </div>
                    </Link>
                    <div className="flex flex-col mt-6">
                        <h3 className="text-slate-500 font-bold text-xs tracking-widest px-3 mb-2">REPORTS</h3>

                        <Link to="/analytics" onClick={() => setIsOpen(false)}>
                            <div className="flex items-center gap-3 p-3 rounded-2xl hover:bg-white/10 transition-all cursor-pointer">
                                <TbBrandGoogleAnalytics className="text-slate-50 size-6" />
                                <h3 className="text-white text-xl font-light">Analytics</h3>
                            </div>
                        </Link>

                        <Link to="/sales" onClick={() => setIsOpen(false)}>
                            <div className="flex items-center gap-3 p-3 rounded-2xl hover:bg-white/10 transition-all cursor-pointer">
                                <RiMoneyEuroCircleLine className="text-slate-50 size-6" />
                                <h3 className="text-white text-xl font-light">Sales</h3>
                            </div>
                        </Link>
                    </div>
                    <div className="flex flex-col mt-6">
                        <h3 className="text-slate-500 font-bold text-xs tracking-widest px-3 mb-2">SYSTEM</h3>

                        <Link to="/users" onClick={() => setIsOpen(false)}>
                            <div className="flex items-center gap-3 p-3 rounded-2xl hover:bg-white/10 transition-all cursor-pointer">
                                <LuUsers className="text-slate-50 size-6" />
                                <h3 className="text-white text-xl font-light">Users</h3>
                            </div>
                        </Link>

                        <Link to="/settings" onClick={() => setIsOpen(false)}>
                            <div className="flex items-center gap-3 p-3 rounded-2xl hover:bg-white/10 transition-all cursor-pointer">
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