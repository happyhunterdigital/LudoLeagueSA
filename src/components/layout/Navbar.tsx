import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { Heart, ShoppingCart, X, ArrowUpRight, ShieldAlert } from 'lucide-react';

interface NavbarProps {
  scaleX: any;
  cart: string[];
  wishlist: string[];
  activeSection: string;
  scrollToSection: (id: string) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  openCart: () => void;
}

interface NavigationLink {
  id: string;
  label: string;
}

interface NavigationGroup {
  categoryName: string;
  colorScheme: [number, number, number]; // RGB normalized channels
  links: NavigationLink[];
}

const CONSOLIDATED_MENU: NavigationGroup[] = [
  {
    categoryName: "01. Circuit Arena",
    colorScheme: [0.0, 0.79, 0.65], // Acid Teal
    links: [
      { id: "home", label: "Home Base" },
      { id: "tournaments", label: "Tournaments" },
      { id: "leagues", label: "Leagues" },
      { id: "history", label: "Hall of Fame" },
      { id: "gallery", label: "Gallery" },
      { id: "newsupdates", label: "News & Affairs" }
    ]
  },
  {
    categoryName: "02. Social Impact",
    colorScheme: [0.83, 0.18, 0.18], // Ludo Red
    links: [
      { id: "ludo4schools", label: "Ludo 4 Schools" },
      { id: "donate", label: "Community Fund" },
      { id: "about", label: "Identity & Vision" }
    ]
  },
  {
    categoryName: "03. Platform Access",
    colorScheme: [0.05, 0.65, 0.91], // Sky Blue
    links: [
      { id: "portal", label: "Player Portal" },
      { id: "contact", label: "Get In Touch" },
      { id: "admin", label: "Secure Console" }
    ]
  }
];

const canvasVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1], when: "beforeChildren", staggerChildren: 0.04 }
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.02, staggerDirection: -1, when: "afterChildren" }
  }
};

