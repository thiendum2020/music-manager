import React from "react";
import { Link } from "react-router-dom";

export default function SideBar() {
    return (
        <div className="side-bar border">
            <ul className="nav flex-column text-2">
                <Link to="/my-songs">
                    <li className="nav-item active">Songs</li>
                </Link>
                <li className="nav-item">Playlists</li>
            </ul>
        </div>
    );
}
