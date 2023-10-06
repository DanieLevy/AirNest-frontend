import { useRef, useState } from "react";
import { uploadService } from "../../services/upload.service";


export function UploadImage({ src, onImageSelect, ...rest }) {

    const inputRef = useRef(null)
    const [isLoading, setIsLoading] = useState(false)

    async function handleImageChange(e) {
        const file = e.target.files[0];

        if (file) {
            try {
                setIsLoading(true)
                const img = await uploadService.uploadImg(e)
                onImageSelect(img.secure_url)
            } catch (error) {
                console.log(error);
            } finally { setIsLoading(false) }
        }
    };

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
            {src ?
                <>
                    <img
                        src={src}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                        }}
                    />
                    <p style={{ position: 'absolute', top: 0, right: 10 }} onClick={(event) => {
                        event.stopPropagation()
                        onImageSelect('')
                        console.log('delete img')
                    }}>X</p>
                </> : <p>{isLoading ? 'Loading' : 'Upload Image'}</p>}
        </div >
    );

}