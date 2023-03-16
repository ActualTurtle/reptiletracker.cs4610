"use strict";
// TODO: Dashboard Page
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dashboard = void 0;
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const useApi_1 = require("../hooks/useApi");
const Dashboard = () => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const api = (0, useApi_1.useApi)();
    const [showReptiles, setShowReptiles] = (0, react_1.useState)(false);
    const [showSchedule, setShowSchedule] = (0, react_1.useState)(true);
    (0, react_1.useEffect)(() => {
        console.log(api);
    }, []);
    return (<div>
      <div className="page-links">
        <span><react_router_dom_1.Link to={`/logout`} className="login-links">Logout</react_router_dom_1.Link></span>
      </div>
      <div>
        {showReptiles &&
            <ReptilesDOM></ReptilesDOM>}
        {showSchedule &&
            <ScheduleDOM></ScheduleDOM>}
      </div>
    </div>);
};
exports.Dashboard = Dashboard;
const ReptilesDOM = () => {
    const [reptiles, setReptiles] = (0, react_1.useState)([]);
    const [loadingReptiles, setLoadingReptiles] = (0, react_1.useState)(true);
    (0, react_1.useEffect)(() => {
        fetch("http://localhost:8000/reptile/")
            .then(response => response.json())
            .then(res => {
            setReptiles(res.reptiles);
            setLoadingReptiles(false);
        });
    }, []);
    return (<div>
      {loadingReptiles && <p>Loading reptiles...</p>}
      {!loadingReptiles &&
            reptiles.map(reptile => {
                return (<div className="reptile">
              <p>Species: {reptile.species}</p>
              <p>Name: {reptile.name}</p>
              <p>Sex: {reptile.sex}</p>
              <p>Last Updated: {reptile.updatedAt.toLocaleDateString()}</p>
              <p>Record Created At: {reptile.createdAt.toLocaleDateString()}</p>
            </div>);
            })}
    </div>);
};
const ScheduleDOM = () => {
    const [schedules, setSchedules] = (0, react_1.useState)([]);
    const [loadingSchedules, setLoadingSchedules] = (0, react_1.useState)(true);
    const [day, setDay] = (0, react_1.useState)("idk man");
    (0, react_1.useEffect)(() => {
        const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
        setDay(days[new Date().getDay()]);
        //get user's schedules
        fetch("http://localhost:8000/users/schedule")
            .then(response => response.json())
            .then(res => {
            setSchedules(res.schedules);
            setLoadingSchedules(false);
        });
    }, []);
    return (<div>
      <p>{day}</p>
      {loadingSchedules && <p>Loading schedules...</p>}
      <div className="schedules">
        {schedules.map(schedule => {
            let dayKey = day;
            if (schedule[dayKey] === true) {
                return (<div className="schedule">
                  <p>Reptile: {schedule.reptileId}</p>
                  <p>Type: {schedule.type}</p>
                  <p>Description: {schedule.description}</p>
                  <p>Last updated: {schedule.updatedAt.toLocaleDateString()}</p>
                </div>);
            }
        })}
      </div>
    </div>);
};
