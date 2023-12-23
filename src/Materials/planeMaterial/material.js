import { shaderMaterial } from '@react-three/drei'
import { extend } from '@react-three/fiber'
import vertexShader from './vertex.glsl'
import fragmentShader from './fragment.glsl'
import * as THREE from 'three'

const textureLoader = new THREE.TextureLoader()
const texture = textureLoader.load('/particleMask.png')
texture.flipY = false

const PlaneMaterial = shaderMaterial(
    {
        uTime: 0,
        uColor1: new THREE.Color('#FF3A20'),
        uColor2: new THREE.Color('#8AC2FF'),
        uTexture: texture,
    },
    vertexShader,
    fragmentShader
)

extend({ PlaneMaterial })