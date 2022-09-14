import { Dialog, Transition } from '@headlessui/react';
import { ArrowLeftIcon, PhotoIcon } from '@heroicons/react/24/outline';
import type { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { Fragment, useRef, useState } from 'react';

import FileButton from '@/components/FileButton';
import ImagePreview from '@/components/ImagePreview';
import PhotoDetails from '@/components/PhotoDetails';
import SongSelect from '@/components/SongSelect';
import UploadStage from '@/components/UploadStage';

import DivSeparator from './DivSeparator';

interface ModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  discardOpen: () => void;
  stageInfo: {
    stage: number;
    setStage: Dispatch<SetStateAction<number>>;
  };
}

interface ImageInfo {
  url?: string;
  imageFile?: File;
  originalHeight?: number;
  originalWidth?: number;
  caption?: string;
}

interface SongInfo {
  songFile?: File;
  start?: number;
  url?: string;
}

// Thanks to https://tailwindui.com/components/application-ui/overlays/modals
const UploadModal = (props: ModalProps) => {
  const [divHeight, setDivHeight] = useState(0);
  const [divWidth, setDivWidth] = useState(0);
  const [imageInfo, setImageInfo] = useState<ImageInfo>({});
  const [songInfo, setSongInfo] = useState<SongInfo>({});

  const { stageInfo } = props;
  const { stage, setStage } = stageInfo;

  const fileInput = useRef<null | HTMLInputElement>(null);
  const stageDiv = useRef<null | HTMLDivElement>(null);

  const handleBack = () => {
    if (stage === 1) {
      props.discardOpen();
    } else {
      const newStage = stage - 1;
      setStage(newStage);
    }
  };

  const handleNext = () => {
    const newStage = stage + 1;
    setStage(newStage);
  };

  const getDivDimensions = () => {
    if (!stageDiv.current) {
      return;
    }

    const rect = stageDiv.current.getBoundingClientRect();
    const { height, width } = rect;
    setDivHeight(height);
    setDivWidth(width);
  };

  const handleNewImage = (event: ChangeEvent<HTMLInputElement>) => {
    const possibleFiles = event.target.files;
    if (!possibleFiles || possibleFiles.length > 1 || !possibleFiles[0]) {
      return;
    }

    const image = possibleFiles[0];

    if (!image.name.toLowerCase().match(/\.(jpeg|jpg|png)$/g)) {
      return;
    }
    const url = window.URL.createObjectURL(image);
    const newInfo: ImageInfo = { ...imageInfo, url, imageFile: image };
    setImageInfo(newInfo);
    setStage(1);
  };

  const imgLoad = () => {
    if (stage > 1) return;
    const img = new Image();
    img.onload = () => {
      const { height, width } = img;
      const newImgInfo: ImageInfo = {
        ...imageInfo,
        originalHeight: height,
        originalWidth: width,
      };
      setImageInfo(newImgInfo);
    };
    img.src = imageInfo.url || '';
  };

  const captionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (!event.target) return;
    const { value } = event.target;
    const newInfo = { ...imageInfo, caption: value };
    setImageInfo(newInfo);
  };

  const changeSongInfo = (newInfo: SongInfo) => {
    setSongInfo(newInfo);
  };

  return (
    <Transition.Root as={Fragment} show={props.open}>
      <Dialog as="div" className="relative z-10" onClose={props.setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-100"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-75"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 overflow-hidden bg-zinc-900 bg-opacity-70 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-hidden">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0 scale-150"
            enterTo="opacity-100 scale-100"
            afterEnter={getDivDimensions}
            leave="ease-in duration-75"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="flex min-h-full items-center justify-center text-center">
              <Dialog.Panel className="relative h-fit overflow-hidden rounded-lg bg-white shadow-xl">
                <div className="h-10 bg-white text-center">
                  <div className="mx-auto flex w-full items-center justify-between px-4 py-2 text-center">
                    <button
                      className={`aspect-square h-full ${
                        stage > 0 ? '' : 'hidden'
                      }`}
                      onClick={handleBack}
                    >
                      <div className="h-full">
                        <ArrowLeftIcon className="h-5" />
                      </div>
                    </button>
                    <Dialog.Title className="grow font-semibold">
                      Create New Post
                    </Dialog.Title>
                    <button
                      className={`h-full font-semibold text-sky-500 ${
                        stage > 0 ? '' : 'hidden'
                      }`}
                      onClick={handleNext}
                    >
                      {stage < 3 ? 'Next' : 'Post'}
                    </button>
                  </div>
                </div>
                <DivSeparator />
                <div className="flex w-full flex-col">
                  <div ref={stageDiv} className="w-30vw ">
                    <UploadStage shown={stage === 0}>
                      <PhotoIcon className="aspect-square h-36" />
                      <img
                        src={imageInfo.url || ''}
                        onLoad={imgLoad}
                        alt="Hidden Uploaded Image"
                        style={{ display: 'none' }}
                      />
                      <FileButton
                        onChange={handleNewImage}
                        ref={fileInput}
                        name={'Select from Computer'}
                        accept="image/jpeg,image/png"
                      />
                    </UploadStage>
                    <UploadStage shown={stage >= 1}>
                      <div className="flex aspect-square w-30vw">
                        <ImagePreview
                          imageUrl={imageInfo.url || ''}
                          height={divHeight}
                          width={divWidth}
                        />
                      </div>
                    </UploadStage>
                  </div>
                  <div
                    className={`${
                      stage > 1 ? 'h-5rem' : 'h-0'
                    } flex w-full flex-col text-left transition-height duration-300 ease-in-out`}
                  >
                    <PhotoDetails shown={stage === 2}>
                      <textarea
                        placeholder="Write a caption..."
                        autoCorrect="off"
                        autoComplete="off"
                        className="h-full w-full resize-none overflow-hidden border-none text-center font-exposition text-2xl font-medium outline-none"
                        maxLength={20}
                        onChange={captionChange}
                        value={imageInfo.caption}
                      />
                    </PhotoDetails>
                    <PhotoDetails
                      shown={stage >= 3}
                      classes="flex justify-around"
                    >
                      <SongSelect
                        changeSongInfo={changeSongInfo}
                        songInfo={songInfo}
                        stage={stage}
                        setStage={setStage}
                      />
                    </PhotoDetails>
                  </div>
                </div>
              </Dialog.Panel>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default UploadModal;
