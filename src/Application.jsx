import { Canvas } from '@react-three/fiber'
import Experience from './Experience'
import { Leva } from 'leva'
import Interface from './Interface'

export default function Application()
{
    return <>
        <Leva collapsed />
        <Interface />
    </>
}
