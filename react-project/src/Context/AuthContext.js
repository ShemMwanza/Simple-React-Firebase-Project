
import { createContext, useContext } from "react";
import { auth, db } from "../Authentication/firebaseConfig";
import {
    GoogleAuthProvider,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
    updateProfile,
    updateEmail,
} from "firebase/auth";
import { useEffect } from "react";
import {
    query,
    getDocs,
    collection,
    where,
    addDoc,
    doc,
    setDoc,
} from "firebase/firestore";
import { useState } from "react";


const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

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

    // const FetchData = async (cl) => {
    //     // const [fetch, setFetch] = useState("")
    //     await getDocs(collection(db, cl))
    //         .then((querySnapshot) => {
    //             const data = querySnapshot.docs
    //                 .map((doc) => ({ ...doc.data(), id: doc.id }));
    //             return ({ data });
    //         })
    // }

    const updatePhoto = async (uRl) => {
        await updateProfile(currentUser, {
            photoURL: uRl
        })
    }

    const updateProfileDetails = async (displayName, email) => {
        updateProfile(currentUser, {
            displayName: displayName
        });
        updateEmail(currentUser, email).then(() => {
            alert("Success")
        });
    }
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);


    const addToCart = async (productID, img, title, price) => {
        // await DB.collection("cart" + currentUser.uid).doc(productId).set(newdata)
        const cartRef = doc(db, "cart: " + currentUser.uid, productID);
        await setDoc(cartRef, {
            productID: productID,
            img_url: img,
            title: title,
            price: price
        });

    };
    const value = {
        currentUser,
        logInWithEmailAndPassword,
        createWithEmailAndPassword,
        signInWithGoogle,
        updateProfileDetails,
        updatePhoto,
        logout,
        sendPasswordReset,
        addToCart
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}