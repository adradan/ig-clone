import type { ReactNode } from 'react';

interface DetailsProps {
  children: ReactNode;
  shown: boolean;
  classes?: string;
}

const PhotoDetails = (props: DetailsProps) => {
  return (
    <div
      className={`h-full p-4 ${props.shown ? '' : 'hidden'} ${
        props.classes || ''
      }`}
    >
      {props.children}
    </div>
  );
};

export default PhotoDetails;
