  import { useState, useEffect } from 'react';
  import logo from '../../images/download.png';
  import Input from '../../ui/input';
  import { useDispatch, useSelector } from 'react-redux';
  import { signUserStart, signUserSuccess, signUserFailer } from '../../slice/auth';
  import AuthService from '../../servise/auth';
  import ValidationError from '../validationError/validationError';
  import { useNavigate } from 'react-router-dom';

  const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const {isLoading, loggedIn} = useSelector( state => state.auth);
    const loginHendler = async e => {
      e.preventDefault()
      dispatch( signUserStart() )
      const user = { email, password }
      try {
        const responce = await AuthService.userLogin( user )
        dispatch( signUserSuccess( responce.user ) )
        navigate('/')
      } catch (error) {
        dispatch( signUserFailer( error.response.data ) )       
      }
      
    }

    useEffect( () => {
      if (loggedIn) {
        navigate('/')      
      }
    }, [loggedIn])

    return (
    <div className='text-center mt-5'>
      <main className="form-signin w-25 m-auto">
        <form>
          <img className="mb-4" src={logo} alt="" width="100" />
          <h1 className="h3 mb-3 fw-normal">Please login</h1>
          
          <ValidationError />

          <Input label={'Email address'} type={'email'} state={email} setState={setEmail} />

          <Input label={'Password'} type={'password'} state={password} setState={setPassword} />

          <button className={'w-100 mt-4 btn btn-lg btn-primary'}  type='submit' onClick ={loginHendler}>{ isLoading ? "Loading . . ." : "Login" }</button>
          <p className="mt-5 mb-3 text-muted">© 2017–2022</p>
        </form>
      </main>
    </div>
    )
  }

export default Login