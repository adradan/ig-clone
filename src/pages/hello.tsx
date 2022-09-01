import type { ChangeEvent } from 'react';
import { useState } from 'react';

import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const Hello = () => {
  const [image, setImage] = useState(undefined as unknown);
  const [err, setErr] = useState('');
  const [imgH, setH] = useState('');
  const [imgW, setW] = useState('');
  const [iUrl, setUrl] = useState('');

  const handleImgChange = (event: ChangeEvent<HTMLInputElement>) => {
    const imgFile = event.target.files ? event.target.files[0] : undefined;
    if (!imgFile) {
      setErr('Invalid File.');
      return;
    }
    if (!imgFile?.name.match(/\.(jpeg|jpg|png)$/g)) {
      setErr('Invalid File Type.');
      return;
    }
    setErr('');
    const newImage = new Image();
    const pURL = window.URL || window.webkitURL;
    const imgUrl = pURL.createObjectURL(imgFile);
    newImage.src = imgUrl;
    console.log(image);
    newImage.onload = () => {
      const { height, width } = newImage;
      if (height > 1350 || width > 1080) {
        console.log('Too large.');
      }
      setH(String(height));
      setW(String(width));
      setUrl(imgUrl);
      // canvasElem.height = height;
      // canvasElem.width = width;
    };
    setImage(imgFile);
  };
  // Image resizer/converter?
  return (
    <Main meta={<Meta title="Test" description="Test Page" />}>
      <div>
        <form>
          <h1>Upload Image</h1>
          <div>{err}</div>
          <div>
            {imgH} x {imgW}
          </div>
          <input type="file" onChange={handleImgChange} />
          <button type="submit">Upload</button>
        </form>
        {/* Figure out how to resize image depending on aspect ratio */}
        <div className="flex aspect-square w-full justify-around">
          <div
            style={{ backgroundImage: `url(${iUrl})` }}
            className="h-full w-full bg-cover bg-center bg-no-repeat"
          />
        </div>
      </div>
    </Main>
  );
};

export default Hello;
