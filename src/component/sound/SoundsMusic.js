import React from 'react';
import musicBirds from '../../sounds/birds.mp3';
import soundClick from '../../sounds/click.mp3';
import {useState, useEffect} from "react";

export default function SoundsMusic() {
    const audioMusic = document.getElementById('audio-music');
    const audioSound = document.getElementById('audio-sound');
    const [valueMusic, setValueMusic] = useState(0);
    const [valueSound, setValueSound] = useState(0);

    function handleMusicClick(e) {
        if (e.target.value === e.target.min) {
            audioMusic.pause();
        } else {
            audioMusic.volume = e.target.value / 10;
            audioMusic.play();
        }
    }

    function handleSoundClick(e) {
        audioSound.pause();
        if (e.target.value !== e.target.min) {
            audioSound.volume = e.target.value / 10;
            audioSound.play();
        }
    }

    useEffect(() => {
        const dataMusicSoundSaved = JSON.parse(sessionStorage.getItem('dataMusicSound'));
        if (dataMusicSoundSaved) {
            setValueMusic(dataMusicSoundSaved.valueMusic);
            setValueSound(dataMusicSoundSaved.valueSound);
        }
    }, []);

    useEffect(() => {
        const valuesToSave = {
            valueMusic,
            valueSound,
        };
        sessionStorage.setItem('dataMusicSound', JSON.stringify(valuesToSave));
    })

    return (
        <div className="sound-control">
            <audio volume={valueMusic / 10} loop id="audio-music" src={musicBirds}/>
            <p className='sound-control__music'>Music<span className="sound-control__Off">{' '}</span></p>
            <input id="range" min="0" max="10" type="range" value={valueMusic} name="range" step="1"
                   onClick={handleMusicClick}
                   onChange={(e) => setValueMusic(e.target.value)}/>

            <audio id="audio-sound" volume={valueSound / 10} src={soundClick}/>
            <p className='sound-control__sound'>Sound<span className="sound-control__Off">{' '}</span></p>
            <input id="range" min="0" max="10" type="range"
                   value={valueSound}
                   name="range"
                   step="1"
                   onClick={handleSoundClick}
                   onChange={(e) => setValueSound(e.target.value)}/>
        </div>
    );
}
