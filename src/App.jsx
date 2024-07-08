import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./Pages/Home"
import SignIn from "./Pages/SignIn"
import Profile from "./Pages/Profile"
import SignUp from "./Pages/SignUp"

const App = () => {
  return<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />}/>
    <Route path="/sign-in" element={<SignIn />}/>
    <Route path="/profile" element={<Profile />}/>
    <Route path="/sign-up" element={<SignUp />}/>
    <Route path="/sign-in" element={<SignIn />}/>
  </Routes>
  </BrowserRouter>
}

export default App
