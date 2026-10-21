import { useEffect, useRef } from "react";
import * as THREE from "three";

const bgVert = `
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

const bgFrag = `
    #ifdef GL_FRAGMENT_PRECISION_HIGH
        precision highp float;
    #else
        precision mediump float;
    #endif

    #define GLSLIFY 1
    #define PI 3.14159265359
    #define PI2 6.28318530718

    uniform float time;
    uniform float pt;
    uniform float st;
    uniform sampler2D tex;
    uniform vec2 ps;
    uniform float r;
    uniform float fc;
    uniform vec2 vc1;
    uniform vec2 vc2;
    uniform vec2 vc3;
    uniform vec4 c1;
    uniform vec4 c2;
    varying vec2 vUv;

    float rand(vec2 co) {
        float a = fract(sin(dot(co, vec2(127.1, 311.7))) * 43758.5453);
        float b = fract(sin(dot(co, vec2(269.5, 183.3))) * 43758.5453);
        return fract(a + b);
    }

    float ns(vec2 p) {
        vec2 ip = floor(p);
        vec2 u = fract(p);
        u = u * u * (3.0 - 2.0 * u);
        float res = mix(
            mix(rand(ip), rand(ip + vec2(1.0, 0.0)), u.x),
            mix(rand(ip + vec2(0.0, 1.0)), rand(ip + vec2(1.0, 1.0)), u.x),
            u.y
        );
        return res * res;
    }

    float ub(vec2 p, vec2 b, float r) {
        return length(max(abs(p) - b + r, 0.0)) - r;
    }

    vec4 la(vec4 frg, vec4 bc) {
        return frg * frg.a + bc * (1.0 - frg.a);
    }

    float aastep(float threshold, float value) {
        float afwidth = 0.001;
        return smoothstep(threshold - afwidth, threshold + afwidth, value);
    }

    float stableAtan2(float y, float x) {
        float ax = abs(x);
        float ay = abs(y);
        float a = min(ax, ay) / (max(ax, ay) + 0.000001);
        float s = a * a;
        float r = ((-0.0464964749 * s + 0.15931422) * s - 0.327622764) * s * a + a;
        if (ay > ax) r = 1.5707963268 - r;
        if (x < 0.0) r = PI - r;
        if (y < 0.0) r = -r;
        return r;
    }

    float sw(vec2 pt, vec2 center, float radius, float line_width, float edge_thickness, float side) {
        vec2 d = pt - center;
        float theta = time * 0.25 * side;
        vec2 p = vec2(cos(theta), -sin(theta)) * radius;
        float h = clamp(dot(d, p) / (dot(p, p) + 0.000001), 0.0, 1.0);
        float l = length(d - p * h);
        float gradient = 0.0;
        const float gradient_angle = PI * 0.25;
        if (length(d) < radius) {
            float angle = mod(theta + stableAtan2(d.y, d.x), PI2);
            gradient = clamp(gradient_angle - angle, 0.0, gradient_angle) / gradient_angle * 0.5;
        }
        return gradient + 1.0 - smoothstep(line_width, line_width + edge_thickness, l);
    }

    void main() {
        vec2 m = vUv;
        vec2 m2 = vUv;
        vec4 n = texture2D(tex, vUv);
        float z = n.r * 2.0 * PI;
        vec2 dr = vec2(sin(z));
        vec2 uv = vUv + dr * n.r * 0.1;
        float d1 = distance(uv, vc1);
        float d2 = distance(uv, vc2);
        float d3 = distance(uv, vc3);
        float gr = mix(-0.2, 0.2, rand(uv + sin(time)));
        vec2 mv = vec2(time * 0.05, time * -0.05);
        float f = ns((uv * d1 * 2.0) + mv);
        f += ns((uv * d2 * 2.5) + vec2(time * -0.075, time * 0.05));
        f += gr;
        f = smoothstep(0.0, 2.0, f);
        float mx = smoothstep(0.0, 0.1, f) - smoothstep(0.5, 1.0, f);
        vec4 color = mix(c1, c2, f);
        float nPt = min(2.0 * pt, 2.0 * (1.0 - pt));
        float u = 0.3 * sin(m.x * PI + 0.25) * nPt;
        float d = -0.3 * sin(m.x * PI + 0.25) * nPt;
        m.y -= mix(u, d, st);
        float ft = step(m.y, pt);
        vec2 rs = ps * (0.5 - vec2(fc * 0.35, fc));
        vec2 rs2 = ps * (0.5 - vec2(fc * 0.35, fc));
        float ra = r;
        vec2 yl = vUv;
        yl.y += 0.002;
        yl.x += 0.00125;
        float cr = ub(((vUv - vec2(fc * 0.35, fc * 0.75)) * ps) - rs, rs, ra);
        float cr2 = ub(((yl - vec2(fc * 0.35, fc * 0.75)) * vec2(ps.x * 0.99725, ps.y * 0.995)) - rs2, rs2, ra);
        cr = clamp(cr, 0.0, 1.0);
        cr2 = clamp(cr2, 0.0, 1.0);
        vec4 s1 = mix(color, vec4(0.0, 0.0, 0.0, 1.0), ft);

        vec3 brcl = vec3(6.0 / 255.0, 11.0 / 255.0, 24.0 / 255.0);
        brcl += sw(yl, vec2(0.5), 1.5, 0.002, 0.008, 1.0) * vec3(40.0 / 255.0, 80.0 / 255.0, 160.0 / 255.0);
        
        vec4 final = mix(s1, la(mix(vec4(brcl, 1.0), vec4(0.0), cr2), vec4(0.0, 0.0, 0.0, 1.0)), cr);
        float alpha = 1.0;
        float cut = 0.001;
        alpha *= aastep(cut, m2.x);
        alpha *= 1.0 - aastep(1.0 - cut, m2.x);
        alpha *= aastep(cut, m2.y);
        alpha *= 1.0 - aastep(1.0 - cut, m2.y);
        gl_FragColor = vec4(final.rgb, alpha);
    }
