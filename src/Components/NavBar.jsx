import { useState } from "react"
import { CiBellOn } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
export default function NavBar() {
    const [name, setName] = useState("")

    const handleSubmit = () => {
        e.preventDefault()
        alert("submited with enter")
    }
    return (
        <div className="scale-z-100 flex justify-between shadow-lg pl-5 w-280 h-20 mb-3 border-b-2 border-zinc-300 bg-white border-b">
            <form onSubmit={handleSubmit}>
                <div className="relative mt-4">
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-110 h-12 pl-4 pr-10 border border-gray-300 rounded-lg outline-none
                             focus:border-blue-500 text-gray-600"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <span className="absolute right-3 top-4 text-gray-400">
                        <CiSearch className="size-5" />
                    </span>
                </div>
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