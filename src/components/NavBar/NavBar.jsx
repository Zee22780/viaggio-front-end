import { Link } from 'react-router-dom'
import './NavBar.css'


const NavBar = ({ user, handleLogout }) => {

  return (
    <>

      {user &&
      <div>
        <Link to="/"><div className='logo'><img src="./viaggio.png" alt="logo" /></div></Link>
        <div className="navbar">

          <Link to="/"><i className="fa-solid fa-house"></i></Link>

          <Link to={`/profile/${user.profile}`}><i className="fa-solid fa-user"></i></Link>
          <Link to="/addPost"><i className="fa-solid fa-plus"></i></Link>
          <Link className="nav-link" to="/createBucketList"><i className="fa-solid fa-list"></i></Link>
          <Link to="/destination"><i className="fa-solid fa-plane"></i></Link>

          <Link to="" onClick={handleLogout}><i className="fa-solid fa-arrow-right-from-bracket"></i></Link>

        </div>
      </div>
    }
    </>

  )
}

export default NavBar















