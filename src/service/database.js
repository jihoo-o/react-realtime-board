import { firebaseApp } from './firebase';
import { getDatabase, ref, set, remove, onValue } from 'firebase/database';

// TODO
// login failed, userId null(BUG) -> handle login redirection
class Database {
    constructor() {
        this.db = getDatabase(firebaseApp);
    }

    saveMessage(userId, message) {
        set(ref(this.db, `${userId}/messages/${message.id}`), message);
    }

    saveImage(userId, image) {
        set(ref(this.db, `${userId}/images/${image.id}`), image);
    }

    saveWebcam(userId, webcam) {
        set(ref(this.db, `${userId}/webcam/${webcam.id}`), webcam);
    }

    getMessage(userId, onUpdate) {
        onValue(ref(this.db, `${userId}/messages`), (snapshot) => {
            const messages = snapshot.val();
            messages ? onUpdate(messages) : onUpdate({});
        });
    }

    getImages(userId, onUpdate) {
        onValue(ref(this.db, `${userId}/images`), (snapshot) => {
            const images = snapshot.val();
            images ? onUpdate(images) : onUpdate({});
        });
    }

    getWebcam(userId, onUpdate) {
        onValue(ref(this.db, `${userId}/webcam`), (snapshot) => {
            const webcam = snapshot.val();
            webcam ? onUpdate(webcam) : onUpdate({});
        });
    }

    removeMessage(userId, messageId) {
        remove(ref(this.db, `${userId}/messages/${messageId}`));
    }

    removeImage(userId, ImageId) {
        remove(ref(this.db, `${userId}/images/${ImageId}`));
    }

    removeWebcam(userId, webcamId) {
        remove(ref(this.db, `${userId}/webcam/${webcamId}`));
    }
}

export default Database;
