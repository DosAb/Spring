import { Canvas } from '@react-three/fiber'
import { useControls } from 'leva'
import * as THREE from 'three'
import { Selection, Select, EffectComposer, SelectiveBloom } from '@react-three/postprocessing'
import { OrbitControls} from '@react-three/drei'
import Floor from './Floor'
import Instances from './Instances'
import { forwardRef, useEffect, useRef } from 'react'
import Bloom from './Bloom'
import Main from './Main'
import Particles from './Particles'


export default function Experience()
{

    const meshRef1 = useRef()


    return <>
    <Canvas
        dpr={[1, 2]} //pixelRation
        linear
        gl={{ 
            antialias: false,
            alpha: true,
            outputColorSpace: THREE.SRGBColorSpace,
        }} 
        camera={ {
            fov: 35,
            position: [ 0, 4, 8.5 ]
        }}
    >
        {/* <color args={ [ '#444444' ] } attach="background" /> */}
        <OrbitControls
            target={ [ 0, 0.6, 0 ] }
            enablePan={ false }
            minDistance={ 6 }
            maxDistance={ 10 }
            maxPolarAngle={Math.PI / 2 - 0.1}
        />



        <Floor />
        <Particles />
        {/* <Instances  /> */}


    </Canvas>
    </>
}
