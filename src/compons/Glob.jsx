import React, { useEffect, useRef } from 'react'
import createGlobe from "cobe";

const Glob = ({heirem="h-[2rem]"}) => {
    const canvasref = useRef(null)

    useEffect(()=>{
        let phi = 0;
        const globe = createGlobe(canvasref.current,{
            devicePixelRatio: 2,
            width: canvasref.current.offsetHeight * 2,
            height: canvasref.current.offsetHeight * 2,
            phi: 0,
            theta: 0.2,
            dark: 1.1,
            diffuse: 3,
            mapSamples: 16000,
            mapBrightness: 1.8,
            mapBaseBrightness: .05,
            baseColor: [1.1, 1.1, 1.1],
            markerColor: [251 / 255, 100 / 255, 21 / 255],
            glowColor: [1, 1, 1],
            markers: [
                { location: [37.7595, -122.4367], size: 0.03 },
            ],
            opacity: .7,
            onRender: (state) => {
                state.phi = phi
                phi += 0.01
            }
        })

        return () => globe.destroy()
    },[canvasref.current])

  return (
    <canvas className={`${heirem}`} ref={canvasref}></canvas>
  )
}

export default Glob