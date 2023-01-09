// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
    updateProfile,
    updateEmail,
} from "firebase/auth";
import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    addDoc,
} from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

import {
    REACT_APP_apiKey,
    REACT_APP_authDomain,
    REACT_APP_projectId,
    REACT_APP_storageBucket,
    REACT_APP_messagingSenderId,
    REACT_APP_appId,
    REACT_APP_measurementId
} from '../Keys'
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: REACT_APP_apiKey,
    authDomain: REACT_APP_authDomain,
    projectId: REACT_APP_projectId,
    storageBucket: REACT_APP_storageBucket,
    messagingSenderId: REACT_APP_messagingSenderId,
    appId: REACT_APP_appId,
    measurementId: REACT_APP_measurementId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

const logInWithEmailAndPassword = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);

};

const createWithEmailAndPassword = async (displayName, email, password) => {

    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
        uid: user.uid,
        displayName,
        authProvider: "local",
        email,
    });
    updateProfile(auth.currentUser, {
        displayName: displayName
    });
};

const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {

    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name: user.displayName,
            authProvider: "google",
            email: user.email,
        });
    }

};
const sendPasswordReset = async (email) => {
    await sendPasswordResetEmail(auth, email);
};

const logout = () => {
    signOut(auth);
};

const FetchData = async (cl) => {
    // const [fetch, setFetch] = useState("")
    await getDocs(collection(db, cl))
        .then((querySnapshot) => {
            const data = querySnapshot.docs
                .map((doc) => ({ ...doc.data(), id: doc.id }));
            return ({data}); 
        })
}

const updatePhoto = async (uRl) => {
    updateProfile(auth.currentUser, {
        photoURL: uRl
    })
}

const updateProfileDetails = async (displayName, email) => {
     updateProfile(auth.currentUser, {
        displayName: displayName
    });
     updateEmail(auth.currentUser, {
        email: email
    });
}
export const storage = getStorage(app);
export {
    auth,
    db,
    signInWithGoogle,
    logInWithEmailAndPassword,
    createWithEmailAndPassword,
    sendPasswordReset,
    logout,
    FetchData,
    updatePhoto,
    updateProfileDetails
};