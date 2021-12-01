import { firebaseApp } from './firebase';
import { getDatabase, ref, set, remove, onValue } from 'firebase/database';

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

    removeMessage(userId, messageId) {
        remove(ref(this.db, `${userId}/messages/${messageId}`));
    }
}

export default Database;
