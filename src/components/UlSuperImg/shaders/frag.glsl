#define GLSLIFY 1
uniform sampler2D uTexture;
uniform float uOpacity;
uniform vec3 uDarkColor;
uniform vec2 uDimensions;
uniform vec2 uMouseOver;
uniform float uScrollProgress;
varying vec2 vUv;
varying vec2 vSt;
// varying float vY;
float radius = 16.0;

// void main() {
//   vec3 texture = texture2D(uTexture, vUv).rgb;
//   gl_FragColor = vec4(texture, 1.);
// }

float sdRoundRect(vec2 pos, vec2 ext, vec4 cr) {
  // select the radius according to the quadrant the point is in
  vec2 s = step(pos, vec2(0.0));
  float r = mix(mix(cr.y, cr.z, s.y), mix(cr.x, cr.w, s.y), s.x);
  return length(max(abs(pos) + vec2(r) - ext, 0.0)) - r;
}

float parabola(float t) { return -pow(2.0 * t - 1.0, 2.0) + 1.0; }

void main() {
  vec2 st = vSt;
  vec2 uvAdjustScale = uDimensions / min(uDimensions.x, uDimensions.y);
  float l = length(st - 0.5) * 0.8;
  float mouseOverProgress = smoothstep(l, l + 0.2, uMouseOver.x);
  vec2 uv = vUv;
  uv -= 0.5;
  uv *= mix(1.0, 0.9, uMouseOver.y);
  uv *= mix(1.0, 0.95, mouseOverProgress);
  uv += 0.5;
  vec4 color = texture2D(uTexture, uv);
  color.rgb = mix(uDarkColor, color.rgb,
                  uOpacity * min(1.0, (1.0 - uScrollProgress) * 2.0));
  vec2 boxPosition = vec2(0.5, 0.5);
  vec2 boxExt = vec2(0.5, 0.5) * uvAdjustScale;
  vec4 cornerRadii = vec4(0.04);
  float opacity = sdRoundRect(st - boxPosition, boxExt, cornerRadii);
  opacity = step(opacity, 0.0);
  color.a = opacity * uOpacity;
  gl_FragColor = color;
}
