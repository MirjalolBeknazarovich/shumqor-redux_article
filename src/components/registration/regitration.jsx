import { useState, useEffect } from 'react';
import logo from '../../images/download.png';
import Input from '../../ui/input';
import { useDispatch, useSelector } from 'react-redux';
import { signUserStart, signUserSuccess, signUserFailer } from '../../slice/auth';
import AuthService from '../../servise/auth';
import ValidationError from '../validationError/validationError';
import { useNavigate } from 'react-router-dom';

const Regitration = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isLoading, loggedIn } = useSelector( state => state.auth )
  const registerHendler = async e => {
    e.preventDefault()
    dispatch(signUserStart())
    const user = { username: name, email, password }
    try{
      const responce = await AuthService.userRegister(user)
      dispatch( signUserSuccess( responce.user ) )
      navigate('/')
    } catch (error) {
      console.log(error.response.data)
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
          <h1 className="h3 mb-3 fw-normal">Please register</h1>

          <ValidationError />

          <Input label={'User name'} state={name} setState={setName} />

          <Input label={'Email address'} type={'email'} state={email} setState={setEmail} />

          <Input label={'Password'} type={'password'} state={password} setState={setPassword} />

          <button className={'w-100 mt-4 btn btn-lg btn-primary'} disabled={ isLoading } type='submit' onClick ={registerHendler}>{ isLoading ? "Loading . . ." : "Register" }</button>
          <p className="mt-5 mb-3 text-muted">© 2017–2023</p>
        </form>
      </main>
    </div>
  )
}

export default Regitration