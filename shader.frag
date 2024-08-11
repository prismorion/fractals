precision highp float;

uniform vec2 mnPos;
uniform vec2 mxPos;

varying vec2 uv;

float foo(vec2 uv) {
    vec2 c = 5. * uv - vec2(0.7, 0.);
    vec2 z = vec2(0.);
    for (int i = 0; i < 500; i++) {
        z = vec2(z.x * z.x - z.y * z.y, 2. * z.x * z.y) + c;
        if (dot(z, z) > 4.)
            return float(i) / 500.;
    }
    return 1.;
}

void main() {
    vec2 pos = mix(mnPos, mxPos, uv);
    gl_FragColor = vec4(vec3(pow(foo(pos), 1.)),1.0);
}