import ProjectPopover from "./projectPopover"
import UserPopover from "./userPopober"
import axios from "../../../util/http"
import { useNavigate } from "react-router-dom"
import logo from '../../../static/logo.png'

function Header() {
  const navigate = useNavigate()

  async function logout() {
    await axios.post('/api/logout')
    navigate('/login')
  }

  function home_click() {
    navigate('/project')
  }

  return (
    <div className='header_wrap_body'>
      <button className='header_button' onClick={home_click}>
        <img className="header_logo" src={logo}></img>
        <h2 >Scrum项目管理系统</h2>
      </button>
      <ProjectPopover />
      <UserPopover />
      <div onClick={logout} className="header_login_out_btn">退出登录</div>
    </div>
  )
}

export default Header 