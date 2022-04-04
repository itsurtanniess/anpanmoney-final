import { useEffect, useState } from "react";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {
  collection,
  doc,
  setDoc,
  getDocs,
  getDoc,
  getFirestore,
  updateDoc,
} from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCpgsjZ8EuVpVod4_s8nOjet2TyB1hEmiE",
    authDomain: "anpanmoney-cf5d0.firebaseapp.com",
    databaseURL: "https://anpanmoney-cf5d0-default-rtdb.firebaseio.com",
    projectId: "anpanmoney-cf5d0",
    storageBucket: "anpanmoney-cf5d0.appspot.com",
    messagingSenderId: "28971312083",
    appId: "1:28971312083:web:22ba4e81022e45f69ac526"
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

export function signup(data) {
  const email = data["email"];
  const password = data["password"];

  return createUserWithEmailAndPassword(auth, email, password).then((user) => {
    push_signup(user, data);
  });
}

export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function logout() {
  return signOut(auth);
}

// Custom Hook
export function useAuth() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => setCurrentUser(user));
    return unsub;
  }, []);

  return currentUser;
}



async function push_signup(user, data) {
  const db = getFirestore();
  const ref = collection(db, "users");
  await setDoc(doc(ref, user.user.uid), {
    id: user.user.uid,
    fName: data.fname,
    lName: data.lname,
    occupation: data.occupation,
    occupation_id: data.occupation_id,
    email: data.email,
  }).then(() => {
    window.location.replace("/");
  });
}

export async function retrieveUserData(uid) {
  const db = getFirestore();
  const docref = doc(db, "users", uid);
  const querySnapshot = await getDoc(docref);
  let userData = querySnapshot.data();
  console.log(userData);
}

async function fetchAux(post) {
  const db = getFirestore();
  const data = await getDocs(
    collection(db, "posts", `location/${post.city_id}/${post.id}/auxiliary`)
  );
  return data.docs[0].data();
}


// export async function changeSettings(user, changes, occupation) {
//   console.log("Change settings data: ", changes);
//   let newFName = "";
//   let newLName = "";
//   if (changes.fName != "") newFName = changes.fName;
//   if (changes.lName != "") newFName = changes.lName;
 
//   let newUserData = {
//     fName: newFName != "" ? newFName : user.fName,
//     lName: newLName != "" ? newLName : user.lName,
//     email: user.email,
//     occupation: occupation != "" ? occupation : user.occupation,
//     occupation_id: newOccupation != "" ? newOccupation : user.occupation_id,
//     id: user.id.trim(),
//   };
//   const db = getFirestore();
//   const ref = collection(db, "users");
//   await updateDoc(doc(ref, user.id.trim()), newUserData);
// }
