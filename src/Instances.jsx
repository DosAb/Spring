import { shaderMaterial, useTexture, useGLTF } from '@react-three/drei'
import { useThree, useFrame } from "@react-three/fiber"
import { useEffect, useRef } from "react";
import { useControls } from 'leva'
import * as THREE from 'three'

import { Selection, Select, EffectComposer, SelectiveBloom } from '@react-three/postprocessing'
import { BlurPass, Resizer, KernelSize } from 'postprocessing'

import vertexShader from './Materials/instanceMaterial/vertex'
import fragmentShader from './Materials/instanceMaterial/fragment'

export default function Instances()
{
    const lightRef1 = useRef()
    const instanceRef = useRef()

    const positionsArray = []
    const count = 30

    const offsets = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const scales = new Float32Array(count * 1)
    const offsetY = new Float32Array(count * 1)

    const sizes = new Float32Array(count)
    const velocity = new Float32Array(count)
    const distance = new Float32Array(count)

    for(let i = 0; i < count; i++)
    {
        const x = (Math.random() - 0.5) * 2
        const y = (Math.random() - 0.5) * 2
        const z = (Math.random() - 0.5) * 2

        positionsArray.push(new THREE.Vector3(x, y, z))

        const i3 = i * 3
        offsets[i3 + 0] = x
        offsets[i3 + 1] = y
        offsets[i3 + 2] = z

        colors[i3 + 0] = Math.random()
        colors[i3 + 1] = Math.random()
        colors[i3 + 2] = Math.random()

        scales[i] = 1 + 0.5 * Math.sin( 32 * Math.PI * i / count )
        offsetY[i] = Math.ceil(Math.random())



        sizes[i] = 4 + Math.random() * 4
        velocity[i] = 0.4 + Math.random() * 0.6
        distance[i] = 0.4 + Math.random() * 0.6

    }

    const tile = new THREE.Mesh(
        new THREE.PlaneGeometry(1, 1),
        new THREE.MeshBasicMaterial()
    )

    // const geometry = new THREE.PlaneGeometry(0.1 * 0.5, 0.8 * 0.5)
    const geometry = new THREE.SphereGeometry(0.02, 16, 8)

    geometry.setAttribute('instanceOffset', new THREE.InstancedBufferAttribute(offsets, 3))
    geometry.setAttribute('instanceColor', new THREE.InstancedBufferAttribute(colors, 3))
    geometry.setAttribute('instanceScale', new THREE.InstancedBufferAttribute(scales, 1))
    geometry.setAttribute('instanceoffsetY', new THREE.InstancedBufferAttribute(offsetY, 1))
    geometry.setAttribute('aSize', new THREE.InstancedBufferAttribute(sizes, 1))
    geometry.setAttribute('aVelocity', new THREE.InstancedBufferAttribute(velocity, 1))
    geometry.setAttribute('aDistance', new THREE.InstancedBufferAttribute(distance, 1))

    const charsTexture = useTexture('/chars.png')

    const material = new THREE.ShaderMaterial({
        uniforms:{
            uTime: {value: 1},
            uTexture: {value: charsTexture},
            uColor: {value: new THREE.Color('#64DDFF')}
        },
        depthTest: true,
        depthWrite: false,
        transparent: true,
        // blending: THREE.AdditiveBlending,
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
    })

    const instancedMesh = new THREE.InstancedMesh(geometry, material, 30)
    const transform = new THREE.Object3D()


    useEffect(()=>{
        for(let i = 0; i <instancedMesh.count; i++)
        {
            transform.position.random().subScalar( 0.5 ).multiplyScalar( 1.5 )
            // transform.scale.setScalar(new THREE.Vector3(sizes[i], sizes[i], sizes[i]))
            transform.updateMatrix()
    
            instancedMesh.setMatrixAt(i, transform.matrix)
            instanceRef.current.setMatrixAt(i, transform.matrix)
        }
        instanceRef.current.instanceMatrix.needsUpdate = true
    })


    // tile.add(instancedMesh)

    useFrame((state, delta)=>{
        material.uniforms.uTime.value += delta
    })

    return <>
        <ambientLight ref={lightRef1} intensity={1} />
        <Selection >
            <EffectComposer multisampling={0}>
                <SelectiveBloom mipmapBlur lights={[lightRef1]} radius={0.3} luminanceThreshold={0.1} intensity={2} />
            </EffectComposer>
            <Select enabled>
                <mesh>
                    <boxGeometry args={[.03, .03, .03]} />
                    <meshBasicMaterial />
                </mesh>
                <instancedMesh ref={instanceRef} args={[geometry, material, 30]}>
                </instancedMesh>
            </Select>
        </Selection>
        {/* <primitive object={instancedMesh}></primitive> */}
    </>
}