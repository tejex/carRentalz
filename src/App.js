import { Routes,Route, Link, BrowserRouter,Navigate } from "react-router-dom"
import { AboutPage,HomePage, LoginPage, 
  SignupPage, MainPage, UserCars, 
  CurrentCar, OwnerRequests,ApprovedVehicle} from "./pages";
import { AuthContextProvider } from './context/AuthContext';
import PrivateRoute from "./utils/PrivateRoute";




function App() {


  return (
    <div className="App">
    <AuthContextProvider>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route element={<AboutPage/>} path='/about' />
        <Route element={<PrivateRoute/>}>
          <Route element={<MainPage/>} path='/main'/>
          <Route element={<CurrentCar/>} path='/main/:id'/>
          <Route element={<UserCars/>} path='/userCars'/>
          <Route element={<OwnerRequests/>} path='/ownerRequests'/>
          <Route element={<ApprovedVehicle/>} path='/myCar/:name'/>
        </Route>  
        <Route exact path="/main" element={<MainPage/>} />
        <Route element={<LoginPage/>}  path='/auth/login' />
        <Route element={<SignupPage/>} path='/auth/signUp' />   
      </Routes>
    </AuthContextProvider>
    </div>
  );
}

export default App;
