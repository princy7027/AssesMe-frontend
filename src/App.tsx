
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './common/Login'
import Register from './common/Register'
import CreatorRoutes from './routers/CreatorRoutes'
import CDashboard from './pages/creator/CDashboard'
import AdminRoutes from './routers/AdminRoutes'
import StudentRoutes from './routers/StudentRoutes'
import SDashboard from './pages/student/SDashboard'
import ADashboard from './pages/creator/Exam/admin/ADashboard'
import CExam from '@/pages/creator/Exam/CExam'
import SDiscussion from './pages/student/SDiscussion'
import SResult from './pages/student/SResult'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path='/signup' element={<Register/>}/>

        <Route path='/admin-dashboard' element={<AdminRoutes component={ADashboard} />}/>
        {/* <Route path='/admin-dashboard' element={<ADashboard/>}/> */}
        <Route path='/creator-dashboard' element={<CreatorRoutes component={CDashboard} />}/>
        <Route path='/creator-exam' element={<CreatorRoutes component={CExam} />}/>
        <Route path='/std-dashboard' element={<StudentRoutes component={SDashboard} />}/>
        <Route path='/std-discussion' element={<StudentRoutes component={SDiscussion} />}/>
        <Route path='/std-result' element={<StudentRoutes component={SResult} />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
