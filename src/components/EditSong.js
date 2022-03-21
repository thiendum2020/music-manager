import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert'

import { getDetailsSong, editSong } from '../actions/songActions'
import { UPDATE_SONG_RESET, CLEAR_ERRORS } from "../constants/songContants.js";

export default function EditSong() {
    let { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const alert = useAlert()

    const { song, loading, error } = useSelector((state) => state.detailsSongReducer);
    const { success } = useSelector((state) => state.songReducer);
    const [name, setName] = useState('')
    const [artist, setArtist] = useState('')

    useEffect(() => {
        if (Object.keys(song).length === 0 || song.id !== id) {
            dispatch(getDetailsSong(id))
            setName(song.name)
            setArtist(song.artist)
        } else {
            setName(song.name)
            setArtist(song.artist)
        }
        if (success) {
            alert.success("Updated!")
            dispatch({type: UPDATE_SONG_RESET})
            navigate('/my-songs')
        }
    }, [dispatch, id, song, success]);

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(editSong(id, name, artist))

    }

    return (
        <>
            <div className="top-link border">
                <h3>Edit Song</h3>
            </div>
            <div className="songs border">
                <div className="container">
                    <form className="form" onSubmit={submitHandler}>
                        <div className="form-group row">
                            <label className="col-25">*Song Name</label>
                            <input type="text"
                                className="form-control col-50"
                                required={true}
                                value={name}
                                onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="form-group row">
                            <label className="col-25">*Artist</label>
                            <input type="text"
                                className="form-control col-50"
                                required={true}
                                value={artist}
                                onChange={(e) => setArtist(e.target.value)} />
                        </div>
                        <div className="row">
                            <div className="col-75 btn-song">
                                <button className="btn">Apply</button>
                                <Link className="btn" to='/my-songs'>Cancel</Link>

                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
