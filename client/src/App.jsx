import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./Pages/Home"
import SignIn from "./Pages/SignIn"
import Profile from "./Pages/Profile"
import SignUp from "./Pages/SignUp"
import Header from "./components/Header/Header"
import About from "./Pages/About"
import PrivateRouts from "./components/PrivateRoutes/PrivateRouts"

const App = () => {
  return<BrowserRouter>
  <Header />
  <Routes>
    <Route path="/" element={<Home />}/>
    <Route path="/sign-in" element={<SignIn />}/>
    
    <Route  element={<PrivateRouts />}>
    <Route path="/profile" element={<Profile />}/>
    </Route>
    <Route path="/sign-up" element={<SignUp />}/>
    <Route path="/sign-in" element={<SignIn />}/>
    <Route path="/about" element={<About />}/>
  </Routes>
  </BrowserRouter>
}

export default App
