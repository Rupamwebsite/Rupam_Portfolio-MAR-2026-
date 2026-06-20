$css = @'
/* =====================================================================
   RUPAM MANDAL PORTFOLIO — NEON NOIR ELITE REDESIGN
   Version: 4.0 | Design: Neon Noir Elite
   Palette: Electric Cyan #00f5d4 · Violet #7000ff · Rose #ff2d78
   Typography: Space Grotesk + Inter
   ===================================================================== */

/* ----- GOOGLE FONTS ----- */
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap');

/* ===================================================================
   1. CSS CUSTOM PROPERTIES
   =================================================================== */
:root {
  --bg-base:     #020408;
  --bg-elevated: #080d14;
  --bg-surface:  #0d1320;
  --glass-bg:        rgba(255, 255, 255, 0.03);
  --glass-bg-strong: rgba(255, 255, 255, 0.06);
  --glass-border:    rgba(255, 255, 255, 0.08);
  --glass-border-hi: rgba(255, 255, 255, 0.18);
  --glass-highlight: rgba(255, 255, 255, 0.12);
  --glass-surface:   rgba(255, 255, 255, 0.015);
  --glass-blur:      blur(24px) saturate(180%);
  --text-100: #ffffff;
  --text-main:  #f0f4f8;
  --text-muted: #8899b4;
  --text-dim:   #5a6a82;
  --text-accent: #00f5d4;
  --accent-primary:   #00f5d4;
  --accent-secondary: #7000ff;
  --accent-tertiary:  #ff2d78;
  --accent-glow:      rgba(0, 245, 212, 0.45);
  --violet-glow:      rgba(112, 0, 255, 0.4);
  --rose-glow:        rgba(255, 45, 120, 0.4);
  --gradient-primary:     linear-gradient(135deg, #00f5d4 0%, #7000ff 60%, #ff2d78 100%);
  --grad-primary:     linear-gradient(135deg, #00f5d4 0%, #7000ff 60%, #ff2d78 100%);
  --grad-cyan-violet: linear-gradient(135deg, #00f5d4 0%, #7000ff 100%);
  --grad-violet-rose: linear-gradient(135deg, #7000ff 0%, #ff2d78 100%);
  --grad-text:        linear-gradient(135deg, #ffffff 0%, #00f5d4 50%, #7000ff 100%);
  --grad-glass:       linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.01) 100%);
  --gradient-glass:   linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.01) 100%);
  --gradient-text:    linear-gradient(135deg, #ffffff 0%, #00f5d4 50%, #7000ff 100%);
  --gradient-glow:    radial-gradient(circle at center, rgba(0, 245, 212, 0.15), transparent 70%);
  --gradient-subtle:  linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 100%);
  --shadow-glass: 0 8px 32px rgba(0, 0, 0, 0.37);
  --shadow-inner: inset 0 0 20px rgba(255, 255, 255, 0.015);
  --shadow-lg:    0 20px 60px rgba(0, 0, 0, 0.6);
  --shadow-xl:    0 40px 100px rgba(0, 0, 0, 0.7);
  --shadow-cyan:  0 0 30px rgba(0, 245, 212, 0.25), 0 20px 60px rgba(0, 245, 212, 0.1);
  --shadow-violet:0 0 30px rgba(112, 0, 255, 0.25), 0 20px 60px rgba(112, 0, 255, 0.1);
  --shadow-hover: 0 20px 60px -15px rgba(0, 245, 212, 0.2);
  --glow-shadow:  0 0 40px rgba(0, 245, 212, 0.2);
  --nav-height:     72px;
  --section-padding: clamp(4rem, 8vw, 8rem) 0;
  --container-max:  1280px;
  --container-px:   clamp(1rem, 4vw, 2.5rem);
  --r-xs:  6px; --r-sm: 12px; --r-md: 16px; --r-lg: 24px; --r-xl: 32px; --r-2xl: 40px; --r-full: 100px;
  --border-radius-xl: 40px;
  --border-radius-lg: 24px;
  --border-radius-md: 16px;
  --ease-out-expo:   cubic-bezier(0.16, 1, 0.3, 1);
  --ease-spring:     cubic-bezier(0.34, 1.56, 0.64, 1);
  --transition-fast: 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  --transition-mid:  0.4s cubic-bezier(0.16, 1, 0.3, 1);
  --transition-smooth: 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  --body-bg: #020408;
}

.light-theme {
  --bg-base:        #f0f4f8;
  --bg-elevated:    #ffffff;
  --bg-surface:     #e8edf4;
  --glass-bg:       rgba(0, 0, 0, 0.03);
  --glass-bg-strong:rgba(0, 0, 0, 0.06);
  --glass-border:   rgba(0, 0, 0, 0.09);
  --glass-border-hi:rgba(0, 0, 0, 0.18);
  --glass-highlight:rgba(0, 0, 0, 0.12);
  --text-main:      #1a2235;
  --text-muted:     #4a5c78;
  --text-dim:       #7a8fa8;
  --text-100:       #1a2235;
  --text-accent:    #0098a8;
  --accent-primary: #0098a8;
  --accent-secondary: #5500cc;
  --accent-tertiary: #cc1060;
  --accent-glow:    rgba(0, 152, 168, 0.4);
  --grad-primary:   linear-gradient(135deg, #00c4b0, #5500cc, #cc1060);
  --gradient-primary: linear-gradient(135deg, #00c4b0, #5500cc, #cc1060);
  --grad-text:      linear-gradient(135deg, #1a2235, #0098a8, #5500cc);
  --gradient-text:  linear-gradient(135deg, #1a2235, #0098a8, #5500cc);
  --gradient-glow:  radial-gradient(circle at center, rgba(0, 152, 168, 0.15), transparent 60%);
  --body-bg:        #f0f4f8;
  --gradient-glass: linear-gradient(135deg, rgba(0,0,0,0.04) 0%, rgba(0,0,0,0.01) 100%);
  --grad-glass:     linear-gradient(135deg, rgba(0,0,0,0.04) 0%, rgba(0,0,0,0.01) 100%);
  --grad-cyan-violet: linear-gradient(135deg, #00c4b0 0%, #5500cc 100%);
  --grad-violet-rose: linear-gradient(135deg, #5500cc 0%, #cc1060 100%);
  --shadow-hover: 0 20px 60px -15px rgba(0, 152, 168, 0.2);
  --shadow-cyan:  0 0 30px rgba(0, 152, 168, 0.2), 0 20px 60px rgba(0, 152, 168, 0.08);
}

/* ===================================================================
   2. PREMIUM KEYFRAME ANIMATIONS
   =================================================================== */
@keyframes shimmer {
  0%   { background-position: -200% center; }
  100% { background-position: 200% center; }
}
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-18px); }
}
@keyframes glitch {
  0%   { transform: translate(-4px, 0); }
  20%  { transform: translate(4px, 0); }
  40%  { transform: translate(-2px, 0); }
  60%  { transform: translate(3px, 0); }
  80%  { transform: translate(-2px, 0); }
  100% { transform: translate(0); }
}
@keyframes neonPulse {
  0%, 100% { text-shadow: 0 0 5px var(--accent-primary), 0 0 15px var(--accent-primary), 0 0 30px var(--accent-primary); opacity: 1; }
  50% { text-shadow: 0 0 10px var(--accent-primary), 0 0 40px var(--accent-primary), 0 0 80px var(--accent-primary); opacity: 0.92; }
}
@keyframes slideInLeft {
  from { opacity: 0; transform: translateX(-60px); }
  to   { opacity: 1; transform: translateX(0); }
}
@keyframes slideInRight {
  from { opacity: 0; transform: translateX(60px); }
  to   { opacity: 1; transform: translateX(0); }
}
@keyframes slideInUp {
  from { opacity: 0; transform: translateY(50px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes rotateGlobe { from { transform: rotateY(0deg); } to { transform: rotateY(360deg); } }
@keyframes textGlow {
  0%, 100% { filter: brightness(1) drop-shadow(0 0 8px var(--accent-primary)); }
  50%       { filter: brightness(1.3) drop-shadow(0 0 24px var(--accent-primary)); }
}
@keyframes counterUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes particleDrift {
  0%   { transform: translateY(0) translateX(0) scale(1); opacity: 0.7; }
  33%  { transform: translateY(-60px) translateX(25px) scale(1.1); opacity: 1; }
  66%  { transform: translateY(-110px) translateX(-15px) scale(0.9); opacity: 0.5; }
  100% { transform: translateY(-180px) translateX(10px) scale(0.5); opacity: 0; }
}
@keyframes scanline {
  0%   { transform: translateY(-100%); opacity: 0.4; }
  100% { transform: translateY(100vh); opacity: 0; }
}
@keyframes morphBlob {
  0%   { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
  25%  { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
  50%  { border-radius: 50% 50% 30% 70% / 30% 50% 70% 50%; }
  75%  { border-radius: 40% 60% 60% 40% / 70% 30% 60% 40%; }
  100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
}
@keyframes typewriter {
  0%, 100% { border-right-color: var(--accent-primary); }
  50%       { border-right-color: transparent; }
}
@keyframes orbitSpin {
  from { transform: rotate(0deg) translateX(110px) rotate(0deg); }
  to   { transform: rotate(360deg) translateX(110px) rotate(-360deg); }
}
@keyframes loadProgress {
  0%   { left: -100%; }
  50%  { left: 0; }
  100% { left: 100%; }
}
@keyframes pulseLogo {
  0%, 100% { transform: scale(1); opacity: 0.85; }
  50% { transform: scale(1.08); opacity: 1; filter: drop-shadow(0 0 20px var(--accent-primary)); }
}
@keyframes moveInCircle { 0% { transform: rotate(0deg); } 50% { transform: rotate(180deg); } 100% { transform: rotate(360deg); } }
@keyframes moveVertical { 0% { transform: translateY(-50%); } 50% { transform: translateY(50%); } 100% { transform: translateY(-50%); } }
@keyframes moveHorizontal { 0% { transform: translateX(-50%) translateY(-10%); } 50% { transform: translateX(50%) translateY(10%); } 100% { transform: translateX(-50%) translateY(-10%); } }
@keyframes floatShape {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  25%  { transform: translateY(-22px) rotate(90deg); }
  50%  { transform: translateY(-12px) rotate(180deg); }
  75%  { transform: translateY(-32px) rotate(270deg); }
}
@keyframes floatParticle {
  0%, 100% { transform: translateY(0) translateX(0); opacity: 0.6; }
  25%  { transform: translateY(-55px) translateX(22px); opacity: 0.9; }
  50%  { transform: translateY(-110px) translateX(-12px); opacity: 0.4; }
  75%  { transform: translateY(-55px) translateX(-22px); opacity: 0.65; }
}
@keyframes blobFloat { 0% { transform: translate(0,0) scale(1); } 100% { transform: translate(30px,50px) scale(1.12); } }
@keyframes scrollDown { 0% { transform: translateY(0); opacity: 0; } 50% { opacity: 1; } 100% { transform: translateY(12px); opacity: 0; } }
@keyframes floatImage { 0%, 100% { transform: translateY(0) rotate(-3deg); } 50% { transform: translateY(-22px) rotate(-1deg); } }
@keyframes rotateGradient { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
@keyframes shine { to { background-position: 200% center; } }
@keyframes growLine { from { width: 0; } to { width: 80px; } }
@keyframes progress-shine { 0% { transform: translateX(-100%); } 50% { transform: translateX(0%); } 100% { transform: translateX(100%); } }
@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
@keyframes msgSlideIn { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
@keyframes pulseChatbot { 0% { transform: scale(0.8); opacity: 0.8; } 100% { transform: scale(1.5); opacity: 0; } }
@keyframes statusPulse { 0%, 100% { box-shadow: 0 0 0 0 rgba(0, 230, 118, 0.6); } 50% { box-shadow: 0 0 0 6px rgba(0, 230, 118, 0); } }
@keyframes badgeBounce { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.22); } }
@keyframes typingBounce { 0%, 60%, 100% { transform: translateY(0); opacity: 0.5; } 30% { transform: translateY(-9px); opacity: 1; } }
@keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
@keyframes popIn { 0% { transform: scale(0.78); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
@keyframes fabPulse { 0%, 100% { box-shadow: 0 8px 32px rgba(0, 245, 212, 0.4), 0 0 0 0 rgba(0, 245, 212, 0.4); } 50% { box-shadow: 0 8px 32px rgba(0, 245, 212, 0.4), 0 0 0 16px rgba(0, 245, 212, 0); } }
@keyframes orbitRing1 { from { transform: rotateX(65deg) rotateZ(0deg); } to { transform: rotateX(65deg) rotateZ(360deg); } }
@keyframes orbitRing2 { from { transform: rotateX(65deg) rotateZ(120deg); } to { transform: rotateX(65deg) rotateZ(480deg); } }
@keyframes statReveal { from { opacity: 0; transform: translateY(30px) scale(0.8); } to { opacity: 1; transform: translateY(0) scale(1); } }
@keyframes drawLine { from { height: 0; } to { height: 100%; } }
@keyframes ripple { 0% { transform: scale(0); opacity: 0.6; } 100% { transform: scale(3); opacity: 0; } }
@keyframes cardFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
@keyframes gridPulse { 0%, 100% { opacity: 0.03; } 50% { opacity: 0.07; } }

/* ===================================================================
   3. BASE RESET & TYPOGRAPHY
   =================================================================== */
*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; scroll-behavior: smooth; }
html { font-size: 16px; scroll-behavior: smooth; }
body {
  background-color: var(--body-bg);
  color: var(--text-main);
  font-family: 'Inter', system-ui, sans-serif;
  overflow-x: hidden;
  line-height: 1.7;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
h1, h2, h3, h4, h5, h6 {
  font-family: 'Space Grotesk', system-ui, sans-serif;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.02em;
}
a { text-decoration: none; color: inherit; transition: var(--transition-fast); }
ul { list-style: none; }
img { max-width: 100%; display: block; }
button { font-family: inherit; }
::-webkit-scrollbar { width: 5px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: linear-gradient(to bottom, var(--accent-primary), var(--accent-secondary)); border-radius: 100px; }
::-webkit-scrollbar-thumb:hover { background: var(--accent-primary); }
::selection { background: var(--accent-primary); color: #000; }
:focus-visible { outline: 2px solid var(--accent-primary); outline-offset: 3px; border-radius: 12px; }
section { padding: var(--section-padding); position: relative; z-index: 2; }
.container { width: 100%; max-width: var(--container-max); margin: 0 auto; padding: 0 var(--container-px); }
.row { display: flex; gap: 32px; align-items: flex-start; }
.col { flex: 1; display: flex; }
.animated { animation-duration: 0.8s; animation-fill-mode: both; }
.fade-in { animation: fadeIn 0.9s cubic-bezier(0.16,1,0.3,1) both; }
.spin { animation: spin 1s linear infinite; display: inline-block; }
.muted { opacity: 0.5; }

/* ===================================================================
   4. BACKGROUND & GRADIENT MESH
   =================================================================== */
.gradient-bg {
  position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
  z-index: -2; overflow: hidden; background: var(--bg-base);
}
.gradients-container { filter: blur(80px) saturate(120%); width: 100%; height: 100%; position: relative; }
.g1, .g2, .g3, .g4, .g5, .interactive { position: absolute; border-radius: 50%; opacity: 0.5; }
.g1 { background: radial-gradient(circle, rgba(0,245,212,0.35) 0, transparent 65%); width: 80%; height: 80%; top: -15%; left: -10%; animation: moveVertical 32s ease infinite; }
.g2 { background: radial-gradient(circle, rgba(112,0,255,0.4) 0, transparent 60%); width: 70%; height: 70%; top: -10%; right: -10%; transform-origin: calc(50% - 400px); animation: moveInCircle 22s reverse infinite; }
.g3 { background: radial-gradient(circle, rgba(255,45,120,0.3) 0, transparent 60%); width: 75%; height: 75%; top: 30%; left: 25%; transform-origin: calc(50% + 400px); animation: moveInCircle 44s linear infinite; }
.g4 { background: radial-gradient(circle, rgba(0,114,255,0.3) 0, transparent 60%); width: 55%; height: 55%; top: 45%; right: 15%; transform-origin: calc(50% - 200px); animation: moveHorizontal 38s ease infinite; }
.g5 { background: radial-gradient(circle, rgba(0,245,212,0.2) 0, transparent 50%); width: 40%; height: 40%; bottom: 5%; left: 5%; animation: moveInCircle 28s ease infinite reverse; opacity: 0.35; }
.interactive { background: radial-gradient(circle, rgba(112,0,255,0.5) 0, transparent 50%); width: 100%; height: 100%; top: -50%; left: -50%; opacity: 0.6; }
body::before { content: ''; position: fixed; width: 700px; height: 700px; border-radius: 50%; filter: blur(100px); z-index: -1; opacity: 0.12; pointer-events: none; top: -15%; right: -10%; background: var(--grad-primary); animation: blobFloat 22s infinite alternate; }
body::after { content: ''; position: fixed; width: 600px; height: 600px; border-radius: 50%; filter: blur(100px); z-index: -1; opacity: 0.1; pointer-events: none; bottom: -15%; left: -10%; background: radial-gradient(circle, #7000ff, transparent 60%); animation: blobFloat 18s infinite alternate-reverse; }

.floating-shapes { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
.shape { position: absolute; opacity: 0.08; animation: floatShape 22s ease-in-out infinite; }
.shape-1 { top: 10%; left: 8%; width: 64px; height: 64px; background: var(--accent-primary); border-radius: 50%; animation-delay: 0s; }
.shape-2 { top: 22%; right: 12%; width: 42px; height: 42px; background: var(--accent-secondary); clip-path: polygon(50% 0%, 0% 100%, 100% 100%); animation-delay: 5s; }
.shape-3 { bottom: 28%; left: 18%; width: 52px; height: 52px; background: var(--grad-cyan-violet); border-radius: 12px; animation-delay: 10s; }
.shape-4 { top: 58%; right: 8%; width: 32px; height: 32px; background: var(--accent-primary); clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%); animation-delay: 15s; }
.shape-5 { bottom: 18%; left: 62%; width: 46px; height: 46px; background: var(--accent-secondary); border-radius: 50% 20% 50% 20%; animation-delay: 7s; }

.particles { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
.particle { position: absolute; background: var(--accent-primary); border-radius: 50%; animation: particleDrift 12s ease-in-out infinite; }
.particle-1 { width: 4px; height: 4px; top: 15%; left: 25%; animation-delay: 0s; }
.particle-2 { width: 6px; height: 6px; top: 35%; left: 75%; animation-delay: 3s; background: var(--accent-secondary); }
.particle-3 { width: 3px; height: 3px; top: 55%; left: 15%; animation-delay: 6s; }
.particle-4 { width: 5px; height: 5px; top: 75%; left: 85%; animation-delay: 9s; background: var(--accent-tertiary); }
.particle-5 { width: 4px; height: 4px; top: 25%; left: 45%; animation-delay: 12s; }
.particle-6 { width: 3px; height: 3px; top: 65%; left: 55%; animation-delay: 2s; background: var(--accent-secondary); }

/* ===================================================================
   5. PRELOADER
   =================================================================== */
#pre_loader {
  position: fixed; inset: 0;
  background: #020408;
  display: flex; justify-content: center; align-items: center;
  z-index: 9999;
  transition: opacity 0.9s cubic-bezier(0.16,1,0.3,1), visibility 0.9s;
  overflow: hidden;
}
#pre_loader::before {
  content: ''; position: absolute; left: 0; right: 0; height: 2px;
  background: linear-gradient(90deg, transparent, var(--accent-primary), transparent);
  animation: scanline 3s linear infinite; opacity: 0.5;
}
.loader-content { text-align: center; width: 220px; position: relative; z-index: 2; }
.loader-logo {
  font-size: 56px; font-weight: 900;
  font-family: 'Space Grotesk', sans-serif;
  background: var(--grad-primary); background-size: 200% auto;
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  margin-bottom: 28px; letter-spacing: -2px; display: block;
  animation: pulseLogo 2s ease-in-out infinite, shimmer 3s linear infinite;
}
.loader-bar { width: 100%; height: 2px; background: rgba(255,255,255,0.06); border-radius: 100px; overflow: hidden; position: relative; }
.loader-progress {
  width: 100%; height: 100%;
  background: var(--grad-primary); background-size: 200% auto;
  position: absolute; left: -100%;
  animation: loadProgress 2s infinite cubic-bezier(0.16,1,0.3,1); border-radius: 100px;
}

/* ===================================================================
   6. NAVIGATION
   =================================================================== */
nav {
  position: fixed; top: 0; left: 0; width: 100%; height: var(--nav-height);
  display: flex; justify-content: space-between; align-items: center;
  padding: 0 clamp(1.5rem, 6vw, 5rem);
  background: rgba(2, 4, 8, 0.72);
  backdrop-filter: blur(24px) saturate(180%); -webkit-backdrop-filter: blur(24px) saturate(180%);
  border-bottom: 1px solid rgba(255,255,255,0.05);
  z-index: 1000; transition: background 0.4s ease, box-shadow 0.4s ease;
}
nav.scrolled { background: rgba(2,4,8,0.95); box-shadow: 0 8px 32px rgba(0,0,0,0.5); border-bottom-color: rgba(0,245,212,0.08); }
.nav-logo .nav-name {
  font-size: 28px; font-family: 'Space Grotesk', sans-serif; font-weight: 800;
  background: var(--grad-primary); background-size: 200% auto;
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  cursor: pointer; letter-spacing: -1px; transition: var(--transition-mid);
  animation: shimmer 4s linear infinite;
}
.nav-logo .nav-name:hover { filter: brightness(1.2) drop-shadow(0 0 12px var(--accent-primary)); transform: scale(1.04); }
.nav-menu ul { display: flex; gap: 36px; align-items: center; }
.nav-link {
  color: var(--text-muted); font-weight: 500; font-size: 14px; letter-spacing: 0.4px;
  position: relative; padding: 6px 0; overflow: hidden; transition: color 0.25s ease;
}
.nav-link::after {
  content: ''; position: absolute; bottom: 0; left: 0; width: 0; height: 2px;
  background: var(--grad-primary); background-size: 200% auto;
  border-radius: 100px; transition: width 0.4s cubic-bezier(0.16,1,0.3,1);
}
.nav-link:hover, .nav-link.active-link { color: #fff; text-shadow: 0 0 14px var(--accent-primary); }
.nav-link:hover::after, .nav-link.active-link::after { width: 100%; }
.nav-menu-btn {
  display: none; font-size: 22px; cursor: pointer; color: var(--text-main);
  width: 40px; height: 40px; align-items: center; justify-content: center;
  background: var(--glass-bg); border: 1px solid var(--glass-border); border-radius: 12px; transition: var(--transition-fast);
}
.nav-menu-btn:hover { background: var(--glass-bg-strong); border-color: var(--accent-primary); color: var(--accent-primary); }
.nav-button { display: flex; align-items: center; gap: 14px; }

/* ===================================================================
   7. BUTTONS
   =================================================================== */
.btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 10px;
  padding: 14px 32px;
  background: var(--glass-bg); color: var(--text-main); border: 1px solid var(--glass-border);
  border-radius: 100px; font-weight: 600; font-family: 'Space Grotesk', sans-serif;
  font-size: 14px; cursor: pointer; backdrop-filter: blur(12px);
  transition: var(--transition-smooth); position: relative; overflow: hidden; letter-spacing: 0.3px;
}
.btn::before {
  content: ''; position: absolute; inset: 0; background: var(--grad-primary);
  opacity: 0; z-index: -1; transition: opacity 0.35s ease; border-radius: inherit;
}
.btn:hover { border-color: transparent; color: #000; transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,245,212,0.3); }
.btn:hover::before { opacity: 1; }
.btn.blue-btn {
  background: var(--grad-primary); background-size: 200% auto; border: none;
  color: #000; font-weight: 700; box-shadow: 0 8px 28px rgba(0,245,212,0.35);
  animation: shimmer 4s linear infinite;
}
.btn.blue-btn:hover { box-shadow: 0 14px 50px rgba(0,245,212,0.5); transform: translateY(-5px) scale(1.02); color: #000; }
.btn.blue-btn::before { display: none; }
.btn.secondary-btn { background: transparent; border-color: var(--glass-border-hi); color: var(--text-main); }
.btn.secondary-btn:hover { background: rgba(255,255,255,0.06); border-color: var(--accent-primary); color: var(--accent-primary); box-shadow: 0 0 24px rgba(0,245,212,0.2); }
.btn.secondary-btn::before { display: none; }
.theme-btn {
  background: var(--glass-bg); border: 1px solid var(--glass-border);
  border-radius: 50%; width: 44px; height: 44px;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; transition: var(--transition-mid); color: var(--text-muted);
}
.theme-btn:hover { background: var(--glass-bg-strong); border-color: var(--accent-primary); color: var(--accent-primary); transform: scale(1.08) rotate(30deg); box-shadow: 0 0 20px var(--accent-glow); }
.theme-btn i { font-size: 18px; transition: var(--transition-fast); }

/* ===================================================================
   8. HERO SECTION
   =================================================================== */
.featured-box {
  min-height: 100vh; display: flex; align-items: center;
  gap: clamp(2rem, 5vw, 5rem);
  padding-top: calc(var(--nav-height) + 2rem); padding-bottom: 4rem; position: relative;
}
.featured-box::before {
  content: ''; position: absolute; inset: 0;
  background-image: radial-gradient(circle, rgba(0,245,212,0.15) 1px, transparent 1px);
  background-size: 60px 60px; animation: gridPulse 5s ease-in-out infinite;
  pointer-events: none; z-index: 0;
}
.featured-text { flex: 1; z-index: 2; min-width: 0; }
.featured-text-card span {
  display: inline-block; background: rgba(0,245,212,0.08); color: var(--accent-primary);
  padding: 9px 22px; border-radius: 100px; font-size: 12px; font-weight: 600;
  letter-spacing: 2.5px; text-transform: uppercase; border: 1px solid rgba(0,245,212,0.22);
  animation: slideInLeft 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s both;
}
.featured-name { margin: 28px 0 18px; animation: slideInLeft 0.9s cubic-bezier(0.16,1,0.3,1) 0.25s both; }
.featured-name p {
  font-size: clamp(44px, 7vw, 80px); font-weight: 800; color: #fff;
  line-height: 1.05; margin: 0; font-family: 'Space Grotesk', sans-serif; letter-spacing: -3px;
}
.typedText {
  background: var(--grad-primary); background-size: 200% auto;
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  animation: shimmer 3s linear infinite;
}
.featured-text-info p {
  font-size: clamp(16px,2vw,19px); color: var(--text-muted); max-width: 560px;
  margin: 28px 0 40px; line-height: 1.85;
  animation: slideInLeft 1s cubic-bezier(0.16,1,0.3,1) 0.4s both;
}
.featured-text-btn { display: flex; gap: 18px; flex-wrap: wrap; align-items: center; animation: slideInLeft 1.1s cubic-bezier(0.16,1,0.3,1) 0.55s both; }
.social_icons { margin-top: 44px; display: flex; gap: 16px; animation: slideInLeft 1.2s cubic-bezier(0.16,1,0.3,1) 0.7s both; }
.icon a {
  width: 48px; height: 48px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  background: var(--glass-bg); border: 1px solid var(--glass-border);
  color: var(--text-muted); font-size: 20px; transition: var(--transition-mid); position: relative; overflow: hidden;
}
.icon a::before { content: ''; position: absolute; inset: 0; background: var(--grad-primary); opacity: 0; border-radius: 50%; transition: opacity 0.35s ease; }
.icon a:hover { border-color: transparent; color: #000; box-shadow: 0 0 30px var(--accent-glow); transform: translateY(-6px) rotate(8deg); }
.icon a:hover::before { opacity: 1; }
.icon a:hover i { position: relative; z-index: 1; }
.featured-image { flex: 1; display: flex; justify-content: center; align-items: center; position: relative; z-index: 2; animation: slideInRight 1s cubic-bezier(0.16,1,0.3,1) 0.3s both; }
.image-container {
  position: relative; padding: 6px;
  background: linear-gradient(45deg, var(--accent-primary), var(--accent-secondary), var(--accent-tertiary), var(--accent-primary));
  background-size: 300% 300%; border-radius: clamp(36px, 5vw, 48px); animation: rotateGradient 4s ease-in-out infinite;
}
.image-container::before {
  content: ''; position: absolute; inset: -30px; border-radius: 50%;
  border: 1.5px solid rgba(0,245,212,0.2); animation: orbitRing1 8s linear infinite;
}
.image {
  width: clamp(280px, 35vw, 420px); height: clamp(280px, 35vw, 420px);
  border-radius: clamp(30px, 4vw, 40px); overflow: hidden;
  border: 1px solid var(--glass-border); background: var(--glass-bg); padding: 8px;
  box-shadow: 0 20px 80px rgba(0,0,0,0.5);
  animation: floatImage 7s ease-in-out infinite; transform: rotate(-3deg); position: relative; z-index: 2;
}
.image::after { content: ''; position: absolute; inset: 0; border-radius: inherit; box-shadow: inset 0 0 50px rgba(0,0,0,0.5); z-index: 2; pointer-events: none; }
.image img { width: 100%; height: 100%; object-fit: cover; border-radius: calc(clamp(30px,4vw,40px) - 8px); filter: grayscale(15%) contrast(108%); transition: 0.6s ease; }
.image:hover img { filter: grayscale(0%) contrast(110%) brightness(1.05); transform: scale(1.06); }
.hero-stats { display: flex; gap: 16px; margin-top: 48px; flex-wrap: wrap; animation: slideInLeft 1.3s cubic-bezier(0.16,1,0.3,1) 0.8s both; }
.hero-stat-card {
  background: var(--glass-bg); border: 1px solid var(--glass-border); backdrop-filter: blur(16px);
  border-radius: 24px; padding: 14px 22px; text-align: center; transition: var(--transition-mid);
  animation: cardFloat 5s ease-in-out infinite;
}
.hero-stat-card:nth-child(2) { animation-delay: 1.5s; }
.hero-stat-card:nth-child(3) { animation-delay: 3s; }
.hero-stat-card:hover { border-color: var(--accent-primary); box-shadow: var(--shadow-cyan); transform: translateY(-8px); }
.hero-stat-card .stat-num {
  font-size: 26px; font-weight: 800; font-family: 'Space Grotesk', sans-serif;
  background: var(--grad-primary); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}
.hero-stat-card .stat-label { font-size: 12px; color: var(--text-dim); font-weight: 500; letter-spacing: 0.5px; text-transform: uppercase; }
.scroll-icon-box { position: absolute; bottom: 36px; left: 50%; transform: translateX(-50%); display: flex; flex-direction: column; align-items: center; gap: 8px; opacity: 0.5; z-index: 2; }
.scroll-icon-box i { font-size: 26px; color: var(--accent-primary); animation: scrollDown 2.2s infinite; }
.scroll-btn { font-size: 11px; color: var(--text-dim); letter-spacing: 2px; text-transform: uppercase; font-weight: 500; }

/* ===================================================================
   9. SECTION HEADERS
   =================================================================== */
.top-header { text-align: center; margin-bottom: clamp(2.5rem, 5vw, 4.5rem); }
.top-header span {
  display: inline-block; color: var(--accent-primary); font-size: 12px; letter-spacing: 3px;
  text-transform: uppercase; font-weight: 600; margin-bottom: 14px;
  background: rgba(0,245,212,0.07); padding: 7px 18px; border-radius: 100px; border: 1px solid rgba(0,245,212,0.18);
}
.top-header h1 {
  font-size: clamp(28px, 4vw, 48px); font-weight: 700; color: #fff;
  margin-bottom: 15px; position: relative; display: inline-block;
}
.top-header h1::after {
  content: ''; position: absolute; bottom: -12px; left: 50%; transform: translateX(-50%);
  width: 80px; height: 3px; background: var(--grad-primary); background-size: 200% auto;
  border-radius: 100px; animation: growLine 0.8s ease-out forwards, shimmer 4s linear infinite;
}
.top-header p { color: var(--text-muted); font-size: 17px; max-width: 600px; margin: 22px auto 0; line-height: 1.8; }

/* ===================================================================
   10. ABOUT SECTION
   =================================================================== */
#about { position: relative; overflow: hidden; }
#about::before {
  content: 'ABOUT'; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
  font-size: clamp(80px, 15vw, 180px); font-weight: 900; font-family: 'Space Grotesk', sans-serif;
  color: rgba(255,255,255,0.02); pointer-events: none; white-space: nowrap; letter-spacing: -0.05em; z-index: 0;
}
.about-info {
  width: 100%; background: var(--gradient-glass); padding: clamp(2rem, 4vw, 3.5rem);
  border-radius: 40px; border: 1px solid var(--glass-border);
  backdrop-filter: blur(24px) saturate(180%); box-shadow: var(--shadow-glass), var(--shadow-inner);
  position: relative; overflow: hidden; transition: var(--transition-smooth); z-index: 1;
}
.about-info::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: var(--grad-primary); background-size: 200% auto; animation: shimmer 4s linear infinite; }
.about-info:hover { border-color: rgba(0,245,212,0.2); transform: scale(1.01); box-shadow: var(--shadow-lg), var(--shadow-cyan); }
.about-info h3 {
  font-size: clamp(22px, 3vw, 32px); margin-bottom: 1.6rem;
  background: var(--grad-text); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; font-weight: 800;
}
.about-info p { color: var(--text-muted); font-size: 16px; line-height: 1.85; font-weight: 400; margin-bottom: 1.8rem; }
.about-info p strong, .about-info p em { color: var(--accent-primary); font-style: normal; font-weight: 600; }
.skills-col { flex-direction: column; gap: 22px; }
.skills-box {
  padding: clamp(1.5rem, 3vw, 2.5rem); background: var(--gradient-glass);
  border-radius: 32px; border: 1px solid var(--glass-border);
  backdrop-filter: blur(24px) saturate(180%); box-shadow: var(--shadow-glass), var(--shadow-inner);
  transition: var(--transition-smooth); position: relative; overflow: hidden;
}
.skills-box::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: var(--grad-primary); background-size: 200% auto; animation: shimmer 4s linear infinite; opacity: 0.7; }
.skills-box:hover { transform: translateY(-8px); border-color: rgba(0,245,212,0.25); box-shadow: var(--shadow-lg), var(--shadow-cyan); }
.skills-header { display: flex; align-items: center; gap: 14px; margin-bottom: 22px; padding-bottom: 14px; border-bottom: 1px solid rgba(255,255,255,0.06); }
.skill-category-icon {
  width: 48px; height: 48px; background: var(--grad-cyan-violet); border-radius: 14px;
  display: flex; align-items: center; justify-content: center; color: #fff; font-size: 20px;
  box-shadow: 0 6px 22px rgba(0,245,212,0.3); flex-shrink: 0; transition: var(--transition-mid);
}
.skills-box:hover .skill-category-icon { transform: rotate(10deg) scale(1.1); }
.skill-category-info h3 { font-size: 18px; color: rgba(255,255,255,0.95); margin: 0 0 3px; font-weight: 700; }
.skill-category-info p { font-size: 13px; color: var(--text-muted); margin: 0; font-weight: 400; }
.skills-list { display: flex; flex-direction: column; gap: 14px; }
.skill-item { display: flex; flex-direction: column; gap: 6px; }
.skill-info { display: flex; justify-content: space-between; align-items: center; }
.skill-name { font-size: 13px; color: rgba(255,255,255,0.88); font-weight: 600; }
.skill-percentage {
  font-size: 11px; color: var(--accent-primary); font-weight: 700;
  background: rgba(0,245,212,0.1); padding: 3px 10px; border-radius: 100px; border: 1px solid rgba(0,245,212,0.25);
}
.progress-bar { width: 100%; height: 8px; background: rgba(255,255,255,0.07); border-radius: 100px; overflow: hidden; position: relative; border: 1px solid rgba(255,255,255,0.05); }
.progress { height: 100%; background: var(--grad-cyan-violet); border-radius: 100px; transition: width 2.2s cubic-bezier(0.4,0,0.2,1); width: 0%; position: relative; box-shadow: 0 0 14px rgba(0,245,212,0.4); }
.progress::after { content: ''; position: absolute; top: 0; right: 0; height: 100%; width: 30px; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent); border-radius: 100px; animation: progress-shine 2.8s ease-in-out infinite; }
.skills-group { margin-bottom: 18px; }
.skills-group:last-child { margin-bottom: 0; }
.skill-category-title { font-size: 11px; color: var(--text-dim); margin-bottom: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 2px; }
.skill-tags { display: flex; flex-wrap: wrap; gap: 10px; }
.tech-tag {
  padding: 8px 18px; background: rgba(255,255,255,0.04); color: rgba(255,255,255,0.85);
  font-size: 13px; font-weight: 500; border-radius: 100px; border: 1px solid rgba(255,255,255,0.09);
  transition: var(--transition-mid); cursor: default; font-family: 'Inter', sans-serif; position: relative; overflow: hidden;
}
.tech-tag::before { content: ''; position: absolute; inset: 0; background: var(--grad-primary); opacity: 0; transition: opacity 0.35s ease; border-radius: inherit; }
.tech-tag:hover { border-color: transparent; color: #000; transform: translateY(-3px); box-shadow: 0 6px 20px rgba(0,245,212,0.25); isolation: isolate; }
.tech-tag:hover::before { opacity: 1; }

/* ===================================================================
   11. SERVICES SECTION
   =================================================================== */
#services { position: relative; overflow: hidden; }
#services::before {
  content: 'SERVICES'; position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);
  font-size: clamp(60px,12vw,150px); font-weight: 900; font-family: 'Space Grotesk', sans-serif;
  color: rgba(255,255,255,0.02); pointer-events: none; white-space: nowrap; z-index: 0;
}
.service-container { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 28px; }
.service-box {
  background: var(--gradient-glass); padding: clamp(2rem, 3.5vw, 3rem);
  border-radius: 32px; border: 1px solid var(--glass-border);
  box-shadow: var(--shadow-glass), var(--shadow-inner);
  transition: var(--transition-smooth); display: flex; flex-direction: column;
  align-items: center; text-align: center; position: relative; overflow: hidden;
  backdrop-filter: blur(16px); cursor: default;
}
.service-box::after { content: ''; position: absolute; top: 0; left: -100%; width: 100%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent); transition: 0.8s ease; }
.service-box:hover { transform: translateY(-14px) scale(1.02); box-shadow: var(--shadow-xl), var(--shadow-cyan); background: rgba(255,255,255,0.05); border-color: rgba(0,245,212,0.3); }
.service-box:hover::after { left: 100%; }
.service-box i {
  font-size: 52px; background: var(--grad-primary); background-size: 200% auto;
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  margin-bottom: 1.8rem; transition: var(--transition-smooth); display: block; animation: shimmer 4s linear infinite;
}
.service-box:hover i { transform: scale(1.15) rotate(8deg); filter: drop-shadow(0 0 16px var(--accent-primary)); }
.service-box h3 { font-size: clamp(18px, 2.5vw, 24px); color: #fff; margin-bottom: 1.1rem; font-weight: 700; }
.service-box p { color: var(--text-muted); font-size: 15px; line-height: 1.75; font-weight: 400; }

/* ===================================================================
   12. CERTIFICATIONS SECTION
   =================================================================== */
.certifications-container { display: grid; grid-template-columns: repeat(auto-fit, minmax(270px, 1fr)); gap: 28px; }
.certification-box {
  background: var(--gradient-glass); padding: clamp(2rem, 3.5vw, 3rem);
  border-radius: 32px; border: 1px solid var(--glass-border);
  box-shadow: var(--shadow-glass), var(--shadow-inner);
  transition: var(--transition-smooth); display: flex; flex-direction: column;
  align-items: center; text-align: center; position: relative; overflow: hidden; backdrop-filter: blur(16px);
}
.certification-box::before {
  content: '\2713 CERTIFIED'; position: absolute; top: 18px; right: -26px;
  background: var(--grad-violet-rose); color: #fff; font-size: 10px; font-weight: 700;
  padding: 5px 38px; transform: rotate(35deg); letter-spacing: 1.5px; text-transform: uppercase;
  box-shadow: 0 4px 12px rgba(0,0,0,0.4);
}
.certification-box:hover { transform: translateY(-14px) scale(1.02); border-color: rgba(112,0,255,0.4); box-shadow: var(--shadow-xl), var(--shadow-violet); background: rgba(255,255,255,0.05); }
.certification-box i {
  font-size: 52px; background: var(--grad-violet-rose); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  margin-bottom: 1.8rem; transition: var(--transition-smooth); display: block;
}
.certification-box:hover i { transform: scale(1.15) rotate(-8deg); filter: drop-shadow(0 0 16px var(--violet-glow)); }
.certification-box h3 { font-size: clamp(18px, 2.5vw, 24px); color: #fff; margin-bottom: 1.1rem; font-weight: 700; }
.certification-box p { color: var(--text-muted); font-size: 15px; line-height: 1.75; }

/* ===================================================================
   13. TOOLS SECTION
   =================================================================== */
#tools { position: relative; overflow: hidden; }
#tools::before {
  content: 'TOOLS'; position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);
  font-size: clamp(80px,15vw,200px); font-weight: 900; font-family: 'Space Grotesk', sans-serif;
  color: rgba(255,255,255,0.02); pointer-events: none; white-space: nowrap; z-index: 0;
}
.tools-container {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 20px;
  justify-items: center; max-width: 960px; margin: 0 auto; position: relative; z-index: 1;
}
.tool-item {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 10px; width: 100%; aspect-ratio: 1; background: var(--glass-surface);
  border: 1px solid var(--glass-border); border-radius: 16px; backdrop-filter: blur(12px);
  transition: var(--transition-smooth); position: relative; overflow: hidden; cursor: default;
}
.tool-item:hover { transform: translateY(-10px) scale(1.08); background: rgba(255,255,255,0.08); border-color: var(--accent-primary); box-shadow: var(--shadow-cyan); }
.tool-item i { font-size: 38px; color: var(--text-muted); transition: var(--transition-smooth); }
.tool-item:hover i { transform: scale(1.25) translateY(-4px); background: var(--grad-primary); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.tool-item span { font-size: 12px; color: var(--text-dim); font-weight: 500; transition: var(--transition-smooth); text-align: center; }
.tool-item:hover span { color: #fff; transform: translateY(-2px); }

/* ===================================================================
   14. EXPERIENCE SECTION
   =================================================================== */
#experience { position: relative; }
#experience::before {
  content: 'EXPERIENCE'; position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);
  font-size: clamp(50px,10vw,140px); font-weight: 900; font-family: 'Space Grotesk', sans-serif;
  color: rgba(255,255,255,0.018); pointer-events: none; white-space: nowrap; z-index: 0;
}
.experience-container { max-width: 900px; margin: 0 auto; padding: 0 20px; position: relative; z-index: 1; }
.timeline { position: relative; padding-left: 40px; }
.timeline::before {
  content: ''; position: absolute; left: 18px; top: 0; width: 2px; height: 0;
  background: var(--grad-primary); background-size: 200% auto;
  animation: drawLine 2s cubic-bezier(0.16,1,0.3,1) 0.5s forwards, shimmer 4s linear infinite 2.5s;
}
.timeline.animated::before { height: 100%; }
.timeline-item { position: relative; margin-bottom: 48px; }
.timeline-marker {
  position: absolute; left: -28px; top: 22px; width: 14px; height: 14px;
  background: var(--accent-primary); border-radius: 50%; border: 3px solid var(--bg-base);
  box-shadow: 0 0 14px var(--accent-glow); animation: neonPulse 2.5s ease-in-out infinite;
}
.timeline-content {
  background: var(--glass-bg); border: 1px solid var(--glass-border); border-left: 3px solid var(--accent-primary);
  border-radius: 24px; padding: clamp(1.5rem, 3vw, 2rem); box-shadow: var(--shadow-glass); transition: var(--transition-smooth); position: relative; overflow: hidden;
}
.timeline-content::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 3px; background: var(--grad-primary); background-size: 200% auto; animation: shimmer 4s linear infinite; border-radius: 6px 0 0 6px; }
.timeline-content:hover { transform: translateX(8px); border-color: rgba(0,245,212,0.25); box-shadow: var(--shadow-lg), var(--shadow-cyan); }
.experience-card { position: relative; }
.experience-header h3 { font-size: clamp(18px,2.5vw,22px); font-weight: 700; color: #fff; margin-bottom: 5px; }
.experience-header .company { display: block; font-size: 15px; color: var(--accent-primary); font-weight: 600; margin-bottom: 4px; }
.experience-header .duration {
  display: inline-flex; align-items: center; gap: 6px; font-size: 12px; color: var(--text-dim); font-weight: 500;
  background: rgba(0,245,212,0.06); padding: 4px 12px; border-radius: 100px; border: 1px solid rgba(0,245,212,0.15); margin-bottom: 14px;
}
.experience-header .duration::before { content: ''; width: 7px; height: 7px; border-radius: 50%; background: #00e676; animation: statusPulse 2s ease-in-out infinite; display: inline-block; }
.experience-details ul { padding: 0; margin-top: 16px; }
.experience-details li { position: relative; padding-left: 22px; margin-bottom: 8px; color: var(--text-muted); font-size: 14px; line-height: 1.65; }
.experience-details li::before { content: '\25b9'; position: absolute; left: 0; color: var(--accent-primary); font-weight: bold; }

/* ===================================================================
   15. STATS SECTION
   =================================================================== */
#stats {
  background: linear-gradient(135deg, rgba(0,245,212,0.04) 0%, rgba(112,0,255,0.06) 50%, rgba(255,45,120,0.04) 100%);
  border-top: 1px solid var(--glass-border); border-bottom: 1px solid var(--glass-border); position: relative; overflow: hidden;
}
#stats::before {
  content: ''; position: absolute; inset: 0;
  background-image: linear-gradient(rgba(0,245,212,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,212,0.04) 1px, transparent 1px);
  background-size: 50px 50px; pointer-events: none;
}
.stats-container { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 24px; text-align: center; position: relative; z-index: 1; }
.stat-item {
  padding: clamp(1.5rem, 3vw, 2.5rem); background: var(--glass-bg);
  border: 1px solid var(--glass-border); border-radius: 32px;
  box-shadow: var(--shadow-glass), var(--shadow-inner); transition: var(--transition-smooth); backdrop-filter: blur(14px);
  animation: statReveal 0.7s cubic-bezier(0.16,1,0.3,1) both;
}
.stat-item:hover { transform: translateY(-12px) scale(1.04); border-color: rgba(0,245,212,0.3); box-shadow: var(--shadow-xl), var(--shadow-cyan); }
.stat-item i { font-size: 32px; background: var(--grad-primary); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-bottom: 12px; display: block; }
.stat-number {
  font-size: clamp(36px, 5vw, 56px); font-weight: 800; font-family: 'Space Grotesk', sans-serif;
  background: var(--grad-primary); background-size: 200% auto;
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  margin-bottom: 8px; animation: shimmer 4s linear infinite, counterUp 0.8s cubic-bezier(0.16,1,0.3,1) both;
}
.stat-item p { color: var(--text-muted); font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 1.5px; }

/* ===================================================================
   16. PROJECTS SECTION
   =================================================================== */
#projects { position: relative; overflow: hidden; }
#projects::before {
  content: 'PROJECTS'; position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);
  font-size: clamp(60px,12vw,160px); font-weight: 900; font-family: 'Space Grotesk', sans-serif;
  color: rgba(255,255,255,0.018); pointer-events: none; white-space: nowrap; z-index: 0;
}
.project-filter { display: flex; justify-content: center; gap: 12px; margin-bottom: 48px; flex-wrap: wrap; position: relative; z-index: 1; }
.filter-btn {
  padding: 10px 26px; background: rgba(255,255,255,0.04); border: 1px solid var(--glass-border);
  color: var(--text-muted); border-radius: 100px; cursor: pointer; font-size: 13px; font-weight: 600;
  font-family: 'Space Grotesk', sans-serif; transition: var(--transition-mid); position: relative; overflow: hidden;
}
.filter-btn::before { content: ''; position: absolute; inset: 0; background: var(--grad-primary); border-radius: inherit; opacity: 0; transition: opacity 0.35s ease; }
.filter-btn:hover { color: #000; border-color: transparent; }
.filter-btn:hover::before { opacity: 1; }
.filter-btn.active-filter {
  background: var(--grad-primary); background-size: 200% auto; color: #000;
  border-color: transparent; font-weight: 700; box-shadow: 0 6px 24px rgba(0,245,212,0.35);
  animation: shimmer 4s linear infinite;
}
.filter-btn.active-filter::before { display: none; }
.project-container { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 28px; position: relative; z-index: 1; }
.project-box {
  background: var(--gradient-glass); border-radius: 32px; border: 1px solid var(--glass-border);
  box-shadow: var(--shadow-glass), var(--shadow-inner); overflow: hidden;
  transition: var(--transition-smooth); display: flex; flex-direction: column; backdrop-filter: blur(16px); cursor: default;
}
.project-box:hover { transform: translateY(-14px); border-color: rgba(0,245,212,0.3); box-shadow: var(--shadow-xl), var(--shadow-cyan); }
.project-img { position: relative; overflow: hidden; aspect-ratio: 16/9; }
.project-img img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.7s cubic-bezier(0.16,1,0.3,1), filter 0.7s ease; filter: grayscale(20%) contrast(105%); }
.project-box:hover .project-img img { transform: scale(1.1); filter: grayscale(0%) contrast(110%); }
.project-overlay {
  position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 0%, rgba(2,4,8,0.85) 100%);
  display: flex; align-items: flex-end; justify-content: center; padding: 20px;
  opacity: 0; transition: opacity 0.4s ease;
}
.project-box:hover .project-overlay { opacity: 1; }
.project-overlay-links { display: flex; gap: 12px; }
.project-overlay-links a {
  width: 44px; height: 44px; background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.3);
  border-radius: 50%; display: flex; align-items: center; justify-content: center;
  color: #fff; font-size: 18px; backdrop-filter: blur(8px); transition: var(--transition-mid);
}
.project-overlay-links a:hover { background: var(--accent-primary); border-color: var(--accent-primary); color: #000; transform: scale(1.12); }
.project-content { padding: clamp(1.5rem, 2.5vw, 2rem); flex: 1; display: flex; flex-direction: column; }
.project-category {
  font-size: 11px; color: var(--accent-primary); font-weight: 700; letter-spacing: 2px;
  text-transform: uppercase; margin-bottom: 10px;
  background: rgba(0,245,212,0.08); display: inline-block; padding: 4px 12px; border-radius: 100px; border: 1px solid rgba(0,245,212,0.2);
}
.project-content h3 { font-size: clamp(17px, 2.5vw, 21px); color: #fff; margin-bottom: 10px; font-weight: 700; }
.project-content p { color: var(--text-muted); font-size: 14px; line-height: 1.7; flex: 1; }
.project-tech { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 20px; }
.project-tech span {
  font-size: 11px; color: var(--text-dim); font-weight: 600; letter-spacing: 0.5px; text-transform: uppercase;
  background: rgba(255,255,255,0.05); padding: 4px 12px; border-radius: 100px; border: 1px solid rgba(255,255,255,0.08);
  transition: var(--transition-fast);
}
.project-box:hover .project-tech span { border-color: rgba(0,245,212,0.2); color: var(--accent-primary); }

/* ===================================================================
   17. CONTACT SECTION
   =================================================================== */
#contact { position: relative; overflow: hidden; }
#contact::before {
  content: 'CONTACT'; position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);
  font-size: clamp(60px,12vw,160px); font-weight: 900; font-family: 'Space Grotesk', sans-serif;
  color: rgba(255,255,255,0.018); pointer-events: none; white-space: nowrap; z-index: 0;
}
.contact-container {
  display: grid; grid-template-columns: 1fr 1.5fr; gap: 48px; position: relative; z-index: 1;
}
.contact-info { display: flex; flex-direction: column; gap: 28px; }
.contact-card {
  background: var(--gradient-glass); padding: 2rem; border-radius: 32px; border: 1px solid var(--glass-border);
  box-shadow: var(--shadow-glass), var(--shadow-inner); backdrop-filter: blur(16px); transition: var(--transition-smooth);
  display: flex; align-items: center; gap: 20px; position: relative; overflow: hidden;
}
.contact-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: var(--grad-primary); background-size: 200% auto; animation: shimmer 4s linear infinite; }
.contact-card:hover { transform: translateX(10px); border-color: rgba(0,245,212,0.25); box-shadow: var(--shadow-lg), var(--shadow-cyan); }
.contact-icon {
  width: 52px; height: 52px; min-width: 52px; background: var(--grad-cyan-violet); border-radius: 16px;
  display: flex; align-items: center; justify-content: center; color: #fff; font-size: 22px;
  box-shadow: 0 8px 24px rgba(0,245,212,0.3); transition: var(--transition-mid);
}
.contact-card:hover .contact-icon { transform: rotate(10deg) scale(1.1); }
.contact-text h3 { font-size: 15px; color: rgba(255,255,255,0.95); font-weight: 700; margin-bottom: 4px; }
.contact-text a, .contact-text span { font-size: 14px; color: var(--text-muted); transition: color 0.3s; word-break: break-all; }
.contact-text a:hover { color: var(--accent-primary); }
.contact-social { margin-top: 8px; }
.contact-social p { font-size: 14px; color: var(--text-dim); margin-bottom: 14px; font-weight: 500; }
.social-links { display: flex; gap: 14px; flex-wrap: wrap; }
.social-links a {
  width: 48px; height: 48px; border-radius: 14px; background: var(--glass-bg); border: 1px solid var(--glass-border);
  display: flex; align-items: center; justify-content: center; color: var(--text-muted); font-size: 20px;
  transition: var(--transition-mid); position: relative; overflow: hidden;
}
.social-links a::before { content: ''; position: absolute; inset: 0; background: var(--grad-primary); opacity: 0; border-radius: inherit; transition: opacity 0.35s ease; }
.social-links a:hover { border-color: transparent; color: #000; transform: translateY(-4px); box-shadow: 0 8px 24px rgba(0,245,212,0.3); }
.social-links a:hover::before { opacity: 1; }
.social-links a i { position: relative; z-index: 1; }
.contact-form-wrapper {
  background: var(--gradient-glass); padding: clamp(2rem, 4vw, 3.5rem); border-radius: 40px;
  border: 1px solid var(--glass-border); box-shadow: var(--shadow-glass), var(--shadow-inner);
  backdrop-filter: blur(24px); position: relative; overflow: hidden;
}
.contact-form-wrapper::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: var(--grad-primary); background-size: 200% auto; animation: shimmer 4s linear infinite; }
.contact-form-wrapper h3 { font-size: clamp(20px,3vw,28px); color: #fff; margin-bottom: 28px; font-weight: 700; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.form-group { display: flex; flex-direction: column; gap: 8px; margin-bottom: 20px; }
.form-group label { font-size: 13px; color: var(--text-muted); font-weight: 600; letter-spacing: 0.5px; text-transform: uppercase; }
.form-group input, .form-group textarea, .form-group select {
  width: 100%; padding: 14px 20px; background: rgba(255,255,255,0.04);
  border: 1px solid var(--glass-border); border-radius: 16px; color: var(--text-main);
  font-family: 'Inter', sans-serif; font-size: 15px; resize: none; transition: var(--transition-mid); outline: none;
}
.form-group input::placeholder, .form-group textarea::placeholder { color: var(--text-dim); }
.form-group input:focus, .form-group textarea:focus, .form-group select:focus { border-color: var(--accent-primary); background: rgba(0,245,212,0.04); box-shadow: 0 0 20px rgba(0,245,212,0.12); }
.form-group textarea { height: 140px; }
.form-group select { cursor: pointer; }
.form-group select option { background: var(--bg-surface); color: var(--text-main); }
.form-submit-btn {
  width: 100%; padding: 17px; background: var(--grad-primary); background-size: 200% auto;
  color: #000; border: none; border-radius: 100px; font-size: 16px; font-weight: 700;
  font-family: 'Space Grotesk', sans-serif; cursor: pointer; transition: var(--transition-mid);
  box-shadow: 0 8px 28px rgba(0,245,212,0.35); display: flex; align-items: center; justify-content: center; gap: 10px;
  animation: shimmer 4s linear infinite; letter-spacing: 0.5px;
}
.form-submit-btn:hover { transform: translateY(-4px); box-shadow: 0 14px 50px rgba(0,245,212,0.5); }
.form-submit-btn:active { transform: translateY(-1px); }
.form-message { margin-top: 16px; padding: 14px 20px; border-radius: 12px; font-size: 14px; font-weight: 500; text-align: center; display: none; }
.form-message.success { background: rgba(0,230,118,0.1); border: 1px solid rgba(0,230,118,0.3); color: #00e676; display: block; }
.form-message.error { background: rgba(255,45,120,0.1); border: 1px solid rgba(255,45,120,0.3); color: var(--accent-tertiary); display: block; }

/* ===================================================================
   18. AI CHATBOT
   =================================================================== */
.chatbot-fab {
  position: fixed; bottom: 36px; right: 36px; z-index: 2000;
  width: 62px; height: 62px; border-radius: 50%;
  background: var(--grad-primary); background-size: 200% auto;
  border: none; cursor: pointer; display: flex; align-items: center; justify-content: center;
  box-shadow: var(--shadow-cyan); animation: fabPulse 3s ease-in-out infinite, shimmer 4s linear infinite;
  transition: var(--transition-mid);
}
.chatbot-fab:hover { transform: scale(1.12) rotate(8deg); box-shadow: 0 12px 48px rgba(0,245,212,0.6); }
.chatbot-fab i { font-size: 28px; color: #000; }
.chatbot-badge {
  position: absolute; top: -4px; right: -4px; width: 22px; height: 22px; border-radius: 50%;
  background: var(--accent-tertiary); color: #fff; font-size: 11px; font-weight: 700;
  display: flex; align-items: center; justify-content: center;
  border: 2px solid var(--bg-base); animation: badgeBounce 2s ease-in-out infinite;
}
.chatbot-tooltip {
  position: absolute; right: 76px; top: 50%; transform: translateY(-50%);
  background: var(--glass-bg-strong); color: var(--text-main); border: 1px solid var(--glass-border);
  padding: 8px 16px; border-radius: 100px; font-size: 13px; font-weight: 600;
  white-space: nowrap; backdrop-filter: blur(12px); pointer-events: none;
  opacity: 0; transition: opacity 0.3s ease;
}
.chatbot-fab:hover .chatbot-tooltip { opacity: 1; }
.chatbot-window {
  position: fixed; bottom: 116px; right: 36px; z-index: 1999;
  width: 380px; height: 580px; max-height: 75vh;
  background: rgba(8, 13, 20, 0.95); border: 1px solid var(--glass-border);
  border-radius: 32px; display: flex; flex-direction: column; overflow: hidden;
  box-shadow: var(--shadow-xl), 0 0 60px rgba(0,245,212,0.15);
  backdrop-filter: blur(40px); transform: scale(0.88) translateY(30px) translateX(20px);
  opacity: 0; pointer-events: none; transition: all 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.chatbot-window.open { opacity: 1; transform: scale(1) translateY(0) translateX(0); pointer-events: all; }
.chat-header {
  padding: 22px 24px; display: flex; align-items: center; gap: 14px;
  background: var(--gradient-glass); border-bottom: 1px solid var(--glass-border); flex-shrink: 0;
}
.chat-avatar {
  width: 46px; height: 46px; background: var(--grad-primary); border-radius: 50%;
  display: flex; align-items: center; justify-content: center; font-size: 22px; flex-shrink: 0;
  position: relative; animation: shimmer 4s linear infinite; background-size: 200% auto;
}
.chat-avatar::after {
  content: ''; position: absolute; bottom: 1px; right: 1px; width: 10px; height: 10px;
  border-radius: 50%; background: #00e676; border: 2px solid var(--bg-elevated);
  animation: statusPulse 2s ease-in-out infinite;
}
.chat-info h4 { font-size: 16px; font-weight: 700; color: #fff; margin-bottom: 2px; }
.chat-info p { font-size: 12px; color: var(--accent-primary); font-weight: 500; }
.chat-close {
  margin-left: auto; width: 34px; height: 34px; border-radius: 50%;
  background: var(--glass-bg); border: 1px solid var(--glass-border);
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; color: var(--text-muted); font-size: 16px; transition: var(--transition-fast);
}
.chat-close:hover { background: rgba(255,45,120,0.15); border-color: var(--accent-tertiary); color: var(--accent-tertiary); }
.chat-messages {
  flex: 1; overflow-y: auto; padding: 24px; display: flex; flex-direction: column; gap: 16px;
  scrollbar-width: thin; scrollbar-color: rgba(0,245,212,0.2) transparent;
}
.chat-messages::-webkit-scrollbar { width: 4px; }
.chat-messages::-webkit-scrollbar-thumb { background: rgba(0,245,212,0.2); border-radius: 100px; }
.chat-msg { max-width: 82%; animation: msgSlideIn 0.35s cubic-bezier(0.16,1,0.3,1) both; }
.chat-msg.bot { align-self: flex-start; }
.chat-msg.user { align-self: flex-end; }
.msg-bubble {
  padding: 12px 18px; border-radius: 22px; font-size: 14px; line-height: 1.6; word-wrap: break-word;
}
.chat-msg.bot .msg-bubble {
  background: var(--glass-bg-strong); border: 1px solid var(--glass-border);
  color: var(--text-main); border-bottom-left-radius: 6px;
}
.chat-msg.user .msg-bubble {
  background: var(--grad-primary); background-size: 200% auto; color: #000;
  border-bottom-right-radius: 6px; font-weight: 500;
}
.msg-time { font-size: 10px; color: var(--text-dim); margin-top: 4px; }
.chat-msg.user .msg-time { text-align: right; }
.typing-indicator { display: flex; gap: 5px; align-items: center; padding: 12px 18px; background: var(--glass-bg-strong); border: 1px solid var(--glass-border); border-radius: 22px; border-bottom-left-radius: 6px; width: fit-content; }
.typing-indicator span { width: 7px; height: 7px; background: var(--accent-primary); border-radius: 50%; animation: typingBounce 1.4s ease-in-out infinite; }
.typing-indicator span:nth-child(2) { animation-delay: 0.2s; }
.typing-indicator span:nth-child(3) { animation-delay: 0.4s; }
.chat-suggestions { padding: 12px 24px 0; display: flex; gap: 8px; flex-wrap: wrap; }
.suggestion-chip {
  padding: 7px 16px; background: rgba(0,245,212,0.06); border: 1px solid rgba(0,245,212,0.2);
  color: var(--accent-primary); border-radius: 100px; font-size: 12px; font-weight: 600; cursor: pointer;
  transition: var(--transition-fast); white-space: nowrap; font-family: 'Inter', sans-serif;
}
.suggestion-chip:hover { background: rgba(0,245,212,0.15); transform: translateY(-2px); }
.chat-input-area { padding: 16px 20px 20px; border-top: 1px solid var(--glass-border); flex-shrink: 0; }
.chat-input-row { display: flex; gap: 12px; align-items: center; }
.chat-input-row input {
  flex: 1; background: rgba(255,255,255,0.05); border: 1px solid var(--glass-border);
  border-radius: 100px; padding: 12px 20px; color: var(--text-main); font-size: 14px;
  font-family: 'Inter', sans-serif; outline: none; transition: var(--transition-fast);
}
.chat-input-row input::placeholder { color: var(--text-dim); }
.chat-input-row input:focus { border-color: var(--accent-primary); background: rgba(0,245,212,0.04); box-shadow: 0 0 16px rgba(0,245,212,0.1); }
.chat-send-btn {
  width: 44px; height: 44px; border-radius: 50%; background: var(--grad-primary); background-size: 200% auto;
  border: none; cursor: pointer; display: flex; align-items: center; justify-content: center;
  color: #000; font-size: 18px; transition: var(--transition-mid); flex-shrink: 0; animation: shimmer 4s linear infinite;
}
.chat-send-btn:hover { transform: scale(1.12) rotate(8deg); box-shadow: 0 6px 20px rgba(0,245,212,0.4); }

/* ===================================================================
   19. FOOTER
   =================================================================== */
footer {
  background: var(--gradient-glass); border-top: 1px solid var(--glass-border);
  padding: clamp(2rem, 4vw, 4rem) 0; position: relative; overflow: hidden;
}
footer::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px; background: var(--grad-primary); background-size: 200% auto; animation: shimmer 4s linear infinite; }
.footer-content {
  display: grid; grid-template-columns: 1.5fr 1fr 1fr 1.5fr; gap: 48px;
  margin-bottom: 48px;
}
.footer-logo .footer-name {
  font-size: 32px; font-weight: 800; font-family: 'Space Grotesk', sans-serif; letter-spacing: -1.5px;
  background: var(--grad-primary); background-size: 200% auto;
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  margin-bottom: 12px; animation: shimmer 4s linear infinite;
}
.footer-logo p { color: var(--text-muted); font-size: 14px; line-height: 1.7; max-width: 280px; }
.footer-section h4 {
  font-size: 14px; font-weight: 700; color: #fff; text-transform: uppercase;
  letter-spacing: 2px; margin-bottom: 20px; position: relative; padding-bottom: 12px;
}
.footer-section h4::after { content: ''; position: absolute; bottom: 0; left: 0; width: 32px; height: 2px; background: var(--grad-primary); border-radius: 100px; }
.footer-section ul { display: flex; flex-direction: column; gap: 10px; }
.footer-section ul li a { color: var(--text-muted); font-size: 14px; transition: var(--transition-fast); position: relative; padding-left: 0; }
.footer-section ul li a:hover { color: var(--accent-primary); padding-left: 8px; }
.footer-social { display: flex; gap: 12px; margin-top: 18px; }
.footer-social a {
  width: 40px; height: 40px; border-radius: 12px; background: var(--glass-bg); border: 1px solid var(--glass-border);
  display: flex; align-items: center; justify-content: center; color: var(--text-muted); font-size: 18px;
  transition: var(--transition-mid); position: relative; overflow: hidden;
}
.footer-social a::before { content: ''; position: absolute; inset: 0; background: var(--grad-primary); opacity: 0; border-radius: inherit; transition: opacity 0.35s ease; }
.footer-social a:hover { border-color: transparent; color: #000; transform: translateY(-4px); }
.footer-social a:hover::before { opacity: 1; }
.footer-social a i { position: relative; z-index: 1; }
.footer-bottom {
  border-top: 1px solid var(--glass-border); padding-top: 28px;
  display: flex; align-items: center; justify-content: space-between; flex-wrap: gap;
}
.footer-bottom p { color: var(--text-dim); font-size: 13px; }
.footer-bottom p span { color: var(--accent-primary); }
.footer-bottom p a { color: var(--accent-primary); font-weight: 600; }
.footer-bottom p a:hover { text-decoration: underline; }
.back-to-top {
  width: 44px; height: 44px; background: var(--grad-primary); background-size: 200% auto;
  border: none; border-radius: 50%; display: flex; align-items: center; justify-content: center;
  color: #000; cursor: pointer; font-size: 20px; transition: var(--transition-mid);
  box-shadow: 0 6px 24px rgba(0,245,212,0.3); animation: shimmer 4s linear infinite;
}
.back-to-top:hover { transform: translateY(-6px); box-shadow: 0 12px 40px rgba(0,245,212,0.5); }

/* ===================================================================
   20. SCROLL TO TOP
   =================================================================== */
.scroll-top-btn {
  position: fixed; bottom: 36px; left: 36px; z-index: 1000;
  width: 48px; height: 48px; background: var(--glass-bg); border: 1px solid var(--glass-border);
  border-radius: 50%; display: flex; align-items: center; justify-content: center;
  color: var(--text-muted); cursor: pointer; font-size: 20px;
  opacity: 0; pointer-events: none; transition: var(--transition-mid);
  backdrop-filter: blur(12px);
}
.scroll-top-btn.visible { opacity: 1; pointer-events: all; }
.scroll-top-btn:hover { background: var(--grad-primary); border-color: transparent; color: #000; transform: translateY(-4px); box-shadow: var(--shadow-cyan); }

/* ===================================================================
   21. MOBILE MENU
   =================================================================== */
.mobile-menu {
  position: fixed; top: 0; right: -100%; width: 300px; height: 100vh;
  background: rgba(8,13,20,0.97); z-index: 999; transition: right 0.45s cubic-bezier(0.16,1,0.3,1);
  display: flex; flex-direction: column; padding: 100px 32px 32px; border-left: 1px solid var(--glass-border);
  backdrop-filter: blur(40px);
}
.mobile-menu.open { right: 0; box-shadow: -20px 0 60px rgba(0,0,0,0.5); }
.mobile-menu ul { display: flex; flex-direction: column; gap: 8px; }
.mobile-menu ul li a {
  display: block; padding: 14px 20px; color: var(--text-muted); font-size: 16px; font-weight: 500;
  border-radius: 16px; transition: var(--transition-mid); border: 1px solid transparent; position: relative; overflow: hidden;
}
.mobile-menu ul li a::before { content: ''; position: absolute; inset: 0; background: var(--grad-primary); opacity: 0; border-radius: inherit; transition: opacity 0.35s ease; }
.mobile-menu ul li a:hover { color: #000; border-color: transparent; }
.mobile-menu ul li a:hover::before { opacity: 1; }
.mobile-menu ul li a span { position: relative; z-index: 1; }
.mobile-close {
  position: absolute; top: 24px; right: 24px; width: 40px; height: 40px;
  background: var(--glass-bg); border: 1px solid var(--glass-border);
  border-radius: 12px; display: flex; align-items: center; justify-content: center;
  cursor: pointer; color: var(--text-muted); font-size: 18px; transition: var(--transition-fast);
}
.mobile-close:hover { background: rgba(255,45,120,0.15); border-color: var(--accent-tertiary); color: var(--accent-tertiary); }
.overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,0.65); z-index: 998;
  opacity: 0; pointer-events: none; transition: opacity 0.35s ease; backdrop-filter: blur(4px);
}
.overlay.show { opacity: 1; pointer-events: all; }

/* ===================================================================
   22. SCROLL ANIMATIONS (AOS-style)
   =================================================================== */
[data-aos] { opacity: 0; transition-duration: 0.9s; transition-timing-function: cubic-bezier(0.16,1,0.3,1); }
[data-aos="fade-up"]    { transform: translateY(50px); }
[data-aos="fade-down"]  { transform: translateY(-50px); }
[data-aos="fade-left"]  { transform: translateX(50px); }
[data-aos="fade-right"] { transform: translateX(-50px); }
[data-aos="zoom-in"]    { transform: scale(0.82); }
[data-aos="flip-up"]    { transform: perspective(600px) rotateX(30deg); }
[data-aos].aos-animate  { opacity: 1; transform: none; }

/* ===================================================================
   23. LIGHT THEME OVERRIDES
   =================================================================== */
.light-theme body { color: var(--text-main); }
.light-theme nav { background: rgba(240,244,248,0.82); border-bottom-color: rgba(0,0,0,0.07); }
.light-theme nav.scrolled { background: rgba(240,244,248,0.97); }
.light-theme .featured-name p { color: #1a2235; }
.light-theme .about-info { background: rgba(255,255,255,0.7); }
.light-theme .skills-box, .light-theme .service-box, .light-theme .project-box,
.light-theme .certification-box, .light-theme .contact-card, .light-theme .stat-item { background: rgba(255,255,255,0.7); }
.light-theme .timeline-content { background: rgba(255,255,255,0.7); }
.light-theme .contact-form-wrapper { background: rgba(255,255,255,0.7); }
.light-theme .form-group input, .light-theme .form-group textarea, .light-theme .form-group select { background: rgba(0,0,0,0.04); border-color: rgba(0,0,0,0.1); color: var(--text-main); }
.light-theme .tech-tag { background: rgba(0,0,0,0.05); border-color: rgba(0,0,0,0.1); color: var(--text-main); }
.light-theme footer { background: rgba(255,255,255,0.8); }
.light-theme .mobile-menu { background: rgba(240,244,248,0.97); }
.light-theme .chatbot-window { background: rgba(240,244,248,0.97); }
.light-theme .chat-msg.bot .msg-bubble { background: rgba(0,0,0,0.06); border-color: rgba(0,0,0,0.1); }
.light-theme #pre_loader { background: #f0f4f8; }

/* ===================================================================
   24. RESPONSIVE DESIGN
   =================================================================== */
@media (max-width: 1100px) {
  .contact-container { grid-template-columns: 1fr; }
  .footer-content { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 900px) {
  .featured-box { flex-direction: column-reverse; text-align: center; padding-top: calc(var(--nav-height) + 1rem); }
  .featured-text-btn { justify-content: center; }
  .social_icons { justify-content: center; }
  .hero-stats { justify-content: center; }
  .featured-text-info p { margin-left: auto; margin-right: auto; }
  .row { flex-direction: column; }
  .nav-menu { display: none; }
  .nav-menu-btn { display: flex; }
  .featured-image { order: -1; }
  .image { width: clamp(220px,60vw,340px); height: clamp(220px,60vw,340px); }
}
@media (max-width: 768px) {
  .form-row { grid-template-columns: 1fr; }
  .contact-container { grid-template-columns: 1fr; }
  .footer-content { grid-template-columns: 1fr 1fr; gap: 32px; }
  .chatbot-window { width: calc(100vw - 32px); right: 16px; bottom: 100px; }
  .chatbot-fab { bottom: 24px; right: 24px; }
  .scroll-top-btn { left: 24px; bottom: 24px; }
}
@media (max-width: 560px) {
  :root { --nav-height: 64px; }
  .nav-logo .nav-name { font-size: 24px; }
  .footer-content { grid-template-columns: 1fr; }
  .project-container { grid-template-columns: 1fr; }
  .service-container { grid-template-columns: 1fr; }
  .certifications-container { grid-template-columns: 1fr; }
  .tools-container { grid-template-columns: repeat(3, 1fr); }
  .filter-btn { padding: 8px 18px; font-size: 12px; }
  .top-header h1 { font-size: clamp(24px,6vw,36px); }
  .hero-stats { gap: 10px; }
  .hero-stat-card { padding: 12px 16px; }
}

/* ===================================================================
   25. UTILITY CLASSES
   =================================================================== */
.text-gradient {
  background: var(--grad-primary); background-size: 200% auto;
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  animation: shimmer 4s linear infinite;
}
.glass-card {
  background: var(--gradient-glass); border: 1px solid var(--glass-border);
  border-radius: var(--r-xl); backdrop-filter: var(--glass-blur);
  box-shadow: var(--shadow-glass), var(--shadow-inner);
}
.neon-border { border: 1px solid var(--accent-primary); box-shadow: 0 0 20px rgba(0,245,212,0.2); }
.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }
.no-select { user-select: none; -webkit-user-select: none; }
.pointer-none { pointer-events: none; }
.visually-hidden { opacity: 0; pointer-events: none; }
.hidden { display: none !important; }
.flex-center { display: flex; align-items: center; justify-content: center; }
.grid-auto { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 28px; }
.mt-auto { margin-top: auto; }
.glow-text { animation: textGlow 3s ease-in-out infinite; }
.hover-lift { transition: transform var(--transition-mid); }
.hover-lift:hover { transform: translateY(-6px); }
'@

$css | Out-File -FilePath "Public\portfolio.css" -Encoding UTF8 -NoNewline
Write-Host "CSS written successfully."
$size = (Get-Item "Public\portfolio.css").Length
Write-Host "File size: $size bytes"
