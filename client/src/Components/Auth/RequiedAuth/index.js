import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '~/Components/Auth/index';
import { useState } from 'react';
import * as Result from '~/apiService/authService'
function RequireAuth({ children }) {
    const location = useLocation();
    const auth = useAuth();
    const [check, setCheck] = useState(true);
    const userToken = auth.getTokens();
    const email = auth.getEmails();

    const fetchApi = async(user, userToken)=>{
		let result;
		result = await Result.authorization(userToken, user);
		return result;
	}

    const apiStudent = async(user, userToken)=>{
		let result;
		result = await Result.profileStudent(user, userToken);
		return result;
	}
    
    if(email && userToken)
    {
        apiStudent(email, userToken.access_token)
        .then(function(res){
            
            res ? setCheck(true) : refresh()
        })
            
    }
    
    const refresh = () => {
        fetchApi(email, userToken.access_token)
        .then(function(res){
            res ? auth.setTokens(res) : setCheck(false)
        })

    }

    if (!auth.user && userToken === null) 
    {
        return <Navigate to="/auth/login" state={{ path: location.pathname }} />;
    }
    if(check === false)
    {
        return <Navigate to="/auth/login" state={{ path: location.pathname }} />;
    }
    return children;
}

export default RequireAuth;
