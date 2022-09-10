import { useState } from 'react';

import DiscardModal from '@/components/DiscardModal';
import UploadModal from '@/components/UploadModal';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

// Work on dragging image
const Hello = () => {
  const [open, setOpen] = useState(false);
  const [discardOpen, setDiscardOpen] = useState(false);
  const [stage, setStage] = useState(0);

  const buttonClick = () => {
    setOpen(!open);
  };

  const discardClick = () => {
    setDiscardOpen(!discardOpen);
  };

  return (
    <Main meta={<Meta title="Test" description="Test Page" />}>
      <div>
        <button type="button" onClick={buttonClick}>
          Open/Close
        </button>

        <UploadModal
          open={open}
          setOpen={setOpen}
          discardOpen={discardClick}
          stageInfo={{ stage, setStage }}
        />
        <DiscardModal
          open={discardOpen}
          setOpen={setDiscardOpen}
          setStage={setStage}
        />
      </div>
    </Main>
  );
};

export default Hello;
