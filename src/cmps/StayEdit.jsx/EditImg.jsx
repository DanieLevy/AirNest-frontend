import { useState } from "react";
import { uploadService } from "../../services/upload.service";

export function EditImg({ setStay }) {
    const [img, setImg] = useState(null)

    return (
        <input onChange={(event) => {
            uploadService.uploadImg(event).then((img) => {
                setImg(img.secure_url)
                setStay({ ...stay, imgUrl: img.secure_url, });
            })
        }} type="file" />
    )
}