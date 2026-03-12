import {Routes, Route} from "react-router"
import Home from "./Components/Home";
const App = () => {
    return(
        <div>
            <main>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                </Routes>
            </main>
        </div>
    )
}

export default App;