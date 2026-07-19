import React, { useState } from 'react';
import { Mail, Github, Linkedin, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Editorial() {
  const [chatMessages, setChatMessages] = useState([
    { role: 'sharique', text: 'Hello. I am a simulated version of Sharique. Ask me anything about his work.' }
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    setChatMessages(prev => [...prev, { role: 'you', text: inputValue }]);
    setInputValue('');
    
    setTimeout(() => {
      setChatMessages(prev => [
        ...prev, 
        { role: 'sharique', text: 'I am currently a static mockup, but in production, I would query Sharique\'s CV graph.' }
      ]);
    }, 600);
  };

  return (
    <div className="min-h-screen font-mono text-[#0d0d0d] bg-[#f5f0e8] selection:bg-[#d4450c] selection:text-[#f5f0e8]">
      {/* GLOBAL STYLES SPECIFIC TO THIS MOCKUP */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=Inter:wght@900&display=swap');
        
        .editorial-font-mono { font-family: 'Space Mono', monospace; }
        .editorial-font-serif { font-family: 'Playfair Display', serif; }
        .editorial-font-display { font-family: 'Inter', sans-serif; letter-spacing: -0.05em; }
      `}} />

      {/* NAV */}
      <nav className="flex justify-between items-center px-4 py-4 border-b-2 border-[#0d0d0d] editorial-font-mono text-sm uppercase tracking-tight">
        <div className="font-bold">Sharique Khatri</div>
        <div className="hidden md:flex gap-8">
          <a href="mailto:sharique.khatri@gmail.com" className="hover:text-[#d4450c] transition-colors">Email</a>
          <a href="https://github.com/sharique2004" className="hover:text-[#d4450c] transition-colors">GitHub</a>
          <a href="#" className="hover:text-[#d4450c] transition-colors">LinkedIn</a>
        </div>
      </nav>

      {/* HERO */}
      <header className="pt-16 pb-12">
        <div className="px-4 mb-4 text-xs editorial-font-mono uppercase flex items-center gap-2">
          <span className="w-2 h-2 bg-[#d4450c] inline-block animate-pulse"></span>
          Applied AI Engineer — San Francisco, CA — Open to Work
        </div>
        
        <div className="px-4">
          <h1 className="editorial-font-display text-[12vw] leading-[0.8] font-black uppercase text-[#0d0d0d] break-words">
            Sharique<br/>Khatri
          </h1>
        </div>
        
        <div className="border-t-2 border-[#0d0d0d] mt-8 pt-4 px-4 flex flex-col md:flex-row justify-between items-start gap-8">
          <p className="editorial-font-serif italic text-xl md:text-2xl max-w-2xl">
            I build software that real people depend on, not demos.
          </p>
          <a 
            href="mailto:sharique.khatri@gmail.com" 
            className="editorial-font-mono text-sm font-bold border-2 border-[#0d0d0d] px-6 py-3 uppercase hover:bg-[#0d0d0d] hover:text-[#f5f0e8] transition-colors shrink-0"
          >
            Email Me &rarr;
          </a>
        </div>

        {/* 3-COLUMN METADATA */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 mt-16 editorial-font-mono text-sm border-t border-[#0d0d0d] pt-8">
          <div className="flex flex-col gap-4">
            <h3 className="font-bold border-b border-[#0d0d0d] pb-2 uppercase">Bio / Edu</h3>
            <p className="leading-relaxed">
              Penn State CS, May 2026<br/>
              GPA 3.60 &bull; Dean's List 6 sems<br/>
              SF &bull; NYC &bull; Seattle &bull; Dubai
            </p>
          </div>
          
          <div className="flex flex-col gap-4">
            <h3 className="font-bold border-b border-[#0d0d0d] pb-2 uppercase">Key Stats</h3>
            <ul className="space-y-1">
              <li>&rarr; 10,000+ Prod Users</li>
              <li>&rarr; ECCV 2026 Paper</li>
              <li>&rarr; 1st Place Hackathon</li>
              <li>&rarr; 40% faster deploys</li>
            </ul>
          </div>
          
          <div className="flex flex-col gap-4">
            <h3 className="font-bold border-b border-[#0d0d0d] pb-2 uppercase">Presence</h3>
            <div className="flex gap-4 items-start">
              <div className="w-24 h-24 border border-[#0d0d0d] shrink-0 grayscale bg-gray-200 overflow-hidden relative group">
                <img src="/__mockup/images/headshot.jpg" alt="SK" className="w-full h-full object-cover" onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.innerHTML = '<div class="w-full h-full flex items-center justify-center text-3xl font-bold bg-[#0d0d0d] text-[#f5f0e8]">SK</div>';
                }} />
              </div>
              <ul className="space-y-1">
                <li><a href="mailto:sharique.khatri@gmail.com" className="underline hover:text-[#d4450c]">Email</a></li>
                <li><a href="https://github.com/sharique2004" className="underline hover:text-[#d4450c]">GitHub</a></li>
                <li><a href="#" className="underline hover:text-[#d4450c]">LinkedIn</a></li>
              </ul>
            </div>
          </div>
        </div>
      </header>

      {/* PRODUCTS GRID */}
      <section className="border-t-2 border-[#0d0d0d] pb-20">
        <div className="px-4 py-4 border-b border-[#0d0d0d]">
          <h2 className="editorial-font-mono font-bold uppercase tracking-widest text-lg">Index 01 // Selected Works</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2">
          {[
            { num: '01', name: 'Donna', desc: 'Hackathon winner · Voice dispatches surplus food to food banks', tech: ['AI Supply Chain Hackathon 2026', '1st Place'] },
            { num: '02', name: 'Bibi', desc: 'Local voice agent that flies a real PC', tech: ['Python', 'Electron', 'Ollama', 'Claude'] },
            { num: '03', name: 'MeetingScribe', desc: 'macOS meeting transcriber, on-device only', tech: ['Swift', 'CoreAudio'] },
            { num: '04', name: 'Aman UAE', desc: 'Real-time UAE news + LLM source verification', tech: ['Next.js', '26K impressions'] }
          ].map((prod, i) => (
            <a 
              key={i} 
              href="#"
              className="group relative block p-8 border-b border-[#0d0d0d] md:even:border-l hover:bg-[#0d0d0d] hover:text-[#f5f0e8] transition-colors border-l-[3px] border-l-transparent hover:border-l-[#d4450c]"
            >
              <div className="editorial-font-display text-8xl font-black opacity-10 absolute top-4 right-4 pointer-events-none group-hover:opacity-20 transition-opacity">
                {prod.num}
              </div>
              
              <h3 className="editorial-font-serif text-4xl mb-4 group-hover:text-[#d4450c] transition-colors">{prod.name}</h3>
              <p className="editorial-font-mono text-sm mb-8 max-w-sm">{prod.desc}</p>
              
              <div className="flex flex-wrap gap-2 mt-auto">
                {prod.tech.map(t => (
                  <span key={t} className="editorial-font-mono text-xs border border-current px-2 py-1 uppercase">{t}</span>
                ))}
              </div>
              
              <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight size={24} />
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* EXPERIENCE TIMELINE */}
      <section className="border-t-2 border-[#0d0d0d] pb-20">
        <div className="px-4 py-4 border-b border-[#0d0d0d]">
          <h2 className="editorial-font-mono font-bold uppercase tracking-widest text-lg">Index 02 // Experience</h2>
        </div>
        
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left editorial-font-mono text-sm whitespace-nowrap md:whitespace-normal min-w-[800px]">
            <thead className="border-b border-[#0d0d0d] uppercase">
              <tr>
                <th className="py-4 px-4 font-bold w-48">Date</th>
                <th className="py-4 px-4 font-bold w-48">Company</th>
                <th className="py-4 px-4 font-bold w-64">Role</th>
                <th className="py-4 px-4 font-bold">Detail</th>
              </tr>
            </thead>
            <tbody>
              {[
                { date: 'Dec 2025 - Mar 2026', company: 'WellX AI', role: 'Software Eng Intern', detail: 'Production RAG serving 10,000+ users. Dubai, remote.', current: true },
                { date: 'May - Aug 2025', company: 'Penn State ORIS', role: 'DevOps Intern', detail: 'C# .NET, Azure DevOps, 40% faster deploys. University Park PA.', current: false },
                { date: '2025 - 2026', company: 'HVAC Digital Twin', role: 'Capstone Team Lead', detail: 'Sponsored by Carrier.', current: false },
                { date: 'May - Aug 2024', company: 'Fourth Square', role: 'SWE Intern', detail: 'LangChain, 1K+ production queries. Texas remote.', current: false },
                { date: 'Oct - Dec 2022', company: 'SEERA Travel Group', role: 'Frontend Intern', detail: 'Dubai remote.', current: false }
              ].map((job, i) => (
                <tr key={i} className="border-b border-[#0d0d0d] hover:bg-[#0d0d0d] hover:text-[#f5f0e8] transition-colors group">
                  <td className="py-4 px-4 align-top">{job.date}</td>
                  <td className="py-4 px-4 align-top font-bold">
                    {job.current && <span className="text-[#d4450c] mr-1">*</span>}
                    {job.company}
                    {job.current && <span className="ml-2 text-[10px] border border-current px-1 uppercase group-hover:border-[#f5f0e8]">Current</span>}
                  </td>
                  <td className="py-4 px-4 align-top italic">{job.role}</td>
                  <td className="py-4 px-4 align-top whitespace-normal">{job.detail}</td>
                </tr>
              ))}
              <tr className="border-b border-[#0d0d0d] hover:bg-[#0d0d0d] hover:text-[#f5f0e8] transition-colors group">
                <td className="py-4 px-4 align-top">ECCV 2026</td>
                <td className="py-4 px-4 align-top font-bold">OmniSch</td>
                <td className="py-4 px-4 align-top italic">Publication</td>
                <td className="py-4 px-4 align-top whitespace-normal">arXiv:2604.00270 – PCB schematic visual reasoning benchmark.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* CHAT BOX */}
      <section className="border-t-2 border-[#0d0d0d] p-4 md:p-8 bg-[#f5f0e8]">
        <div className="max-w-3xl mx-auto">
          <h2 className="editorial-font-mono font-bold uppercase tracking-widest text-lg mb-6 border-b border-[#0d0d0d] inline-block pb-1">Ask Sharique</h2>
          
          <div className="border-2 border-[#0d0d0d] bg-white editorial-font-mono text-sm flex flex-col h-[400px]">
            <div className="p-4 border-b border-[#0d0d0d] bg-[#0d0d0d] text-[#f5f0e8] uppercase font-bold text-xs flex justify-between">
              <span>Terminal_Chat.exe</span>
              <span>Status: Online</span>
            </div>
            
            <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4">
              {chatMessages.map((msg, i) => (
                <div key={i} className="flex gap-4">
                  <span className={`font-bold uppercase w-20 shrink-0 ${msg.role === 'sharique' ? 'text-[#d4450c]' : 'text-[#0d0d0d]'}`}>
                    {msg.role}:
                  </span>
                  <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                </div>
              ))}
            </div>
            
            <form onSubmit={handleSend} className="flex border-t border-[#0d0d0d]">
              <span className="p-3 font-bold uppercase border-r border-[#0d0d0d] shrink-0 hidden md:block">INPUT:</span>
              <input
                type="text"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 p-3 outline-none bg-transparent"
              />
              <button 
                type="submit" 
                className="p-3 uppercase font-bold border-l border-[#0d0d0d] hover:bg-[#0d0d0d] hover:text-[#f5f0e8] transition-colors shrink-0 w-24"
              >
                Send &rarr;
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t-2 border-[#0d0d0d] grid grid-cols-1 md:grid-cols-3 editorial-font-mono text-sm">
        <div className="p-6 border-b md:border-b-0 md:border-r border-[#0d0d0d] flex flex-col justify-between gap-8">
          <h3 className="font-bold uppercase">Sharique Khatri &copy; {new Date().getFullYear()}</h3>
          <p className="text-xs max-w-xs">A printed broadsheet reimagined for the screen. Strictly typed, boldly styled.</p>
        </div>
        
        <div className="p-6 border-b md:border-b-0 md:border-r border-[#0d0d0d]">
          <h3 className="font-bold uppercase mb-4 border-b border-[#0d0d0d] inline-block pb-1">Colophon</h3>
          <ul className="space-y-2 text-xs">
            <li>Type: Space Mono, Playfair Display, Inter</li>
            <li>Palette: #f5f0e8, #0d0d0d, #d4450c</li>
            <li>Built with React & Tailwind</li>
          </ul>
        </div>
        
        <div className="p-6 flex flex-col gap-4">
          <h3 className="font-bold uppercase border-b border-[#0d0d0d] inline-block pb-1">Connect</h3>
          <ul className="space-y-2">
            <li><a href="mailto:sharique.khatri@gmail.com" className="hover:text-[#d4450c] uppercase inline-flex items-center gap-2">Email <ArrowRight size={14}/></a></li>
            <li><a href="https://github.com/sharique2004" className="hover:text-[#d4450c] uppercase inline-flex items-center gap-2">GitHub <ArrowRight size={14}/></a></li>
            <li><a href="#" className="hover:text-[#d4450c] uppercase inline-flex items-center gap-2">LinkedIn <ArrowRight size={14}/></a></li>
          </ul>
        </div>
      </footer>
    </div>
  );
}
