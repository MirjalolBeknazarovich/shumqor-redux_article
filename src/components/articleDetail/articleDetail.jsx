import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import articleServise from '../../servise/article';
import moment from 'moment';
import Loader from '../../ui/loader';
import { getArticleDetailStart, getArticleDetailSuccess, getArticleDetailFailure } from '../../slice/article'

const ArticleDetail = () => {
  const  {slug}  = useParams()
  const dispatch = useDispatch()
  const {articleDetail, isLoading} = useSelector( state => state.article)
  useEffect( () =>{
  
      const getArticleDetail = async () =>{
        dispatch( getArticleDetailStart())
        try {
          const responce = await articleServise.getArticleDetail(slug)
          dispatch( getArticleDetailSuccess(responce.article))
        } catch (error) {
          dispatch( getArticleDetailFailure())
        }
      }
        getArticleDetail()
    
    
  }, [slug])
  return ( isLoading ? ( <Loader />) : (
    articleDetail !== null && (
      <div>
      <div className="p-5 mb-4 rounded-3">
        <div className="container-fluid py-5">
          <h1 className="display-5 fw-bold">{ articleDetail.title }</h1>
          <p className="col-md-8 fs-4">{ articleDetail.description }</p> 
          <div className='d-flex gap-3'>
            <p className='text-muted'><span className='fw-bold'>Created at:</span> { moment(articleDetail.createdAt).format('DD MMM, YYYY') }</p>
            <p className='text-muted'><span className='fw-bold'>Updated at:</span>{ moment( articleDetail.updatedAt ).format('DD MMM, YYYY') }</p>
          </div>
          <div className="col-md-6">
            <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
              <div className="col p-4 d-flex flex-column position-static">
                <strong className="d-inline-block mb-2 text-primary">{articleDetail.author.username}</strong>
                <p className="card-text mb-auto">{articleDetail.author.bio}</p>
              </div>
              <div className="col-auto d-none d-lg-block">
                <img className="bd-placeholder-img" width="250" height='250' src={articleDetail.author.image} alt="img" />
              </div>
            </div>
          </div>
          <div>{articleDetail.body}</div>
        </div>
      </div>
    </div>
    ))
  )
}

export default ArticleDetail