`;

export default function Background({
  noiseUrl = "/assets/noise.jpeg",
  className = "",
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const getViewport = () => {
      const w = Math.max(
        1,
        Math.round(canvas.clientWidth || window.innerWidth),
      );
      const h = Math.max(
        1,
        Math.round(canvas.clientHeight || window.innerHeight),
      );
      return { w, h };
    };

    let { w: W, h: H } = getViewport();

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "default",
    });

    const pixelRatio = Math.min(window.devicePixelRatio, 2);
    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(W, H, false);
    renderer.autoClear = false;
    renderer.outputColorSpace = THREE.LinearSRGBColorSpace;

    const dispScene = new THREE.Scene();
    const bgScene = new THREE.Scene();
    const cam = new THREE.OrthographicCamera(
      -W / 2,
      W / 2,
      H / 2,
      -H / 2,
      -100,
      100,
    );

    const fbo = new THREE.WebGLRenderTarget(
      Math.round(W * pixelRatio),
      Math.round(H * pixelRatio),
      {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBAFormat,
        type: THREE.UnsignedByteType,
      },
    );

    const noiseTex = new THREE.TextureLoader().load(noiseUrl);
    noiseTex.wrapS = noiseTex.wrapT = THREE.RepeatWrapping;
    noiseTex.colorSpace = THREE.LinearSRGBColorSpace;

    const maskCanvas = document.createElement("canvas");
    maskCanvas.width = maskCanvas.height = 128;
    const maskCtx = maskCanvas.getContext("2d");
    if (maskCtx) {
      const g = maskCtx.createRadialGradient(64, 64, 0, 64, 64, 64);
      g.addColorStop(0, "rgba(255,255,255,1)");
      g.addColorStop(0.5, "rgba(255,255,255,1)");
      g.addColorStop(1, "rgba(0,0,0,0)");
      maskCtx.fillStyle = g;
      maskCtx.fillRect(0, 0, 128, 128);
    }
    const circleMask = new THREE.CanvasTexture(maskCanvas);
    circleMask.minFilter = THREE.LinearFilter;
    circleMask.magFilter = THREE.LinearFilter;

    const TOTAL = 100;
    const smokeGeo = new THREE.PlaneGeometry(95, 99);
    const dispM = [];
    let curSmoke = 0;

    for (let i = 0; i < TOTAL; i++) {
      const m = new THREE.Mesh(
        smokeGeo,
        new THREE.MeshBasicMaterial({
          map: noiseTex,
          alphaMap: circleMask,
          transparent: true,
          blending: THREE.AdditiveBlending,
          depthTest: false,
          depthWrite: false,
        }),
      );
      m.visible = false;
      dispM.push(m);
      dispScene.add(m);
    }

    function spawnSmoke(x, y, idx) {
      const n = dispM[idx];
      n.visible = true;
      n.scale.x = 0.1;
      n.scale.y = 0.1;
      n.rotation.x = 0;
      n.rotation.y = 0;
      n.rotation.z = Math.random() * Math.PI * 2;
      n.position.x = x - 0.9;
      n.position.y = y;
      n.material.opacity = 0.8;
    }

    const bgMat = new THREE.ShaderMaterial({
      extensions: { derivatives: true },
      uniforms: {
        time: { value: 0 },
        tex: { value: null },
        pt: { value: 0 },
        st: { value: 0 },
        ps: { value: new THREE.Vector2(W, H) },
        r: { value: 0 },
        fc: { value: 0 },
        vc1: { value: new THREE.Vector2(0.5, 0.5) },
        vc2: { value: new THREE.Vector2(0, 1) },
        vc3: { value: new THREE.Vector2(1, 0) },
        c1: { value: new THREE.Vector4(0.02, 0.035, 0.08, 1.0) },
        c2: { value: new THREE.Vector4(0.08, 0.16, 0.35, 0.85) },
      },
      transparent: true,
      vertexShader: bgVert,
      fragmentShader: bgFrag,
    });

    const bgMesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), bgMat);
    bgMesh.scale.set(W, H, 1);
    bgScene.add(bgMesh);

    const mouse = new THREE.Vector2();
    const prevMouse = new THREE.Vector2();

    const onMouseMove = (e) => {
      mouse.x = e.clientX - W / 2;
      mouse.y = H / 2 - e.clientY;
    };
    window.addEventListener("mousemove", onMouseMove, { capture: true });

    let time = 0;
    let rafId = 0;
    let running = true;

    const applySize = (nw, nh) => {
      if (nw === W && nh === H) return;
      W = nw;
      H = nh;
      renderer.setSize(W, H, false);
      fbo.setSize(Math.round(W * pixelRatio), Math.round(H * pixelRatio));
      cam.left = -W / 2;
      cam.right = W / 2;
      cam.top = H / 2;
      cam.bottom = -H / 2;
      cam.updateProjectionMatrix();
      bgMesh.scale.set(W, H, 1);
      bgMat.uniforms.ps.value.set(W, H);
    };

    const tick = () => {
      if (!running) return;
      rafId = requestAnimationFrame(tick);
      time += 0.016;

      if (
        Math.abs(mouse.x - prevMouse.x) >= 1 ||
        Math.abs(mouse.y - prevMouse.y) >= 1
      ) {
        curSmoke = (curSmoke + 1) % TOTAL;
        spawnSmoke(mouse.x, mouse.y, curSmoke);
      }
      prevMouse.copy(mouse);

      for (const m of dispM) {
        if (!m.visible) continue;
        m.rotation.z += 0.008;
        const mat = m.material;
        mat.opacity *= 0.975;
        if (mat.opacity < 0.002) {
          m.visible = false;
          continue;
        }
        m.scale.x = 0.975 * m.scale.x + 0.08;
        m.scale.y = m.scale.x;
      }

      renderer.setRenderTarget(fbo);
      renderer.clear();
      renderer.render(dispScene, cam);

      bgMat.uniforms.tex.value = fbo.texture;
      bgMat.uniforms.time.value = time;

      renderer.setRenderTarget(null);
      renderer.clear();
      renderer.render(bgScene, cam);
    };
    tick();

    const onResize = () => {
      const { w, h } = getViewport();
      applySize(w, h);
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);

    const ro = new ResizeObserver(onResize);
    ro.observe(canvas);

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove, { capture: true });
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
      ro.disconnect();

      dispM.forEach((m) => m.material.dispose());
      smokeGeo.dispose();
      bgMesh.geometry.dispose();
      bgMat.dispose();
      circleMask.dispose();
      noiseTex.dispose();
      fbo.dispose();
      renderer.dispose();
    };
  }, [noiseUrl]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none fixed inset-x-0 top-0 z-0 h-screen w-full ${className}`}
    />
  );
}
