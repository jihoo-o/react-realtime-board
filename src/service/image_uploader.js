class ImageUploader {
    constructor(cloudName, presetName) {
        this.cloudName = cloudName;
        this.presetName = presetName;
    }
    async upload(file) {
        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', this.presetName);
        try {
            const result = await fetch(
                `https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`,
                {
                    method: 'POST',
                    body: data,
                }
            );
            return await result.json();
        } catch (e) {
            console.error(e);
        }
    }
}

export default ImageUploader;
