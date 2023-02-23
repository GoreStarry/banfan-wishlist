#define GLSLIFY 1

uniform vec2 uResolution;
uniform vec2 uDimensions;
// uniform vec2 uDimensions_def;
uniform vec3 uRoundCenter;
uniform float uRoundIntensity;
uniform vec2 uMouseOver;
varying vec2 vUv;
varying vec2 vSt;
const float PI = 3.14159265359;

// 從 x=0=>1 y=0=>0.5=>1 的拋物線公式
float parabola(float t) { return -pow(2.0 * t - 1.0, 2.0) + 1.0; }

void main() {
  vSt = uv;

  // object fit contain 縮放
  vec2 uvAdjustScale = uDimensions / min(uDimensions.x, uDimensions.y);

  // uv 置中
  vSt -= 0.5;

  // 乘上 object fit contain 縮放比
  vSt *= uvAdjustScale;

  // 獲得從中心為基準的uv向量長，乘上 0.8 作為漸變起點
  float lst = length(vSt) * 0.8;

  // 回歸uv相對座標原點
  vSt += 0.5;

  // smoothstep 類似 lerp(起始值, 目標值, 漸變趨近值)。
  // smoothstep(起始值, 目標值, 中間值x) => 中間值會被轉成漸變曲線
  // https://thebookofshaders.com/glossary/?search=smoothstep
  // 理論上 uMouseOver.y 會從 0=>N，經過 smoothstep 就會自動造成順暢補間
  float mouseOverProgress = smoothstep(lst, lst + 0.2, uMouseOver.y);

  vUv = uv;

  // vUv -= 0.5;
  // object fit cover 縮放
  // vUv *= uDimensions / max(uDimensions.x, uDimensions.y);
  // geo面長寬比
  // float aspect = uDimensions.x / uDimensions.y;
  // geo目標面長寬比
  // float aspect_def = uDimensions_def.x / uDimensions_def.y;
  // vUv.y *= aspect_def;
  // vUv *= min(1.0, aspect / aspect_def);
  // vUv += 0.5;

  vec3 pos = position;
  pos.z += mix(0.0, min(uDimensions.x, uDimensions.y) * 0.01,
               parabola(mouseOverProgress));

  vec4 worldPosition = modelMatrix * vec4(pos, 1.0);
  vec3 vec_1 = -uRoundCenter;
  // vec3 vec_2 = worldPosition.xyz - uRoundCenter;
  float y = (worldPosition.y / uResolution.y) * PI * 0.4;
  worldPosition.z += uRoundCenter.z;
  worldPosition.z -= mix(
      uRoundCenter.z, cos(y * y * 2.0) * uRoundCenter.z * 1.1, uRoundIntensity);

  gl_Position = projectionMatrix * viewMatrix * worldPosition;
}
