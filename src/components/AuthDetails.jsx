// import React, { useEffect, useState } from "react";
// import { auth, db } from "../firebase";
// import { onAuthStateChanged, signOut } from "firebase/auth";
// import { doc, getDoc } from "firebase/firestore";
// import { useHistory } from "react-router-dom";

// export default function AuthDetails() {
//   const [authUser, setAuthUser] = useState(null);
//   const history = useHistory();
//   useEffect(() => {
//     const listen = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setAuthUser(user);
//         const docRef = doc(db, "cities", "SF");
//         const docSnap = getDoc(docRef);

//         if (docSnap.exists) {
//           console.log("Document data:", docSnap.data());
//         }
//       } else setAuthUser(null);
//     });
//     return () => {
//       listen();
//     };
//   }, []);
//   function userSignOut() {
//     signOut(auth).then(() => {
//       console.log("signed out!!!!");
//       history.push("/");
//     });
//   }
//   return (
//     <div>
//       {authUser ? (
//         <p>
//           signed in {authUser.uid}{" "}
//           <button onClick={userSignOut}>Sign out</button>{" "}
//         </p>
//       ) : (
//         "not signed in"
//       )}
//       <p>{authUser.uid}</p>
//     </div>
//   );
// }
