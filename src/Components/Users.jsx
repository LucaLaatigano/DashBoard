import { useState, useEffect, useRef } from "react";
import { CiSearch } from "react-icons/ci";
import defaultImg from "../Images/empresario.jpg"
import { useUserContext } from "../Context/UsersContext";

export default function Users() {
    const { users, setUsers, loading } = useUserContext()
    const [inputField, setInputField] = useState("");
    const [selectedUser, setSelectedUser] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [newPerson, setNewPerson] = useState(false)
    const [newUserInput, setNewUserInput] = useState({
        user: "",
        userName: "",
        email: "",
        city: "",
        avatar: ""
    })
    const usersPerPage = 5;
    const editModalRef = useRef(null)
    const newUserModal = useRef(null)
    const fileRef = useRef(null)
    const newAvatarRef = useRef(null)

    const allFilteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(inputField.toLowerCase())
    );

    const lastIndex = currentPage * usersPerPage;
    const firstIndex = lastIndex - usersPerPage;
    const currentUsers = allFilteredUsers.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(allFilteredUsers.length / usersPerPage);

    const handleSave = () => {
        const updatedUsers = users.map(user => user.id === selectedUser.id ? selectedUser : user)
        setUsers(updatedUsers)
        setSelectedUser(null)
    }

    const handleAddNewUser = (e) => {
        e.preventDefault()
        const newUser = {
            id: Date.now(),
            name: newUserInput.user,
            username: newUserInput.userName,
            email: newUserInput.email,
            address: { city: newUserInput.city },
            avatar: newUserInput.avatar || defaultImg
        }
        setUsers([...users, newUser])
        setNewUserInput({ user: "", userName: "", email: "", city: "", avatar: "" })
        setNewPerson(false)
    }

    const handleFileRead = (e, callback) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => callback(reader.result)
            reader.readAsDataURL(file)
        }
    }

    useEffect(() => { setCurrentPage(1); }, [inputField])
    useEffect(() => { if (!loading) localStorage.setItem('users', JSON.stringify(users)) }, [users, loading])

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (editModalRef.current && !editModalRef.current.contains(e.target) && !e.target.closest('button')) setSelectedUser(null);
            if (newUserModal.current && !newUserModal.current.contains(e.target) && !e.target.closest('button')) setNewPerson(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="bg-[#f8fafc] flex-1 p-2 md:p-5 min-h-screen">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h3 className="font-bold text-2xl md:text-3xl text-gray-800">System Users</h3>
                <button
                    onClick={() => setNewPerson(true)}
                    className="w-full sm:w-auto px-5 py-2 rounded-lg bg-[#2563eb] text-white font-medium hover:bg-blue-700 transition-colors shadow-sm"
                >
                    Add New User +
                </button>
            </div>

            <div className="bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden">

                <div className="flex justify-stretch sm:justify-end p-4 border-b border-gray-200">
                    <div className="relative w-full sm:w-72">
                        <input
                            type="text"
                            placeholder="Search user..."
                            className="w-full h-10 pl-4 pr-10 border border-gray-300 rounded-lg outline-none focus:border-blue-500 text-gray-600 transition-all"
                            value={inputField}
                            onChange={(e) => setInputField(e.target.value)}
                        />
                        <span className="absolute right-3 top-2.5 text-gray-400">
                            <CiSearch className="size-5" />
                        </span>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-gray-700">
                        <thead className="hidden md:table-header-group bg-gray-50 text-gray-500 uppercase text-xs font-semibold">
                            <tr>
                                <th className="px-6 py-4">User</th>
                                <th className="px-6 py-4">Username</th>
                                <th className="px-6 py-4">Email</th>
                                <th className="px-6 py-4">City</th>
                                <th className="px-6 py-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="block md:table-row-group divide-y divide-gray-200">
                            {loading ? (
                                <tr><td colSpan="5" className="py-10 text-center text-gray-400">Loading users...</td></tr>
                            ) : (
                                currentUsers.map((user) => (
                                    <tr key={user.id} className="block md:table-row hover:bg-gray-50 transition-colors p-4 md:p-0">
                                        <td className="block md:table-cell px-6 py-2 md:py-4">
                                            <div className="flex items-center gap-3">
                                                <img src={user.avatar} alt="" className="w-10 h-10 rounded-full border border-gray-200" />
                                                <span className="font-semibold md:font-medium text-gray-900">{user.name}</span>
                                            </div>
                                        </td>
                                        <td className="block md:table-cell px-6 py-1 md:py-4 text-sm text-gray-500 md:text-gray-700">
                                            <span className="md:hidden font-bold">Username: </span>{user.username}
                                        </td>
                                        <td className="block md:table-cell px-6 py-1 md:py-4 text-sm">
                                            <span className="md:hidden font-bold">Email: </span>{user.email}
                                        </td>
                                        <td className="block md:table-cell px-6 py-1 md:py-4 text-sm">
                                            <span className="md:hidden font-bold">City: </span>{user.address?.city}
                                        </td>
                                        <td className="block md:table-cell px-6 py-3 md:py-4 text-right md:text-center">
                                            <button
                                                onClick={(e) => { e.stopPropagation(); setSelectedUser(user); }}
                                                className="w-full md:w-auto bg-blue-50 md:bg-transparent text-blue-600 px-4 py-2 md:p-0 rounded-md font-medium"
                                            >
                                                Edit
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-center items-center p-4 border-t border-gray-100 gap-2 overflow-x-auto">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${currentPage === page ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                        >
                            {page}
                        </button>
                    ))}
                </div>
            </div>
            {(selectedUser || newPerson) && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
                    <div
                        ref={selectedUser ? editModalRef : newUserModal}
                        className="w-full max-w-lg bg-white rounded-t-2xl sm:rounded-xl shadow-2xl p-6 animate-in slide-in-from-bottom sm:zoom-in duration-200"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h4 className="text-xl font-bold text-gray-800">{selectedUser ? 'Edit User' : 'New User'}</h4>
                            <button onClick={() => { setSelectedUser(null); setNewPerson(false); }} className="text-gray-400 text-2xl">✕</button>
                        </div>

                        <div className="space-y-4">
                            <div className="grid grid-cols-1 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Full Name</label>
                                    <input
                                        type="text"
                                        className="w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500"
                                        value={selectedUser ? selectedUser.name : newUserInput.user}
                                        onChange={(e) => selectedUser ? setSelectedUser({ ...selectedUser, name: e.target.value }) : setNewUserInput({ ...newUserInput, user: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Email Address</label>
                                    <input
                                        type="email"
                                        className="w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500"
                                        value={selectedUser ? selectedUser.email : newUserInput.email}
                                        onChange={(e) => selectedUser ? setSelectedUser({ ...selectedUser, email: e.target.value }) : setNewUserInput({ ...newUserInput, email: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">City</label>
                                    <input
                                        type="text"
                                        className="w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500"
                                        value={selectedUser ? selectedUser.address?.city : newUserInput.city}
                                        onChange={(e) => selectedUser
                                            ? setSelectedUser({ ...selectedUser, address: { ...selectedUser.address, city: e.target.value } })
                                            : setNewUserInput({ ...newUserInput, city: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="pt-4 flex flex-col sm:flex-row gap-3">
                                <input type="file" ref={selectedUser ? newAvatarRef : fileRef} className="hidden"
                                    onChange={(e) => handleFileRead(e, (res) => selectedUser ? setSelectedUser({ ...selectedUser, avatar: res }) : setNewUserInput({ ...newUserInput, avatar: res }))} />

                                <button
                                    onClick={() => (selectedUser ? newAvatarRef : fileRef).current.click()}
                                    className="flex-1 bg-gray-100 py-2.5 rounded-lg font-semibold text-gray-700 border border-gray-200"
                                >
                                    📷 Change Photo
                                </button>

                                <button
                                    onClick={selectedUser ? handleSave : handleAddNewUser}
                                    className="flex-1 bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                                >
                                    {selectedUser ? 'Save Changes' : 'Create User'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}