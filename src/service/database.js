import { firebaseApp } from './firebase';
import { getDatabase, ref, set, remove, onValue } from 'firebase/database';

// TODO
// login failed, userId null(BUG) -> handle login redirection
class Database {
    constructor() {
        this.db = getDatabase(firebaseApp);
    }

    saveMessage(message) {
        set(ref(this.db, `messages/${message.id}`), message);
    }

    saveImage(image) {
        set(ref(this.db, `images/${image.id}`), image);
    }

    saveWebcam(webcam) {
        set(ref(this.db, `webcam/${webcam.id}`), webcam);
    }

    saveGame(game) {
        set(ref(this.db, `games/${game.id}`), game);
    }

    getMessage(onUpdate) {
        onValue(ref(this.db, `messages`), (snapshot) => {
            const messages = snapshot.val();
            messages ? onUpdate(messages) : onUpdate({});
        });
    }

    getImages(onUpdate) {
        onValue(ref(this.db, `images`), (snapshot) => {
            const images = snapshot.val();
            images ? onUpdate(images) : onUpdate({});
        });
    }

    getWebcam(onUpdate) {
        onValue(ref(this.db, `webcam`), (snapshot) => {
            const webcam = snapshot.val();
            webcam ? onUpdate(webcam) : onUpdate({});
        });
    }

    getGames(onUpdate) {
        onValue(ref(this.db, `games`), (snapshot) => {
            const game = snapshot.val();
            game ? onUpdate(game) : onUpdate({});
        });
    }

    removeMessage(messageId) {
        remove(ref(this.db, `messages/${messageId}`));
    }

    removeImage(ImageId) {
        remove(ref(this.db, `images/${ImageId}`));
    }

    removeWebcam(webcamId) {
        remove(ref(this.db, `webcam/${webcamId}`));
    }

    removeGame(gameId) {
        remove(ref(this.db, `games/${gameId}`));
    }
}

export default Database;
