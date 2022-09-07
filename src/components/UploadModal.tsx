import { Dialog, Transition } from '@headlessui/react';
import { PhotoIcon } from '@heroicons/react/24/outline';
import type { Dispatch, SetStateAction } from 'react';
import { Fragment } from 'react';

interface ModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

// Thanks to https://tailwindui.com/components/application-ui/overlays/modals
const UploadModal = (props: ModalProps) => {
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
              leave="ease-in duration-75"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Panel className="relative overflow-hidden rounded-lg bg-white shadow-xl">
                <div className="bg-white px-64 py-2 text-center">
                  <div className="mx-auto flex items-center text-center">
                    <Dialog.Title className="font-semibold">
                      Create New Post
                    </Dialog.Title>
                  </div>
                </div>
                <div className="h-0.5 w-full bg-slate-300" />
                <div className="flex aspect-square min-w-full flex-col flex-wrap items-center justify-center text-center">
                  <PhotoIcon className="aspect-square h-36" />
                  <button
                    type="button"
                    className=" rounded bg-sky-500 px-2 py-1 text-sm font-semibold text-white"
                  >
                    Select from Computer
                  </button>
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
