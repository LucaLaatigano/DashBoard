import {Routes, Route} from "react-router"
import Home from "./Components/Home";
import Analytics from "./Components/Analytics";
import SideBar from "./Components/SideBar";
import Sales from "./Components/Sales"
import Settings from "./Components/Settings"
import Users from "./Components/Users"
const App = () => {
    return(
        <div>
            <SideBar/>
            <main>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/analytics" element={<Analytics/>}/>
                    <Route path="/sales" element={<Sales/>}/>
                    <Route path="/users" element={<Users/>}/>
                    <Route path="/settings" element={<Settings/>}/>
                </Routes>
            </main>
        </div>
    )
}

export default App;