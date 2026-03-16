import { useState } from "react"
import { CiBellOn } from "react-icons/ci";
export default function NavBar() {
    const [name, setName] = useState("")

    const handleSubmit = () => {
        e.preventDefault()
        alert("submited with enter")
    }
    return (
        <div className="scale-z-100 flex justify-between shadow-lg pl-5 w-280 h-20 mb-3 border-b-2 border-zinc-300 bg-white border-b">
            <form onSubmit={handleSubmit}>
                <input type="text" className="w-120 h-13 mt-4 pl-5 text-zinc-800 outline-none border border-zinc-300 border-3 rounded-2xl focus:bg-slate-900/10"
                    placeholder="🔍 Search"
                    value={name} onChange={(e) => setName(e.target.value)} />
            </form>
            <div className="flex gap-5 mt-3">
                <CiBellOn className="text-zinc-300 size-13 hover:cursor-pointer" />
                <div className="w-13 h-13 rounded-full overflow-hidden mr-5 hover:cursor-pointer">
                    <img src="/src/images/empresario.jpg" className="w-full h-full object-cover" />
                </div>
            </div>
        </div>
    )
}