export default /*glsl */
`
uniform float uTime;
uniform sampler2D uTexture;
uniform vec3 uColor;

varying vec2 vUv;
varying float vOffsetY;
varying vec3 vColor;

void main()
{
    vec2 uv = fract(vUv * vec2(1.0 / 8.0, 1.0) + vec2(-ceil(uTime * 10.0 + vOffsetY * 10.0) / 8.0, vOffsetY / 8.0));
    float distance = length(vUv - 0.5);
    float alpha = texture2D(uTexture, uv).r;
    alpha = smoothstep(0.5, 1.0, alpha);
    vec3 color = texture2D(uTexture, uv).rgb;
    gl_FragColor = vec4(vec3(uColor) , 1.0);
    // gl_FragColor = vec4(vColor * 1.0 , 0.5);
}`