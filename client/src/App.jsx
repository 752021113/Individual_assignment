import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './components/Home';

const App = () => {
	return (
		<Routes>
			<Route path='/' element={<Navigate to='/signin' replace />} />
			<Route path='/signin' element={<SignIn />} />
			<Route path='/signup' element={<SignUp />} />
			<Route path='/home' element={<Home />} />
		</Routes>
	);
};

export default App;
