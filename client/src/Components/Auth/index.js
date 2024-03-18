import { useState, createContext, useContext } from 'react';

const AuthContext = createContext(null);
function AuthProvider({ children }) {
	const [user, setUser] = useState(null);
	const [password, setPassword] = useState(null);
	const [data, setData] = useState(null);
	const [token, setToken] = useState(false);

	const login = (user, password, data) => {
		setUser(user);
		setPassword(password);
		setData(data);
		setToken(data.access_token);

		localStorage.setItem('email', JSON.stringify(user));
	};
	const logout = () => {
		setUser(null);
		setPassword(null);
		setToken(null);
		setData(null);
	};

	const setTokens = (token) => {
		localStorage.setItem('token', JSON.stringify(token));
	};
	const getEmails = () => {
		const email = JSON?.parse(localStorage?.getItem('email'));
		return email;
	};
	const getTokens = () => {
		const items = JSON?.parse(localStorage?.getItem('token'));
		return items.access_token;
	};
	return (
		<AuthContext.Provider value={{ user, password, data, token, login, logout, setTokens, getTokens, getEmails }}>
			{children}
		</AuthContext.Provider>
	);
}

export const useAuth = () => {
	return useContext(AuthContext);
};

export default AuthProvider;
