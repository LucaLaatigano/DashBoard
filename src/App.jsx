import { Routes, Route } from "react-router"
import Home from "./Components/Home";
import Analytics from "./Components/Analytics";
import SideBar from "./Components/SideBar";
import Sales from "./Components/Sales"
import Settings from "./Components/Settings"
import Users from "./Components/Users"
import NavBar from "./Components/NavBar";

const App = () => {
    return (
        <div className="flex h-screen bg-zinc-200 overflow-hidden">
            <SideBar />
            <div className="flex-1 flex flex-col min-w-0">
                <NavBar />
                <main className="flex-1 overflow-y-auto">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/analytics" element={<Analytics />} />
                        <Route path="/sales" element={<Sales />} />
                        <Route path="/users" element={<Users />} />
                        <Route path="/settings" element={<Settings />} />
                    </Routes>
                </main>
            </div>
        </div>
    )
}

export default App;