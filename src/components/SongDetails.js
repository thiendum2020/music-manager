import React, { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import BackgroundImage from '../images/background-cd.jpg'
import { getDetailsSong } from '../actions/songActions'

let base64ToBuffer = function (arrayBuffer) {
	let binary = window.atob(arrayBuffer);
	let buffer = new ArrayBuffer(binary.length);
	let bytes = new Uint8Array(buffer);
	for (let i = 0; i < buffer.byteLength; i++) {
		bytes[i] = binary.charCodeAt(i) & 0xFF;
	}
	return buffer;
};

let context = new AudioContext();
let source = null
console.log(source);

export default function SongDetails() {
	let { id } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate()

	const { song, loading, error } = useSelector((state) => state.detailsSongReducer);
	const [playing, setPlaying] = useState(true)
	const [repeat, setRepeat] = useState(false)
	const [volume, setVolume] = useState(true)
	const [audio, setAudio] = useState('')
	const [audioBuffer, setAudioBuffer] = useState(null)

	const cdThumb = useRef()
	const sourceRef = useRef()

	useEffect(() => {
		dispatch(getDetailsSong(id))
		if (song && song.codeSong) {
			setAudio(song.codeSong)
			const audioData = base64ToBuffer(song.codeSong);
			context.decodeAudioData(audioData, function (buffer) {
				setAudioBuffer(buffer);
			}, function (e) {
				console.log('Error with decoding audio data', e);
			});
		}

		if (playing) {
			console.log("start");
			source = context.createBufferSource();
			source.buffer = audioBuffer;
			source.loop = false;
			source.connect(context.destination);
			source.start(0); // Play immediately.
		}
		if (source && !playing) {
			console.log("stop");
			source.stop(0);
		}
	}, [dispatch, id, song, playing]);

	const onPlay = (e) => {
		e.preventDefault()
		setPlaying(!playing)
		cdThumb.current.classList.toggle('cd-thumb-rorate')

	}
	const onRepeatHandler = (e) => {
		e.preventDefault()
		setRepeat(!repeat)
		// isRepeat.current.classList.toggle('active')
	}
	const onVolumeHandler = (e) => {
		e.preventDefault()
		setVolume(!volume)
		// isOpenVolume.current.classList.toggle('active')
	}

	return (
		<>
			<div className="top-link border">
				<h3>Song: {song.name}</h3>
			</div>

			<div className={playing ? 'player playing' : 'player'}>
				<div className='player-header'>
					<h5>Now playing:</h5>
					<h3>{song.name}</h3>
					<h4>{song.artist}</h4>
				</div>
				<div className="cd">
					<div className="cd-thumb cd-thumb-rorate" style={{ backgroundImage: `url(${BackgroundImage}` }} ref={cdThumb}>
					</div>
				</div>


				<div>
					<div className="control">
						<div className={repeat ? 'btn-cd btn-repeat active' : 'btn-cd btn-repeat'} onClick={onRepeatHandler}>
							<i className="fas fa-redo" />
						</div>

						<div className="btn-cd btn-toggle-play" onClick={onPlay}>
							<i className="fas fa-pause icon-pause" />
							<i className="fas fa-play icon-play" />
						</div>

						<div className='btn-cd btn-volume' onClick={onVolumeHandler}>
							<i className={volume ? 'fas fa-volume-up' : 'fas fa-volume-off'} />
						</div>
					</div>
					<input id="progress" className="progress" type="range" defaultValue={0} step={1} min={0} max={100} />
					<audio id="audio" src={audio} ref={sourceRef} />
				</div>
			</div>
		</>

	)
}
