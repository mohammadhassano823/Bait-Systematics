
export default function HeroBackground() {
  return <>
<div aria-hidden="true" style={{ position: "absolute", inset: "0", pointerEvents: "none" }}>
<div style={{ position: "absolute", inset: "0", backgroundImage: "linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)", backgroundSize: "88px 88px", WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 60% 40%, #000 20%, transparent 75%)", maskImage: "radial-gradient(ellipse 80% 70% at 60% 40%, #000 20%, transparent 75%)" }}></div>
</div>
  </>;
}
