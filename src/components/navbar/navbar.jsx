import { Link, useNavigate } from 'react-router-dom';
import logo from '../../images/download.png';
import { useDispatch, useSelector } from 'react-redux';
import { FiLogOut } from 'react-icons/fi';
import { removeItem } from '../../helpers/persistanceStoreg';
import { logoutUser } from '../../slice/auth';


const Navbar = () => {
  const { loggedIn, user } = useSelector( state => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const logoutHendler = () => {
    dispatch(logoutUser())
    removeItem('token')
    navigate('/login')
  }
  return (
    <div >
        <div className="container pt-2 d-flex flex-column flex-md-row align-items-center pb-2 mb-4 border-bottom">
            <Link to={'/'}>
              <div>
                <img src={logo} alt="img" width={'60'} />
              </div>
            </Link>

            <nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto">
              {
                loggedIn ? (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <Link className='me-3 py-2 text-dark text-decoration-none' to={'/createarticle'} >Create artticle </Link>
                    <p className='me-3 py-2 m-0  text-dark text-decoration-none'>{user.username}</p>
                    <img className='me-3 rounded-circle' width={40} src={user.image} alt="img" />
                    <button onClick={logoutHendler} className='btn btn-outline-danger'><FiLogOut style={{ width: '30px', height: '30px'}} /></button>
                  </div>
                ) : (
                  <>
                    <Link className='me-3 py-2 text-dark text-decoration-none' to={'/login'}>Login</Link>
                    <Link className='me-3 py-2 text-dark text-decoration-none' to={'/registration'}>Register</Link>
                  </>
                )
              }
            </nav>
        </div>
    </div>
  )
}

export default Navbar