import { Outlet } from "react-router-dom";
import EventsNavigation from "../components/EventsNavigation";
const RootNavigation = () =>{
    return <>
    <EventsNavigation />
        <main>
            <Outlet />
        </main>
    </>
}

export default RootNavigation;