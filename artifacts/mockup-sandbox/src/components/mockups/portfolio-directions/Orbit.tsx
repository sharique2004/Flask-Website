import React, { useState } from 'react';
import { ArrowUp, Github, Linkedin, Mail, ArrowRight } from 'lucide-react';

export default function OrbitMockup() {
  const [messages, setMessages] = useState([
    { role: 'user', content: 'What did you build at WellX?' },
    { role: 'assistant', content: 'At WellX AI, I built a production RAG pipeline serving over 10,000 users. I implemented hybrid search and citation tracking, reducing hallucinations by 40% while improving response latency.' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    setMessages(prev => [...prev, { role: 'user', content: input }]);
    setInput('');
    
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "I'm a static demo of Mini Sharique, but in the real app I'd use an LLM to answer that based on my portfolio data!" 
      }]);
    }, 1000);
  };

  const timeline = [
    { role: "Software Eng Intern", company: "WellX AI", date: "Dec 2025 – Mar 2026", current: true },
    { role: "DevOps Intern", company: "Penn State ORIS", date: "May–Aug 2025" },
    { role: "SWE Intern", company: "Fourth Square", date: "May–Aug 2024" },
    { role: "Capstone Team Lead", company: "HVAC Digital Twin", date: "2025–2026" },
    { role: "Frontend Intern", company: "SEERA Travel Group", date: "Oct–Dec 2022" },
  ];

  const products = [
    { name: "Donna", tag: "Hackathon Winner", desc: "Voice dispatches surplus food to food banks. Won 1st place at AI Supply Chain Hackathon 2026.", tech: ["Python", "Voice", "LLM"] },
    { name: "Bibi", tag: "Desktop Agent", desc: "Local voice agent that flies a real PC.", tech: ["Python", "Electron", "Ollama", "Claude"] },
    { name: "MeetingScribe", tag: "macOS Native", desc: "On-device only macOS meeting transcriber.", tech: ["Swift", "CoreAudio"] },
    { name: "Aman UAE", tag: "Web App", desc: "Real-time UAE news + LLM source verification. 26K impressions.", tech: ["Next.js", "Vercel"] },
  ];

  return (
    <div className="bg-[#080810] text-slate-200 min-h-screen font-body relative overflow-x-hidden selection:bg-orange-500/30 selection:text-orange-200 scroll-smooth">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Space+Grotesk:wght@300;400;500;600&display=swap');
        
        .font-display { font-family: 'Playfair Display', serif; }
        .font-body { font-family: 'Space Grotesk', sans-serif; }
        
        @keyframes pulse-amber {
          0% { box-shadow: 0 0 0 0 rgba(249, 115, 22, 0.4); }
          70% { box-shadow: 0 0 0 10px rgba(249, 115, 22, 0); }
          100% { box-shadow: 0 0 0 0 rgba(249, 115, 22, 0); }
        }
        @keyframes pulse-green {
          0% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4); }
          70% { box-shadow: 0 0 0 6px rgba(34, 197, 94, 0); }
          100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
        }
        @keyframes orbit-rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes aurora {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(3vw, -5vh) scale(1.1); }
          66% { transform: translate(-2vw, 2vh) scale(0.9); }
          100% { transform: translate(0, 0) scale(1); }
        }
        .aurora-blob {
          position: absolute;
          filter: blur(100px);
          opacity: 0.1;
          animation: aurora 10s infinite alternate ease-in-out;
          border-radius: 50%;
          pointer-events: none;
        }
        .blob-1 { top: -10%; left: -10%; width: 50vw; height: 50vw; background: #3b0764; }
        .blob-2 { top: 40%; right: -20%; width: 60vw; height: 60vw; background: #1e1b4b; animation-delay: -5s; }
        .blob-3 { bottom: -20%; left: 20%; width: 40vw; height: 40vw; background: #312e81; animation-delay: -2s; }
        
        /* Custom scrollbar for chat */
        .chat-scroll::-webkit-scrollbar { width: 6px; }
        .chat-scroll::-webkit-scrollbar-track { background: transparent; }
        .chat-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
        .chat-scroll::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
      `}</style>

      {/* Background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="aurora-blob blob-1"></div>
        <div className="aurora-blob blob-2"></div>
        <div className="aurora-blob blob-3"></div>
      </div>

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 h-20 border-b border-white/[0.06] backdrop-blur-md bg-[#080810]/70 z-50 flex items-center justify-between px-6 md:px-12">
        <div className="font-display text-2xl text-white font-bold tracking-wider">SK<span className="text-orange-500">.</span></div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
          <a href="#work" className="hover:text-white transition-colors">Work</a>
          <a href="#experience" className="hover:text-white transition-colors">Experience</a>
          <a href="#chat" className="hover:text-white transition-colors">Chat</a>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 md:px-12 pt-40 pb-32 relative z-10 flex flex-col gap-40">
        
        {/* HERO */}
        <section className="flex flex-col lg:flex-row items-center justify-between gap-16 min-h-[60vh]">
          <div className="flex flex-col items-start gap-8 flex-1 w-full">
            <div className="flex items-center gap-3 border border-orange-500/20 rounded-full px-4 py-2 bg-orange-500/5">
              <div className="w-2 h-2 rounded-full bg-orange-500" style={{ animation: 'pulse-amber 2s infinite' }}></div>
              <span className="text-orange-400 text-xs font-medium tracking-wide uppercase">Actively looking</span>
            </div>
            
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[1.05] text-white">
              I build things that real people <span className="text-orange-500 italic block mt-2">depend on.</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-400 max-w-xl font-light leading-relaxed">
              Applied AI Engineer. I ship production-ready software, not demos.
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-4 w-full">
              <a href="mailto:sharique.khatri@gmail.com" className="bg-orange-500 text-white px-8 py-4 rounded-md font-medium text-base hover:bg-orange-400 transition-colors shadow-[0_0_20px_rgba(249,115,22,0.4)] hover:shadow-[0_0_30px_rgba(249,115,22,0.6)] flex items-center justify-center gap-3 w-full sm:w-auto">
                <Mail size={18} /> sharique.khatri@gmail.com
              </a>
              <a href="https://github.com/sharique2004" target="_blank" rel="noreferrer" className="border border-white/10 text-white/70 hover:text-white hover:border-white/30 px-6 py-4 rounded-md transition-all flex items-center justify-center gap-3 bg-white/5 w-full sm:w-auto">
                <Github size={18} /> GitHub
              </a>
              <a href="#" target="_blank" rel="noreferrer" className="border border-white/10 text-white/70 hover:text-white hover:border-white/30 px-6 py-4 rounded-md transition-all flex items-center justify-center gap-3 bg-white/5 w-full sm:w-auto">
                <Linkedin size={18} /> LinkedIn
              </a>
            </div>
          </div>

          <div className="relative w-72 h-72 lg:w-96 lg:h-96 flex-shrink-0 mx-auto lg:mx-0 mt-8 lg:mt-0">
            {/* Orbital ring */}
            <svg className="absolute -inset-8 w-[calc(100%+4rem)] h-[calc(100%+4rem)] text-orange-500 pointer-events-none" viewBox="0 0 100 100" style={{ animation: 'orbit-rotate 30s linear infinite' }}>
              <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.2" strokeDasharray="2 4" className="opacity-40" />
              <circle cx="50" cy="2" r="1.5" fill="currentColor" style={{ filter: 'drop-shadow(0 0 4px rgba(249,115,22,0.8))' }} />
              <circle cx="84" cy="16" r="1" fill="currentColor" className="opacity-50" />
            </svg>
            
            <div className="absolute inset-0 rounded-full overflow-hidden border border-orange-500/30 bg-[#0f0f1a] shadow-[0_0_50px_rgba(249,115,22,0.15)] group z-10">
              <img src="/__mockup/images/headshot.jpg" alt="Sharique Khatri" 
                    onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling?.classList.remove('hidden'); }}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity mix-blend-luminosity hover:mix-blend-normal duration-700" />
              <div className="hidden absolute inset-0 flex items-center justify-center font-display text-7xl text-orange-500/40 tracking-tighter">
                  SK
              </div>
            </div>
          </div>
        </section>

        {/* PRODUCTS */}
        <section id="work" className="flex flex-col gap-16">
          <h2 className="font-display text-4xl text-white flex items-center gap-6">
            <span className="w-12 h-[1px] bg-orange-500"></span> Selected Work
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {products.map((p, i) => (
              <div key={i} className="group p-8 rounded-xl bg-[#0f0f1a] border border-white/[0.06] hover:border-orange-500/40 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden flex flex-col min-h-[240px]">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 via-transparent to-orange-500/0 group-hover:from-orange-500/5 transition-colors pointer-events-none"></div>
                
                <div className="text-orange-500 font-mono text-xs font-semibold tracking-wider uppercase mb-4">{p.tag}</div>
                <h3 className="text-3xl font-display text-white group-hover:text-orange-400 transition-colors mb-3">{p.name}</h3>
                <p className="text-slate-400 text-base leading-relaxed flex-1">{p.desc}</p>
                
                <div className="flex flex-wrap items-center justify-between gap-4 mt-8 pt-6 border-t border-white/5">
                  <div className="flex flex-wrap gap-2">
                    {p.tech.map((t, j) => (
                      <span key={j} className="text-xs font-mono bg-orange-500/10 text-orange-400 px-2.5 py-1 rounded-sm border border-orange-500/20">{t}</span>
                    ))}
                  </div>
                  <a href="#" className="text-white group-hover:text-orange-400 transition-colors flex items-center gap-2 text-sm font-medium">
                    View <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TIMELINE */}
        <section id="experience" className="flex flex-col gap-16">
          <h2 className="font-display text-4xl text-white flex items-center gap-6">
            <span className="w-12 h-[1px] bg-orange-500"></span> Experience
          </h2>
          
          <div className="relative py-8">
            {/* Center line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-orange-500/0 via-orange-500/30 to-orange-500/0 transform md:-translate-x-1/2"></div>
            
            <div className="flex flex-col gap-16">
              {timeline.map((item, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <div key={i} className={`relative flex flex-col md:flex-row items-start md:items-center ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} gap-4 md:gap-0`}>
                    
                    {/* Timeline Dot */}
                    <div className="absolute left-6 md:left-1/2 top-2 md:top-1/2 w-3 h-3 rounded-full bg-orange-500 transform -translate-x-1/2 md:-translate-y-1/2" style={item.current ? { animation: 'pulse-amber 2s infinite' } : { border: '2px solid #080810' }}></div>
                    
                    {/* Content Left/Right */}
                    <div className={`pl-16 md:pl-0 w-full md:w-1/2 ${isLeft ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'} flex flex-col gap-2`}>
                      <h4 className="text-2xl font-display text-white">{item.company}</h4>
                      <div className="font-mono text-xs text-orange-400 uppercase tracking-widest">{item.role}</div>
                      <div className="text-sm text-slate-500 mt-2 md:hidden font-mono">{item.date}</div>
                    </div>
                    
                    {/* Date Left/Right */}
                    <div className={`hidden md:block w-1/2 ${isLeft ? 'pl-16 text-left' : 'pr-16 text-right'} text-slate-500 font-mono text-sm tracking-wide`}>
                      {item.date}
                    </div>
                    
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* CHAT BOX */}
        <section id="chat" className="flex flex-col gap-12 items-center">
          <div className="text-center flex flex-col items-center gap-4">
            <h2 className="font-display text-4xl text-white">Ask anything.</h2>
            <p className="text-slate-400">An interactive AI answering from my context.</p>
          </div>

          <div className="bg-[#0f0f1a] w-full max-w-2xl rounded-2xl border border-orange-500/30 overflow-hidden shadow-[0_0_40px_rgba(249,115,22,0.05)] relative z-10">
            {/* Header */}
            <div className="border-b border-white/5 bg-white/[0.02] p-5 flex items-center justify-between backdrop-blur-sm">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-orange-500/10 border border-orange-500/30 flex items-center justify-center font-display text-xl text-orange-500">
                    MS
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-[#0f0f1a]" style={{ animation: 'pulse-green 2s infinite' }}></div>
                </div>
                <div>
                  <h3 className="text-white font-medium text-lg">Mini Sharique</h3>
                  <div className="text-xs text-slate-400 font-mono">Agent status: Online</div>
                </div>
              </div>
            </div>
            
            {/* Messages */}
            <div className="p-6 h-[350px] overflow-y-auto flex flex-col gap-6 chat-scroll bg-gradient-to-b from-transparent to-black/20">
              {messages.map((m, i) => (
                <div key={i} className={`max-w-[85%] rounded-2xl p-4 text-[15px] leading-relaxed shadow-sm ${m.role === 'user' ? 'bg-orange-500/10 text-orange-50 border border-orange-500/20 self-end rounded-tr-sm' : 'bg-white/[0.03] text-slate-300 border border-white/10 self-start rounded-tl-sm'}`}>
                  {m.content}
                </div>
              ))}
            </div>
            
            {/* Input */}
            <div className="p-5 bg-[#0a0a14] border-t border-white/5">
              <form onSubmit={handleSend} className="flex items-center gap-3 relative">
                <input type="text" value={input} onChange={e => setInput(e.target.value)} placeholder="Ask about my experience, skills, or projects..." className="flex-1 bg-white/[0.03] border border-white/10 rounded-full px-6 py-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-orange-500/50 focus:bg-white/[0.05] transition-all" />
                <button type="submit" disabled={!input.trim()} className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange-400 transition-all shadow-[0_0_15px_rgba(249,115,22,0.4)] flex-shrink-0 active:scale-95">
                  <ArrowUp size={20} />
                </button>
              </form>
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/[0.06] bg-[#080810] py-8 px-6 md:px-12 mt-20 relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-slate-500 text-sm font-mono">
            © {new Date().getFullYear()} Sharique Khatri. All rights reserved.
          </div>
          <div className="flex items-center gap-6 text-sm text-slate-500">
            <a href="mailto:sharique.khatri@gmail.com" className="hover:text-orange-400 transition-colors">Email</a>
            <a href="https://github.com/sharique2004" className="hover:text-orange-400 transition-colors" target="_blank" rel="noreferrer">GitHub</a>
            <a href="#" className="hover:text-orange-400 transition-colors" target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
