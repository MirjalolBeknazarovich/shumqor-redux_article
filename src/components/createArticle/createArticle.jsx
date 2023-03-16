import { useState } from 'react';
import { useDispatch } from 'react-redux';
import articleServise from '../../servise/article';
import ArticleForm from '../articliForm/articleForm';
import { postArticleFailure, postArticleStart, postArticleSuccess } from '../../slice/article';
import { useNavigate } from 'react-router-dom';


const CreateArticle = () => {
    const [ title, setTitle ] = useState('')
    const [ description, setDescription ] = useState('')
    const [ body, setBody ] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const formSubmit = async ( e ) => {
        e.preventDefault()
        const article = { title, description, body }
        dispatch(postArticleStart())
        try {
            await articleServise.postArticle(article)
            dispatch( postArticleSuccess())
            navigate('/')
        } catch (error) {
            console.log(error);
            dispatch( postArticleFailure())
        }
    }
    const formProps =  { title, setTitle, description, setDescription, body, setBody, formSubmit }

  return (
    <div className='text-center'>
        <h1 className='fs-2'>Create article</h1>
        <ArticleForm { ...formProps } />
    </div>
  )
}

export default CreateArticle