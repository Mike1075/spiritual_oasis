// 梦核(dreamcore)氛围背景:紫粉光斑 + VHS 噪点 + 扫描线 + 暗角
// 纯 CSS,无 hooks,服务端组件也可直接用

const NOISE_SVG =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\")";

export default function DreamcoreBg() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute -left-24 -top-32 h-[26rem] w-[26rem] rounded-full bg-purple-600/25 blur-[120px]" />
      <div className="absolute right-[-15%] top-1/4 h-[30rem] w-[30rem] rounded-full bg-fuchsia-500/20 blur-[140px]" />
      <div className="absolute bottom-[-20%] left-1/4 h-[28rem] w-[28rem] rounded-full bg-indigo-500/20 blur-[140px]" />
      {/* VHS 噪点 */}
      <div
        className="absolute inset-0 opacity-[0.07] mix-blend-screen"
        style={{ backgroundImage: NOISE_SVG }}
      />
      {/* 扫描线 */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.025) 0px, rgba(255,255,255,0.025) 1px, transparent 1px, transparent 3px)",
        }}
      />
      {/* 暗角 */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.55) 100%)",
        }}
      />
    </div>
  );
}