export const Navbar: React.FC<NavbarProps> = ({
  scaleX, cart, wishlist, activeSection, scrollToSection, mobileMenuOpen, setMobileMenuOpen, openCart
}) => {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const currentFluidColor = useRef<[number, number, number]>([1.0, 0.84, 0.0]); // Default Gold
  const mousePos = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, vx: 0, vy: 0 });

  const pointerX = useMotionValue(-100);
  const pointerY = useMotionValue(-100);
  const smoothX = useSpring(pointerX, { damping: 45, stiffness: 450, mass: 0.35 });
  const smoothY = useSpring(pointerY, { damping: 45, stiffness: 450, mass: 0.35 });

  const toggleOverlayMenu = () => {
    if (!mobileMenuOpen) {
      setHoveredLink(null);
    }
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleNavigationTrigger = (id: string) => {
    setMobileMenuOpen(false);
    setTimeout(() => { scrollToSection(id); }, 250);
  };

  useEffect(() => {
    const processCursorMovement = (e: MouseEvent) => {
      pointerX.set(e.clientX);
      pointerY.set(e.clientY);
      if (mobileMenuOpen) {
        mousePos.current.targetX = e.clientX / window.innerWidth;
        mousePos.current.targetY = 1.0 - (e.clientY / window.innerHeight);
      }
    };
    window.addEventListener("mousemove", processCursorMovement);
    return () => window.removeEventListener("mousemove", processCursorMovement);
  }, [mobileMenuOpen, pointerX, pointerY]);

  useEffect(() => {
    if (!mobileMenuOpen || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const gl = canvas.getContext("webgl");
    if (!gl) return;

    const resizeMatrix = () => {
      canvas.width = window.innerWidth * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resizeMatrix();
    window.addEventListener("resize", resizeMatrix);

    const vsSource = `attribute vec2 pos;varying vec2 uv;void main(){uv=pos*0.5+0.5;gl_Position=vec4(pos,0.,1.);}`;
    const fsSource = `precision mediump float;varying vec2 uv;uniform vec2 mouse;uniform vec2 vel;uniform vec3 col;uniform float time;
      void main(){vec2 dV=uv-mouse;float d=length(dV);float rip=sin(d*30.-time*4.)*exp(-d*4.);float f=length(vel)*exp(-d*10.);
      float a=smoothstep(.35,0.,d)*.35+(rip*f*.65);gl_FragColor=vec4(col*clamp(a,0.,.7),clamp(a,0.,.7));}`;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };

    const program = gl.createProgram()!;
    gl.attachShader(program, compile(gl.VERTEX_SHADER, vsSource));
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fsSource));
    gl.linkProgram(program);
    gl.useProgram(program);

    const quadBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, -1,1, 1,-1, 1,1]), gl.STATIC_DRAW);

    const posAttr = gl.getAttribLocation(program, "pos");
    gl.enableVertexAttribArray(posAttr);
    gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0);

    const uMouse = gl.getUniformLocation(program, "mouse");
    const uVel = gl.getUniformLocation(program, "vel");
    const uCol = gl.getUniformLocation(program, "col");
    const uTime = gl.getUniformLocation(program, "time");

    let animId: number;
    const startTime = performance.now();

    const loop = () => {
      const elapsed = (performance.now() - startTime) * 0.001;
      const m = mousePos.current;
      m.x += (m.targetX - m.x) * 0.1;
      m.y += (m.targetY - m.y) * 0.1;
      m.vx = (m.targetX - m.x) * 0.5;
      m.vy = (m.targetY - m.y) * 0.5;

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.uniform2f(uMouse, m.x, m.y);
      gl.uniform2f(uVel, m.vx, m.vy);
      gl.uniform3f(uCol, currentFluidColor.current[0], currentFluidColor.current[1], currentFluidColor.current[2]);
      gl.uniform1f(uTime, elapsed);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animId = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resizeMatrix);
      gl.deleteProgram(program);
      gl.deleteBuffer(quadBuffer);
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "unset";
  }, [mobileMenuOpen]);

  return (
    <>
      <motion.div className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#FFD700] to-[#E6C200] z-[9999] origin-left" style={{ scaleX }} />

      {/* Slimmed padding layout across mobile and desktop classes (py-3 md:py-4) */}
      <nav className="fixed top-0 left-0 right-0 z-[1000] px-6 md:px-12 py-3 md:py-4 bg-black/95 backdrop-blur-md border-b border-neutral-900 select-none transition-all duration-300">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <button onClick={() => handleNavigationTrigger("home")} className="flex items-center gap-3 group tracking-normal select-none">
            <img src="https://res.cloudinary.com/dkyg07qvv/image/upload/v1776949471/The_Ludo_League_Logo_p2pzvn.jpg" alt="LLSA Branding Badge" className="w-11 h-11 rounded-2xl object-cover border border-neutral-800 shadow-md transition-transform duration-500 group-hover:rotate-6" />
            {/* Multi-color word branding applied directly (Ludo: Red, League: Gold, SA: Sky Blue) */}
            <span className="text-xl sm:text-2xl font-display italic font-black uppercase tracking-tight flex gap-1.5 select-none">
              <span className="text-[#d32f2f]">Ludo</span>
              <span className="text-[#FFD700]">League</span>
              <span className="text-[#0ea5e9]">SA</span>
            </span>
          </button>

          <div className="flex items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-2 pr-4 border-r border-neutral-800">
              <button onClick={openCart} className="relative p-2 text-neutral-400 hover:text-[#FFD700] transition-colors" aria-label="Wishlist">
                <Heart size={20} fill={wishlist.length > 0 ? "#FFD700" : "none"} className={wishlist.length > 0 ? "text-[#FFD700]" : ""} />
              </button>
              <button onClick={openCart} className="relative p-2 text-neutral-400 hover:text-[#FFD700] transition-colors" aria-label="Shopping Cart">
                <ShoppingCart size={20} fill={cart.length > 0 ? "#FFD700" : "none"} className={cart.length > 0 ? "text-[#FFD700]" : ""} />
                {cart.length > 0 && (
                  <span className="absolute top-0.5 right-0.5 w-4.5 h-4.5 bg-[#FFD700] text-black text-[9px] font-black flex items-center justify-center rounded-full shadow-md">{cart.length}</span>
                )}
              </button>
            </div>
            <button onClick={() => handleNavigationTrigger("shop")} className="hidden sm:flex items-center gap-2 px-6 py-3 bg-neutral-900 border border-neutral-800 hover:border-[#FFD700] text-white hover:text-[#FFD700] font-black uppercase text-[11px] tracking-widest rounded-xl transition-all">Equipment Shop</button>
            <button onClick={toggleOverlayMenu} className="px-5 py-3 bg-[#FFD700] text-black font-black uppercase text-[11px] tracking-widest rounded-xl flex items-center gap-2 shadow-lg transition-transform active:scale-95" aria-label="Open Navigation Index">
              MENU
              <div className="flex flex-col gap-0.5 w-3">
                <span className="w-full h-0.5 bg-black" />
                <span className="w-full h-0.5 bg-black" />
              </div>
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: hoveredLink ? 1.8 : 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }} className="fixed top-0 left-0 w-8 h-8 border-2 border-[#FFD700] rounded-full pointer-events-none z-[10000] mix-blend-difference hidden md:block" style={{ x: smoothX, y: smoothY, translateX: "-50%", translateY: "-50%" }} />

            <motion.div variants={canvasVariants} initial="hidden" animate="visible" exit="exit" className="fixed inset-0 z-[9000] bg-black text-white flex flex-col justify-between p-8 md:p-12 overflow-y-auto">
              <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-70 mix-blend-screen" />

              <div className="flex justify-between items-center w-full max-w-5xl mx-auto py-4 border-b border-neutral-900 z-20 mix-blend-difference">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-500 flex items-center gap-2">
                  <ShieldAlert size={12} className="text-[#FFD700]" /> SYSTEM INDEX
                </span>
                <button onClick={toggleOverlayMenu} className="px-4 py-2 bg-neutral-900 border border-neutral-800 text-white rounded-xl text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:border-[#FFD700] transition-colors"><X size={14} /> Close</button>
              </div>

              <div className="w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 my-auto py-12 z-20">
                {CONSOLIDATED_MENU.map((group, groupIdx) => (
                  <div key={groupIdx} className="flex flex-col space-y-6">
                    <h3 className="text-xs font-black tracking-widest uppercase text-neutral-600 border-b border-neutral-900 pb-2">{group.categoryName}</h3>
                    <div className="flex flex-col space-y-1">
                      {group.links.map((link) => {
                        const isSelected = activeSection === link.id;
                        const isAnyHovered = hoveredLink !== null;
                        const isSelfHovered = hoveredLink === link.id;

                        return (
                          <div key={link.id} className="overflow-hidden py-1">
                            <button
                              onClick={() => handleNavigationTrigger(link.id)}
                              onMouseEnter={() => {
                                setHoveredLink(link.id);
                                currentFluidColor.current = group.colorScheme;
                              }}
                              onMouseLeave={() => {
                                setHoveredLink(null);
                                currentFluidColor.current = [1.0, 0.84, 0.0];
                              }}
                              className="w-full text-left text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-black uppercase italic tracking-tighter transition-all duration-500 ease-thonik-ease hover:pl-4 flex items-center justify-between group text-white"
                              style={{ opacity: isSelfHovered ? 1.0 : isAnyHovered ? 0.15 : isSelected ? 1.0 : 0.4 }}
                            >
                              <span>{link.label}</span>
                              <ArrowUpRight size={24} className={`text-[#FFD700] transition-transform duration-300 ${isSelfHovered ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"}`} />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <div className="w-full max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-[10px] tracking-widest uppercase text-neutral-500 pt-6 border-t border-neutral-900 z-20 mix-blend-difference">
                <div><p className="font-bold text-neutral-400 mb-1">Corporate HQ</p><p>Pretoria, Gauteng, ZA</p></div>
                <div><p className="font-bold text-neutral-400 mb-1">Administrative Mail</p><p>info@ludoleague.co.za</p></div>
                <div><p className="font-bold text-neutral-400 mb-1">Ecosystem Engineers</p><p className="text-white font-black">Happy Hunter Smart Marketing</p></div>
                <div className="text-right self-end font-mono text-neutral-700">©2026 COU_CONFIG</div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
