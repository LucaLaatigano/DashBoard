import {Routes, Route} from "react-router"
import Home from "./Components/Home";
import Analytics from "./Components/Analytics";
import SideBar from "./Components/SideBar";
import Sales from "./Components/Sales"
import Settings from "./Components/Settings"
import Users from "./Components/Users"
import NavBar from "./Components/NavBar";
const App = () => {
    return(
        <div className="flex min-h-screen bg-zinc-200">
            <SideBar/>
            <div className="flex-1 flex flex-col">
                <NavBar/>
                <main className="flex-1">
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/analytics" element={<Analytics/>}/>
                        <Route path="/sales" element={<Sales/>}/>
                        <Route path="/users" element={<Users/>}/>
                        <Route path="/settings" element={<Settings/>}/>
                    </Routes>
                </main>
            </div>
        </div>
    )
}

export default App;