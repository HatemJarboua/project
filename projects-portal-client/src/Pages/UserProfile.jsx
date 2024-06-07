import React, { useEffect, useState } from 'react';
import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";

const UserProfile = () => {
  const [userRole, setUserRole] = useState('');
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const fetchUserRole = async () => {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          // Mettre à jour l'état avec le rôle de l'utilisateur
          setUserRole(userSnap.data().role);
        } else {
          console.log("No such document!");
        }
      }
    };

    fetchUserRole();
  }, []);

  return (
    <div>
      <h1>Profil de l&rsquo;utilisateur</h1>
      {userRole && <p>Rôle: {userRole}</p>}
    </div>
  );
};

export default UserProfile;
