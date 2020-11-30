import React, { useEffect, useState, useRef } from "react";
import { COLORS } from "../../constants";
import styled, { keyframes } from "styled-components";
import PlayIcon from "./PlayIcon";

const PlayButton = ({ audioSrc }) => {
  let time = 30; // 30s
  const [play, setPlay] = useState(false);
  const au = useRef(null);
  const playAudio = () => {
    if (au) {
      // stop all other audios currently playing
      const audios = document.getElementsByTagName("AUDIO");
      let a;
      for (a of audios) {
        if (a.duration > 0 && !a.paused) {
          a.pause();
        }
      }
    }
    if (au && !play) {
      // play = false
      au.current.play();
      setPlay(!play);
    }
    if (au && play) {
      // play = true
      au.current.pause();
      setPlay(!play);
    }
  };

  const endAudio = () => {
    setPlay(!play);
  };
  return (
    <PlayButtonWrapper onClick={playAudio} onEnded={endAudio}>
      <PlayIcon width="30px" height="30px" fill={COLORS.white} play={play} />
      <PlayButtonAu src={audioSrc} ref={au} onPause={() => setPlay(false)} />
    </PlayButtonWrapper>
  );
};

const playing = keyframes`
   
`;

const PlayButtonWrapper = styled.div`
  cursor: pointer;

  background: ${COLORS.grayFade};
  width: 42px;
  height: 42px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;
`;

const PlayButtonAu = styled.audio``;

const save = `:hover::after {
    
}`;
export default PlayButton;
