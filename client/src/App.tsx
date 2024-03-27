import React, { useEffect, useState } from "react";

interface User {
   id: number;
   name: string;
   email: string;
}

interface BackendData {
   users: User[];
}

function App() {
   const [backendData, setBackendData] = useState<BackendData | null>(null);

   useEffect(() => {
      fetch("/api").then(
         (res) => res.json()
      ).then(
         (data) => setBackendData(data)
      );
   }, []);

   return (
      <div>
         {backendData && backendData.users ? (
            backendData.users.map((user) => (
               <div key={user.id}>
                  <h1>{user.name}</h1>
                  <p>{user.email}</p>
               </div>
            ))
         ) : (
            <p>loading...</p>
         )}
      </div>
   )
}

export default App;