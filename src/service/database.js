import { getDatabase, ref, set } from 'firebase/database';

class Database {
    constructor() {
        this.db = getDatabase();
    }

    writeData(userId, text) {
        set(ref(this.db, userId), {
            text,
        });
    }
}

export default Database;
