import React, { useEffect, useState } from 'react'
import './Recommended.css'
import { API_KEY, value_converter } from '../../data'
import { Link } from 'react-router-dom'

const Recommended = ({categoryId}) => {

  const [recomData,setRecomData] = useState([])

  const fetchSimilarData = async() => {
    const similarVideo_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=100&regionCode=US&videoCategoryId=${categoryId}&key=${API_KEY}`;
    await fetch(similarVideo_url).then(response=>response.json()).then(data=>setRecomData(data.items))
  }

  useEffect(()=>{
    fetchSimilarData();
  },[])

  return (
    <div className="recommended">
        
            {recomData.map((item,index)=>{
                return (
                <Link to={`/video/${item.snippet.categoryId}/${item.id}`} key={index} className="side-video-list">
                    <img src={item.snippet.thumbnails.medium.url} alt="" />
                    <div className="vid-info">
                        <h4>{item.snippet.title}</h4>
                        <p>{item.snippet.channelTitle}</p>
                        <p>{value_converter(item.statistics.viewCount)} views</p>
                    </div>
                </Link>
                )
            })}
            
    </div>
  )
}

export default Recommended