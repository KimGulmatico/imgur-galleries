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

  const fetchSubredddit = async () => {
    try {
      const res = await axios.get('https://api.imgur.com/3/gallery/r/pics', {
        headers: { Authorization: `Client-ID ${CLIENT_ID}` }
      })
      if (res) { setGalleries(res.data.data); console.log(res.data) }
    } catch (err: any) {
      setGalleries(fallbackResponseData.data)
      setError(err.response.data.data.error)
      console.log(err.response.data.data.error)
    }
  }

  useEffect(() => {
    w && setWidth(w)
    console.log(w)
  }, [w])

  useEffect(() => {
    fetchSubredddit()
  }, [])


  return (
    <div className="max-w-[900px] mr-auto ml-auto">
      {error && <p className="text-gray-400 py-3">Use https to access imgur api (using fallback response data for development)</p>}

      <div className="p-7 h-screen bg-slate-900 overflow-y-auto rounded-lg my-5">
        <div className="columns-2 md:columns-3">
          {
            galleries.map((imgur, i) => {
              const widthScale = width / imgur.width

              return <div key={`imgur-${i}`} ref={i == 0 ? ref : null} className={`anim flex-col text-white rounded-lg inline-block overflow-hidden mt-[10px] cursor-pointer`}>
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
