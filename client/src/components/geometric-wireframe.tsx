import { useEffect, useRef } from 'react';

/**
 * Decorative WebGL wireframe figure - a slowly rotating polyhedron drawn as
 * thin lines, recolored to the site's warm cream palette and rendered on a
 * transparent canvas so it layers over whatever surface it sits on.
 *
 * Adapted from a public 21st.dev shader. Stripped of the original demo's
 * click/keyboard shape-switching and on-screen labels: here it's a single
 * fixed shape that reacts subtly to the cursor (lines soften near the mouse).
 * Fills its positioned parent; pointer-events stay off so it never blocks
 * text selection. Honors prefers-reduced-motion by holding a still frame.
 */

const fragmentShader = `
#ifdef GL_ES
precision highp float;
#endif

uniform vec2 u_mouse;
uniform vec2 u_resolution;
uniform float u_pixelRatio;
uniform float u_time;
uniform int u_shape;

#define TWO_PI 6.2831853071795864769252867665590

mat3 rotateX(float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return mat3(1.0, 0.0, 0.0, 0.0, c, -s, 0.0, s, c);
}

mat3 rotateY(float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return mat3(c, 0.0, s, 0.0, 1.0, 0.0, -s, 0.0, c);
}

mat3 rotateZ(float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return mat3(c, -s, 0.0, s, c, 0.0, 0.0, 0.0, 1.0);
}

// Normalize fragment coords to a centered, aspect-correct space
vec2 coord(in vec2 p) {
    p = p / u_resolution.xy;
    if (u_resolution.x > u_resolution.y) {
        p.x *= u_resolution.x / u_resolution.y;
        p.x += (u_resolution.y - u_resolution.x) / u_resolution.y / 2.0;
    } else {
        p.y *= u_resolution.y / u_resolution.x;
        p.y += (u_resolution.x - u_resolution.y) / u_resolution.x / 2.0;
    }
    p -= 0.5;
    return p;
}

vec2 project(vec3 p) {
    float perspective = 2.0 / (2.0 - p.z);
    return p.xy * perspective;
}

float distToSegment(vec2 p, vec2 a, vec2 b) {
    vec2 pa = p - a;
    vec2 ba = b - a;
    float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
    return length(pa - ba * h);
}

float drawLine(vec2 p, vec2 a, vec2 b, float thickness, float blur) {
    float d = distToSegment(p, a, b);
    return smoothstep(thickness + blur, thickness - blur, d);
}

void getCubeVertices(out vec3 v[8]) {
    float s = 0.7;
    v[0] = vec3(-s, -s, -s); v[1] = vec3( s, -s, -s);
    v[2] = vec3( s,  s, -s); v[3] = vec3(-s,  s, -s);
    v[4] = vec3(-s, -s,  s); v[5] = vec3( s, -s,  s);
    v[6] = vec3( s,  s,  s); v[7] = vec3(-s,  s,  s);
}

void getOctahedronVertices(out vec3 v[6]) {
    v[0] = vec3( 1.0,  0.0,  0.0); v[1] = vec3(-1.0,  0.0,  0.0);
    v[2] = vec3( 0.0,  1.0,  0.0); v[3] = vec3( 0.0, -1.0,  0.0);
    v[4] = vec3( 0.0,  0.0,  1.0); v[5] = vec3( 0.0,  0.0, -1.0);
}

void getIcosahedronVertices(out vec3 v[12]) {
    float t = (1.0 + sqrt(5.0)) / 2.0;
    float s = 1.0 / sqrt(1.0 + t * t);
    v[0] = vec3(-s, t * s, 0.0);  v[1] = vec3( s, t * s, 0.0);
    v[2] = vec3(-s, -t * s, 0.0); v[3] = vec3( s, -t * s, 0.0);
    v[4] = vec3(0.0, -s, t * s);  v[5] = vec3(0.0,  s, t * s);
    v[6] = vec3(0.0, -s, -t * s); v[7] = vec3(0.0,  s, -t * s);
    v[8] = vec3( t * s, 0.0, -s); v[9] = vec3( t * s, 0.0,  s);
    v[10] = vec3(-t * s, 0.0, -s); v[11] = vec3(-t * s, 0.0,  s);
}

float drawWireframe(vec2 p, int shape, mat3 rotation, float scale, float thickness, float blur) {
    float result = 0.0;

    if (shape == 0) {
        vec3 v[8];
        getCubeVertices(v);
        for (int i = 0; i < 8; i++) { v[i] = rotation * (v[i] * scale); }
        result += drawLine(p, project(v[0]), project(v[1]), thickness, blur);
        result += drawLine(p, project(v[1]), project(v[2]), thickness, blur);
        result += drawLine(p, project(v[2]), project(v[3]), thickness, blur);
        result += drawLine(p, project(v[3]), project(v[0]), thickness, blur);
        result += drawLine(p, project(v[4]), project(v[5]), thickness, blur);
        result += drawLine(p, project(v[5]), project(v[6]), thickness, blur);
        result += drawLine(p, project(v[6]), project(v[7]), thickness, blur);
        result += drawLine(p, project(v[7]), project(v[4]), thickness, blur);
        result += drawLine(p, project(v[0]), project(v[4]), thickness, blur);
        result += drawLine(p, project(v[1]), project(v[5]), thickness, blur);
        result += drawLine(p, project(v[2]), project(v[6]), thickness, blur);
        result += drawLine(p, project(v[3]), project(v[7]), thickness, blur);
    } else if (shape == 2) {
        vec3 v[6];
        getOctahedronVertices(v);
        for (int i = 0; i < 6; i++) { v[i] = rotation * (v[i] * scale); }
        result += drawLine(p, project(v[2]), project(v[0]), thickness, blur);
        result += drawLine(p, project(v[2]), project(v[1]), thickness, blur);
        result += drawLine(p, project(v[2]), project(v[4]), thickness, blur);
        result += drawLine(p, project(v[2]), project(v[5]), thickness, blur);
        result += drawLine(p, project(v[3]), project(v[0]), thickness, blur);
        result += drawLine(p, project(v[3]), project(v[1]), thickness, blur);
        result += drawLine(p, project(v[3]), project(v[4]), thickness, blur);
        result += drawLine(p, project(v[3]), project(v[5]), thickness, blur);
        result += drawLine(p, project(v[0]), project(v[4]), thickness, blur);
        result += drawLine(p, project(v[4]), project(v[1]), thickness, blur);
        result += drawLine(p, project(v[1]), project(v[5]), thickness, blur);
        result += drawLine(p, project(v[5]), project(v[0]), thickness, blur);
    } else {
        // Icosahedron - 30 edges (default)
        vec3 v[12];
        getIcosahedronVertices(v);
        for (int i = 0; i < 12; i++) { v[i] = rotation * (v[i] * scale); }
        result += drawLine(p, project(v[0]), project(v[1]), thickness, blur);
        result += drawLine(p, project(v[0]), project(v[5]), thickness, blur);
        result += drawLine(p, project(v[0]), project(v[7]), thickness, blur);
        result += drawLine(p, project(v[0]), project(v[10]), thickness, blur);
        result += drawLine(p, project(v[0]), project(v[11]), thickness, blur);
        result += drawLine(p, project(v[1]), project(v[5]), thickness, blur);
        result += drawLine(p, project(v[1]), project(v[7]), thickness, blur);
        result += drawLine(p, project(v[1]), project(v[8]), thickness, blur);
        result += drawLine(p, project(v[1]), project(v[9]), thickness, blur);
        result += drawLine(p, project(v[2]), project(v[3]), thickness, blur);
        result += drawLine(p, project(v[2]), project(v[4]), thickness, blur);
        result += drawLine(p, project(v[2]), project(v[6]), thickness, blur);
        result += drawLine(p, project(v[2]), project(v[10]), thickness, blur);
        result += drawLine(p, project(v[2]), project(v[11]), thickness, blur);
        result += drawLine(p, project(v[3]), project(v[4]), thickness, blur);
        result += drawLine(p, project(v[3]), project(v[6]), thickness, blur);
        result += drawLine(p, project(v[3]), project(v[8]), thickness, blur);
        result += drawLine(p, project(v[3]), project(v[9]), thickness, blur);
        result += drawLine(p, project(v[4]), project(v[5]), thickness, blur);
        result += drawLine(p, project(v[4]), project(v[11]), thickness, blur);
        result += drawLine(p, project(v[5]), project(v[11]), thickness, blur);
        result += drawLine(p, project(v[6]), project(v[7]), thickness, blur);
        result += drawLine(p, project(v[6]), project(v[8]), thickness, blur);
        result += drawLine(p, project(v[6]), project(v[10]), thickness, blur);
        result += drawLine(p, project(v[7]), project(v[10]), thickness, blur);
        result += drawLine(p, project(v[8]), project(v[9]), thickness, blur);
        result += drawLine(p, project(v[9]), project(v[11]), thickness, blur);
        result += drawLine(p, project(v[10]), project(v[11]), thickness, blur);
    }

    return clamp(result, 0.0, 1.0);
}

vec4 render(vec2 st, vec2 mouse) {
    float mouseDistance = length(st - mouse);
    float mouseInfluence = 1.0 - smoothstep(0.0, 0.5, mouseDistance);

    float time = u_time * 0.2;
    mat3 rotation = rotateY(time + (mouse.x - 0.5) * mouseInfluence) *
                    rotateX(time * 0.7 + (mouse.y - 0.5) * mouseInfluence) *
                    rotateZ(time * 0.1);

    float scale = 0.35;
    float blur = mix(0.0001, 0.05, mouseInfluence);
    float thickness = mix(0.0022, 0.0032, mouseInfluence);

    float shape = drawWireframe(st, u_shape, rotation, scale, thickness, blur);

    // Warm cream lines to match the site palette
    vec3 color = vec3(0.94, 0.89, 0.79);
    color = pow(color, vec3(0.9));

    // Soften near the cursor; gentle vignette for depth
    float dimming = 1.0 - mouseInfluence * 0.3;
    float vignette = 1.0 - length(st) * 0.25;

    // Transparent gaps: alpha follows the line intensity
    float alpha = shape * dimming * vignette;
    return vec4(color, clamp(alpha, 0.0, 1.0));
}

void main() {
    vec2 st = coord(gl_FragCoord.xy);
    vec2 mouse = coord(u_mouse * u_pixelRatio) * vec2(1.0, -1.0);
    gl_FragColor = render(st, mouse);
}
`;

