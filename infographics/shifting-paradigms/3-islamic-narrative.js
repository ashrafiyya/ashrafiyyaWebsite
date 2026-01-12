import React, { useState } from 'react';
import { 
  BookOpen, 
  Scale, 
  FileText, 
  ChevronUp, 
  ChevronDown, 
  Globe, 
  Moon, 
  Sun,
  Shield,
  Zap,
  Sprout,
  ArrowDown,
  Anchor,
  Library
} from 'lucide-react';

// --- Content Component ---

const ContentCard = ({ 
  period,
  title, 
  subtitle,
  mainText,
  icon: Icon,
  highlightBox,
  fullText,
  colorTheme = "emerald", // 'emerald' or 'indigo'
  isLast
}) => {
  const [showFullText, setShowFullText] = useState(false);
  
  const colors = {
    emerald: {
      border: "group-hover:border-emerald-400",
      iconBg: "group-hover:text-emerald-700",
      accent: "bg-emerald-50 group-hover:bg-emerald-500",
      title: "group-hover:text-emerald-900",
      tag: "bg-emerald-50 text-emerald-700 border-emerald-200",
      button: "text-emerald-700 hover:text-emerald-900 hover:bg-emerald-50",
      box: "bg-emerald-50 border-emerald-200 text-emerald-800"
    },
    indigo: {
      border: "group-hover:border-indigo-400",
      iconBg: "group-hover:text-indigo-700",
      accent: "bg-indigo-50 group-hover:bg-indigo-500",
      title: "group-hover:text-indigo-900",
      tag: "bg-indigo-50 text-indigo-700 border-indigo-200",
      button: "text-indigo-700 hover:text-indigo-900 hover:bg-indigo-50",
      box: "bg-indigo-50 border-indigo-200 text-indigo-800"
    }
  };

  const theme = colors[colorTheme];

  return (
    <div className="flex flex-col md:flex-row gap-8 mb-20 group relative">
       {/* Connecting Line (Vertical) */}
       {!isLast && (
         <div className="absolute left-8 top-16 bottom-[-80px] w-1 bg-stone-200 rounded-full md:block hidden"></div>
       )}

       {/* Icon Side */}
       <div className="flex-shrink-0 relative z-10">
         <div className={`w-16 h-16 rounded-2xl bg-white border-2 border-stone-200 shadow-sm flex items-center justify-center transition-all duration-300 group-hover:scale-105 ${theme.border} group-hover:shadow-md`}>
           <Icon className={`w-8 h-8 text-stone-400 transition-colors ${theme.iconBg}`} />
         </div>
       </div>

       {/* Main Content Side */}
       <div className="flex-1">
         <div className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden group-hover:-translate-y-1">
            
            {/* Accent Bar */}
            <div className={`absolute top-0 left-0 w-2 h-full ${theme.accent} transition-colors duration-500`}></div>

            <div className="pl-4">
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <span className={`px-3 py-1 text-xs font-bold tracking-widest uppercase rounded-full border ${theme.tag}`}>
                  {period}
                </span>
              </div>

              <div className="flex flex-col gap-8">
                <div className="flex-1">
                  <h3 className={`text-2xl font-serif font-bold text-stone-800 mb-2 transition-colors ${theme.title}`}>
                    {title}
                  </h3>
                  <h4 className="text-sm font-bold text-stone-400 uppercase tracking-wide mb-4">{subtitle}</h4>
                  
                  <p className="text-lg text-stone-600 leading-relaxed mb-6">
                    {mainText}
                  </p>

                  {/* Highlight Box */}
                  {highlightBox && (
                    <div className={`p-5 rounded-xl border-l-4 ${theme.box} mb-6`}>
                      <div className="flex gap-3">
                        <div className="mt-1"><Scale className="w-5 h-5 opacity-70" /></div>
                        <div>
                          <h4 className="text-sm font-bold uppercase tracking-wide opacity-80 mb-1">{highlightBox.title}</h4>
                          <p className="text-base font-medium leading-snug">{highlightBox.text}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Source Text Toggle */}
                  <button 
                    onClick={() => setShowFullText(!showFullText)}
                    className={`flex items-center gap-2 text-sm font-bold transition-colors px-4 py-2 rounded-lg border border-transparent hover:border-stone-200 w-full md:w-auto justify-center md:justify-start ${theme.button}`}
                  >
                    {showFullText ? <ChevronUp className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                    {showFullText ? "Hide Source Text" : "Read Source Text"}
                  </button>
                </div>
              </div>

              {/* Collapsible Text Area */}
              {showFullText && (
                <div className="mt-8 animate-in fade-in slide-in-from-top-4 duration-300">
                  <div className="bg-[#fdfbf7] p-8 rounded-xl border border-stone-200 shadow-inner relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-stone-200 via-stone-300 to-stone-200 opacity-50"></div>
                    <div className="flex items-center gap-2 mb-4 border-b border-stone-200 pb-3">
                      <FileText className="w-4 h-4 text-stone-400" />
                      <span className="text-xs font-bold text-stone-400 uppercase tracking-widest">Source Excerpt</span>
                    </div>
                    <div className="prose prose-stone prose-sm max-w-none font-serif text-stone-700 leading-relaxed whitespace-pre-line">
                      {fullText}
                    </div>
                  </div>
                </div>
              )}
            </div>
         </div>
       </div>
    </div>
  );
};

const App = () => {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-sans selection:bg-emerald-200 pb-24">
      
      {/* Header */}
      <header className="pt-24 pb-16 px-6 max-w-5xl mx-auto text-center">
        <div className="inline-block px-5 py-2 bg-white text-emerald-600 text-sm font-bold tracking-[0.2em] uppercase rounded-full mb-8 border border-stone-200 shadow-sm">
          A Comparative Paradigm
        </div>
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-stone-900 mb-6 leading-tight tracking-tight">
          The Islamic Experience
        </h1>
        <p className="text-xl text-stone-500 max-w-2xl mx-auto leading-relaxed font-light">
          From the Prophetic foundation to the modern era: tracing the formation of an integrative intellectual order.
        </p>
        <div className="flex justify-center mt-12">
            <ArrowDown className="w-6 h-6 text-stone-300 animate-bounce" />
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6">

        {/* Section 1: Prophetic Foundation */}
        <ContentCard 
          colorTheme="emerald"
          icon={Sun}
          period="7th Century"
          title="The Prophetic Foundation"
          subtitle="Unity of Truth"
          mainText="Islam began by linking faith and reason. The Qur'an challenged people to look at nature as 'signs' (āyāt) of Allah. From the start, observation and revelation were partners, not enemies."
          highlightBox={{
            title: "Core Principle",
            text: "The clinician does not need to treat Allah as irrelevant to take evidence seriously."
          }}
          fullText={`The Prophet ﷺ restored tawḥīd to the Arabian Peninsula in the seventh century, not merely as a theological assertion but as a comprehensive reorientation of how reality itself was to be understood. The Qur’an did not present faith as blind affirmation; rather, it repeatedly appealed to reflection, inference, and signs (āyāt) in both the natural world and human experience. Alongside the Prophet ﷺ as a living proof, the Qur’an advanced dialectical arguments addressing causation, contingency, purpose, and moral responsibility.

From its inception, Islam established a worldview in which observation, reason, and revelation were not competitors but coordinated sources of knowledge. This foundational harmony would prove decisive as Muslims encountered foreign intellectual traditions in the centuries that followed. The clinician does not need to treat Allah as irrelevant in order to take evidence seriously.`}
        />

        {/* Section 2: Greek Encounters */}
        <ContentCard 
          colorTheme="indigo"
          icon={Moon}
          period="8th–9th Centuries"
          title="Early Encounters with Greek Philosophy"
          subtitle="The Challenge of Integration"
          mainText="Muslims translated Greek philosophy and science. Some groups (like the Mu'tazilah) tried to make Greek logic rule over faith, which caused tension. The challenge was: how do we use these tools without losing our own worldview?"
          highlightBox={{
            title: "The Tension",
            text: "Intellectual tools can be helpful, but they also carry hidden assumptions. Islam's concern was always about who sets the frame."
          }}
          fullText={`By the eighth and ninth centuries, Greek philosophy and Hellenistic modes of reasoning entered the Muslim intellectual sphere, particularly through translation and scholarly exchange. Certain groups, most notably the Muʿtazilah, adopted these philosophical tools as governing worldviews rather than subordinate instruments. Drawing heavily from falsafah, they reinterpreted theological, ethical, and even legal questions through a primarily Greek rationalist framework, often subordinating revelation to prior philosophical commitments.

This development generated significant theological tension. The concern was not with the use of reason per se, but with reason becoming autonomous and normative in a way that reshaped Islamic doctrine from the outside inward.`}
        />

        {/* Section 3: Codification */}
        <ContentCard 
          colorTheme="emerald"
          icon={Shield}
          period="10th Century"
          title="The Discipline of Reason"
          subtitle="Sunni Theology Codified"
          mainText="Scholars like Al-Ash'ari and Al-Maturidi built a system where logic was used to clarify and defend faith, not replace it. This 'Middle Path' ensured that Muslims didn't have to choose between thinking and believing."
          highlightBox={{
            title: "Intellectual Equilibrium",
            text: "A Muslim clinician does not need to choose between 'faith' and 'thinking.' The tradition built an internal structure where both operate coherently."
          }}
          fullText={`In response to these challenges and further doctrinal deviations, Sunni theology was systematically articulated and codified by the Ashʿarī and Māturīdī schools. This effort was led by Abū al-Ḥasan al-Ashʿarī (d. 936) and Abū Manṣūr al-Māturīdī (d. 944), whose works established enduring theological frameworks grounded in revelation while employing disciplined rational argumentation.

Both schools affirmed reason as a valid and necessary tool for discerning truth, especially in matters of theology. However, reason was carefully defined as an instrument rather than an independent worldview. Logic (manṭiq) and dialectical reasoning (kalām) were used to clarify beliefs, resolve contradictions, and defend doctrine, not to override revelation or impose external metaphysical assumptions. This approach represented a deliberate middle path between uncritical literalism and unfettered rationalism.

Crucially, from this period onward, Muslim civilization did not experience a rupture between religion and reason. Intellectual inquiry was understood as a servant of faith, illuminating rather than undermining it.`}
        />

        {/* Section 4: Translation Movement */}
        <ContentCard 
          colorTheme="indigo"
          icon={Globe}
          period="8th–10th Centuries"
          title="The Translation Movement"
          subtitle="Critical Integration"
          mainText="Muslims gathered knowledge from Greece, India, and Persia. They didn't just copy it; they filtered it through Islamic values (Tawhid). This created a Golden Age of science that was both innovative and faith-based."
          highlightBox={{
            title: "Synthesis",
            text: "Islamic civilization shows a workable model for engaging external scientific knowledge without surrendering the worldview frame that gives knowledge its meaning."
          }}
          fullText={`In parallel with theological consolidation, Abbasid rulers patronized one of history’s most ambitious translation movements, centered in Baghdad and extending across the Islamic world. From the eighth century onward, works of Greek, Syriac, Persian, and Sanskrit origin covering medicine, mathematics, astronomy, philosophy, and the natural sciences were translated into Arabic.

What distinguished this movement was not mere preservation, but critical integration. Foreign knowledges were not accepted or rejected wholesale; they were evaluated, filtered, and subordinated to Islamic metaphysical principles. Ideas incompatible with tawḥīd were rejected or reworked, while useful methods and insights were retained and developed further. The result was not imitation, but synthesis and innovation.

By the ninth and tenth centuries, multiple intellectual centers had emerged, bringing together Muslim, Christian, and Jewish scholars under an overarching Islamic framework.`}
        />

        {/* Section 5: Decline */}
        <ContentCard 
          colorTheme="emerald"
          icon={Zap}
          period="13th Century Onward"
          title="Decline & Disruption"
          subtitle="External Shocks"
          mainText="Science didn't stop because Islam opposes reason. It slowed down due to wars (Mongols, Crusades) and loss of stability. Later, colonialism brought Western ideas that replaced local ways of thinking."
          highlightBox={{
            title: "Loss of Primacy",
            text: "The modern global dominance of Western biomedicine is not only about better tools. It also reflects political power and the export of a worldview."
          }}
          fullText={`The Muslim world’s scientific and intellectual primacy did not decline due to an internal rejection of reason or science. Rather, from the thirteenth century onward, a convergence of external and internal disruptions took a cumulative toll. The Crusades, followed by the devastating Mongol invasions, culminating in the sack of Baghdad in 1258, severely damaged institutional centers of learning. These shocks were compounded by the loss of economic dominance, fragmentation of political authority, gradual shifts in global trade routes, and loss of patronage.

In later centuries, European imperial expansion introduced a new challenge. Colonialism brought not only military and administrative control, but also Western philosophical assumptions as discussed above. Positivist and materialist frameworks were imported as markers of modernity and progress. For many Muslims, these frameworks displaced earlier Islamic epistemologies rather than being critically assessed through them.`}
        />

        {/* Section 6: Modern Responses */}
        <ContentCard 
          colorTheme="indigo"
          icon={Sprout}
          period="20th Century – Present"
          title="Reform and Revival"
          subtitle="The Path Forward"
          mainText="Today, some try to simply copy Western science. But a revivalist movement argues we must recover the Islamic framework: keeping rigorous science while anchoring it in an Islamic view of reality (Metaphysics)."
          isLast={true}
          highlightBox={{
            title: "The Goal",
            text: "To gather knowledge from every source, subject it to Islamic metaphysics, digest it critically, and then build upon it."
          }}
          fullText={`By the late nineteenth and twentieth centuries, Muslim intellectual responses to Western modernity largely crystallized into two broad tendencies. Reformist-modernists such as Jamāl al-Dīn al-Afghānī, Muḥammad ʿAbdūh, and Sir Sayyid Aḥmad Khān sought to harmonize Islam with modern Western science, often rearticulating Islamic teachings in the language and categories of European thought. Their project aimed at compatibility and survival within a rapidly changing intellectual landscape.

In contrast, traditionalist-revivalist thinkers such as Deobandī scholars, Muṣṭafā Ṣabrī, Saʿīd Nursī, Seyyed Hossein Nasr, and Syed Naquib al-Attas recognized that the challenge was not scientific data but metaphysical framing. They argued that uncritical adoption of Western epistemology entailed profound theological consequences. Their response called for a return to the earlier Islamic method: to gather knowledge from every source, subject it to Islamic metaphysics, digest it critically, and then build upon it.

This historical trajectory reveals a key distinction. Whereas Western intellectual history gradually narrowed the scope of reason to exclude metaphysics and theology, Islamic civilization developed a stable internal structure that preserved metaphysical foundations while encouraging empirical and rational investigation.`}
        />

        {/* Footer / Synthesis */}
        <div className="mt-20 p-8 bg-white rounded-3xl border border-stone-200 text-center shadow-lg">
          <Library className="w-8 h-8 text-stone-300 mx-auto mb-4" />
          <h4 className="font-serif font-bold text-2xl text-stone-800 mb-3">Integrative Intellectual Order</h4>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto italic">
            "Knowledge was never neutral; it was always situated within a broader understanding of reality, purpose, and truth."
          </p>
        </div>

        <div className="mt-16 text-center text-stone-400 text-sm font-medium">
          <p>© 2026 Educational Infographic Series</p>
        </div>

      </main>
    </div>
  );
};

export default App;