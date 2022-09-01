import type { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { useRef, useState } from 'react';

import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const Hello = () => {
  const [image, setImage] = useState(undefined as unknown);
  const [err, setErr] = useState('');
  const [imgH, setH] = useState(0);
  const [imgW, setW] = useState(0);
  const [newH, setNewH] = useState(0);
  const [newW, setNewW] = useState(0);
  const [imgUrl, setUrl] = useState('');
  const [checked, setChecked] = useState(0);
  const imgParent = useRef<null | HTMLDivElement>(null);

  const getSquare = () => {
    // if (!imgParent.current) return;
    // const { current } = imgParent;
    // const rect = current.getBoundingClientRect();
    setNewH(800);
    setNewW(800);
  };

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
    const wURL = window.URL || window.webkitURL;
    // Find fix for cache
    // Unreliable image load
    // revokeObjectURL?
    const url = wURL.createObjectURL(imgFile);
    setUrl(url);

    console.log(newImage.height, newImage.width);
    console.log(image);
    newImage.onload = () => {
      const { height, width } = newImage;
      setH(height);
      setW(width);
      console.log('asdf');
      console.log(height, width);
      getSquare();
      setChecked(1);
    };

    newImage.src = imgUrl;
    // newImage.onload = () => {
    //   const { height, width } = newImage;
    //   if (height > 1350 || width > 1080) {
    //     console.log('Too large.');
    //   }
    //   setH(String(height));
    //   setW(String(width));

    //   // canvasElem.height = height;
    //   // canvasElem.width = width;
    // };
    setImage(imgFile);
  };

  const computeNewDimension = (
    longSide: number,
    divSide: number,
    shortSide: number
  ): number => {
    const ratio = divSide / longSide;
    console.log(ratio, divSide, longSide, shortSide);
    const newDimension = shortSide * ratio;
    return newDimension;
  };

  const getOriginal = (): void => {
    if (!imgParent.current) return;
    const { current } = imgParent;
    const rect = current.getBoundingClientRect();
    let longSide = 0;
    let shortSide = 0;
    let divSide = 0;
    let action: Dispatch<SetStateAction<number>>;
    // max of the two
    if (imgW > imgH) {
      divSide = rect.width;
      longSide = imgW;
      shortSide = imgH;
      action = setNewH;
      setNewW(divSide);
    } else {
      divSide = rect.height;
      longSide = imgH;
      shortSide = imgW;
      action = setNewW;
      setNewH(divSide);
    }
    const newDimension = computeNewDimension(longSide, divSide, shortSide);
    console.log(newDimension);
    action(newDimension);
    console.log(longSide);
  };

  const aspectChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    const { value } = target;
    const numVal = Number(value);
    setChecked(numVal);
    if (numVal === 0) {
      getOriginal();
    } else if (numVal === 1) {
      getSquare();
    }
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
        <div className="flex flex-col">
          <div>
            <input
              type="radio"
              id="original"
              name="original"
              value={0}
              onChange={aspectChange}
              checked={checked === 0}
            />
            <label htmlFor="original">Original</label>
          </div>
          <div>
            <input
              type="radio"
              id="square"
              name="square"
              value={1}
              onChange={aspectChange}
              checked={checked === 1}
            />
            <label htmlFor="square">1:1</label>
          </div>
          <div>
            <input
              type="radio"
              id="four-five"
              name="four-five"
              value={2}
              onChange={aspectChange}
              checked={checked === 2}
            />
            <label htmlFor="four-five">4:5</label>
          </div>
          <div>
            <input
              type="radio"
              id="sixteen"
              name="sixteen"
              value={3}
              onChange={aspectChange}
              checked={checked === 3}
            />
            <label htmlFor="sixteen">16:9</label>
          </div>
        </div>
        {/* Figure out how to resize image depending on aspect ratio */}
        <div
          ref={imgParent}
          className="flex aspect-square w-800 items-center justify-center"
        >
          <div
            style={{
              backgroundImage: `url(${imgUrl})`,
              width: `${newW || 800}px`,
              // height: `${newH || 800}px`,
            }}
            className="h-full w-full bg-cover bg-center bg-no-repeat"
          />
        </div>
        <div className="flex aspect-square w-800 justify-around">
          <div
            style={{ backgroundImage: `url(${imgUrl})` }}
            className="h-full w-full bg-contain bg-center bg-no-repeat"
          />
        </div>
      </div>
    </Main>
  );
};

export default Hello;
