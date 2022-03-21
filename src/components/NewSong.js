import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { newSong } from "../actions/songActions";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert'

const bufferToBase64 = function (buffer) {
    var bytes = new Uint8Array(buffer);
    var len = buffer.byteLength;
    var binary = "";
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
};

export default function NewSong() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const alert = useAlert()
    const [name, setName] = useState('')
    const [artist, setArtist] = useState('')
    const [file, setFile] = useState()
    const [codeBase64, setCodeBase64] = useState('')
    const { success } = useSelector(
        (state) => state.newSongReducer
    );
    // const [playing, toggle] = useAudio(url);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(newSong(name, artist, codeBase64))
    };

    const onFileChange = (e) => {
        setFile(e.target.files[0]);
        var reader = new FileReader();
        reader.onload = function (e) {
            setCodeBase64(bufferToBase64(this.result))
        };
        reader.readAsArrayBuffer(e.target.files[0]);
    };
    useEffect(() => {
        if (success) {
            alert.success("Added a new music!")
            navigate('/my-songs')
        }
    }, [success]);
    return (
        <>
            <div className="top-link border">
                <h3>Create Song</h3>
            </div>
            <div className="songs border">
                <div className="container">
                    <form className="form" onSubmit={submitHandler}>
                        <div className="form-group row">
                            <label className="col-25" >*Song Name</label>
                            <input
                                type="text"
                                className="form-control col-50"
                                required={true}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="form-group row">
                            <label className="col-25">*Artist</label>
                            <input
                                type="text"
                                className="form-control col-50"
                                required={true}
                                value={artist}
                                onChange={(e) => setArtist(e.target.value)}
                            />
                        </div>
                        <div className="form-group row">
                            <label className="col-25">*Upload Song File</label>
                            <input
                                type="file"
                                accept="audio/*"
                                className="form-control col-50"
                                required={true}
                                onChange={onFileChange}
                            />
                        </div>
                        <div className="row">
                            <div className="col-75 btn-song">
                                <button className="btn btn-primary" type="submit">
                                    Create
                                </button>
                                <Link className="btn" to="/my-songs">
                                    Cancel
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
