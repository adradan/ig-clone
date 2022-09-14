import type { ChangeEvent } from 'react';
import { forwardRef } from 'react';

interface ButtonProps {
  onChange(e: ChangeEvent<HTMLInputElement>): void;
  classes?: string;
  name: string;
  accept?: string;
}

const FileButton = forwardRef<HTMLInputElement, ButtonProps>((props, ref) => {
  return (
    <>
      <input
        type="file"
        hidden={true}
        onChange={props.onChange}
        ref={ref}
        onClick={(e) => {
          const target = e.target as HTMLInputElement;
          target.value = '';
        }}
        accept={props.accept || ''}
      />
      <button
        type="button"
        className={`rounded bg-sky-500 px-2 py-1 text-sm font-semibold text-white ${
          props.classes || ''
        }`}
        onClick={() => {
          if (!ref || typeof ref === 'function' || !ref.current) return;
          const current = ref.current as HTMLInputElement;
          current.click();
        }}
      >
        {props.name}
      </button>
    </>
  );
});

FileButton.displayName = 'FileButton';

export default FileButton;
