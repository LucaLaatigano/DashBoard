import SideBar from "./SideBar.jsx"

const Home = () =>{
    return(
        <div className="pl-13 pt-5 flex flex-wrap gap-5">
            {Array(4).fill(0).map((_, index )=>(
                <div className="w-60 h-60 bg-white rounded-2xl">

                </div>
            ))}
            <div className="flex gap-10 mt-5">
                <div className="w-180 h-85 bg-white rounded-2xl">

                </div>
                <div className="w-65 h-85 bg-white rounded-2xl">

                </div>
            </div>
        </div>
    )
}
export default Home;