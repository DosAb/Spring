import { useThree, useFrame, extend } from "@react-three/fiber"
import { useEffect, useRef, useState } from "react";
import * as THREE from 'three'

import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { EffectComposer  } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'


extend({ EffectComposer, RenderPass, UnrealBloomPass, OutputPass })


export default function Bloom({children})
{

    const composer = useRef()
    const renderPassRef = useRef()
    const bloomRef = useRef()

    const { gl, camera, size } = useThree()
    const threeScene = useThree().scene
    const [selctedScene, setScene] = useState()


    useEffect(() =>{

        composer.current.setSize(size.width, size.height)
        composer.current.addPass(renderPassRef.current)
        composer.current.addPass(bloomRef.current)
        console.log(composer.current);

    })
    useFrame((state, delta) => {
        const {scene} = state

        composer.current.render()
        // gl.render(scene, camera)
    })

    return( 
    <>
        <scene ref={setScene}>{children}</scene>

        <effectComposer ref={composer} args={[gl]} >
            <renderPass attachArray="passes" ref={renderPassRef} scene={selctedScene} camera={camera} />
            <unrealBloomPass attachArray="passes" ref={bloomRef} args={[undefined, 1.5, 0.5, 0.1]} />
        </effectComposer>
    </>
    )
}
