varying vec3 vNormal;
uniform float time;
uniform float random;

void main() {
    vec3 color = vec3(abs(cos(vNormal.x * random)), abs(sin(vNormal.y * random)), abs(cos(vNormal.z * random)));
    color = mix(color, vec3(1.0, 0.5, 0.0), 0.5); 
    gl_FragColor = vec4(color, 1.0);
}
