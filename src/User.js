import { useState } from "react";

let user, setUser;
function UserInit() {
    
    let value
    if (!setUser) {
        value = undefined;
    } else {
        value = user;
    }
    const [cUser, setCUser] = useState(user);
    user = cUser
    setUser = setCUser;
    
    return { user, setUser };
}

export default UserInit;