import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SideBar from "./components/SideBar";
import Songs from "./components/Songs";
import SongDetails from "./components/SongDetails";
import NewSong from "./components/NewSong";
import EditSong from "./components/EditSong";
import Login from "./components/Login";

function App() {
    return (
        <div>
            <BrowserRouter>
                <Header />

                <div className="container">
                    <div className="row">
                        <div className="col-2">
                            <SideBar />
                        </div>
                        <div className="col-10">
                            <Routes>
                                <Route path="/" element={<Login />} exact />
                                <Route
                                    path="/my-songs"
                                    element={<Songs />}
                                    exact
                                />
                                <Route
                                    path="/song/:id"
                                    element={<SongDetails />}
                                    exact
                                />
                                <Route
                                    path="/addnewsong"
                                    element={<NewSong />}
                                    exact
                                />
                                <Route
                                    path="/editsong/:id"
                                    element={<EditSong />}
                                    exact
                                />
                            </Routes>
                        </div>
                    </div>
                </div>

                <Footer />
            </BrowserRouter>
        </div>
    );
}

export default App;
