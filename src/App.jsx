/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useRef, useEffect, useCallback } from "react";

const WORDS = [
  { id:1,  word:"ADULTING",                  bn:"বয়স বাড়ছে",                       def:"ঘর মোছা, ঘর ধোয়া, EMI দেওয়া। স্বপ্নগুলো পরে হবে।",                                                                                        song:"amar-e-ghar" },
  { id:2,  word:"ANXIETY",                   bn:"হৃদপিণ্ড কম্পমান",                  def:"দিন-দুপুরে হঠাৎ কান্না। কারণ নেই। থাকলেও বলা যাচ্ছে না। Robi Thakur felt it too, you're just late!",                                      song:"amar-kajer-majhe" },
  { id:3,  word:"BREADCRUMBING",             bn:"ঝুলিয়ে রাখা",                      def:"মাঝে মাঝে দেখা দেয়, সবসময় দেয় না। হঠাৎ আসে, hype তোলে, পালিয়ে যায়!",                                                                   song:"majhe-majhe-tabo-dekha-pai" },
  { id:4,  word:"CONSTANT",                  bn:"চুপচাপ কিন্তু চিরকাল থেকে যাওয়া", def:"এক cup চা থেকে এক থালা ভাত, শুধু তোমাকেই চাই!",                                                                                           song:"tumi-robe-nirobe" },
  { id:5,  word:"DELUSION",                  bn:"যা ইচ্ছা তাই ভাবা",                def:"কিছু হবে না জানি, কিন্তু the heart wants what it wants!",                                                                                   song:"amar-mon-mane-na" },
  { id:6,  word:"DISOBEDIENT",               bn:"অবাধ্য",                           def:"যে কিছুই মানে না। Rules, parents, alarm clock, nothing!",                                                                                    song:"o-je-mane-na-mana" },
  { id:7,  word:"EXTREMELY SELFLESS",        bn:"অতিরিক্ত নিঃস্বার্থপর",            def:"তোমার জন্য সব দিয়ে দেব — মন, মাথা, hoichoi-এর password, খাবারের last bite!",                                                             song:"kotobor-bhebechinu" },
  { id:8,  word:"FOREBODING",                bn:"জানি খারাপ হবে",                   def:"সবই ভালো চলছে, কিন্তু আমি জানি একটা খারাপ কিছু ঘটবেই!",                                                                                   song:"sorbonaasher-ashay" },
  { id:9,  word:"FOMO",                      bn:"আমি কি বঞ্চিত?",                   def:"সবাই তোমাকে ছাড়া party করতে গেছে আর তুমি Instagram স্টোরি দেখছ। Tagore felt it too!",                                                     song:"aaj-jyotsna-rate" },
  { id:10, word:"GIRLY POP",                 bn:"মেয়েদের main character energy",    def:"বন্ধুরা একসাথে। Full chaos, full adda, full performance mode on!",                                                                          song:"ay-tobe-sahachari" },
  { id:11, word:"HONEYMOON PHASE",           bn:"প্রেমের প্রথম দিকটা",              def:"সব কিছুই এখন খুবই সুন্দর, কিন্তু real side-টা এখনো দেখোনি!",                                                                             song:"he-sokha-mom-hridoye-roho" },
  { id:12, word:"HUNG UP",                   bn:"আটকে থাকা",                       def:"সে চলে গেছে, কিন্তু মন এখনো তাকেই খোঁজে।",                                                                                                  song:"ami-tarei-khuje-berai" },
  { id:13, word:"INFATUATION",               bn:"ফুরফুরে প্রেমের আমেজ",             def:"তোমার মনে হতে পারে ভালোবাসা, but আসলে দুদিন পর কেটে যাবে!",                                                                             song:"khelaghor-bandhte-legechi" },
  { id:14, word:"INCREMENT",                 bn:"সবার ভাগ্যে নেই যেটা",             def:"Salary বাড়ল! নাচো! কাল থেকে আবার একই কাজ, একটু বেশি টাকায়। Woohoo!",                                                                   song:"mawmo-chitte" },
  { id:15, word:"INSOMNIA",                  bn:"ঘুম না হওয়া",                      def:"সবাই ঘুমিয়ে, আমার ঘুম হয় না। Culprit: phone, intrusive thoughts, এবং সেই 2019-এর embarrassing memory!",                                song:"amar-ghoom-niyo-go" },
  { id:17, word:"JINX",                      bn:"যেটা হতে গিয়েও হলো না",            def:"যে গল্পটা পূর্ণ হওয়ার আগেই sadly অন্ধকার নেমে এল।",                                                                                     song:"jakhan-esechile-andhokare" },
  { id:18, word:"KIND REQUEST",              bn:"ভদ্র মিনতি",                       def:"নিজে আর পারছি না, এবার universe একটু help করুক please!",                                                                                    song:"notun-pran-dao-pransakha" },
  { id:19, word:"LATE REALIZATION",          bn:"দেরিতে বোঝা",                      def:"সে এখানেই ছিল, দেখতে পাইনি। কারণ আমি তখন অন্য কারো Instagram profile দেখছিলাম!",                                                        song:"amar-hiyar-majhe" },
  { id:20, word:"MUTTON CURRY",              bn:"বাঙালির ভালোবাসা",                 def:"এমন একটা জিনিস, যেটার লোভে পড়লে মানুষ করলা সেদ্ধও খেয়ে নেয়!",                                                                         song:"amaro-porano-jaha-chay" },
  { id:21, word:"NOSTALGIA",                 bn:"পুরোনো দিনে পড়ে থাকা",            def:"সেই দিনগুলো... যখন school-এর পরে বিকেলবেলা খেলতে যেতাম, টাকা কমানোর চিন্তা ছিল না।",                                                 song:"purano-sei-diner-kotha" },
  { id:22, word:"ONE-SIDED LOVE",            bn:"একতরফা প্রেম",                     def:`পথ নেই জানি, তবুও যাই। GPS বলছে "destination doesn't exist" — তবুও চলছি!`,                                                             song:"chena-shonar-kono-baire" },
  { id:23, word:"OVERTHINKING",              bn:"বড্ড বেশি ভাবা",                   def:"ভেবে ভেবে নিজের শরীর খারাপ করা।",                                                                                                           song:"sokhi-bhobona-kahare-bole" },
  { id:24, word:"PLAIN FACTS",               bn:"নির্মম সত্যি",                     def:"যে সত্যিটা accept করতে ইচ্ছা করে না, কিন্তু সেটাই reality!",                                                                              song:"amar-din-furabe-kobe" },
  { id:25, word:"RESIGNATION",               bn:"জীবনের শান্তি",                    def:`চলে যাব একদিন। পায়ের ছাপ থাকবে না। LinkedIn-এ "Open to Work" টা থেকে যাবে।`,                                                           song:"porbe-na-mor-payer-chihno" },
  { id:26, word:"RIZZ",                      bn:"ঘ্যাম",                            def:"যদি কেউ না আসে, একা যাও — কিন্তু এভাবে যাও যে সবাই ফিরে তাকায়। That's rizz!",                                                           song:"ekla-cholo-re" },
  { id:27, word:"SEEN-ZONE",                 bn:"heartbreak-এর থেকে কষ্টকর",       def:"তুমি দেখলে, তুমি খুশি থাকলে। আমি?... আমিও fine। সব fine!",                                                                                song:"tumi-khushi-thako" },
  { id:28, word:"TRUST ISSUES",              bn:"মনে শান্তি নাই",                   def:"সব কিছুই suspicious লাগে। Even when things are fine, brain says: 'something's off'!",                                                     song:"kichute-moner-majhe" },
  { id:29, word:"UNDERSTOOD THE ASSIGNMENT", bn:"পুরো vibe ধরে ফেলেছে",             def:"যে exactly জানে কী করতে হবে, আর effortlessly সেটাই করে যায়!",                                                                           song:"shudhu-jaoa-asha" },
  { id:30, word:"VIBE CHECK",                bn:"মনকে একটু ছাড়ো",                  def:"দায়িত্ব পরে হবে, আগে একটু carefree হয়ে বাঁচি!",                                                                                           song:"hare-rere-rere" },
  { id:31, word:"WEIRD FLEX, BUT OK",        bn:"অদ্ভুত ঘ্যাম",                    def:"নিজের talent বা uniqueness এমন confidence দিয়ে দেখানো যে question করার উপায় নেই!",                                                       song:"ami-chini-go-chini-tomare" },
  { id:32, word:"YAAS",                      bn:"চলো এবার",                         def:"No overthinking. No looking back. Full dramatic main character entry!",                                                                      song:"bhulibo-bhobona" },
  { id:33, word:"ZONED OUT",                 bn:"মন উদাসী",                         def:"শরীর এখানে, মন অন্য dimension-এ ঘুরছে।",                                                                                                   song:"je-tore-pagol-bole" },
].sort((a, b) => a.word.localeCompare(b.word));

