import { useState, useEffect } from "react";
import { db } from "../Firebase/config";
import { collection, getDocs } from "firebase/firestore";

const useUsers = () => {
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const colRef = collection(db, "users");
        const docsSnap = await getDocs(colRef);
        let usersArray = [];
        docsSnap.forEach((doc) => {
          usersArray.push(doc.data());
        });
        setAllUsers(usersArray);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);

  return allUsers;
};

export default useUsers;
