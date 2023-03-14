// TODO: Dashboard Page

// I should see all of the schedules for my user for the day of the week it is (for example, if it is Monday then I should only see the schedules that have me doing something on Monday.)
// I should see a list of all my reptiles
// When selecting a reptile the app should navigate to the Reptile page
// I should be able to create a new reptile (you can do this on this page via something like a pop up, or you can create a new page for this)
// I should be able to delete a reptile.
// I should be able to log out of my account


import { Reptile, Schedule } from "@prisma/client";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { useApi } from "../hooks/useApi";
export const Dashboard = () => {
    const navigate = useNavigate();
    const api = useApi();

    const [schedules, setSchedules] = useState<Schedule[]>([]);
    const [reptiles, setReptiles] = useState<Reptile[]>([]);

    const [loadingSchedules, setLoadingSchedules] = useState(true);
    const [loadingReptiles, setLoadingReptiles] = useState(true);

    const [showReptiles, setShowReptiles] = useState(false);
    const [showSchedule, setShowSchedule] = useState(true);
    useEffect(() => {
        console.log(api);

        //get the current day
        const date = new Date();
        let day = date.getDay();
        //get user's schedules
        fetch("http://localhost:8000/users/schedule")
            .then(response => response.json())
            .then(res => {
                setSchedules(res.schedules as Schedule[]);
                setLoadingSchedules(false);
            });
        //get user's reptiles
        fetch("http://localhost:8000/reptile/")
            .then(response => response.json())
            .then(res => {
                setReptiles(res.reptiles as Reptile[]);
                setLoadingReptiles(false);
            });
    }, []);

    return (
        <div className="page-links">
            <span><Link to={`/logout`} className="login-links">Logout</Link></span>
            {loadingReptiles || loadingSchedules && <p>Loading...</p>}
            {!loadingReptiles && !loadingSchedules && showReptiles &&
                <ReptilesDOM></ReptilesDOM>
            }
            {!loadingReptiles && !loadingSchedules && showSchedule &&
                <ScheduleDOM></ScheduleDOM>
            }
        </div>
    )
}

const ReptilesDOM = () => {
    return (
        <div></div>
    )
}

const ScheduleDOM = () => {
    return (
        <div></div>
    )
}