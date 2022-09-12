import type { ChangeEvent } from 'react';
import { useRef } from 'react';

const SongSelect = () => {
  const fileInput = useRef<HTMLInputElement | null>(null);

  const newSong = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
  };

  const openSelector = () => {
    if (!fileInput.current) return;
    fileInput.current.click();
  };

  return (
    <>
      <input
        type="file"
        hidden={true}
        onChange={newSong}
        ref={fileInput}
        onClick={(e) => {
          const target = e.target as HTMLInputElement;
          target.value = '';
        }}
      />
      <button
        type="button"
        className="rounded bg-sky-500 px-2 py-1 text-sm font-semibold text-white"
        onClick={openSelector}
      >
        Select a song.
      </button>
    </>
  );
};

export default SongSelect;
