import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, X, ShieldAlert, Activity, FileText } from "lucide-react";
import { LUDO_NEWS_DATABASE, MOCK_LUDO_ARCHIVES, LudoNewsItem } from "../data/newsArchiveData";

const cascadeVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1], when: "beforeChildren", staggerChildren: 0.05 }
  }
};

const itemVariants = {
  hidden: { y: 25, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

export const NewsUpdates: React.FC = () => {
  const [activeDivision, setActiveDivision] = useState<"LudoLeague" | "Ludo4Schools" | "BOTK" | "all">("all");
  const [archiveItems, setArchiveItems] = useState<LudoNewsItem[]>(MOCK_LUDO_ARCHIVES.slice(0, 2));
  const [archivePage, setPage] = useState<number>(1);
  const [hasMoreRecords, setHasMore] = useState<boolean>(true);
  const [isFetchingArchives, setIsFetching] = useState<boolean>(false);
  const [activeDossier, setActiveDossier] = useState<LudoNewsItem | null>(null);

  const endlessScrollTriggerRef = useRef<HTMLDivElement | null>(null);

  const mainBentoNews = LUDO_NEWS_DATABASE.filter(
    (item) => activeDivision === "all" || item.division === activeDivision
  );

  useEffect(() => {
    const scrollObserver = new IntersectionObserver(
      (entries) => {
        const triggerNode = entries[0];
        if (triggerNode.isIntersecting && hasMoreRecords && !isFetchingArchives) {
          executeArchiveFetch();
        }
      },
      { threshold: 0.1, rootMargin: "120px" }
    );

    if (endlessScrollTriggerRef.current) {
      scrollObserver.observe(endlessScrollTriggerRef.current);
    }
    return () => scrollObserver.disconnect();
  }, [archivePage, hasMoreRecords, isFetchingArchives]);

  const executeArchiveFetch = () => {
    setIsFetching(true);
    setTimeout(() => {
      const startIndex = archivePage * 2;
      const endIndex = startIndex + 2;
      const dataBatch = MOCK_LUDO_ARCHIVES.slice(startIndex, endIndex);

      if (dataBatch.length > 0) {
        setArchiveItems((prev) => [...prev, ...dataBatch]);
        setPage((prev) => prev + 1);
      } else {
        setHasMore(false);
      }
      setIsFetching(false);
    }, 750);
  };

  return (
    <section id="newsupdates" className="min-h-screen w-full bg-neutral-950 py-32 px-6 md:px-12 flex flex-col justify-start select-none font-sans antialiased text-white">
      
      <div className="w-full overflow-hidden border-b border-neutral-900 py-4 mb-20 flex items-center bg-black whitespace-nowrap select-none">
        <motion.div 
          animate={{ x: [0, -1400] }}
          transition={{ repeat: Infinity, duration: 22, ease: "linear" }}
          className="flex space-x-16 text-xs font-display font-black tracking-thonik-wide uppercase text-neutral-400"
        >
          <span className="flex items-center gap-2"><Activity size={14} className="text-[#FFD700] animate-pulse" /> LIVE FIXTURE: SOW 3 - 2 ALX (ROUND 4 // BOTK FINALS) +++</span>
          <span>MAMELODI CIRCUIT: MASONA CLUB RETAINS UNDEFEATED LEAGUE RATING MATRIX +++</span>
          <span>LUDO4SCHOOLS: GOVERNMENT EDUCATION GRANT VERIFIES 15 NEW CLASSROOM CLINICS +++</span>
          <span className="flex items-center gap-2"><Activity size={14} className="text-[#FFD700] animate-pulse" /> LIVE FIXTURE: SOW 3 - 2 ALX (ROUND 4 // BOTK FINALS) +++</span>
        </motion.div>
      </div>

      <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
        <div className="space-y-4">
          <span className="font-sans font-black tracking-thonik-wide text-[10px] text-neutral-500 uppercase block">// ATHLETICS REPORTAGE</span>
          <h2 className="font-display font-black tracking-thonik-mega text-5xl sm:text-7xl md:text-8xl uppercase text-white leading-none">
            NEWS & AFFAIRS.
          </h2>
        </div>
        
        <div className="flex flex-wrap gap-5 text-[11px] tracking-thonik-wide font-sans font-black uppercase text-neutral-500">
          {(["all", "LudoLeague", "Ludo4Schools", "BOTK"] as const).map((div) => (
            <button
              key={div}
              onClick={() => setActiveDivision(div)}
              className={`transition-colors duration-300 ${activeDivision === div ? "text-[#FFD700] underline underline-offset-4" : "hover:text-neutral-200"}`}
            >
              [{div === "all" ? "show_all" : div}]
            </button>
          ))}
        </div>
      </div>

      <motion.div 
        variants={cascadeVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full max-w-5xl mx-auto auto-rows-fr"
      >
        {mainBentoNews.map((item) => (
          <motion.div
            key={item.id}
            variants={itemVariants}
            className={`p-8 rounded-2xl flex flex-col justify-between group transition-all duration-500 ease-thonik-ease hover:border-neutral-500 relative ${item.gridSize}`}
          >
            <div className="flex justify-between items-center border-b border-neutral-900 pb-4 text-[10px] font-sans tracking-thonik-wide uppercase font-black">
              <span className={item.urgency === "live" ? "text-[#FFD700] flex items-center gap-2 font-black" : "text-neutral-400"}>
                {item.urgency === "live" && <span className="w-2 h-2 rounded-full bg-[#FFD700] animate-pulse" />}
                // {item.category}
              </span>
              <span className="text-neutral-500 font-mono">{item.timestamp}</span>
            </div>

            <div className="my-8 space-y-4">
              <h3 className={`font-display font-black tracking-thonik-tight uppercase group-hover:text-[#FFD700] transition-colors duration-300 text-white ${
                item.urgency === "live" ? "text-3xl md:text-5xl leading-[1.05]" : "text-2xl leading-tight"
              }`}>
                {item.title}
              </h3>
              <p className="font-sans font-light tracking-normal text-sm text-neutral-400 leading-relaxed max-w-2xl">
                {item.summary}
              </p>

              {item.urgency === "live" && item.score && item.liveStats && (
                <div className="mt-8 border border-neutral-900 bg-neutral-950/60 p-6 rounded-xl font-sans">
                  <div className="flex justify-center items-center gap-10 mb-6 font-display font-black tracking-thonik-tight text-3xl text-white border-b border-neutral-900 pb-4">
                    <div className="flex items-center gap-4"><span>{item.score.home}</span><span className="text-[#FFD700]">{item.score.homeScore}</span></div>
                    <div className="text-neutral-700 text-xl font-sans">:</div>
                    <div className="flex items-center gap-4"><span className="text-neutral-500">{item.score.awayScore}</span><span>{item.score.away}</span></div>
                  </div>

                  <div className="space-y-3.5 text-[11px] font-bold uppercase tracking-wider">
                    {item.liveStats.map((stat, idx) => (
                      <div key={idx} className="grid grid-cols-3 items-center border-b border-neutral-900/40 pb-2 last:border-0 last:pb-0">
                        <span className="text-left text-[#FFD700]">{stat.home}</span>
                        <span className="text-center text-[9px] text-neutral-500 font-black tracking-normal">{stat.label}</span>
                        <span className="text-right text-white">{stat.away}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-neutral-900 flex justify-end">
              <button 
                onClick={() => item.urgency === "live" && setActiveDossier(item)}
                className="text-[10px] font-sans font-black uppercase tracking-thonik-wide text-neutral-400 group-hover:text-white group-hover:translate-x-1 transition-all duration-300"
              >
                {item.urgency === "live" ? "Open Live Index ↗" : "Read Profile ↗"}
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="w-full max-w-5xl mx-auto mt-32 space-y-12">
        <div className="border-b border-neutral-900 pb-4">
          <span className="font-sans font-black tracking-thonik-wide text-[10px] text-neutral-500 uppercase block mb-2">// REPOSITORY DOSSIERS</span>
          <h3 className="font-display font-black tracking-thonik-mega text-3xl md:text-5xl uppercase text-white">HISTORICAL REGISTRY</h3>
        </div>

        <div className="w-full flex flex-col border-t border-neutral-900">
          {archiveItems.map((archiveItem) => (
            <div
              key={archiveItem.id}
              onClick={() => setActiveDossier(archiveItem)}
              className="grid grid-cols-1 md:grid-cols-12 items-center py-6 border-b border-neutral-900 cursor-pointer group hover:bg-[#FFD700] hover:text-black transition-colors duration-500 ease-thonik-ease px-4 rounded-xl"
            >
              <div className="md:col-span-3 text-[10px] tracking-thonik-wide uppercase font-black text-neutral-500 group-hover:text-black/80 transition-colors flex items-center gap-2">
                <Calendar size={12} /> {archiveItem.timestamp} // {archiveItem.category}
              </div>
              <div className="md:col-span-6 font-display font-black tracking-thonik-tight uppercase text-xl md:text-2xl py-3 md:py-0">
                {archiveItem.title}
              </div>
              <div className="md:col-span-3 md:text-right text-xs text-neutral-400 font-light tracking-tight group-hover:text-black transition-colors truncate font-mono">
                {archiveItem.liveStats ? `Score: ${archiveItem.score?.homeScore}-${archiveItem.score?.awayScore}` : archiveItem.summary}
              </div>
            </div>
          ))}
        </div>

        <div ref={endlessScrollTriggerRef} className="w-full py-10 flex justify-center items-center">
          {isFetchingArchives && (
            <motion.div 
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
              className="text-[10px] font-black tracking-thonik-wide uppercase text-[#FFD700]"
            >
              // SYNCING HISTORICAL DATA STACK V26...
            </motion.div>
          )}
          {!hasMoreRecords && (
            <span className="text-[10px] font-black tracking-thonik-wide uppercase text-neutral-700">
              // DATA INTEGRITY SYSTEM CLOSED // ALL HISTORICAL FILES LOADED
            </span>
          )}
        </div>
      </div>

      <AnimatePresence>
        {activeDossier && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[10000] bg-black/95 flex justify-end backdrop-blur-md"
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="w-full md:w-[45vw] h-full bg-white text-black p-8 md:p-12 flex flex-col justify-between overflow-y-auto border-l border-neutral-200"
            >
              <div className="flex justify-between items-center border-b border-neutral-200 pb-6">
                <span className="font-black text-[10px] tracking-thonik-wide uppercase text-red-600 flex items-center gap-2">
                  <ShieldAlert size={14} /> SECURITY CLEARANCE // RESTRICTED DOSSIER
                </span>
                <button
                  onClick={() => setActiveDossier(null)}
                  className="px-3 py-1.5 bg-neutral-900 hover:bg-black text-white text-xs font-black uppercase tracking-widest rounded-xl transition-colors"
                >
                  [ DISMISS ]
                </button>
              </div>

              <div className="my-auto space-y-8 py-8">
                <div className="space-y-2">
                  <span className="text-[11px] tracking-thonik-wide uppercase font-black text-neutral-400 block">
                    <Clock size={12} className="inline mr-1" /> {activeDossier.timestamp} // {activeDossier.category}
                  </span>
                  <h4 className="font-display font-black tracking-thonik-mega text-4xl md:text-5xl lg:text-6xl uppercase leading-[0.95] text-black">
                    {activeDossier.title}
                  </h4>
                </div>

                {activeDossier.dossierMetrics && (
                  <div className="bg-neutral-100 p-6 border-l-4 border-black rounded-r-xl space-y-3 shadow-inner">
                    <span className="text-[9px] font-black tracking-thonik-wide text-neutral-500 uppercase block flex items-center gap-1.5">
                      <FileText size={12} /> // LOGGED SECURE CONSTANTS
                    </span>
                    <div className="font-mono text-xs tracking-tight text-neutral-800 uppercase space-y-2">
                      {activeDossier.dossierMetrics.map((metric, index) => (
                        <span key={index} className="block border-b border-neutral-200/60 pb-1.5 last:border-0 last:pb-0">
                          {metric}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <p className="text-sm font-light text-neutral-600 leading-relaxed tracking-tight font-sans">
                  {activeDossier.summary} This system dossier indexes validated tournament data nodes compiled dynamically on the 2026 local South African competitive frameworks.
                </p>
              </div>

              <div className="border-t border-neutral-200 pt-6 flex justify-between items-center text-[9px] tracking-thonik-wide uppercase text-neutral-400 font-black">
                <div>CLASSIFICATION: SECURE SPORTS REPORTAGE</div>
                <div className="text-black font-mono">©2026_LLSA_SYS</div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
