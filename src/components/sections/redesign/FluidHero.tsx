"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * 流动的意识 · 流体 shader 背景。
 * 全屏单平面 + 自定义 fragment shader：域扭曲的 fbm 噪声做缓慢流动的发光流体，
 * 暖黑底 + 靛蓝/暖金的呼吸光色。性能：限制像素比、单 pass、离开视口暂停、卸载清理。
 * WebGL 创建失败时调用 onError，由父组件回退到静态 .aura。
 */
export default function FluidHero({ onError }: { onError?: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false });
    } catch {
      onError?.();
      return;
    }
    // 像素比上限 2，控成本
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const uniforms = {
      u_time: { value: 0 },
      u_res: { value: new THREE.Vector2(1, 1) },
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: /* glsl */ `
        void main() { gl_Position = vec4(position, 1.0); }
      `,
      fragmentShader: /* glsl */ `
        precision highp float;
        uniform float u_time;
        uniform vec2 u_res;

        // 哈希 + 值噪声
        float hash(vec2 p){
          p = fract(p * vec2(123.34, 456.21));
          p += dot(p, p + 45.32);
          return fract(p.x * p.y);
        }
        float noise(vec2 p){
          vec2 i = floor(p); vec2 f = fract(p);
          vec2 u = f * f * (3.0 - 2.0 * f);
          float a = hash(i);
          float b = hash(i + vec2(1.0, 0.0));
          float c = hash(i + vec2(0.0, 1.0));
          float d = hash(i + vec2(1.0, 1.0));
          return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
        }
        float fbm(vec2 p){
          float v = 0.0; float amp = 0.5;
          for(int i = 0; i < 5; i++){
            v += amp * noise(p);
            p *= 2.0; amp *= 0.5;
          }
          return v;
        }

        void main(){
          vec2 uv = gl_FragCoord.xy / u_res.xy;
          float aspect = u_res.x / u_res.y;
          vec2 p = uv; p.x *= aspect;

          float t = u_time * 0.05;
          // 域扭曲：用一层 fbm 偏移另一层，得到流动感
          vec2 q = vec2(fbm(p + vec2(0.0, t)), fbm(p + vec2(5.2, -t)));
          vec2 r = vec2(fbm(p + 1.7 * q + vec2(8.3, 2.8)), fbm(p + 1.7 * q + vec2(2.1, 6.5)));
          float f = fbm(p + 2.0 * r);

          // 呼吸
          float breathe = 0.5 + 0.5 * sin(u_time * 0.25);

          vec3 ink = vec3(0.043, 0.039, 0.051);   // 暖黑 #0b0a0d
          vec3 indigo = vec3(0.18, 0.20, 0.55);   // 靛蓝
          vec3 gold = vec3(0.965, 0.757, 0.467);  // 暖金 #f6c177

          vec3 col = ink;
          col = mix(col, indigo, smoothstep(0.35, 0.95, f) * 0.55);
          col = mix(col, gold, pow(f, 3.0) * (0.45 + 0.35 * breathe));

          // 中心柔光晕
          float d = distance(uv, vec2(0.5, 0.45));
          col += gold * (1.0 - smoothstep(0.0, 0.7, d)) * 0.06 * (0.6 + 0.4 * breathe);

          // 暗角
          col *= 1.0 - 0.25 * smoothstep(0.4, 1.1, d);
          gl_FragColor = vec4(col, 1.0);
        }
      `,
    });

    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(quad);

    const resize = () => {
      const w = canvas.clientWidth || window.innerWidth;
      const h = canvas.clientHeight || window.innerHeight;
      renderer.setSize(w, h, false);
      uniforms.u_res.value.set(w * renderer.getPixelRatio(), h * renderer.getPixelRatio());
    };
    resize();
    window.addEventListener("resize", resize);

    // 离开视口暂停
    let visible = true;
    const io = new IntersectionObserver(
      (entries) => { visible = entries[0]?.isIntersecting ?? true; },
      { threshold: 0 }
    );
    io.observe(canvas);

    const start = performance.now();
    let raf = 0;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!visible) return;
      uniforms.u_time.value = (performance.now() - start) / 1000;
      renderer.render(scene, camera);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      io.disconnect();
      quad.geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [onError]);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />;
}
