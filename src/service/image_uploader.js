class ImageUploader {
    async upload(file) {
        // upload to where?
        // const url = 'https://api.cloudinary.com/v1_1/drclghimo/image/upload';
        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', 'rlb0arcu');
        const result = await fetch(
            'https://api.cloudinary.com/v1_1/drclghimo/image/upload',
            {
                method: 'POST',
                body: data,
            }
        );
        return await result.json();
    }
}

export default ImageUploader;
