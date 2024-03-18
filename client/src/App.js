import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '~/routes';
import DefaultLayout from '~/layouts/DefaultLayout/DefaultLayout';
import { Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthProvider from './Components/Auth';

function App() {
	return (
		<Router>
			<AuthProvider>
				<div className="App">
					<Routes>
						{publicRoutes.map((route, index) => {
							const Page = route.component;
							let Layout = DefaultLayout;
							let Auth = Fragment
							if (route.layout) {
								Layout = route.layout;
							} else if (route.layout === null) {
								Layout = Fragment;
							}
							if (route.auth) {
								Auth = route.auth;
							} else if (route.auth === null) {
								Auth = Fragment;
							}
							return (
								<Route
									key={index}
									path={route.path}
									element={
										<Auth>
											<Layout>
												<Page />
											</Layout>
										</Auth>
									}
								/>
							);
						})}
					</Routes>
				</div>
			</AuthProvider>
		</Router>
	);
}

export default App;
