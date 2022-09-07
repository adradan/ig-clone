import type { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { useRef, useState } from 'react';

import ImagePreview from '@/components/ImagePreview';

const ImageUpload = () => {
  // @ts-ignore
  // Ignore for now, will use once uploaded
  const [image, setImage] = useState(undefined as unknown); // eslint-disable-line no-unused-vars
  const [err, setErr] = useState('');
  const [imgH, setH] = useState(0);
  const [imgW, setW] = useState(0);
  const [newH, setNewH] = useState(0);
  const [newW, setNewW] = useState(0);
  const [imgUrl, setUrl] = useState('');
  const [checked, setChecked] = useState(1);
  const imgParent = useRef<null | HTMLDivElement>(null);

  const getSquare = (): void => {
    // Reset to square res
    setNewH(800);
    setNewW(800);
  };

  const imgLoad = (): void => {
    // Fix for not being able to get correct resolution when uploading objectURL
    // Waits for image to fully load in document then displays it in div

    const img = new Image();
    img.onload = (): void => {
      const { height, width } = img;
      setH(height);
      setW(width);
    };
    img.src = imgUrl;
  };

  const handleImgChange = (event: ChangeEvent<HTMLInputElement>): void => {
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
    setImage(imgFile);
  };

  const computeNewDimension = (
    longSide: number,
    divSide: number,
    shortSide: number
  ): number => {
    const ratio = divSide / longSide;
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
    // Calculate resolution based off longer side
    // Shorter side with then always be smaller than maximum allowed resolution of div
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
    action(newDimension);
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

  return (
    <div>
      <form>
        <h1>Upload Image</h1>
        <div>{err}</div>
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
      {/* Parent div creates the borders */}
      {/* While background-image div is always showing the full image, just resizing as needed according to border */}
      {/* Need to adjust to reflect this */}
      {/* Detect original aspect ratio to avoid clipping image in case of shrinking border instead of fitting image */}
      {/* ex: 16:9 og img, instead of fully zooming image then lowering top/bottom border, just zoom out image to fit in parent div */}
      {/* Border/parent div movement depends on original img aspect ratio */}
      {/* Future idea */}
      <div className="hidden">
        <img src={imgUrl} onLoad={imgLoad} alt="Hidden Image" />
      </div>
      <div
        ref={imgParent}
        className="relative flex aspect-square w-800 items-center justify-center overflow-hidden"
      >
        <ImagePreview
          imageUrl={imgUrl}
          height={newH || 800}
          width={newW || 800}
        />
      </div>
    </div>
  );
};

export default ImageUpload;
