import { useEffect, useRef } from 'react';

/**
 * Decorative WebGL wireframe figure - a slowly rotating polyhedron drawn as
 * thin lines, recolored to the site's warm cream palette and rendered on a
 * transparent canvas so it layers over whatever surface it sits on.
 *
 * Adapted from a public 21st.dev shader. Stripped of the original demo's
 * click/keyboard shape-switching and on-screen labels: here it's a single
 * fixed shape. Edges fade and thin with depth so the solid reads as a volume,
 * and the cursor acts as a focusing field - nearby lines sharpen and brighten
 * while the geometry bends away and springs back as the damped pointer
 * settles (resilient, next to the "What shaped me" story, not dissolving).
 * On first entering the viewport the vertices assemble from a scattered
 * cloud into the solid over ~2.4s (staggered per vertex, edges knitting to
 * full strength as their endpoints arrive) and stay built from then on -
 * built from scratch, holding its shape. Reduced motion skips straight to
 * the formed state.
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

// Cursor field, set once per fragment in render(). Projected vertices bend
// away from the pointer; because the mouse uniform is damped on the JS side,
// releasing the cursor lets the geometry ease back into true form.
vec2 g_mouse;

// Formation progress (0 = scattered cloud, 1 = true solid), derived from
// u_time in render(). Elapsed time only accumulates while the canvas is on
// screen and starts at 0 on first visibility, so the figure assembles itself
// the first time the reader reaches it and stays built from then on.
float g_form;

float hash(float n) {
    return fract(sin(n * 127.1 + 311.7) * 43758.5453);
}

// Where vertex i waits before the figure forms: a loose shell just outside
// the finished solid, a different direction and radius per vertex. The
// canvas only shows ~1.43 units at the figure's scale, so the shell must
// stay inside that or the forming cloud plays out off screen.
vec3 scatterPos(float i) {
    vec3 dir = vec3(hash(i) * 2.0 - 1.0, hash(i + 19.0) * 2.0 - 1.0, hash(i + 47.0) * 2.0 - 1.0);
    return normalize(dir + 0.001) * (0.9 + hash(i + 73.0) * 0.4);
}

// Per-vertex arrival, staggered so the solid knits together piece by piece
// instead of snapping in as one move.
float formProgress(float i) {
    float stagger = 0.5;
    float t = clamp(g_form * (1.0 + stagger) - hash(i + 5.0) * stagger, 0.0, 1.0);
    return t * t * (3.0 - 2.0 * t);
}

vec2 repel(vec2 q) {
    vec2 d = q - g_mouse;
    float dist = length(d);
    // Kept subtle: it layers on the per-fragment rotation drift in render(),
    // and together they overwhelm the figure if the push is any stronger.
    float push = (1.0 - smoothstep(0.0, 0.35, dist)) * 0.02;
    return q + d / max(dist, 0.001) * push;
}

// One 3D edge: project the endpoints, bend them in the cursor field, then
// shade by depth along the segment - far edges thin and fade, near edges
// read full strength - so the solid keeps its volume instead of flattening
// into a tangle of equal lines.
float drawEdge(vec2 p, vec3 a, vec3 b, float fa, float fb, float scale, float thickness, float blur) {
    vec2 a2 = repel(project(a));
    vec2 b2 = repel(project(b));
    vec2 pa = p - a2;
    vec2 ba = b2 - a2;
    float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
    float d = length(pa - ba * h);
    float z = mix(a.z, b.z, h);
    float persp = 2.0 / (2.0 - z);
    float line = smoothstep(thickness * persp + blur, thickness * persp - blur, d);
    float depth = clamp(z / scale, -1.0, 1.0) * 0.5 + 0.5;
    // While forming, edges run faint between the drifting endpoints and only
    // reach full strength once both have arrived.
    float knit = mix(0.25, 1.0, fa * fb);
    return line * mix(0.3, 1.0, depth) * knit;
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
        float f[8];
        getCubeVertices(v);
        for (int i = 0; i < 8; i++) {
            f[i] = formProgress(float(i));
            v[i] = rotation * (mix(scatterPos(float(i)), v[i], f[i]) * scale);
        }
        result += drawEdge(p, v[0], v[1], f[0], f[1], scale, thickness, blur);
        result += drawEdge(p, v[1], v[2], f[1], f[2], scale, thickness, blur);
        result += drawEdge(p, v[2], v[3], f[2], f[3], scale, thickness, blur);
        result += drawEdge(p, v[3], v[0], f[3], f[0], scale, thickness, blur);
        result += drawEdge(p, v[4], v[5], f[4], f[5], scale, thickness, blur);
        result += drawEdge(p, v[5], v[6], f[5], f[6], scale, thickness, blur);
        result += drawEdge(p, v[6], v[7], f[6], f[7], scale, thickness, blur);
        result += drawEdge(p, v[7], v[4], f[7], f[4], scale, thickness, blur);
        result += drawEdge(p, v[0], v[4], f[0], f[4], scale, thickness, blur);
        result += drawEdge(p, v[1], v[5], f[1], f[5], scale, thickness, blur);
        result += drawEdge(p, v[2], v[6], f[2], f[6], scale, thickness, blur);
        result += drawEdge(p, v[3], v[7], f[3], f[7], scale, thickness, blur);
    } else if (shape == 2) {
        vec3 v[6];
        float f[6];
        getOctahedronVertices(v);
        for (int i = 0; i < 6; i++) {
            f[i] = formProgress(float(i));
            v[i] = rotation * (mix(scatterPos(float(i)), v[i], f[i]) * scale);
        }
        result += drawEdge(p, v[2], v[0], f[2], f[0], scale, thickness, blur);
        result += drawEdge(p, v[2], v[1], f[2], f[1], scale, thickness, blur);
        result += drawEdge(p, v[2], v[4], f[2], f[4], scale, thickness, blur);
        result += drawEdge(p, v[2], v[5], f[2], f[5], scale, thickness, blur);
        result += drawEdge(p, v[3], v[0], f[3], f[0], scale, thickness, blur);
        result += drawEdge(p, v[3], v[1], f[3], f[1], scale, thickness, blur);
        result += drawEdge(p, v[3], v[4], f[3], f[4], scale, thickness, blur);
        result += drawEdge(p, v[3], v[5], f[3], f[5], scale, thickness, blur);
        result += drawEdge(p, v[0], v[4], f[0], f[4], scale, thickness, blur);
        result += drawEdge(p, v[4], v[1], f[4], f[1], scale, thickness, blur);
        result += drawEdge(p, v[1], v[5], f[1], f[5], scale, thickness, blur);
        result += drawEdge(p, v[5], v[0], f[5], f[0], scale, thickness, blur);
    } else {
        // Icosahedron - 30 edges (default)
        vec3 v[12];
        float f[12];
        getIcosahedronVertices(v);
        for (int i = 0; i < 12; i++) {
            f[i] = formProgress(float(i));
            v[i] = rotation * (mix(scatterPos(float(i)), v[i], f[i]) * scale);
        }
        result += drawEdge(p, v[0], v[1], f[0], f[1], scale, thickness, blur);
        result += drawEdge(p, v[0], v[5], f[0], f[5], scale, thickness, blur);
        result += drawEdge(p, v[0], v[7], f[0], f[7], scale, thickness, blur);
        result += drawEdge(p, v[0], v[10], f[0], f[10], scale, thickness, blur);
        result += drawEdge(p, v[0], v[11], f[0], f[11], scale, thickness, blur);
        result += drawEdge(p, v[1], v[5], f[1], f[5], scale, thickness, blur);
        result += drawEdge(p, v[1], v[7], f[1], f[7], scale, thickness, blur);
        result += drawEdge(p, v[1], v[8], f[1], f[8], scale, thickness, blur);
        result += drawEdge(p, v[1], v[9], f[1], f[9], scale, thickness, blur);
        result += drawEdge(p, v[2], v[3], f[2], f[3], scale, thickness, blur);
        result += drawEdge(p, v[2], v[4], f[2], f[4], scale, thickness, blur);
        result += drawEdge(p, v[2], v[6], f[2], f[6], scale, thickness, blur);
        result += drawEdge(p, v[2], v[10], f[2], f[10], scale, thickness, blur);
        result += drawEdge(p, v[2], v[11], f[2], f[11], scale, thickness, blur);
        result += drawEdge(p, v[3], v[4], f[3], f[4], scale, thickness, blur);
        result += drawEdge(p, v[3], v[6], f[3], f[6], scale, thickness, blur);
        result += drawEdge(p, v[3], v[8], f[3], f[8], scale, thickness, blur);
        result += drawEdge(p, v[3], v[9], f[3], f[9], scale, thickness, blur);
        result += drawEdge(p, v[4], v[5], f[4], f[5], scale, thickness, blur);
        result += drawEdge(p, v[4], v[11], f[4], f[11], scale, thickness, blur);
        result += drawEdge(p, v[5], v[11], f[5], f[11], scale, thickness, blur);
        result += drawEdge(p, v[6], v[7], f[6], f[7], scale, thickness, blur);
        result += drawEdge(p, v[6], v[8], f[6], f[8], scale, thickness, blur);
        result += drawEdge(p, v[6], v[10], f[6], f[10], scale, thickness, blur);
        result += drawEdge(p, v[7], v[10], f[7], f[10], scale, thickness, blur);
        result += drawEdge(p, v[8], v[9], f[8], f[9], scale, thickness, blur);
        result += drawEdge(p, v[9], v[11], f[9], f[11], scale, thickness, blur);
        result += drawEdge(p, v[10], v[11], f[10], f[11], scale, thickness, blur);
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

    g_mouse = mouse;

    // First ~2.4s on screen: scattered cloud converges into the true solid.
    // Smoothstep pacing (not ease-out) so the cloud lingers long enough to
    // read before it gathers. u_time never rewinds (it accumulates only
    // while visible), so the figure builds once and stays built.
    float ft = clamp(u_time / 2.4, 0.0, 1.0);
    g_form = ft * ft * (3.0 - 2.0 * ft);

    // Attention focuses the figure: at rest the lines carry a faint softness,
    // and near the cursor they sharpen, thicken and brighten instead of
    // dissolving - pressure resolves the shape rather than unmaking it.
    float scale = 0.35;
    float blur = mix(0.003, 0.0006, mouseInfluence);
    float thickness = mix(0.0022, 0.0032, mouseInfluence);

    float shape = drawWireframe(st, u_shape, rotation, scale, thickness, blur);

    // Warm cream lines to match the site palette
    vec3 color = vec3(0.94, 0.89, 0.79);
    color = pow(color, vec3(0.9));

    float focus = 1.0 + mouseInfluence * 0.25;
    float vignette = 1.0 - length(st) * 0.25;

    // Transparent gaps: alpha follows the line intensity. Premultiplied
    // output (color * alpha) so the browser composites intermediate alphas
    // linearly - with a straight-alpha buffer it multiplies by alpha twice,
    // crushing the depth fades and the faint formation web to ~alpha^2.
    float alpha = clamp(shape * focus * vignette, 0.0, 1.0);
    return vec4(color * alpha, alpha);
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
      premultipliedAlpha: true,
    });
    if (!gl) return;

    gl.enable(gl.BLEND);
    // Shader outputs premultiplied color, so source blends at ONE
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
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
      if (uniforms.u_mouse)
        gl.uniform2f(uniforms.u_mouse, mouseDampRef.current.x, mouseDampRef.current.y);
      if (uniforms.u_resolution) gl.uniform2f(uniforms.u_resolution, canvas.width, canvas.height);
      if (uniforms.u_pixelRatio) gl.uniform1f(uniforms.u_pixelRatio, dpr);
      if (uniforms.u_time) gl.uniform1f(uniforms.u_time, elapsed);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    let io: IntersectionObserver | undefined;
    if (reduceMotion) {
      // Hold a single, pleasant still frame
      renderFrame(start, 4.0);
    } else {
      // Run the WebGL loop only while the canvas is in the viewport. The
      // wireframe sits mid-page, so an ungated loop burns GPU/CPU for the
      // whole scroll life of the page. Elapsed time accumulates only while
      // running, so the shape resumes exactly where it paused.
      let elapsedBase = 0;
      let runStart = start;
      let running = false;

      const loop = (now: number) => {
        renderFrame(now, elapsedBase + (now - runStart) / 1000);
        raf = requestAnimationFrame(loop);
      };
      const startLoop = () => {
        if (running) return;
        running = true;
        runStart = performance.now();
        lastTime = runStart;
        raf = requestAnimationFrame(loop);
      };
      const stopLoop = () => {
        if (!running) return;
        running = false;
        elapsedBase += (performance.now() - runStart) / 1000;
        cancelAnimationFrame(raf);
        raf = 0;
      };

      io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? startLoop() : stopLoop()));
      io.observe(container);
    }

    return () => {
      if (raf) cancelAnimationFrame(raf);
      io?.disconnect();
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
