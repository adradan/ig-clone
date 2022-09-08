import { Dialog, Transition } from '@headlessui/react';
import { ArrowLeftIcon, PhotoIcon } from '@heroicons/react/24/outline';
import type { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { Fragment, useRef, useState } from 'react';

import ImagePreview from '@/components/ImagePreview';
import UploadStage from '@/components/UploadStage';

import DivSeparator from './DivSeparator';

interface ModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  discardOpen: () => void;
}

// Thanks to https://tailwindui.com/components/application-ui/overlays/modals
const UploadModal = (props: ModalProps) => {
  const fileInput = useRef<null | HTMLInputElement>(null);
  const stageDiv = useRef<null | HTMLDivElement>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [originalHeight, setOriginalHeight] = useState(0);
  const [originalWidth, setOriginalWidth] = useState(0);
  const [stage, setStage] = useState(0);
  const [divHeight, setDivHeight] = useState(0);
  const [divWidth, setDivWidth] = useState(0);

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
      console.log(possibleFiles);
      return;
    }

    const image = possibleFiles[0];

    if (!image.name.toLowerCase().match(/\.(jpeg|jpg|png)$/g)) {
      return;
    }
    console.log('testst');
    const url = window.URL.createObjectURL(image);
    setImageUrl(url);
    setImageFile(image);
  };

  const imgLoad = () => {
    const img = new Image();
    img.onload = () => {
      const { height, width } = img;
      setOriginalHeight(height);
      setOriginalWidth(width);
      setStage(1);
    };
    img.src = imageUrl;
  };

  const openFileSelect = () => {
    if (!fileInput.current) return;
    const { current } = fileInput;
    current.click();
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
          <div className="fixed inset-0 bg-zinc-900 bg-opacity-70 transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center text-center">
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
              <Dialog.Panel className="relative w-2/5 overflow-hidden rounded-lg bg-white shadow-xl">
                <div className="bg-white text-center">
                  <div className="mx-auto flex w-full items-center justify-between px-4 py-2 text-center">
                    <button
                      className={`aspect-square h-full ${
                        stage > 0 ? '' : 'hidden'
                      }`}
                      onClick={props.discardOpen}
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
                    >
                      Next
                    </button>
                  </div>
                </div>
                <DivSeparator />
                <input
                  type="file"
                  ref={fileInput}
                  onChange={handleNewImage}
                  style={{ display: 'none' }}
                />
                <div ref={stageDiv} className="">
                  <UploadStage shown={stage === 0}>
                    <PhotoIcon className="aspect-square h-36" />
                    <img
                      src={imageUrl}
                      onLoad={imgLoad}
                      alt="Hidden Uploaded Image"
                      style={{ display: 'none' }}
                    />
                    <button
                      type="button"
                      className=" rounded bg-sky-500 px-2 py-1 text-sm font-semibold text-white"
                      onClick={openFileSelect}
                    >
                      Select from Computer
                    </button>
                  </UploadStage>
                  <UploadStage shown={stage === 1}>
                    <ImagePreview
                      imageUrl={imageUrl}
                      height={divHeight}
                      width={divWidth}
                    />
                  </UploadStage>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default UploadModal;