const vertexShader = `
attribute vec3 a_position;
void main() {
    gl_Position = vec4(a_position, 1.0);
}
`;

export type WireframeShape = 'cube' | 'octahedron' | 'icosahedron';

const SHAPE_INDEX: Record<WireframeShape, number> = {
  cube: 0,
  octahedron: 2,
  icosahedron: 3,
};

interface GeometricWireframeProps {
  shape?: WireframeShape;
  className?: string;
}

export function GeometricWireframe({ shape = 'icosahedron', className }: GeometricWireframeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const mouseDampRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const gl = canvas.getContext('webgl', {
      antialias: true,
      alpha: true,
      premultipliedAlpha: false,
    });
    if (!gl) return;

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.clearColor(0.0, 0.0, 0.0, 0.0);

    const createShader = (type: number, source: string) => {
      const s = gl.createShader(type);
      if (!s) return null;
      gl.shaderSource(s, source);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        gl.deleteShader(s);
        return null;
      }
      return s;
    };

    const vShader = createShader(gl.VERTEX_SHADER, vertexShader);
    const fShader = createShader(gl.FRAGMENT_SHADER, fragmentShader);
    if (!vShader || !fShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vShader);
    gl.attachShader(program, fShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const uniforms = {
      u_mouse: gl.getUniformLocation(program, 'u_mouse'),
      u_resolution: gl.getUniformLocation(program, 'u_resolution'),
      u_pixelRatio: gl.getUniformLocation(program, 'u_pixelRatio'),
      u_time: gl.getUniformLocation(program, 'u_time'),
      u_shape: gl.getUniformLocation(program, 'u_shape'),
    };

    const vertices = new Float32Array([-1, -1, 0, 1, -1, 0, -1, 1, 0, 1, 1, 0]);
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    const positionLocation = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(container);

    const handlePointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    window.addEventListener('pointermove', handlePointer);

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (uniforms.u_shape) gl.uniform1i(uniforms.u_shape, SHAPE_INDEX[shape]);

    let raf = 0;
    const start = performance.now();
    let lastTime = start;

    const renderFrame = (now: number, elapsed: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      mouseDampRef.current.x += (mouseRef.current.x - mouseDampRef.current.x) * 8 * dt;
      mouseDampRef.current.y += (mouseRef.current.y - mouseDampRef.current.y) * 8 * dt;

      gl.clear(gl.COLOR_BUFFER_BIT);
      if (uniforms.u_mouse) gl.uniform2f(uniforms.u_mouse, mouseDampRef.current.x, mouseDampRef.current.y);
      if (uniforms.u_resolution) gl.uniform2f(uniforms.u_resolution, canvas.width, canvas.height);
      if (uniforms.u_pixelRatio) gl.uniform1f(uniforms.u_pixelRatio, dpr);
      if (uniforms.u_time) gl.uniform1f(uniforms.u_time, elapsed);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    if (reduceMotion) {
      // Hold a single, pleasant still frame
      renderFrame(start, 4.0);
    } else {
      const loop = (now: number) => {
        renderFrame(now, (now - start) / 1000);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    }

    return () => {
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('pointermove', handlePointer);
      gl.deleteProgram(program);
      gl.deleteShader(vShader);
      gl.deleteShader(fShader);
    };
  }, [shape]);

  return (
    <div ref={containerRef} className={className} aria-hidden="true">
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
    </div>
  );
}
