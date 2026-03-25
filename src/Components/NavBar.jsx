import { useState } from "react"
import { CiBellOn } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router"
import { useProfileContext } from "../Context/ProfileContext";
export default function NavBar() {
    const [query, setQuery] = useState("")
    const [msg, setMsg] = useState(false)
    const { formData } = useProfileContext()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        if (query.toLowerCase() === "overview") {
            navigate("/")
        } else if (query.toLowerCase() === "analytics") {
            navigate("/analytics")
        } else if (query.toLowerCase() === "sales") {
            navigate("/sales")
        } else if (query.toLowerCase() === "users") {
            navigate("/users")
        } else if (query.toLowerCase() === "settings") {
            navigate("/settings")
        } else {
            setMsg(true)
            setTimeout(() => {
                setMsg(false)
            }, 2000)
        }
        setQuery("")
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
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <span className="absolute right-3 top-4 text-gray-400">
                        <CiSearch className="size-5" />
                    </span>
                </div>
            </form>
            <div className="flex gap-5 mt-3">
                <CiBellOn className="text-zinc-300 size-13 hover:cursor-pointer" />
                <div className="w-13 h-13 rounded-full overflow-hidden mr-5 hover:cursor-pointer">
                    <img src={formData.profileImage} className="w-full h-full object-cover" />
                </div>
            </div>
            {msg && (
                <div className="absolute left-130 top-5 w-30 h-10 bg-zinc-300 rounded-2xl">
                    <h3 className="text-md text-gray-800 font-bold pl-4.5 pt-1.5">Not Found</h3>
                </div>
            )}
        </div>
    )
}