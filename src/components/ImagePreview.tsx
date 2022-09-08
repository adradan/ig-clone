import type { MouseEvent } from 'react';

interface PreviewProps {
  imageUrl: string;
  height: number;
  width: number;
}

const ImagePreview = (props: PreviewProps) => {
  const mouseDown = (event: MouseEvent<HTMLDivElement>): void => {
    event.preventDefault();
    if (event.button !== 0) return;
    let xChange = 0;
    let yChange = 0;
    let lastX = event.clientX;
    let lastY = event.clientY;
    let xDiff = 0;
    let yDiff = 0;
    const target = event.target as HTMLDivElement;

    const mouseMove = (e: MouseEvent<Document>): void => {
      // Calculate new position using last/current positions
      e.preventDefault();
      // Will result in either -1 (right) / 0 (no change) / +1 (left)
      xChange = lastX - e.clientX;
      yChange = lastY - e.clientY;
      // Reset last position to current mouse position
      lastX = e.clientX;
      lastY = e.clientY;

      // Diff from initial position
      // (-)px moves to the left/up
      xDiff -= xChange;
      yDiff -= yChange;

      // 0.0000002 * xChange ** 3
      // Figure out how to slow down translation farther and farther you go
      target.style.transform = `translate3d(${xDiff}px, ${yDiff}px, 0px) scale(1)`;
    };

    const mouseUp = (e: MouseEvent<HTMLDivElement>): void => {
      // Reset all event listeners, making sure it doesn't move
      e.preventDefault();
      if (e.button !== 0) return;
      document.onmousemove = null;
      document.onmouseup = null;
      target.style.transform = 'none';
    };

    // Ignore TS(2322); can't use "this" in an arrow function
    // @ts-ignore
    document.onmouseup = mouseUp;
    // @ts-ignore
    document.onmousemove = mouseMove;
  };
  return (
    <div
      style={{
        width: `100%`,
        height: `100%`,
        backgroundImage: `url("${props.imageUrl}")`,
      }}
      className=" h-full w-full bg-cover bg-center bg-no-repeat"
      onMouseDown={mouseDown}
    />
  );
};

export default ImagePreview;
