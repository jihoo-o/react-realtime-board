import { firebaseApp } from './firebase';
import {
    getAuth,
    signInWithPopup,
    signOut,
    GoogleAuthProvider,
    TwitterAuthProvider,
    GithubAuthProvider,
    onAuthStateChanged,
} from 'firebase/auth';

class AuthService {
    constructor() {
        this.auth = getAuth(firebaseApp);
    }

    login(providerName) {
        const authProvider = this.getProvider(providerName);
        if (!authProvider) {
            window.alert('this is expected provider. please use another');
            return;
        }

        return signInWithPopup(this.auth, new authProvider());
    }

    logout() {
        return signOut(this.auth);
    }

    onAuthChange(onUserChange) {
        onAuthStateChanged(this.auth, onUserChange);
    }

    getProvider(providerName) {
        switch (providerName) {
            case 'google':
                return GoogleAuthProvider;
            case 'twitter':
                return null;
            // return TwitterAuthProvider;
            case 'github':
                return GithubAuthProvider;
            default:
                throw new Error(`not supported provider: ${providerName}`);
        }
    }
}

export default AuthService;