const BASE_URL = "/audio/";
const GRAD = "linear-gradient(120deg, #d20820 0%, #6d0550 100%)";
const ALL_LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

function groupByLetter(words) {
  const g = {};
  words.forEach(w => {
    const l = w.word[0].toUpperCase();
    if (!g[l]) g[l] = [];
    g[l].push(w);
  });
  return g;
}

function PlayIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24"><polygon points="7,3 21,12 7,21" fill="#fff"/></svg>;
}
function PauseIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24"><rect x="5" y="3" width="5" height="18" fill="#fff" rx="1"/><rect x="14" y="3" width="5" height="18" fill="#fff" rx="1"/></svg>;
}

function Player({ wordId, song, activeId, onPlay, onStop, audioRef }) {
  const isPlaying = activeId === wordId;
  const [progress, setProgress] = useState(0);
  const trackRef = useRef(null);

  useEffect(() => {
    if (!isPlaying) { setProgress(0); return; }
    const iv = setInterval(() => {
      if (audioRef.current && audioRef.current.duration)
        setProgress(audioRef.current.currentTime / audioRef.current.duration * 100);
    }, 200);
    return () => clearInterval(iv);
  }, [isPlaying, audioRef]);

  const seek = (e) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    if (audioRef.current && isPlaying) audioRef.current.currentTime = pct * (audioRef.current.duration || 0);
    setProgress(pct * 100);
  };

  return (
    <div style={{ display:"flex", alignItems:"center", gap:12 }}>
      <button
        onClick={() => isPlaying ? onStop() : onPlay(wordId, song)}
        style={{
          width:40, height:40, minWidth:40, borderRadius:"50%",
          background: GRAD, border:"none", cursor:"pointer",
          display:"flex", alignItems:"center", justifyContent:"center",
          boxShadow:"0 2px 8px rgba(210,8,32,0.3)", flexShrink:0,
          transition:"opacity .15s",
        }}
        onMouseEnter={e => e.currentTarget.style.opacity = ".8"}
        onMouseLeave={e => e.currentTarget.style.opacity = "1"}
      >
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </button>
      <div style={{ flex:1 }}>
        <div
          ref={trackRef}
          onClick={seek}
          onTouchStart={seek}
          style={{ height:4, background:"#f0f0f0", borderRadius:4, position:"relative", cursor:"pointer" }}
        >
          <div style={{ height:"100%", background:GRAD, borderRadius:4, width:`${progress}%`, pointerEvents:"none" }} />
          <div style={{
            width:12, height:12, background:"#fff", borderRadius:"50%",
            position:"absolute", top:"50%", transform:"translate(-50%,-50%)",
            left:`${progress}%`, pointerEvents:"none",
            boxShadow:"0 1px 4px rgba(0,0,0,.2)", border:"2px solid #d20820",
          }} />
        </div>
      </div>
    </div>
  );
}

