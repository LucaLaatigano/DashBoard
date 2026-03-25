import { useRef, useState } from "react"
import defaultImg from "../Images/empresario.jpg"
import { IoKeyOutline } from "react-icons/io5";
import { MdKeyboardArrowRight } from "react-icons/md";
import { IoIosTimer } from "react-icons/io";
import CheckBox from "./Low Level Components/CheckBox";
import { Link } from "react-router"
import { useProfileContext } from "../Context/ProfileContext";
export default function Settings() {
    const { formData, setFormData } = useProfileContext()
    const [isSaved, setIsSaved] = useState(false)
    const [isEnabled, setIsEnabled] = useState(() => {
        const savedValues = localStorage.getItem('checkBoxes')
        return savedValues ? JSON.parse(savedValues) : {
            TF: true,
            NL: true,
            PU: true,
            AM: true,
            SA: true
        }
    })
    const fileInputRef = useRef(null)
    const cvInputRef = useRef(null)

    const handleCheckBoxChange = (key) => {
        const updatedCheckBoxes = {
            ...isEnabled, [key]: !isEnabled[key]
        }
        setIsEnabled(updatedCheckBoxes)
        localStorage.setItem('checkBoxes', JSON.stringify(updatedCheckBoxes))
    }
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
                const updatedData = { ...formData, profileImage: reader.result }
                setFormData(updatedData)
                localStorage.setItem('userProfile', JSON.stringify(updatedData))
            }
            reader.readAsDataURL(file)
        }
    }
    const handleCvChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                const updatedData = { ...formData, cv: reader.result }
                setFormData(updatedData)
                localStorage.setItem('userProfile', JSON.stringify(updatedData))
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSave = () => {
        setIsSaved(true)
        setTimeout(() => {
            setIsSaved(false)
        }, 2000)
    }
    const handleReset = (e) => {
        e.preventDefault()
        localStorage.removeItem('userProfile')
        setFormData({
            fullName: "John Smith",
            email: "john.smith@gmail.com",
            title: "UX Lead",
            profileImage: defaultImg
        })

    }
    return (
        <div className="pl-10 pt-2">
            <h3 className="text-3xl text-gray-800 font-bold mb-3">Settings</h3>
            <div className="flex">
                <div className="mt-5 w-170 h-138 bg-white rounded-2xl">
                    <h3 className="text-gray-800 font-bold text-2xl pt-3 pl-5">
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
                    <div className="w-80 h-65 bg-white rounded-2xl pl-3 pr-2">
                        <h3 className="font-bold text-gray-800 text-2xl pl-3 pt-2 pb-3">
                            Account Security
                        </h3>
                        <div className="flex gap-10 ml-3 mt-3">
                            <div className="text-gray-500 mt-2 flex">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>

                            </div>
                            <label>Enable Two-Factor <br />Athentication</label>
                            <CheckBox checked={isEnabled.TF} onChange={() => handleCheckBoxChange('TF')} />
                        </div>
                        <div className="flex gap-10 mt-8 ml-3 hover:cursor-pointer">
                            <IoKeyOutline className="text-gray-500 font-bold size-6" />
                            <label>Change Password</label>
                            <MdKeyboardArrowRight className="text-gray-500 font-bold size-6 ml-5" />
                        </div>
                        <Link to="/users">
                            <div className="flex gap-10 mt-7 ml-3 hover:cursor-pointer ml-3 pt-3">
                                <IoIosTimer className="text-gray-500 font-bold size-6" />
                                <label>View Active Sessions</label>
                                <MdKeyboardArrowRight className="text-gray-500 font-bold size-6" />
                            </div>
                        </Link>
                    </div>
                    <div className="w-80 h-65 bg-white rounded-2xl pl-3 pr-2 flex flex-col gap-3">
                        <h3 className="font-bold text-2xl pl-3 pt-2 text-gray-800">Billing Plan</h3>
                        <div className="flex flex-col pl-3">
                            <label className="text-2xl font-light">Current Plan</label>
                            <h3 className="font-bold text-xl text-gray-800">Pro Team</h3>
                        </div>
                        <div className="flex flex-col pl-3">
                            <label className="text-2xl font-light">Payment Method</label>
                            <h3 className="font-bold text-xl text-gray-800">Stored Credit Card Infor</h3>
                        </div>
                        <div className="flex justify-end">
                            <button onClick={handleReset} className="w-35 h-10 border-2 border-red-500 text-red-400 hover:bg-zinc-100  hover:cursor-pointer rounded-2xl">Delete Account</button>
                        </div>
                    </div>
                    <div className="w-80 h-65 bg-white rounded-2xl pl-3 pr-2 flex flex-col gap-2">
                        <h3 className="font-bold text-2xl pl-3 pt-2 text-gray-800">Billing Plan</h3>
                        <div className="flex flex-col pl-3">
                            <label className="text-2xl font-light">Current Plan</label>
                            <h3 className="font-bold text-xl text-gray-800">Pro Team</h3>
                        </div>
                        <div className="flex flex-col pl-3">
                            <label className="text-2xl font-light">Payment Method</label>
                            <h3 className="font-bold text-xl text-gray-800">Stored Credit Card Infor</h3>
                        </div>
                        <div className="flex flex-col ml-3">
                            <label className="text-2xl font-light">Recent Invoices</label>
                            <div className="flex gap-3">
                                <input type="file" className="hidden" ref={cvInputRef} onChange={handleCvChange} />
                                <a onClick={() => cvInputRef.current.click()} className="font-light text-blue-600 text-xl hover:cursor-pointer">Load</a>
                                <a href={formData.cv} download={formData.cv} className="font-light text-blue-600 text-xl">Download</a>
                            </div>
                        </div>
                    </div>
                    <div className="w-80 h-65 bg-white rounded-2xl pl-3 pr-2 flex flex-col gap-2">
                        <h3 className="text-2xl font-bold pt-2 pl-3 text-gray-800">Email Notifications</h3>
                        <div className="flex flex-col gap-6">
                            <div className="ml-3 flex gap-10">
                                <label className="font-light text-xl">Newletter</label>
                                <CheckBox checked={isEnabled.NL} onChange={() => handleCheckBoxChange('NL')} />
                            </div>
                            <div className="ml-3 flex gap-10">
                                <label className="font-light text-xl">Product Updates</label>
                                <CheckBox checked={isEnabled.PU} onChange={() => handleCheckBoxChange('PU')} />
                            </div>
                            <div className="ml-3 flex gap-10">
                                <label className="font-light text-xl">Activity Metions</label>
                                <CheckBox checked={isEnabled.AM} onChange={() => handleCheckBoxChange('AM')} />
                            </div>
                            <div className="ml-3 flex gap-10">
                                <label className="font-light text-xl">Security Alerts</label>
                                <CheckBox checked={isEnabled.SA} onChange={() => handleCheckBoxChange('SA')} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}