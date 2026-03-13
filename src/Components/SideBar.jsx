import { IoHomeOutline } from "react-icons/io5";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { RiMoneyEuroCircleLine } from "react-icons/ri";
import { LuUsers } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { Link } from "react-router";
const SideBar = ()=>{
    return(
        <div className="scale-z-100 flex flex-col gap-5 w-80 h-screen bg-slate-900">
            <Link to="/">
                <h2 className="text-white pl-8 pt-5 font-bold text-xl">DASHBOARD</h2>
            </Link>
            
            <div className="flex flex-col ml-5 gap-2 w-20">
                <Link to="/">
                    <div className="flex w-70 mt-5 gap-2 pb-3 pl-3 rounded-2xl hover:bg-white/10 hover:cursor-pointer">
                        <IoHomeOutline className="text-slate-50 mt-2 size-6"/>
                        <h3 className="text-white text-xl font-light pt-1.5">
                            Overview
                        </h3>
                    </div>
                </Link>
                <div className="flex flex-col ml-2">
                    <h3 className="text-white font-bold text-xl mt-5">REPORTS</h3>
                    <div>
                        <Link to="/analytics">
                            <div className="flex w-70 h-10 mt-5 gap-2 pb-3 rounded-2xl hover:bg-white/10 hover:cursor-pointer">
                                    <TbBrandGoogleAnalytics className="font-light text-slate-50 mt-2 size-6"/>
                                        <h3 className="text-white text-xl font-light pt-1.5">
                                            Analytics
                                        </h3>
                            </div>
                        </Link>
                    </div>
                    <div>
                        <Link to="/sales">
                            <div className="flex w-70 h-10 mt-5 gap-2 pt-2 pb-2 rounded-2xl hover:bg-white/10 hover:cursor-pointer">
                                <RiMoneyEuroCircleLine className="text-slate-50 font-light size-6"/>
                                <h3 className="text-white text-xl font-light">
                                    Sales
                                </h3>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col ml-2">
                    <h3 className="text-white font-bold text-xl mt-5">
                        SYSTEM
                    </h3>
                    <div>
                        <Link to="/users">
                            <div className="flex w-70 h-10 mt-5 gap-3 pt-2 pl-2 rounded-2xl hover:bg-white/10 hover:cursor-pointer">
                                <LuUsers className="text-slate-50 font-light size-6" />
                                <h3 className="text-white font-light text-xl">
                                    Users
                                </h3>
                            </div>
                        </Link>
                        <Link to="/settings">
                            <div className="flex w-70 h-10 mt-5 gap-3 pt-2 pl-2 rounded-2xl hover:bg-white/10 hover:cursor-pointer">
                                <IoSettingsOutline className="text-slate-50 font-light size-6"/>
                                <h3 className="font-light text-white text-xl">
                                    Settings
                                </h3>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SideBar;