import { Dialog, Transition } from '@headlessui/react';
import type { Dispatch, SetStateAction } from 'react';
import { Fragment } from 'react';

import DivSeparator from '@/components/DivSeparator';

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const ExportModal = (props: Props) => {
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
                  <div className="py-2">
                    <button className="text-sm font-bold text-red-500">
                      Discard
                    </button>
                  </div>
                  <DivSeparator />
                  <div className="py-2">
                    <button className="text-sm">Cancel</button>
                    {/* Test */}
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ExportModal;
