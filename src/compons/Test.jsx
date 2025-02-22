import React, { useEffect, useRef } from 'react'
import createGlobe from 'cobe';
import { useSpring } from '@react-spring/web';
const Test = () => {

    const canvasRef = useRef();
    const pointerInteracting = useRef(null);
    const pointerInteractionMovement = useRef(0);
    const [{ r }, api] = useSpring(() => ({
        r: 0,
        config: {
            mass: 1,
            tension: 280,
            friction: 40,
            precision: 0.001,
        },
    }));
    useEffect(() => {
        let phi = 0;
        let width = 0;
        const onResize = () => canvasRef.current && (width = canvasRef.current.offsetWidth)
        window.addEventListener('resize', onResize)
        onResize()
        const globe = createGlobe(canvasRef.current, {
            devicePixelRatio: 2,
            width: width * 2,
            height: width * 2,
            phi: 0,
            theta: 0.2,
            dark: 1.1,
            diffuse: 3,
            mapSamples: 16000,
            mapBrightness: 1.8,
            mapBaseBrightness: .05,
            baseColor: [1.1, 1.1, 1.1],
            markerColor: [251 / 255, 100 / 255, 21 / 255],
            glowColor: [1.1, 1.1, 1.1],
            markers: [],
            opacity: .7,
            onRender: (state) => {
                // Called on every animation frame.
                // `state` will be an empty object, return updated params.
                state.phi = phi + r.get()
                phi += 0.005
                state.width = width * 2
                state.height = width * 2
            }
        })
        setTimeout(() => canvasRef.current.style.opacity = '1')
        return () => globe.destroy()
    }, [])

    return (
        <div style={{
            width: '100%',
            maxWidth: 600,
            aspectRatio: 1,
            margin: 'auto',
            position: 'relative',
        }}>
            <div style={{
                width: '100%',
                fontWeight: 700,
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 1,
                textAlign: 'center',
                color: '#fff',
                pointerEvents: 'none',
                userSelect: 'none',
                position: 'absolute',
                mixBlendMode: 'difference'
            }}>
                <h1 style={{
                    fontSize: 'min(9vw,3.2em)',
                    letterSpacing: '.3em',
                    textIndent: '.2em',
                    margin: 'auto',
                }}>orbiter</h1>
            </div>
            <canvas
                ref={canvasRef}
                onPointerDown={(e) => {
                    pointerInteracting.current =
                        e.clientX - pointerInteractionMovement.current;
                    canvasRef.current.style.cursor = 'grabbing';
                }}
                onPointerUp={() => {
                    pointerInteracting.current = null;
                    canvasRef.current.style.cursor = 'grab';
                }}
                onPointerOut={() => {
                    pointerInteracting.current = null;
                    canvasRef.current.style.cursor = 'grab';
                }}
                onMouseMove={(e) => {
                    if (pointerInteracting.current !== null) {
                        const delta = e.clientX - pointerInteracting.current;
                        pointerInteractionMovement.current = delta;
                        api.start({
                            r: delta / 200,
                        });
                    }
                }}
                onTouchMove={(e) => {
                    if (pointerInteracting.current !== null && e.touches[0]) {
                        const delta = e.touches[0].clientX - pointerInteracting.current;
                        pointerInteractionMovement.current = delta;
                        api.start({
                            r: delta / 100,
                        });
                    }
                }}
                style={{
                    width: '100%',
                    height: '100%',
                    cursor: 'grab',
                    contain: 'layout paint size',
                    opacity: 0,
                    transition: 'opacity 1s ease',
                    borderRadius: '50%',
                }}
            />
        </div>
    )
}

export default Test