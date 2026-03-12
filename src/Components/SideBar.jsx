import { IoHomeOutline } from "react-icons/io5";


const SideBar = ()=>{
    return(
        <div className="flex flex-col gap-5 w-80 h-screen bg-slate-900">
            <h2 className="text-white pl-5 pt-5 font-bold text-xl">DASHBOARD</h2>
            <div className="flex flex-col ml-5 gap-2 w-20">
                <div className="flex w-50 mt-5 gap-2">
                    <IoHomeOutline className="text-white mt-2 size-6"/>
                    <h3 className="text-white text-xl font-bold pt-1.5">
                        Overview
                    </h3>
                </div>
                <div>
                    <h3 className="text-white">Reports</h3>
                </div>
            </div>
        </div>
    )
}
export default SideBar;