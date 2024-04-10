import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import AboutUs from './Pages/AboutUs'
import NotFound from './Pages/NotFound'
import SignUp from './Pages/Signup'
import Login from './Pages/Login'
import CourseList from './Pages/Courses/CourseList'
import Contact from './Pages/Contact'
// import morgan from 'morgan'

function App() {
  const [count, setCount] = useState(0)

  return (
   <>
       <Routes>
          <Route path='/' element={<HomePage/>}></Route>
          <Route path='/about' element={<AboutUs/>}></Route>
          <Route path='/courses' element={<CourseList/>}></Route>
          <Route path='/signup' element={<SignUp/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/contact' element={<Contact/>}></Route>
          <Route path='*' element={<NotFound/>}></Route>
       </Routes>
      
   </>
  )
}

export default App
