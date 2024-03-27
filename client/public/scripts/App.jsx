import React, { useEffect, useState } from "react";
function App() {
    var _a = useState(null), backendData = _a[0], setBackendData = _a[1];
    useEffect(function () {
        fetch("/api").then(function (res) { return res.json(); }).then(function (data) { return setBackendData(data); });
    }, []);
    return (<div>
         {backendData && backendData.users ? (backendData.users.map(function (user) { return (<div key={user.id}>
                  <h1>{user.name}</h1>
                  <p>{user.email}</p>
               </div>); })) : (<p>loading...</p>)}
      </div>);
}
export default App;
