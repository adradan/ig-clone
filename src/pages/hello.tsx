import { useState } from 'react';

import UploadModal from '@/components/UploadModal';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

// Work on dragging image
const Hello = () => {
  const [open, setOpen] = useState(false);

  const buttonClick = () => {
    setOpen(!open);
  };

  return (
    <Main meta={<Meta title="Test" description="Test Page" />}>
      <div>
        <button type="button" onClick={buttonClick}>
          Open/Close
        </button>

        <UploadModal open={open} setOpen={setOpen} />
      </div>
    </Main>
  );
};

export default Hello;
