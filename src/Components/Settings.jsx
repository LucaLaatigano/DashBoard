
export default function Settings(){
    return(
        <div className="pl-10 pt-2">
            <h3 className="text-3xl text-slate-900 font-bold mb-3">Settings</h3>
            <div className="flex">
                <div className="mt-5 w-170 h-138 bg-white rounded-2xl">

                </div>
                <div className="flex flex-wrap ml-10 gap-6 mt-5">
                    {Array(4).fill(0).map((_, index)=>(
                        <div className="w-80 h-65 bg-white rounded-2xl">

                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}