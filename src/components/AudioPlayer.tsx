import { PauseIcon, PlayIcon } from '@heroicons/react/20/solid';
import type { ChangeEvent } from 'react';
import { useRef, useState } from 'react';

interface PlayerProps {
  url?: string;
}

interface PlayingInfoProps {
  isPlaying?: boolean;
  currentTime?: number;
  totalTime?: number;
  formattedTime: string;
  volume: number;
}

const AudioPlayer = (props: PlayerProps) => {
  const player = useRef<HTMLAudioElement | null>(null);
  const [playingInfo, setPlayingInfo] = useState({
    formattedTime: '0:00',
    volume: 100,
    currentTime: 0,
  } as PlayingInfoProps);

  const playClick = () => {
    setPlayingInfo({ ...playingInfo, isPlaying: !playingInfo.isPlaying });
  };

  const calcTime = (duration: number) => {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    const formattedSec = seconds < 10 ? `0${seconds}` : seconds;
    const formattedTime = `${minutes}:${formattedSec}`;
    return formattedTime;
  };

  const getTimeInfo = () => {
    if (!player.current) return;
    const playerEl = player.current;
    const { duration } = playerEl;
    const rounded = Math.floor(duration);

    setPlayingInfo({
      ...playingInfo,
      totalTime: rounded,
      formattedTime: calcTime(rounded),
    });
  };

  const changeVol = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target) return;

    setPlayingInfo({ ...playingInfo, volume: Number(e.target.value) });
  };

  const changeTime = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target) return;
    setPlayingInfo({ ...playingInfo, currentTime: Number(e.target.value) });
  };

  return (
    <div className="h-full w-full">
      <audio
        ref={player}
        src={props.url || ''}
        onLoadedMetadata={getTimeInfo}
      />
      {/* <div> */}
      {/* <button> */}
      <div className="flex h-full flex-row">
        <div hidden={playingInfo.isPlaying} onClick={playClick}>
          <PlayIcon className="h-full cursor-pointer transition-all" />
        </div>
        <div hidden={!playingInfo.isPlaying} onClick={playClick}>
          <PauseIcon className="h-full cursor-pointer transition-all" />
        </div>
        <div>
          <input
            type="range"
            max="100"
            value={playingInfo.volume}
            onChange={changeVol}
          />
        </div>
        <div>{calcTime(playingInfo.currentTime)}</div>
        <div>
          <input
            type="range"
            max={playingInfo.totalTime}
            value={playingInfo.currentTime}
            onChange={changeTime}
          />
        </div>
        <div>{playingInfo.formattedTime}</div>
      </div>
      {/* </button> */}
      {/* </div> */}
    </div>
  );
};

export default AudioPlayer;
