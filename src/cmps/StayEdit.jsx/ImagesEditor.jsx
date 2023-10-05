import { UploadImage } from "./UploadImg";

function fillUpTo5(arr) {
    return new Array(5).fill('').map((_, i) => arr[i] || '')
}

export function ImagesEditor({ urls, onUrlsChange, className }) {
    const images = fillUpTo5(urls)

    function handleChange(url, index) {
        const newUrls = [...images]
        newUrls[index] = url
        onUrlsChange(newUrls)
    }

    return (
        <div className="images-editor-container">
            <UploadImage className={className} src={images[0]} onImageSelect={(url) => handleChange(url, 0)} />
            <div className="rest">
                {images.slice(1).map((url, i) =>
                    <UploadImage key={i} src={url} onImageSelect={(url) => handleChange(url, i + 1)} />)
                }
            </div>
        </div>
    );

}