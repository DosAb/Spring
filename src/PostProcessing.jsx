import { useControls } from 'leva'
import * as THREE from 'three'
import { ToneMappingMode } from 'postprocessing'
import { SSR, DepthOfField, Bloom, Noise, Glitch, Vignette, EffectComposer, ToneMapping, SelectiveBloom } from "@react-three/postprocessing"
import { GlitchMode, BlendFunction } from 'postprocessing'

export default function PostProcessing()
{
    return <>
        <EffectComposer >
            {/* <Bloom intensity={2} luminanceThreshold={.6} radius={.4} />
            <ToneMapping mode={ToneMappingMode.ACES_FILMIC} /> */}
        </EffectComposer>
    </>
}