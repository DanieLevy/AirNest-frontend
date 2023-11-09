export const uploadService = {
  uploadImg
};

async function uploadImg(ev) {
  console.log('entered uploadImg');
  const CLOUD_NAME = "dupxzwzxj";
  const UPLOAD_PRESET = "fvplrxp8";
  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

  try {
    const formData = new FormData();
    formData.append('file', ev);  // Assuming ev is the File object from the dropzone
    formData.append('upload_preset', UPLOAD_PRESET);  // Include the upload preset

    const response = await fetch(UPLOAD_URL, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    // Now 'data' should contain the Cloudinary response
    console.log('Cloudinary response:', data);

    // Access the secure_url property
    const secureUrl = data.secure_url;
    console.log('Secure URL:', secureUrl);

    // Return or do something with the secureUrl
    return secureUrl;
  } catch (err) {
    console.error('Failed to upload', err);
    throw err;
  }
}
