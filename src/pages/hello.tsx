import type { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { useRef, useState } from 'react';

import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';
// Work on dragging image
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
  const imgDiv = useRef<null | HTMLDivElement>(null);

  const getSquare = () => {
    // if (!imgParent.current) return;
    // const { current } = imgParent;
    // const rect = current.getBoundingClientRect();
    setNewH(800);
    setNewW(800);
  };

  const imgLoad = () => {
    console.log('loaded');
    if (!imgDiv.current) return;
    const { current } = imgDiv;
    current.style.backgroundImage = `url(${imgUrl})`;

    const img = new Image();
    img.onload = () => {
      const { height, width } = img;
      console.log(height, width);
      setH(height);
      setW(width);
    };
    img.src = imgUrl;
  };

  const handleImgChange = (event: ChangeEvent<HTMLInputElement>) => {
    const imgFile = event.target.files ? event.target.files[0] : undefined;
    if (!imgFile) {
      setErr('Invalid File.');
      return;
    }
    if (!imgFile?.name.toLowerCase().match(/\.(jpeg|jpg|png)$/g)) {
      setErr('Invalid File Type.');
      return;
    }
    setErr('');
    const wURL = window.URL || window.webkitURL;
    const url = wURL.createObjectURL(imgFile);
    setUrl(url);
    console.log(image);
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

  const getFourFive = (): void => {
    if (!imgParent.current) return;
    const { current } = imgParent;
    const rect = current.getBoundingClientRect();
    const { height, width } = rect;
    // 4:5 ratio is .8
    const newWidth = width * 0.8;
    setNewW(newWidth);
    setNewH(height);
  };

  const getSixteen = (): void => {
    if (!imgParent.current) return;
    const { current } = imgParent;
    const rect = current.getBoundingClientRect();
    const { height, width } = rect;
    // 16:9 ratio is .5625
    const newHeight = height * 0.5625;
    setNewH(newHeight);
    setNewW(width);
  };

  const aspectChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    const { value } = target;
    const numVal = Number(value);
    setChecked(numVal);
    switch (numVal) {
      case 0:
        getOriginal();
        break;
      case 1:
        getSquare();
        break;
      case 2:
        getFourFive();
        break;
      case 3:
        getSixteen();
        break;
      default:
        break;
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
        <div style={{ display: 'none' }}>
          <img src={imgUrl} onLoad={imgLoad} alt="Hidden Image" />
        </div>
        <div
          ref={imgParent}
          className="flex aspect-square w-800 items-center justify-center"
        >
          <div
            style={{
              width: `${newW || 800}px`,
              height: `${newH || 800}px`,
            }}
            className="h-full w-full bg-cover bg-center bg-no-repeat"
            ref={imgDiv}
          />
        </div>
        <div className="flex aspect-square w-800 justify-around">
          <div
            className="h-full w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${imgUrl})`,
            }}
          />
        </div>
      </div>
    </Main>
  );
};

export default Hello;
