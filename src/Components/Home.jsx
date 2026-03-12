import SideBar from "./SideBar.jsx"
import Principal from "./Principal.jsx";

const Home = () =>{
    return(
        <div className="flex">
            <SideBar />
            <Principal />
        </div>
    )
}
export default Home;