import React, { useEffect, useState } from 'react'

// CSS
import "../../css/listBlogs.css"
import { useNavigate } from 'react-router-dom'
import { listBlogService } from '../../services/blog.services'
import { Link } from 'react-router-dom'
function ListBlogs() {
    const navigate = useNavigate()
const [listBlogs, setListBlogs] = useState()
const [isFetching, setIsFetching] = useState(true);


useEffect(() => {
 getData()
}, [])
const getData = async() => {
 try {
    const response = await listBlogService()
    setListBlogs(response.data)
    setIsFetching(false)

 } catch (error) {
    navigate("error")
 }
}
console.log("listBlogs", listBlogs);

if(isFetching === true) {
    return <p>...loading</p>
  }

  return (
    <div className='list-blogs-container'>
        {
            listBlogs.map((eachBlog) => {
                return(
        <div className='blog-container' id={eachBlog._id}>
            <div className='image-blog'>
                <img src={eachBlog.picture} alt="pic" />
            </div>
            <div className='description-blog'>
                <p>{eachBlog.description}</p>
            </div>
            <div className='link-blog'>
                <Link href={eachBlog.link}>Descarga aquí la sesión</Link>
            </div>
        </div>
                )
            })
        }
            
    </div>
  )
}

export default ListBlogs