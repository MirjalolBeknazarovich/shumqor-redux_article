import { Routes, Route } from 'react-router-dom';
import Main from './components/main/main';
import Login from './components/login/login';
import Registration from './components/registration/regitration';
import Navbar from './components/navbar/navbar';
import { useEffect } from 'react'
import AuthService from './servise/auth';
import { useDispatch } from 'react-redux';
import { signUserSuccess } from './slice/auth'
import { getItem } from './helpers/persistanceStoreg';
import ArticleDetail from './components/articleDetail/articleDetail';
import CreateArticle from './components/createArticle/createArticle';
import EditArticle from './components/editArticle/editArticle';


function App() {

const dispatch = useDispatch()

  const getUser = async () => {
    try {
      const responce = await AuthService.getUser()
      dispatch(signUserSuccess(responce.user))
    } catch (error) {
      console.log(error);
    }
  }


  useEffect( () => {
    const token = getItem('token')
    if (token) {
      getUser()      
    }
  }, [])
  return (
    <>
      <Navbar />
      <div className='container'>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/login' element={<Login />} />
          <Route path='/registration' element={<Registration />} />
          <Route path='/articledetail/:slug' element={<ArticleDetail />} />
          <Route path='/createarticle' element={<CreateArticle />} />
          <Route path='/editarticle/:slug' element={<EditArticle />} />
        </Routes>
      </div>
    </>
  )
}

export default App;
