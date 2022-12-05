import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)

  async function fetchData() {
    try {
      const response = await axios.get("https://jsonplaceholder.typicode.com/posts")
      setData(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  
  useEffect(() => {
    setLoading(true)
    fetchData();
    setLoading(false) 
  }, [])

  if (isLoading) return <p className="text-gray-700 text-base">Fetching Posts...</p>
  if (!data) return <p>No POSTS fetched</p>

  return (
    <div>
      <h1 className="font-bold text-2xl m-2">POSTS</h1>
      {data.map(post =>
        <div key={post.id} className="m-2 rounded overflow-hidden shadow-lg">
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{post.title}</div>
            <p className="text-gray-700 text-base"> {post.body} </p>
          </div>
          <div className="px-6 pt-4 pb-2">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-blue-700 mr-2 mb-2">#{post.id}</span>
          </div>
        </div>
      )}
    </div>
  )
}
