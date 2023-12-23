uniform float uTime;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform sampler2D uTexture;
varying vec2 vUv;

varying float vDistance;

void main()
{
    float mask = texture2D(uTexture, gl_PointCoord).r;
    float alpha = 1.0 - (vDistance / 120.0);
    gl_FragColor = vec4(uColor2, alpha * (mask * 1.2));
}