import { useRef, useState } from 'react';
import { uploadService } from '../../services/upload.service';
import { IoCloseOutline } from 'react-icons/io5';
import { BsFillTrashFill } from 'react-icons/bs';

export function UploadImage({ src, onImageSelect, ...rest }) {
  const inputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleImageChange(e) {
    const file = e.target.files[0];

    if (file) {
      try {
        setIsLoading(true);
        const img = await uploadService.uploadImg(e);
        onImageSelect(img.secure_url);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  }

  return (
    <div
      {...rest}
      style={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#E4E4E4',
        overflow: 'hidden',
        ...rest.style,
      }}
      onClick={() => inputRef.current.click()}
    >
      <input
        type='file'
        accept='image/*'
        onChange={handleImageChange}
        style={{ display: 'none' }}
        ref={inputRef}
      />
      {src ? (
        <>
          <img
            src={src}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          <p
            className='delete-img'
            style={{ position: 'absolute', top: 0, right: 10 }}
            onClick={(event) => {
              event.stopPropagation();
              onImageSelect('');
              inputRef.current.value = '';
              console.log('delete img');
            }}
          >
            {/* <IoCloseOutline /> */}
            <BsFillTrashFill />
          </p>
        </>
      ) : (
        <p className='upload-img'>
          {isLoading ? <span className='spinner'></span> : ''}
          {isLoading ? (
            ''
          ) : (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 32 32'
              aria-hidden='true'
              role='presentation'
              focusable='false'
            >
              <path d='M27 3a4 4 0 0 1 4 4v18a4 4 0 0 1-4 4H5a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zM8.89 19.04l-.1.08L3 24.92V25a2 2 0 0 0 1.85 2H18.1l-7.88-7.88a1 1 0 0 0-1.32-.08zm12.5-6-.1.08-7.13 7.13L20.92 27H27a2 2 0 0 0 2-1.85v-5.73l-6.3-6.3a1 1 0 0 0-1.31-.08zM27 5H5a2 2 0 0 0-2 2v15.08l4.38-4.37a3 3 0 0 1 4.1-.14l.14.14 1.13 1.13 7.13-7.13a3 3 0 0 1 4.1-.14l.14.14L29 16.59V7a2 2 0 0 0-1.85-2zM8 7a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2z'></path>
            </svg>
          )}
        </p>
      )}
    </div>
  );
}
