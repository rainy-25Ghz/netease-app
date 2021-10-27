import styled from "@emotion/styled";
import {
  Pause,
  PlayArrow,
  SkipNext,
  SkipPrevious,
  VolumeUp,
} from "@mui/icons-material";
import { IconButton, Slider } from "@mui/material";
import { Box } from "@mui/system";
import { useContext, useEffect, useState } from "react";
import useSWR from "swr";

import { useAudio } from "../hooks/useAudio";

import { MusicContext } from "../util/context";
import { fetcher } from "../util/network";
import { StyledListPic } from "./RecommendList";

const Layout = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;

  .progress {
    border-style: solid;
    border-width: 1px;
    border-color: #ff3300;
    width: 0%;
    position: absolute;
    top: -1px;
    height: 0;
  }
  .info {
    margin-left: 1rem;
    width: 20%;
    height: 100%;
    align-items: center;
    display: flex;
    text-align: left;
    .info-text {
      margin-left: 1rem;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  .control {
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
    width: 60%;
    flex-direction: column;
    .progress {
      height: 1rem;
      width: 24rem;
      display: inline-flex;
      .MuiSlider-root {
        margin-left: 1rem;
        margin-right: 1rem;
      }
    }
  }
  .volume {
    display: flex;
    align-items: center;
    width: 20%;
    justify-content: center;
    .icon {
      display: flex;
      justify-content: center;
      width: 2rem;
    }
    .MuiSlider-root {
      width: 8rem;
      .MuiSlider-thumb {
        width: 1rem;
        height: 1rem;
      }
    }
  }
`;

export const MusicPlayer = () => {
  const { name, artists, duration, url, currI, songIds, setCurrI } =
    useContext(MusicContext);
  const audio = useAudio();
  const [enable, setEnable] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(50);
  const [urlData, setUrlData] = useState<any>(undefined);
  useEffect(() => {
	setProgress(0);
    (async () => {
      if (currI >= 0 && songIds && songIds.length > 0) {
        const songId = songIds[currI];
        const res = await fetch(`/song/url?id=${songId}`).then((res) =>
          res.json()
        );
        setUrlData(res);
      }
    })();
  }, [songIds, currI]);

  const [paused, setPaused] = useState(true);
  useEffect(() => {
    audio.crossOrigin = "anonymous";

    const listener1 = () => {
      setPaused(false);
    };
    const listener2 = () => {
      setPaused(true);
    };
    const listener3 = () => {
      console.log("canplay");
      setEnable(true);
    };
    const listener4 = () => {
      setProgress(Math.floor((audio.currentTime / audio.duration) * 100));
    };
    audio.addEventListener("play", listener1);
    audio.addEventListener("pause", listener2);
    audio.addEventListener("canplay", listener3);
    audio.addEventListener("timeupdate", listener4);
    return () => {
      audio.removeEventListener("play", listener1);
      audio.removeEventListener("pause", listener2);
      audio.removeEventListener("canplay", listener3);
      audio.removeEventListener("timeupdate", listener4);
    };
  }, [urlData]);

  useEffect(() => {
    if (urlData && urlData.data[0]) {
      audio.src = urlData.data[0].url;
      setEnable(false);
    }
  }, [urlData]);

  return (
    <Layout key={JSON.stringify(urlData)}>
      <div className="progress" style={{ width: `${progress}%` }}></div>
      <div className="info">
        <StyledListPic width={3} height={3} bdr={0.5} src={url} />
        <div className="info-text">
          <div className="name">{name}</div>
          <div className="artists">{artists}</div>
        </div>
      </div>
      <div className="control">
        <div className="btns">
          <IconButton
            className="prev-btn"
            onClick={() => {
              audio.pause();
			  audio.src="";
              setPaused(true);
              setProgress(0);
              const newVal =
                currI < 1
                  ? currI - 1 + songIds.length
                  : (currI - 1) % songIds.length;
              setCurrI(newVal);
            }}
          >
            <SkipPrevious></SkipPrevious>
          </IconButton>

          {!paused ? (
            <IconButton
              disabled={!enable}
              className="play-btn"
              onClick={() => {
                if (urlData && urlData.data && urlData.data[0]) {
                  audio.pause();
                }
              }}
            >
              <Pause />
            </IconButton>
          ) : (
            <IconButton
              disabled={!enable}
              className="play-btn"
              onClick={() => {
                if (urlData && urlData.data && urlData.data[0]) {
                  audio.play();
                }
              }}
            >
              <PlayArrow />
            </IconButton>
          )}
          <IconButton
            className="next-btn"
            onClick={() => {
              setProgress(0);
              audio.pause();
			  audio.src="";
              setPaused(true);
              setCurrI((currI + 1) % songIds.length);
            }}
          >
            <SkipNext></SkipNext>
          </IconButton>
        </div>
      </div>
      <Box className="volume">
        <VolumeUp className="icon"></VolumeUp>
        <Slider
          onChange={(_, newVal) => {
            if (typeof newVal === "number") {
              audio.volume = newVal / 100;
              setVolume(newVal);
            }
          }}
          value={volume}
        />
      </Box>
    </Layout>
  );
};
