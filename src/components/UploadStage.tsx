import type { ReactNode } from 'react';

interface UProps {
  children: ReactNode;
  shown: boolean;
}

const UploadStage = (props: UProps) => {
  return (
    <div
      className={`flex aspect-square min-w-full flex-col flex-wrap items-center justify-center text-center ${
        props.shown ? '' : 'hidden'
      }`}
    >
      {props.children}
    </div>
  );
};

export default UploadStage;
