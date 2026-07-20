import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import "./DashboardLayout.css";

function DashboardLayout({ children }) {
    return (
        <div>
            <Sidebar />

            <div className="main">
                <Topbar />

                <div className="content">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default DashboardLayout;