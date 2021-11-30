import { firebaseApp } from './firebase';
import { getDatabase, ref, set, remove, onValue } from 'firebase/database';

class Database {
    constructor() {
        this.db = getDatabase(firebaseApp);
    }

    saveMessage(userId, message) {
        set(ref(this.db, `${userId}/messages/${message.id}`), message);
    }

    getMessage(userId, onUpdate) {
        onValue(ref(this.db, `${userId}/messages`), (snapshot) => {
            const messages = snapshot.val();
            messages ? onUpdate(messages) : onUpdate({});
        });
    }
    removeMessage(userId, messageId) {
        remove(ref(this.db, `${userId}/messages/${messageId}`));
    }
}

export default Database;
