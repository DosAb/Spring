import { useThree, useFrame, extend } from "@react-three/fiber"
import { useEffect, useRef, useState } from "react";

export default function Main({children})
{
    const scene = useRef()
    const { gl, camera } = useThree()
    useFrame(() => {
      gl.autoClear = false
      gl.clearDepth()
      gl.render(scene.current, camera)
    }, 2)

    return <scene ref={scene}>{children}</scene>
}