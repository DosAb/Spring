import { useTexture, useGLTF } from '@react-three/drei'
import { useThree, useFrame } from "@react-three/fiber"
import { useEffect, useRef } from "react";
import { useControls } from 'leva'
import * as THREE from 'three'
import GSAP from 'gsap';

import './Materials/ParticlesMaterial/material.js'


export default function Particles()
{
    const materialRef = useRef()
    const particleRef = useRef()

    const geometry = new THREE.BufferGeometry()
    const count = 50
    const positions = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    const velocity = new Float32Array(count)
    const distance = new Float32Array(count)


    for(let i = 0; i < count; i++)
    {
        let i3 = i * 3
        positions[i3 + 0] = (Math.random() - 0.5) * 1.5
        positions[i3 + 1] = (Math.random() - 0.5) * 0.0 + 0.2
        positions[i3 + 2] = (Math.random() - 0.5) * 1.5
        sizes[i] = 5 + Math.random() * 5
        velocity[i] = 0.4 + Math.random() * 0.6
        distance[i] = 0.4 + Math.random() * 0.6
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1))
    geometry.setAttribute('aVelocity', new THREE.BufferAttribute(velocity, 1))
    geometry.setAttribute('aDistance', new THREE.BufferAttribute(distance, 1))

    useEffect(()=>{
        GSAP.to(particleRef.current.scale, {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.8,
            delay: 0.2
        })
        GSAP.to(particleRef.current, {
            visible: true,
            delay: 0.2
        })
    },[])


    useFrame((state, delta)=>{
        materialRef.current.uniforms.uTime.value += delta * 8
    })


    return <>
        <points ref={particleRef} visible={false} scale={0} geometry={geometry} >
            <particlesMaterial  ref={materialRef} alphaTest={0.9}  transparent={true} />
        </points>
    </>
}