export default function Tagorhythm() {
  const [activeId, setActiveId] = useState(null);
  const [activeLetter, setActiveLetter] = useState("A");
  const audioRef = useRef(null);
  const stickyRef = useRef(null);
  const groups = groupByLetter(WORDS);
  const letters = Object.keys(groups).sort();

  const handlePlay = (id, song) => {
    if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
    const a = new Audio(BASE_URL + song + ".mp3");
    a.play().catch(() => {});
    a.onended = () => setActiveId(null);
    audioRef.current = a;
    setActiveId(id);
  };

  const handleStop = () => {
    if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
    setActiveId(null);
  };

  const scrollToLetter = useCallback((l) => {
    const el = document.getElementById("section-" + l);
    if (!el || !stickyRef.current) return;
    const offset = stickyRef.current.offsetHeight;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
    setActiveLetter(l);
  }, []);

  // Update active letter on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!stickyRef.current) return;
      const offset = stickyRef.current.offsetHeight + 16;
      for (let i = letters.length - 1; i >= 0; i--) {
        const el = document.getElementById("section-" + letters[i]);
        if (el && el.getBoundingClientRect().top <= offset) {
          setActiveLetter(letters[i]);
          return;
        }
      }
      setActiveLetter(letters[0]);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [letters]);

  // Scroll active letter button into view
  useEffect(() => {
    if (!activeLetter) return;
    const btn = document.getElementById("alpha-" + activeLetter);
    btn?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [activeLetter]);

  useEffect(() => {
    return () => { if (audioRef.current) audioRef.current.pause(); };
  }, []);

  return (
    <div style={{ background:"#fff", minHeight:"100vh", fontFamily:"'Manrope',sans-serif", maxWidth:480, margin:"0 auto" }}>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&family=Manrope:wght@400;500;600&family=PT+Mono&family=Hind+Siliguri:wght@400;500;600&display=swap" rel="stylesheet" />

      {/* STICKY WRAPPER — header + alpha nav together */}
      <div ref={stickyRef} style={{ position:"sticky", top:0, zIndex:30 }}>

        {/* HEADER */}
        <header style={{ background:GRAD, padding:"20px 20px 22px", position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", top:-60, right:-60, width:200, height:200, borderRadius:"50%", background:"rgba(255,255,255,0.05)", pointerEvents:"none" }} />
          <div style={{ position:"absolute", bottom:-40, left:"10%", width:150, height:150, borderRadius:"50%", background:"rgba(255,255,255,0.03)", pointerEvents:"none" }} />
          <div style={{ position:"relative", zIndex:1, display:"flex", alignItems:"flex-start", justifyContent:"space-between" }}>
            <div>
              <div style={{ fontFamily:"'PT Mono',monospace", fontSize:9, color:"rgba(255,255,255,0.5)", letterSpacing:".18em", textTransform:"uppercase", marginBottom:4 }}>The Modern Bengali Lexicon</div>
              <h1 style={{ fontFamily:"'Outfit',sans-serif", fontSize:36, fontWeight:800, color:"#fff", letterSpacing:"-.03em", lineHeight:1, margin:0 }}>Tagorhythm</h1>
              <div style={{ fontFamily:"'Hind Siliguri',sans-serif", fontSize:15, color:"rgba(255,255,255,0.75)", fontWeight:500, marginTop:3 }}>কথায় কথায় কবিগুরু</div>
            </div>
            <a href="https://www.hoichoi.tv" target="_blank" rel="noreferrer" style={{ flexShrink:0, marginTop:4 }}>
              <img src="/hoichoi-logo.png" alt="hoichoi" style={{ height:22, width:"auto", display:"block", mixBlendMode:"screen" }} />
            </a>
          </div>
        </header>

        {/* ALPHA NAV */}
        <div style={{
          background:"#fff",
          borderBottom:"1px solid #f0f0f0",
          overflowX:"auto", whiteSpace:"nowrap",
          scrollbarWidth:"none", WebkitOverflowScrolling:"touch",
        }}>
          <style>{`::-webkit-scrollbar{display:none}`}</style>
          <div style={{ display:"inline-flex", padding:"0 8px" }}>
            {ALL_LETTERS.map(l => (
              <button
                key={l}
                id={"alpha-" + l}
                disabled={!groups[l]}
                onClick={() => groups[l] && scrollToLetter(l)}
                style={{
                  display:"inline-flex", alignItems:"center", justifyContent:"center",
                  minWidth:34, height:40, padding:"0 2px",
                  fontFamily:"'Outfit',sans-serif", fontSize:12, fontWeight:700,
                  color: activeLetter === l ? "#d20820" : groups[l] ? "#aaa" : "#e0e0e0",
                  background:"none", border:"none",
                  cursor: groups[l] ? "pointer" : "default",
                  position:"relative", flexShrink:0,
                  transition:"color .15s",
                  borderBottom: activeLetter === l ? "2.5px solid #d20820" : "2.5px solid transparent",
                }}
              >{l}</button>
            ))}
          </div>
        </div>

      </div>{/* end sticky wrapper */}

      {/* ENTRIES */}
      <main style={{ padding:"0 16px 40px" }}>
        {letters.map(letter => (
          <div key={letter} id={"section-" + letter} style={{ marginTop:24 }}>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:4 }}>
              <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:11, fontWeight:700, color:"#ccc", letterSpacing:".15em" }}>{letter}</span>
              <div style={{ height:1, flex:1, background:"#f0f0f0" }} />
            </div>
            {groups[letter].map(w => (
              <div key={w.id} style={{ padding:"16px 0", borderBottom:"1px solid #f0f0f0" }}>
                <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:17, fontWeight:800, color:"#191919", letterSpacing:"-.02em", lineHeight:1.1, marginBottom:2 }}>{w.word}</div>
                <div style={{ fontFamily:"'Hind Siliguri',sans-serif", fontSize:13, color:"#d20820", fontWeight:500, marginBottom:8 }}>{w.bn}</div>
                <div style={{ fontFamily:"'Manrope',sans-serif", fontSize:13, color:"#2a2a2a", lineHeight:1.75, marginBottom:12 }}>{w.def}</div>
                <Player wordId={w.id} song={w.song} activeId={activeId} onPlay={handlePlay} onStop={handleStop} audioRef={audioRef} />
              </div>
            ))}
          </div>
        ))}
      </main>

      {/* FOOTER */}
      <footer style={{ background:GRAD, padding:"24px 20px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:-60, right:-60, width:200, height:200, borderRadius:"50%", background:"rgba(255,255,255,0.04)", pointerEvents:"none" }} />
        <div style={{ position:"absolute", bottom:-40, left:-20, width:160, height:160, borderRadius:"50%", background:"rgba(255,255,255,0.03)", pointerEvents:"none" }} />
        <div style={{ position:"relative", zIndex:1, display:"flex", alignItems:"center", gap:20 }}>
          <div style={{ flexShrink:0 }}>
            <img src="/boldly-bangali.png" alt="Boldly Bangali" style={{ height:72, width:"auto", display:"block", mixBlendMode:"screen" }} />
          </div>
          <div style={{ width:1, background:"rgba(255,255,255,0.2)", alignSelf:"stretch", flexShrink:0 }} />
          <div style={{ flex:1, display:"flex", flexDirection:"column", gap:10 }}>
            <div style={{ fontFamily:"'PT Mono',monospace", fontSize:9, color:"rgba(255,255,255,0.5)", letterSpacing:".18em", textTransform:"uppercase" }}>Find us on</div>
            <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap" }}>
              {[
{ href:"https://www.instagram.com/hoichoi.tv/", title:"Instagram", svg:<svg viewBox="0 0 24 24" width="18" height="18" fill="white"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg> },
                { href:"https://www.facebook.com/hoichoitv", title:"Facebook", svg:<svg viewBox="0 0 24 24" width="18" height="18" fill="white"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
                { href:"https://www.youtube.com/@hoichoi", title:"YouTube", svg:<svg viewBox="0 0 24 24" width="18" height="18" fill="white"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg> },
                { href:"https://x.com/hoichoitv", title:"X", svg:<svg viewBox="0 0 24 24" width="18" height="18" fill="white"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg> },
              ].map(({ href, title, svg }) => (
                <a key={title} href={href} target="_blank" rel="noreferrer" title={title} style={{
                  display:"flex", alignItems:"center", justifyContent:"center",
                  width:38, height:38, borderRadius:10,
                  background:"rgba(255,255,255,0.13)", textDecoration:"none", flexShrink:0,
                }}>{svg}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
