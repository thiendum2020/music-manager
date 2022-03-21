import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllSongs, deleteSong } from "../actions/songActions";
import { DELETE_SONG_RESET } from "../constants/songContants";
import Swal from 'sweetalert2'

export default function Songs() {
    const dispatch = useDispatch();
    const { songs, loading, error } = useSelector(
        (state) => state.allSongsReducer
    );
    const { isSuccessed } = useSelector(
        (state) => state.songReducer
    );
    const [currentPage, setCurrentPage] = useState(1);
    const [resPerPage, setResPerPage] = useState(5);
    const [newListSongs, setNewListSongs] = useState([]);
    const [searchSongs, setSearchSongs] = useState(songs);
    const [string, setString] = useState("");

    let countPage = [];
    for (let i = 1; i <= Math.ceil(songs && songs.length / resPerPage); i++) {
        countPage.push(i);
    }

    useEffect(() => {
        dispatch(getAllSongs());
        if (string.trim() !== "") {
            let temp = songs && songs.filter((obj) => obj.name === string);
            setSearchSongs(temp);
            setNewListSongs(
                temp.slice(
                    resPerPage * currentPage - resPerPage,
                    resPerPage * currentPage
                )
            );
        } else {
            setNewListSongs(
                songs &&
                songs.slice(
                    resPerPage * currentPage - resPerPage,
                    resPerPage * currentPage
                )
            );
            setSearchSongs(songs);
        }

        if (isSuccessed) {
            dispatch({ type: DELETE_SONG_RESET })
        }
    }, [dispatch, currentPage, resPerPage, string, searchSongs, songs, isSuccessed]);

    const deleteHandler = (id) => {
        console.log(id);
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteSong(id))
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
        })

    };

    return (
        <>
            <div className="top-link border">
                <h3>All Songs</h3>
            </div>
            {
                loading ? <div>LOADING...</div> : (
                    <>
                        <div className="songs border songs-table">
                            <div className="pt-1">
                                <div className="custom-search-input">
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            className="search-query form-control"
                                            placeholder="Search"
                                            value={string}
                                            onChange={(e) => setString(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="actions">
                                    <Link to="/addnewsong">
                                        <i className="fas fa-plus ml-3"> Add</i>
                                    </Link>

                                    <i className="fas fa-trash ml-3 btn-delete"> Delete</i>
                                </div>
                            </div>
                            {newListSongs.length === 0 ? (
                                <h4 style={{ marginTop: "36px" }}>No matching.</h4>
                            ) : (
                                <>
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th style={{ maxWidth: "20px" }}>
                                                    <input
                                                        type="checkbox"
                                                        id="check-all"
                                                        name="topping"
                                                        value="0"
                                                    />
                                                </th>
                                                <th>Name</th>
                                                <th>Artist</th>
                                                <th style={{ maxWidth: "40px" }}>
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {newListSongs.map((song) => (
                                                <tr key={song.id}>
                                                    <td style={{ maxWidth: "20px" }}>
                                                        <input
                                                            type="checkbox"
                                                            id={song.id}
                                                            name="topping"
                                                            value={song.id}
                                                        />
                                                    </td>
                                                    <td>{song.name}</td>
                                                    <td>{song.artist}</td>
                                                    <td style={{ maxWidth: "40px" }}>
                                                        <Link
                                                            to={`/song/${song.id}`}
                                                            style={{ marginRight: "10px" }}
                                                        >
                                                            <i className="fas fa-solid fa-eye"></i>
                                                        </Link>
                                                        <Link
                                                            to={`/editsong/${song.id}`}
                                                            style={{ marginRight: "10px" }}
                                                        >
                                                            <i className="bx bxs-edit"></i>
                                                        </Link>
                                                        <a
                                                            onClick={() =>
                                                                deleteHandler(song.id)
                                                            }
                                                        >
                                                            <i className="bx bxs-trash-alt"></i>
                                                        </a>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>

                                    <select
                                        className="form-select form-select-sm"
                                        aria-label=".form-select-sm example"
                                        value={resPerPage}
                                        onChange={(e) => setResPerPage(e.target.value)}
                                    >
                                        <option value={5} selected>
                                            5
                                        </option>
                                        <option value={10}>10</option>
                                        <option value={20}>20</option>
                                    </select>

                                    {searchSongs.length > resPerPage && (
                                        <div>
                                            <nav aria-label="Page navigation example">
                                                <ul className="pagination justify-content-end">
                                                    <li className="page-item disabled">
                                                        <a
                                                            className="page-link"
                                                            href="#"
                                                            tabIndex={-1}
                                                        >
                                                            Previous
                                                        </a>
                                                    </li>
                                                    {countPage.map((page, index) => {
                                                        if (page === currentPage) {
                                                            return (
                                                                <li
                                                                    className="page-item active"
                                                                    key={index}
                                                                >
                                                                    <a
                                                                        className="page-link"
                                                                        href="#"
                                                                    >
                                                                        {page}
                                                                    </a>
                                                                </li>
                                                            );
                                                        } else {
                                                            return (
                                                                <li
                                                                    className="page-item"
                                                                    key={index}
                                                                >
                                                                    <a
                                                                        className="page-link"
                                                                        href="#"
                                                                        onClick={(e) =>
                                                                            setCurrentPage(
                                                                                page
                                                                            )
                                                                        }
                                                                    >
                                                                        {page}
                                                                    </a>
                                                                </li>
                                                            );
                                                        }
                                                    })}
                                                    <li className="page-item">
                                                        <a className="page-link" href="#">
                                                            Next
                                                        </a>
                                                    </li>
                                                </ul>
                                            </nav>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </>
                )
            }


        </>
    );
}
