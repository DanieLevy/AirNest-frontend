import { useState } from "react";
import { uploadService } from "../../services/upload.service";

export function EditImg({ stay, setStay }) {
    const [imgs, setImgs] = useState([])

    return (
        <section>
            <input onChange={(event) => {
                uploadService.uploadImg(event).then((img) => {
                    const imgUrl = img.secure_url
                    setImgs([...imgs, img.secure_url])
                    setStay({ ...stay, imgUrls: imgs.concat(imgUrl) });
                })
            }} type="file" />
            {imgs && <img src={imgs[0]} alt="" />}

            <input onChange={(event) => {
                uploadService.uploadImg(event).then((img) => {
                    const imgUrl = img.secure_url
                    setImgs([...imgs, imgUrl])
                    setStay({ ...stay, imgUrls: imgs.concat(imgUrl) });
                })
            }} type="file" />
            {imgs && <img src={imgs[1]} alt="" />}
        </section>
    )
}