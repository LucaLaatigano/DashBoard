import { useState, useEffect, useRef } from "react";
import { CiSearch } from "react-icons/ci";
import { getUsers } from "../Services/users";
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
        const updatedUsers = users.map(user => {
            if (user.id === selectedUser.id) {
                return selectedUser
            }
            return user
        })
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
            address: {
                city: newUserInput.city
            },
            avatar: newUserInput.avatar || defaultImg

        }
        setUsers([...users, newUser])
        setNewUserInput({
            user: "",
            userName: "",
            email: "",
            city: "",
            avatar: ""
        })
        setNewPerson(false)
    }
    const handleNewUserFile = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                const dataUpdated = { ...newUserInput, avatar: reader.result }
                setNewUserInput(dataUpdated)
            }
            reader.readAsDataURL(file)
        }
    }
    const handleNewAvatarFile = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                const dataUpdated = { ...selectedUser, avatar: reader.result }
                setSelectedUser(dataUpdated)
            }
            reader.readAsDataURL(file)
        }
    }

    useEffect(() => {
        setCurrentPage(1);
    }, [inputField])

    useEffect(() => {
        if (!loading) {
            localStorage.setItem('users', JSON.stringify(users))
        }
    }, [users, loading])

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                editModalRef.current &&
                !editModalRef.current.contains(e.target) &&
                !e.target.closest('button')
            ) {
                setSelectedUser(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                newUserModal.current &&
                !newUserModal.current.contains(e.target) &&
                !e.target.closest('button')
            ) {
                setNewPerson(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [])

    return (
        <div className="bg-[#f8fafc] flex-1 p-8">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-3xl text-gray-800">System Users</h3>
                <button onClick={() => setNewPerson(true)} className="px-5 py-2 rounded-lg bg-[#2563eb] text-white font-medium hover:bg-blue-700 transition-colors shadow-sm">
                    Add New User +
                </button>
            </div>

            <div className="bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden">
                <div className="flex justify-end p-4 border-b border-gray-200">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search user..."
                            className="w-72 h-10 pl-4 pr-10 border border-gray-300 rounded-lg outline-none focus:border-blue-500 text-gray-600 transition-all"
                            value={inputField}
                            onChange={(e) => setInputField(e.target.value)}
                        />
                        <span className="absolute right-3 top-2.5 text-gray-400">
                            <CiSearch className="size-5" />
                        </span>
                    </div>
                </div>

                <div className="overflow-x-auto h-100">
                    <table className="w-full text-left border-collapse divide-y divide-gray-200 text-gray-700">
                        <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-semibold">
                            <tr>
                                <th className="px-6 py-4">User</th>
                                <th className="px-6 py-4">Username</th>
                                <th className="px-6 py-4">Email</th>
                                <th className="px-6 py-4">City</th>
                                <th className="px-6 py-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="py-10 text-center text-gray-400">Loading users...</td>
                                </tr>
                            ) : (
                                currentUsers.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={user.avatar}
                                                    alt={user.name}
                                                    className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200"
                                                />
                                                <span className="font-medium text-gray-900">{user.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">{user.username}</td>
                                        <td className="px-6 py-4">{user.email}</td>
                                        <td className="px-6 py-4">{user.address?.city}</td>
                                        <td className="px-6 py-4 text-center">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSelectedUser(user);
                                                }}
                                                className="text-blue-600 hover:underline font-medium cursor-pointer"
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

                <div className="flex justify-center items-center p-4 border-t border-gray-100 gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${currentPage === page
                                ? "bg-blue-600 text-white"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                }`}
                        >
                            {page}
                        </button>
                    ))}
                </div>

                {selectedUser && (
                    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center">
                        <div ref={editModalRef} className="w-full max-w-md bg-white rounded-xl shadow-2xl p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h4 className="text-2xl font-bold text-gray-800">Edit User</h4>
                                <button onClick={() => setSelectedUser(null)} className="text-gray-400 hover:text-gray-600 hover:cursor-pointer">✕</button>
                            </div>
                            <div className="space-y-4 flex flex-col">
                                <div className="flex gap-5">
                                    <label className="font-bold text-2xl ml-0.2 text-gray-800">Name: </label>
                                    <input type="text" className="mt-1 text-lg font-light outline-none pl-3" value={selectedUser.name} onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })} />
                                </div>
                                <div className="flex gap-5">
                                    <label className="font-bold text-2xl ml-0.2 text-gray-800">Email: </label>
                                    <input type="text" className="mt-1 text-lg font-light outline-none pl-3" value={selectedUser.email} onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })} />
                                </div>
                                <div className="flex gap-5">
                                    <label className="font-bold text-2xl ml-0.2 text-gray-800">Address: </label>
                                    <input type="text" className="mt-1 text-lg font-light outline-none pl-3" value={selectedUser.address?.city} onChange={(e) => setSelectedUser({
                                        ...selectedUser,
                                        address: {
                                            ...selectedUser.address,
                                            city: e.target.value
                                        }
                                    })} />
                                </div>
                                <div className="flex gap-5">
                                    <label className="font-bold text-2xl ml-0.2 text-gray-800">Photo: </label>
                                    <input type="file" ref={newAvatarRef} onChange={handleNewAvatarFile} className="hidden" />
                                    <button onClick={() => newAvatarRef.current.click()} className="w-30 h-8 bg-zinc-300 mt-1 text-lg border-2 border-zinc-300 hover:cursor-pointer hover:bg-white/10 rounded-2xl">
                                        Change Photo
                                    </button>
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <button onClick={handleSave} className="w-35 h-10 mt-5 bg-zinc-300 text-xl border-2 border-zinc-300 hover:cursor-pointer hover:bg-white/10 rounded-2xl">Save</button>
                            </div>
                        </div>
                    </div>
                )}
                {newPerson && (
                    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center">
                        <div ref={newUserModal} className="w-full max-w-md bg-white rounded-xl shadow-2xl p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-bold text-2xl text-gray-800">Creating New User</h3>
                                <button onClick={() => setNewPerson(null)} className="text-gray-400 hover:text-gray-600 hover:cursor-pointer">✕</button>
                            </div>
                            <div className="space-y-4 flex flex-col">
                                <div className="flex gap-5">
                                    <label className="font-bold text-2xl ml-0.2 text-gray-800">User: </label>
                                    <input type="text" className="mt-1 text-lg font-light outline-none h-10 border-1 border-zinc-300 rounded-2xl pl-3" value={newUserInput.user} onChange={(e) => setNewUserInput({ ...newUserInput, user: e.target.value })} />
                                </div>
                                <div className="flex gap-5">
                                    <label className="font-bold text-2xl ml-0.2 text-gray-800">User Name: </label>
                                    <input type="text" className="mt-1 text-lg font-light outline-none h-13 pr-3 border-1 border-zinc-300 rounded-2xl pl-3" value={newUserInput.name} onChange={(e) => setNewUserInput({ ...newUserInput, userName: e.target.value })} />
                                </div>
                                <div className="flex gap-5">
                                    <label className="font-bold text-2xl ml-0.2 text-gray-800">Email: </label>
                                    <input type="text" className="mt-1 text-lg font-light outline-none h-13 pr-3 border-1 border-zinc-300 rounded-2xl pl-3" value={newUserInput.email} onChange={(e) => setNewUserInput({ ...newUserInput, email: e.target.value })} />
                                </div>
                                <div className="flex gap-5">
                                    <label className="font-bold text-2xl ml-0.2 text-gray-800">City: </label>
                                    <input type="text" className="mt-1 text-lg font-light outline-none h-13 pr-3 border-1 border-zinc-300 rounded-2xl pl-3" value={newUserInput.city} onChange={(e) => setNewUserInput({ ...newUserInput, city: e.target.value })} />
                                </div>
                                <div className="flex gap-5">
                                    <label className="font-bold text-2xl ml-0.2 text-gray-800">Photo: </label>
                                    <input type="file" ref={fileRef} onChange={handleNewUserFile} className="hidden" />
                                    <button onClick={() => fileRef.current.click()} className="w-30 h-8 bg-zinc-300 mt-1 text-lg border-2 border-zinc-300 hover:cursor-pointer hover:bg-white/10 rounded-2xl"> Add photo</button>
                                </div>
                                <div className="flex justify-end">
                                    <button onClick={handleAddNewUser} className="w-30 h-8 mt-5 bg-zinc-300 text-lg border-2 border-zinc-300 hover:cursor-pointer hover:bg-white/10 rounded-2xl">Add</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}