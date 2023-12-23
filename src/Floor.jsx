import { useTexture, useGLTF } from '@react-three/drei'
import { useThree, useFrame, extend } from "@react-three/fiber"
import { useEffect, useRef } from "react";
import { useControls } from 'leva'
import * as THREE from 'three'
import GSAP from 'gsap';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './Materials/planeMaterial/material.js'


export default function Floor()
{
    GSAP.registerPlugin(ScrollTrigger)

    const waterRef = useRef()
    const springRef = useRef()
    const bambooRef = useRef()
    const lampRef = useRef()
    const kuvshinRef = useRef()

    const texture = useTexture('/textures/baked4k.png')
    texture.flipY = false

    const alphaTexture = useTexture('/textures/alpha.png')
    alphaTexture.flipY = false
    const shadowTexture = useTexture('/textures/shadow.jpg')
    // shadowTexture.flipY = false

    // const model = useGLTF('/models/spring.glb')
    // const crystal = useGLTF('/models/crystals.glb')
    // const spring = model.scene.children[0].geometry

    const material = new THREE.MeshBasicMaterial({
        map: texture,
        alphaMap: alphaTexture,
        alphaTest: 0.7,
        side: THREE.DoubleSide,
    })

    const separateModel = useGLTF('/models/springSeparated.glb').scene

    const spring2 = separateModel.getObjectByName('spring')

    const frog = separateModel.getObjectByName('frog')

    const lamp1 = separateModel.getObjectByName('lamp1')
    const lamp2 = separateModel.getObjectByName('lamp2')

    const bamboo1 = separateModel.getObjectByName('bamboo1')
    const bamboo2 = separateModel.getObjectByName('bamboo2')
    const bamboo3 = separateModel.getObjectByName('bamboo3')
    const bamboo4 = separateModel.getObjectByName('bamboo4')
    const bamboo5 = separateModel.getObjectByName('bamboo5')
    const bamboo6 = separateModel.getObjectByName('bamboo6')
    const bamboo7 = separateModel.getObjectByName('bamboo7')

    const kuvshin1 = separateModel.getObjectByName('kuvshin1')
    const kuvshin2 = separateModel.getObjectByName('kuvshin2')
    const kuvshin3 = separateModel.getObjectByName('kuvshin3')
    const kuvshin4 = separateModel.getObjectByName('kuvshin4')
    const kuvshin5 = separateModel.getObjectByName('kuvshin5')
    const transform = new THREE.Object3D()

    useEffect(()=>{
        GSAP.to(springRef.current.scale, {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.8,
            delay: 0.2
        })

        bambooRef.current.children.forEach((child, index)=>{
            GSAP.to(child.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.8,
                delay: 0.8 + 0.2 * index
            })
        })
        lampRef.current.children.forEach((child, index)=>{
            GSAP.to(child.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.6,
                delay: 0.4
            })
        })
        kuvshinRef.current.children.forEach((child ,index)=>{
            GSAP.to(child.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.8 ,
                delay: 1 + 0.4 * index
            })
        })
    }, [])

    const click = (value)=>{
        console.log(value.eventObject);
        // document.body.style.cursor = "pointer"
        GSAP.to(value.eventObject.scale, {
            x: 1.2,
            y: 1.2,
            z: 1.2,
            duration: 0.8 ,
            delay: 0
        })
    }

    useFrame((state, delta)=>{
        waterRef.current.uniforms.uTime.value += delta * 0.5
    })

    return <>
        <group scale={0} ref={springRef}>
            <mesh position-y={0.13} rotation-x={-Math.PI * 0.5}>
                <planeGeometry  args={[2.3, 2.3]} />  
                <planeMaterial ref={waterRef} />
            </mesh>
            <mesh  position-y={-0} rotation-x={-Math.PI * 0.5}>
                <planeGeometry  args={[8.1, 8.1]} />  
                <meshBasicMaterial  color={'#000000'} alphaMap={shadowTexture} transparent={true} />
            </mesh>


            <mesh geometry={spring2.geometry} >
                <meshBasicMaterial  side={THREE.DoubleSide}  map={texture} alphaMap={alphaTexture} alphaTest={0.7} />
            </mesh>
            <group ref={bambooRef}>
                <mesh scale={0} onClick={click} position={[-2.03582, 0, 0.62295]} geometry={bamboo1.geometry} ><meshBasicMaterial side={THREE.DoubleSide} map={texture} /></mesh>
                <mesh scale={0} onClick={click} position={[-1.9978, 0, -0.879015]} geometry={bamboo2.geometry} ><meshBasicMaterial side={THREE.DoubleSide} map={texture} /></mesh>
                <mesh scale={0} onClick={click} position={[-1.94076, 0, -1.33841]} geometry={bamboo3.geometry} ><meshBasicMaterial side={THREE.DoubleSide} map={texture} /></mesh>
                <mesh scale={0} onClick={click} position={[-1.5508, 0, -1.54433]} geometry={bamboo4.geometry} ><meshBasicMaterial side={THREE.DoubleSide} map={texture} /></mesh>
                <mesh scale={0} onClick={click} position={[0.380639, 0, -1.68239]} geometry={bamboo5.geometry} ><meshBasicMaterial side={THREE.DoubleSide} map={texture} /></mesh>
                <mesh scale={0} onClick={click} position={[1.96266, 0, -0.754533]} geometry={bamboo6.geometry} ><meshBasicMaterial side={THREE.DoubleSide} map={texture} /></mesh>
                <mesh scale={0} onClick={click} position={[1.78461, 0, 0.764826]} geometry={bamboo7.geometry} ><meshBasicMaterial side={THREE.DoubleSide} map={texture} /></mesh>
            </group>

            <group ref={kuvshinRef}>
                <mesh scale={0} position={[-0.485188, 0.134281, 0.450179]} geometry={kuvshin1.geometry} ><meshBasicMaterial map={texture} /></mesh>
                <mesh scale={0} position={[-0.097171, 0.134281, 0.548407]} geometry={kuvshin2.geometry} ><meshBasicMaterial map={texture} /></mesh>
                <mesh scale={0} position={[0.767292, 0.134281, 0.278264]} geometry={kuvshin3.geometry} ><meshBasicMaterial map={texture} /></mesh>
                <mesh scale={0} position={[0.42191, 0.134281, -0.385733]} geometry={kuvshin4.geometry} ><meshBasicMaterial map={texture} /></mesh>
                <mesh scale={0} position={[-0.696357, 0.209007, -0.154148]} geometry={kuvshin5.geometry} ><meshBasicMaterial map={texture} /></mesh>
            </group>

            <mesh position={[-1.30492, 0.306075, 0.707806]} geometry={frog.geometry} ><meshBasicMaterial map={texture} /></mesh>
            <group ref={lampRef}>
                <mesh scale={0} position={[-1.12203, 0, 1.70652]} geometry={lamp1.geometry} ><meshBasicMaterial map={texture} /></mesh>
                <mesh scale={0} position={[0.159133, 0, 1.94927]} geometry={lamp2.geometry} ><meshBasicMaterial map={texture} /></mesh>
            </group>
        </group>







        {/* <mesh geometry={crystal.scene.children[0].geometry}>
            <meshBasicMaterial color={'#FFCF5E'} />
        </mesh> */}
    </>
}
