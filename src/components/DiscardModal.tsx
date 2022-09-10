import { Dialog, Transition } from '@headlessui/react';
import type { Dispatch, MouseEvent, SetStateAction } from 'react';
import { Fragment } from 'react';

import DivSeparator from '@/components/DivSeparator';

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setStage: Dispatch<SetStateAction<number>>;
}

const ExportModal = (props: Props) => {
  const closeModal = (event: MouseEvent<HTMLButtonElement>) => {
    props.setOpen(!props.open);
    const target = event.target as HTMLButtonElement;
    if (target && target.name === 'discard') {
      props.setStage(0);
    }
  };

  return (
    <Transition.Root as={Fragment} show={props.open}>
      <Dialog as="div" className="relative z-10" onClose={props.setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-100"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-25"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          {/* Grey Background */}
          <div className="fixed inset-0 overflow-hidden bg-zinc-900 bg-opacity-70 transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0 z-10 overflow-hidden">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-100"
            enterFrom="opacity-0 scale-150"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-25"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="flex min-h-full items-center justify-center text-center">
              {/* Modal Content */}

              <Dialog.Panel className="relative w-1/4 overflow-hidden rounded-lg bg-white shadow-xl">
                <div className="mx-auto bg-white text-center">
                  <div className="flex w-full grow flex-col items-center justify-around py-4">
                    <div className="pb-0.5 text-lg font-bold">
                      Discard Post?
                    </div>
                    <div className="text-sm text-stone-500">
                      Changes will not be saved.
                    </div>
                  </div>
                  <DivSeparator />
                  <div className="">
                    <button
                      className="h-full w-full py-2 text-sm font-bold text-red-500"
                      name="discard"
                      onClick={closeModal}
                    >
                      Discard
                    </button>
                  </div>
                  <DivSeparator />
                  <div className="">
                    <button
                      className="h-full w-full py-2 text-sm"
                      name="cancelDiscard"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
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

export default ExportModal;
