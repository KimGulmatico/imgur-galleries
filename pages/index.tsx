import type { NextPage } from 'next'
import { ImgurType } from '../types'
import { useEffect, useLayoutEffect, useState } from 'react'
import { shimmer, toBase64 } from '../lib/shimmer'
import { CLIENT_ID, fallbackResponseData } from '../constants'
import Image from 'next/image'
import { useResizeDetector } from 'react-resize-detector';
import axios from 'axios'


const Home: NextPage = () => {
  const [galleries, setGalleries] = useState<ImgurType[]>([])
  const { width: w, height, ref } = useResizeDetector();
  const [width, setWidth] = useState(270.66)
  const [error, setError] = useState(null)
  const [subreddit, setSubreddit] = useState('pics')
  const [loading, setLoading] = useState(false)


  const fetchSubredddit = async () => {
    try {
      setLoading(true)
      const res = await axios.get(`https://api.imgur.com/3/gallery/r/${subreddit}`, {
        headers: { Authorization: `Client-ID ${CLIENT_ID}` }
      })
      if (res) { setGalleries(res.data.data); console.log(res.data); setLoading(false)}
    } catch (err: any) {
      setGalleries(fallbackResponseData.data)
      setError(err.response.data.data.error)
      setLoading(false)
      console.log(err.response.data.data.error)
    }
  }

  useEffect(() => {
    w && setWidth(w)
  }, [w])

  useEffect(() => {
    fetchSubredddit()
  }, [])


  return (
    <div className="max-w-[900px] mr-auto ml-auto">
      <div className="p-3 pt-5 text-center">
        <h3 className="text-3xl text-gray-200">Welcome to imgur subreddits galleries</h3>
        <div className="flex items-center justify-center gap-3">
          <div className="flex justify-end items-end gap-3">
            <input role="input" className="bg-slate-900 mt-7 w-[250px] md:w-[350px] rounded-lg border border-teal-700 focus:border-teal-500 focus:outline-none p-2 text-2xl text-gray-300" type="text" value={subreddit} onChange={(e) => setSubreddit(e.target.value)}/>
            <button className="p-[11px] bg-teal-500 rounded-lg text-lg" onClick={() => fetchSubredddit()}>{loading?'Loading..':'Submit'}</button>
          </div>
        </div>
        {error && <p className="text-gray-400 py-3">Use https to access imgur api (using fallback response data for development)</p>}
      </div>
      <div className="p-7 h-screen bg-slate-900 overflow-y-auto rounded-lg my-5">
        <div className="columns-2 md:columns-3">
          {
            galleries.map((imgur, i) => {
              const widthScale = width / imgur.width

              return <div data-testid="imgur" role="imgurImage" key={`imgur-${i}`} ref={i == 0 ? ref : null} className={`anim flex-col text-white rounded-lg inline-block overflow-hidden mt-[10px] cursor-pointer`}>
                <Image
                  alt={`imgur-link-${i}`}
                  placeholder="blur"
                  blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
                  loading={i > 6 ? 'lazy' : 'eager'} src={imgur.link} width={width}
                  height={imgur.height * widthScale}
                />
                <div className="p-2 bg-gray-600 -mt-2">
                  <div className="max-h-[150px] overflow-hidden">
                    <span className="text-sm font-bold">{imgur.title}</span>
                  </div>
                  <div className="pt-5">
                    <span className="text-sm opacity-75 font-semibold pt-5">{Number(imgur.views).toLocaleString("en-US")} views</span>
                  </div>
                </div>
              </div>
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Home
