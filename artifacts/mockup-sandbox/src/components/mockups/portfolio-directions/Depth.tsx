import React from "react";
import { ArrowUp, ArrowRight, ExternalLink, Github, Send, Terminal, Sparkles, MapPin, Mail, ChevronRight, FileText } from "lucide-react";

export default function DepthPortfolio() {
  return (
    <div className="min-h-screen bg-[#060d1a] text-slate-200 font-sans selection:bg-indigo-500/30 selection:text-indigo-200 overflow-x-hidden relative">
      {/* Background Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-indigo-600/20 blur-[120px] mix-blend-screen opacity-50 animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="absolute top-[40%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-teal-600/20 blur-[100px] mix-blend-screen opacity-40 animate-pulse" style={{ animationDuration: '10s' }}></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[60vw] h-[60vw] rounded-full bg-indigo-900/30 blur-[120px] mix-blend-screen opacity-50"></div>
      </div>

      {/* Floating Noise Texture overlay for real depth feel */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.015] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

      {/* Nav */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-6 px-6 py-3 rounded-full bg-white/[0.03] backdrop-blur-xl border border-indigo-500/20 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
        <div className="flex items-center gap-2 font-medium text-white tracking-wide">
          <div className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-300 text-sm font-bold shadow-[0_0_15px_rgba(99,102,241,0.2)]">
            SK
          </div>
        </div>
        <div className="h-4 w-px bg-white/10"></div>
        <div className="flex items-center gap-6 text-sm font-medium text-slate-300">
          <a href="#work" className="hover:text-white transition-colors">Work</a>
          <a href="#experience" className="hover:text-white transition-colors">Experience</a>
          <a href="#chat" className="hover:text-white transition-colors flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-teal-400" />
            Ask AI
          </a>
        </div>
      </nav>

      <main className="relative z-10">
        {/* HERO SECTION */}
        <section className="relative min-h-screen flex items-center justify-center pt-24 pb-12 px-6">
          <div className="max-w-[80%] w-full relative">
            
            {/* Floating Achievement Chips */}
            <div className="absolute -top-6 -left-6 z-20 px-4 py-2 rounded-full bg-white/[0.05] backdrop-blur-md border border-indigo-500/30 shadow-[0_4px_20px_rgba(0,0,0,0.5)] text-sm font-medium text-indigo-200 flex items-center gap-2 animate-[float_4s_ease-in-out_infinite]">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              ECCV 2026
            </div>
            <div className="absolute top-12 -right-12 z-20 px-4 py-2 rounded-full bg-white/[0.05] backdrop-blur-md border border-teal-500/30 shadow-[0_4px_20px_rgba(0,0,0,0.5)] text-sm font-medium text-teal-200 flex items-center gap-2 animate-[float_5s_ease-in-out_infinite_reverse]">
              <Terminal className="w-4 h-4 text-teal-400" />
              10K+ Users
            </div>
            <div className="absolute -bottom-8 left-12 z-20 px-4 py-2 rounded-full bg-white/[0.05] backdrop-blur-md border border-indigo-400/20 shadow-[0_4px_20px_rgba(0,0,0,0.5)] text-sm font-medium text-slate-200 flex items-center gap-2 animate-[float_6s_ease-in-out_infinite]">
              1st Place Hackathon
            </div>

            {/* Main Hero Card */}
            <div className="w-full rounded-[2.5rem] bg-white/[0.02] backdrop-blur-[20px] border border-white/[0.08] shadow-[0_24px_64px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.1)] p-12 md:p-16 flex flex-col lg:flex-row items-center gap-12 relative overflow-hidden">
              
              {/* Inner Card Glare */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent pointer-events-none"></div>

              {/* Left Content */}
              <div className="w-full lg:w-[60%] relative z-10 flex flex-col items-start text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-sm font-medium text-slate-300 mb-8">
                  <div className="w-2 h-2 rounded-full bg-teal-400 shadow-[0_0_8px_rgba(20,184,166,0.8)] animate-pulse"></div>
                  Available for new roles
                </div>
                
                <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-white leading-[1.1] mb-6">
                  Software that real people <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-indigo-600">depend on</span>, not demos.
                </h1>
                
                <p className="text-lg md:text-xl text-slate-400 leading-relaxed mb-10 max-w-xl font-light">
                  I'm <span className="text-white font-medium">Sharique Khatri</span>, an Applied AI Engineer. Penn State CS '26. Building production systems and autonomous agents.
                </p>
                
                <div className="flex flex-wrap items-center gap-4">
                  <button className="px-6 py-3 rounded-full bg-indigo-500 hover:bg-indigo-400 text-white font-medium transition-all shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:shadow-[0_0_30px_rgba(99,102,241,0.6)] flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Contact Me
                  </button>
                  <button className="px-6 py-3 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-white font-medium transition-all flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    View Resume
                  </button>
                  <a href="https://github.com/sharique2004" className="w-12 h-12 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 flex items-center justify-center text-white transition-all ml-2">
                    <Github className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Right Content - Photo */}
              <div className="w-full lg:w-[40%] flex justify-center relative z-10">
                <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full group">
                  <div className="absolute inset-0 rounded-full bg-indigo-500/20 blur-xl group-hover:bg-indigo-500/30 transition-all duration-500 shadow-[0_0_40px_rgba(99,102,241,0.5)]"></div>
                  <div className="absolute -inset-1 rounded-full border border-indigo-500/50 group-hover:border-indigo-400/70 transition-all duration-500"></div>
                  
                  <div className="relative w-full h-full rounded-full overflow-hidden bg-slate-800 flex items-center justify-center border border-white/10">
                    {/* Fallback to Initials if image fails */}
                    <span className="absolute text-5xl text-slate-600 font-bold">SK</span>
                    <img 
                      src="/__mockup/images/headshot.jpg" 
                      alt="Sharique Khatri" 
                      className="w-full h-full object-cover relative z-10 transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => (e.currentTarget.style.opacity = '0')}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#060d1a] via-transparent to-transparent opacity-60 z-20"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PRODUCTS SECTION */}
        <section id="work" className="py-24 px-6 relative z-10 max-w-7xl mx-auto">
          <div className="mb-16 flex flex-col items-center text-center">
            <span className="text-indigo-400 text-xs font-bold tracking-widest uppercase mb-4">Selected Work</span>
            <h2 className="text-4xl md:text-5xl font-semibold text-white tracking-tight">Products & Research</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product 1 */}
            <div className="group relative rounded-3xl bg-white/[0.02] backdrop-blur-xl border border-white/5 p-8 transition-all hover:bg-white/[0.04] hover:border-indigo-500/30 hover:shadow-[0_0_40px_rgba(99,102,241,0.15)] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <span className="text-teal-400 text-sm font-medium">Hackathon Winner</span>
                  <div className="flex gap-2">
                    <button className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
                      <ExternalLink className="w-3.5 h-3.5 text-slate-300" />
                    </button>
                    <button className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
                      <Github className="w-3.5 h-3.5 text-slate-300" />
                    </button>
                  </div>
                </div>
                
                <h3 className="text-2xl font-semibold text-white mb-3">Donna</h3>
                <p className="text-slate-400 mb-8 leading-relaxed">
                  Voice dispatches surplus food to food banks. Won 1st place at AI Supply Chain Hackathon 2026 out of 500+ participants.
                </p>
                
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium">Voice AI</span>
                  <span className="px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-300 text-xs font-medium">Next.js</span>
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-medium">Logistics</span>
                </div>
              </div>
            </div>

            {/* Product 2 */}
            <div className="group relative rounded-3xl bg-white/[0.02] backdrop-blur-xl border border-white/5 p-8 transition-all hover:bg-white/[0.04] hover:border-indigo-500/30 hover:shadow-[0_0_40px_rgba(99,102,241,0.15)] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <span className="text-teal-400 text-sm font-medium">Autonomous Agent</span>
                  <div className="flex gap-2">
                    <button className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
                      <Github className="w-3.5 h-3.5 text-slate-300" />
                    </button>
                  </div>
                </div>
                
                <h3 className="text-2xl font-semibold text-white mb-3">Bibi</h3>
                <p className="text-slate-400 mb-8 leading-relaxed">
                  Local voice agent that flies a real PC. Executes desktop commands and automates complex multi-step workflows.
                </p>
                
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium">Python</span>
                  <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium">Electron</span>
                  <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium">Ollama</span>
                </div>
              </div>
            </div>

            {/* Product 3 */}
            <div className="group relative rounded-3xl bg-white/[0.02] backdrop-blur-xl border border-white/5 p-8 transition-all hover:bg-white/[0.04] hover:border-indigo-500/30 hover:shadow-[0_0_40px_rgba(99,102,241,0.15)] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <span className="text-teal-400 text-sm font-medium">Native App</span>
                  <div className="flex gap-2">
                    <button className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
                      <ExternalLink className="w-3.5 h-3.5 text-slate-300" />
                    </button>
                  </div>
                </div>
                
                <h3 className="text-2xl font-semibold text-white mb-3">MeetingScribe</h3>
                <p className="text-slate-400 mb-8 leading-relaxed">
                  macOS meeting transcriber that runs strictly on-device for total privacy. Never sends audio data to the cloud.
                </p>
                
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium">Swift</span>
                  <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium">CoreAudio</span>
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-medium">Whisper</span>
                </div>
              </div>
            </div>

            {/* Product 4 */}
            <div className="group relative rounded-3xl bg-white/[0.02] backdrop-blur-xl border border-white/5 p-8 transition-all hover:bg-white/[0.04] hover:border-indigo-500/30 hover:shadow-[0_0_40px_rgba(99,102,241,0.15)] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <span className="text-teal-400 text-sm font-medium">Web Platform</span>
                  <div className="flex gap-2">
                    <button className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
                      <ExternalLink className="w-3.5 h-3.5 text-slate-300" />
                    </button>
                  </div>
                </div>
                
                <h3 className="text-2xl font-semibold text-white mb-3">Aman UAE</h3>
                <p className="text-slate-400 mb-8 leading-relaxed">
                  Real-time UAE news aggregator with LLM-powered source verification. Scaled to 26K+ impressions in first month.
                </p>
                
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-300 text-xs font-medium">Next.js</span>
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-medium">RAG</span>
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-medium">Vercel</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* EXPERIENCE TIMELINE */}
        <section id="experience" className="py-24 px-6 relative z-10 max-w-5xl mx-auto">
          <div className="mb-16 flex flex-col items-center text-center">
            <span className="text-indigo-400 text-xs font-bold tracking-widest uppercase mb-4">Journey</span>
            <h2 className="text-4xl md:text-5xl font-semibold text-white tracking-tight">Experience</h2>
          </div>

          <div className="relative">
            {/* Center Line */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-indigo-500/50 to-transparent"></div>

            <div className="space-y-12">
              {/* Timeline Item 1 - Current */}
              <div className="relative flex items-center justify-between w-full">
                <div className="w-[45%] text-right pr-8">
                  <div className="inline-block relative rounded-2xl bg-indigo-500/10 backdrop-blur-md border border-indigo-500/50 p-6 shadow-[0_0_30px_rgba(99,102,241,0.2)] text-left w-full max-w-sm ml-auto">
                    <span className="text-indigo-300 text-sm font-medium mb-1 block">Dec 2025 – Mar 2026</span>
                    <h4 className="text-xl font-semibold text-white mb-1">WellX AI</h4>
                    <p className="text-teal-400 font-medium text-sm mb-3">Software Eng Intern</p>
                    <p className="text-slate-400 text-sm leading-relaxed">Built production RAG systems serving 10,000+ users. Remote from Dubai.</p>
                  </div>
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#060d1a] border-2 border-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.8)] z-10"></div>
                <div className="w-[45%]"></div>
              </div>

              {/* Timeline Item 2 */}
              <div className="relative flex items-center justify-between w-full">
                <div className="w-[45%]"></div>
                <div className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#060d1a] border-2 border-white/30 z-10"></div>
                <div className="w-[45%] pl-8">
                  <div className="inline-block relative rounded-2xl bg-white/[0.02] backdrop-blur-md border border-white/5 p-6 transition-all hover:bg-white/[0.04] text-left w-full max-w-sm">
                    <span className="text-slate-400 text-sm font-medium mb-1 block">May – Aug 2025</span>
                    <h4 className="text-xl font-semibold text-white mb-1">Penn State ORIS</h4>
                    <p className="text-teal-400 font-medium text-sm mb-3">DevOps Intern</p>
                    <p className="text-slate-400 text-sm leading-relaxed">C# .NET, Azure DevOps. Achieved 40% faster deploy cycles.</p>
                  </div>
                </div>
              </div>

              {/* Timeline Item 3 */}
              <div className="relative flex items-center justify-between w-full">
                <div className="w-[45%] text-right pr-8">
                  <div className="inline-block relative rounded-2xl bg-white/[0.02] backdrop-blur-md border border-white/5 p-6 transition-all hover:bg-white/[0.04] text-left w-full max-w-sm ml-auto">
                    <span className="text-slate-400 text-sm font-medium mb-1 block">May – Aug 2024</span>
                    <h4 className="text-xl font-semibold text-white mb-1">Fourth Square</h4>
                    <p className="text-teal-400 font-medium text-sm mb-3">SWE Intern</p>
                    <p className="text-slate-400 text-sm leading-relaxed">LangChain integrations, processed 1K+ production queries daily.</p>
                  </div>
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#060d1a] border-2 border-white/30 z-10"></div>
                <div className="w-[45%]"></div>
              </div>

              {/* Timeline Item 4 */}
              <div className="relative flex items-center justify-between w-full">
                <div className="w-[45%]"></div>
                <div className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#060d1a] border-2 border-white/30 z-10"></div>
                <div className="w-[45%] pl-8">
                  <div className="inline-block relative rounded-2xl bg-white/[0.02] backdrop-blur-md border border-white/5 p-6 transition-all hover:bg-white/[0.04] text-left w-full max-w-sm">
                    <span className="text-slate-400 text-sm font-medium mb-1 block">2025 – 2026</span>
                    <h4 className="text-xl font-semibold text-white mb-1">HVAC Digital Twin</h4>
                    <p className="text-teal-400 font-medium text-sm mb-3">Capstone Team Lead</p>
                    <p className="text-slate-400 text-sm leading-relaxed">Sponsored by Carrier. Led full-stack development of digital twin.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CHAT BOX */}
        <section id="chat" className="py-24 px-6 relative z-10 max-w-4xl mx-auto">
          <div className="rounded-[2rem] bg-white/[0.02] backdrop-blur-[30px] border border-white/10 p-1 relative overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-transparent to-teal-500/20 opacity-30 pointer-events-none"></div>
            
            <div className="rounded-[1.8rem] bg-[#060d1a]/80 h-[500px] flex flex-col relative z-10">
              {/* Chat Header */}
              <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-300 font-bold">
                      SK
                    </div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-teal-400 border-2 border-[#060d1a] animate-pulse"></div>
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Mini Sharique</h3>
                    <p className="text-xs text-slate-400">Ask about my experience or projects</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-white/10"></div>
                  <div className="w-3 h-3 rounded-full bg-white/10"></div>
                  <div className="w-3 h-3 rounded-full bg-white/10"></div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-6">
                
                {/* Assistant Message */}
                <div className="flex items-start gap-4 max-w-[85%]">
                  <div className="w-8 h-8 rounded-full bg-white/5 border border-teal-500/30 flex-shrink-0 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-teal-400" />
                  </div>
                  <div className="px-5 py-3.5 rounded-2xl rounded-tl-sm bg-white/[0.03] border border-white/5 border-l-teal-500/50 text-slate-300 text-sm leading-relaxed backdrop-blur-md">
                    Hi! I'm an AI assistant trained on Sharique's resume and portfolio. I can answer questions about his internships, projects, or education. What would you like to know?
                  </div>
                </div>

                {/* User Message */}
                <div className="flex items-start gap-4 max-w-[85%] self-end flex-row-reverse">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500/40 flex-shrink-0 flex items-center justify-center text-xs text-indigo-200">
                    You
                  </div>
                  <div className="px-5 py-3.5 rounded-2xl rounded-tr-sm bg-indigo-500/10 border border-indigo-500/20 text-white text-sm leading-relaxed backdrop-blur-md">
                    Tell me about your work at WellX AI.
                  </div>
                </div>

                {/* Assistant Message */}
                <div className="flex items-start gap-4 max-w-[85%]">
                  <div className="w-8 h-8 rounded-full bg-white/5 border border-teal-500/30 flex-shrink-0 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-teal-400" />
                  </div>
                  <div className="px-5 py-3.5 rounded-2xl rounded-tl-sm bg-white/[0.03] border border-white/5 border-l-teal-500/50 text-slate-300 text-sm leading-relaxed backdrop-blur-md">
                    At WellX AI, I worked as a Software Engineering Intern from Dec 2025 to Mar 2026. My main contribution was building a production Retrieval-Augmented Generation (RAG) system that served over 10,000 users. 
                  </div>
                </div>

              </div>

              {/* Chat Input */}
              <div className="p-4 border-t border-white/10">
                <div className="relative flex items-center">
                  <input 
                    type="text" 
                    placeholder="Message Mini Sharique..." 
                    className="w-full bg-white/[0.03] border border-white/10 rounded-full py-3.5 pl-5 pr-14 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.05] transition-all"
                  />
                  <button className="absolute right-2 w-10 h-10 rounded-full bg-indigo-500 hover:bg-indigo-400 flex items-center justify-center text-white transition-colors shadow-[0_0_15px_rgba(99,102,241,0.3)]">
                    <ArrowUp className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/5 bg-[#060d1a]/50 backdrop-blur-2xl mt-12 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} Sharique Khatri
          </div>
          <div className="flex items-center gap-6">
            <a href="mailto:sharique.khatri@gmail.com" className="hover:text-slate-300 transition-colors">Email</a>
            <a href="https://github.com/sharique2004" className="hover:text-slate-300 transition-colors">GitHub</a>
            <a href="#" className="hover:text-slate-300 transition-colors">LinkedIn</a>
          </div>
          <div>
            Built with React. No trackers.
          </div>
        </div>
      </footer>
      
      {/* Add global styles for animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}} />
    </div>
  );
}
