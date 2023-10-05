import { useRef, useState } from "react";
import { uploadService } from "../../services/upload.service";


export function UploadImage({ src, onImageSelect, ...rest }) {

    const inputRef = useRef(null)
    const [isLoading, setIsLoading] = useState(false)

    function handleImageChange(e) {
        const file = e.target.files[0];

        if (file) {
            setIsLoading(true)
            uploadService.uploadImg(e).then((img) => {
                onImageSelect(img.secure_url);
            }).finally(() => {
                setIsLoading(false)
            })
        }
    };

    return (
        <div
            {...rest}
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: '#E4E4E4',
                overflow: 'hidden',
                ...rest.style
            }}
            onClick={() => inputRef.current.click()}
        >
            <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
                ref={inputRef}
            />
            {src ? <img src={src} style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
            }} /> : <p>{isLoading ? 'Loading' : 'Upload Image'}</p>}
        </div>
    );

}