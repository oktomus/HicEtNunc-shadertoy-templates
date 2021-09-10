// SHADERTOY TEMPLATE PREFIX.
// DO NOT REMOVE.
// PLACE YOUR SHADER AT THE END OF THE FILE.

#include <common>
 
uniform vec4 iMouse;
uniform vec3 iResolution;
uniform float iTime;
uniform int iFrame;

void mainImage( out vec4 fragColor, in vec2 fragCoord);

void main() {
  mainImage(gl_FragColor, gl_FragCoord.xy);
}

// PUT YOUR SHADER HERE

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    fragColor = vec4(
        abs(sin(iTime)),
        iMouse.xy / iResolution.xy,
        1.0);
}

