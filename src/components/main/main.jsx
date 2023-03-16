import { useEffect } from 'react'
import { useSelector, useDispatch  } from 'react-redux'
import Loader from '../../ui/loader'
import { getArticlesStart, getArticlesSuccess } from '../../slice/article';
import ArticleServise from '../../servise/article';
import ArticleCard from '../articleCard/articleCard';

const Main = () => {
  const { articles, isLoading } = useSelector( state => state.article);
  
  const dispatch = useDispatch()
  

  const getArticles = async () => {
    dispatch( getArticlesStart() )
     try {
      const responce = await ArticleServise.getArticles()
      console.log(responce);
      dispatch( getArticlesSuccess(responce.articles) )
     } catch (error) {
      console.log(error);
     }
  }

  useEffect( () => {
    getArticles()
  }, [])
  return (
    <div className='container'>
     { isLoading && <Loader /> }
      <div className="album py-5">
        <div className="container">

          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            { articles.map (( item, index )=> (
              <ArticleCard item={item} index={index} getArticles={getArticles} />
            ))}
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default Main