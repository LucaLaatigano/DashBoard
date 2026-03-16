import { useRef, useState } from "react"
import defaultImg from "../Images/empresario.jpg"
export default function Settings() {
    const [formData, setFormData] = useState(() => {
        const savedData = localStorage.getItem('userProfile')
        return savedData ? JSON.parse(savedData) : {
            fullName: "John Smith",
            email: "john.smith@gmail.com",
            title: "UX Lead",
            profileImage: defaultImg
        }
    })
    const [isSaved, setIsSaved] = useState(false)
    const fileInputRef = useRef(null)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData, [name]: value
        })
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setFormData({ ...formData, profileImage: reader.result })
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSave = () => {
        localStorage.setItem('userProfile', JSON.stringify(formData))
        setIsSaved(true)
        setTimeout(() => {
            setIsSaved(false)
        }, 2000)
    }
    return (
        <div className="pl-10 pt-2">
            <h3 className="text-3xl text-slate-900 font-bold mb-3">Settings</h3>
            <div className="flex">
                <div className="mt-5 w-170 h-138 bg-white rounded-2xl">
                    <h3 className="text-slate-900 font-light text-2xl pt-3 pl-5">
                        Profile Settings
                    </h3>
                    <div className="flex">
                        <div className="w-25 h-25 rounded-full overflow-hidden mt-5 ml-5 ">
                            <img src={formData.profileImage} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex flex-col mt-6 ml-10 gap-3">
                            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
                            <button className="w-35 h-10 border-3 border-zinc-200 rounded-2xl text-blue-300 hover:cursor-pointer"
                                onClick={() => fileInputRef.current.click()}
                            >
                                Change Photo
                            </button>
                            <button className="w-25 h-10 border-3 border-zinc-200 text-red-400 rounded-2xl hover:cursor-pointer"
                                onClick={() => setFormData({ ...formData, profileImage: defaultImg })}
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col mt-5 ml-5 gap-3">
                        <div className="flex flex-col">
                            <label className="block text-slate-900 font-light text-2xl">Full Name</label>
                            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange}
                                className="w-70 h-12 mt-3 border-3 border-zinc-200 rounded-2xl pl-3 outline-none focus:bg-slate-900/10 "
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="block text-slate-900 font-light text-2xl">Email</label>
                            <input type="text" name="email" value={formData.email} onChange={handleChange}
                                className="w-70 h-12 mt-3 border-3 border-zinc-200 rounded-2xl pl-3 outline-none focus:bg-slate-900/10 "
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="block text-slate-900 font-light text-2xl">Title</label>
                            <input type="text" name="title" value={formData.title} onChange={handleChange}
                                className="w-70 h-12 mt-3 border-3 border-zinc-200 rounded-2xl pl-3 outline-none focus:bg-slate-900/10 "
                            />
                        </div>
                        <div className="flex justify-end mr-5">
                            <button onClick={handleSave} className="w-20 h-10 mt-1 border-3 border-zinc-200 rounded-2xl hover:cursor-pointer hover:bg-slate-900/10">
                                {isSaved ? "Saved" : "Save"}
                            </button>
                        </div>
                    </div>

                </div>
                <div className="flex flex-wrap ml-10 gap-6 mt-5">
                    {Array(4).fill(0).map((_, index) => (
                        <div key={index} className="w-80 h-65 bg-white rounded-2xl">

                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}