import type { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { useRef } from 'react';

import FileButton from '@/components/FileButton';

interface SongInfo {
  songFile?: File;
  start?: number;
  url?: string;
}

interface SelectProps {
  changeSongInfo(newInfo: SongInfo): void;
  songInfo: SongInfo;
  stage: number;
  setStage: Dispatch<SetStateAction<number>>;
}

const SongSelect = (props: SelectProps) => {
  const { songInfo, stage, setStage } = props;

  const fileInput = useRef<HTMLInputElement | null>(null);

  const newSong = (event: ChangeEvent<HTMLInputElement>) => {
    const songFiles = event.target.files;
    if (!songFiles || songFiles.length > 1 || !songFiles[0]) return;
    const url = window.URL.createObjectURL(songFiles[0]);
    const newInfo = { ...songInfo, songFile: songFiles[0], url };
    props.changeSongInfo(newInfo);
    setStage(4);
  };

  return (
    <>
      <div
        className="flex h-full w-full justify-around"
        style={{ display: stage > 3 ? 'none' : '' }}
      >
        <FileButton
          onChange={newSong}
          ref={fileInput}
          name={'Select a song.'}
          accept="audio/mp3"
        />
      </div>
      <div
        className="flex h-full w-full justify-around"
        style={{ display: stage > 3 ? '' : 'none' }}
      >
        <div>
          <audio controls src={songInfo.url || ''} />
        </div>
      </div>
    </>
  );
};

export default SongSelect;
