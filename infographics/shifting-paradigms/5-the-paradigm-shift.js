import React, { useState } from 'react';
import { 
  Microscope, 
  Globe, 
  UserCheck, 
  Map, 
  AlertTriangle, 
  ArrowRight, 
  CheckCircle,
  FileText,
  ChevronUp,
  ChevronDown,
  ArrowDown,
  RefreshCw,
  Anchor,
  ExternalLink
} from 'lucide-react';

// --- Content Component ---

const ContentCard = ({ 
  title, 
  subtitle,
  mainText,
  icon: Icon,
  highlightBox,
  fullText,
  colorTheme = "teal", // 'teal' or 'indigo'
  isLast
}) => {
  const [showFullText, setShowFullText] = useState(false);
  
  const colors = {
    teal: {
      border: "group-hover:border-teal-400",
      iconBg: "group-hover:text-teal-700",
      accent: "bg-teal-50 group-hover:bg-teal-500",
      title: "group-hover:text-teal-900",
      tag: "bg-teal-50 text-teal-700 border-teal-200",
      button: "text-teal-700 hover:text-teal-900 hover:bg-teal-50",
      box: "bg-teal-50 border-teal-200 text-teal-800"
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
                  {subtitle}
                </span>
              </div>

              <div className="flex flex-col gap-8">
                <div className="flex-1">
                  <h3 className={`text-2xl font-serif font-bold text-stone-800 mb-4 transition-colors ${theme.title}`}>
                    {title}
                  </h3>
                  
                  {/* Main Text Area (Changed to div to support lists/JSX) */}
                  <div className="text-lg text-stone-600 leading-relaxed mb-6">
                    {mainText}
                  </div>

                  {/* Highlight Box */}
                  {highlightBox && (
                    <div className={`p-5 rounded-xl border-l-4 ${theme.box} mb-6`}>
                      <div className="flex gap-3">
                        <div className="mt-1">
                            {colorTheme === 'teal' ? <AlertTriangle className="w-5 h-5 opacity-70" /> : <CheckCircle className="w-5 h-5 opacity-70" />}
                        </div>
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

const ClosingSlide = () => (
  <div className="mt-32 relative group">
    {/* Decorative Frame */}
    <div className="absolute inset-0 border-2 border-stone-200 rounded-3xl transform translate-x-2 translate-y-2"></div>
    
    <div className="relative p-16 bg-white rounded-3xl border border-stone-200 shadow-xl text-center overflow-hidden">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-stone-50 opacity-30 bg-[radial-gradient(#0f766e_0.5px,transparent_0.5px)] [background-size:24px_24px]"></div>
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-teal-600 via-emerald-500 to-teal-600"></div>

      <div className="relative z-10 flex flex-col items-center">
        
        {/* Arabic Text */}
        <h2 className="font-serif text-4xl md:text-6xl text-teal-900 mb-8 font-bold leading-relaxed drop-shadow-sm" style={{ fontFamily: 'Amiri, serif' }}>
          جزاكم الله خيرا
        </h2>

        {/* Separator */}
        <div className="w-24 h-px bg-gradient-to-r from-transparent via-stone-300 to-transparent mb-8"></div>

        {/* English Title */}
        <h3 className="text-2xl font-serif text-stone-800 tracking-widest uppercase mb-8">
          Ashrafiyya Health
        </h3>

        {/* Website Link */}
        <a 
          href="https://ashrafiyya.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-3 px-8 py-3 bg-white text-teal-700 font-medium rounded-full border border-teal-100 hover:border-teal-300 hover:bg-teal-50 transition-all shadow-sm hover:shadow-md"
        >
          <span className="tracking-wide">ashrafiyya.com</span>
          <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </a>

      </div>
    </div>
  </div>
);

const App = () => {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-sans selection:bg-teal-200 pb-24">
      
      {/* Header */}
      <header className="pt-24 pb-16 px-6 max-w-5xl mx-auto text-center">
        <div className="inline-block px-5 py-2 bg-white text-teal-700 text-sm font-bold tracking-[0.2em] uppercase rounded-full mb-8 border border-stone-200 shadow-sm">
          A New Path Forward
        </div>
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-stone-900 mb-6 leading-tight tracking-tight">
          The Paradigm Shift
        </h1>
        <p className="text-xl text-stone-500 max-w-2xl mx-auto leading-relaxed font-light">
          Moving from a narrow biomedical focus to a fully integrated, theocentric model of care.
        </p>
        <div className="flex justify-center mt-12">
            <ArrowDown className="w-6 h-6 text-stone-300 animate-bounce" />
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6">

        {/* Section 1: The Problem (Narrowing) */}
        <ContentCard 
          colorTheme="teal"
          icon={Microscope}
          subtitle="The Current State"
          title="Biomedical Narrowing"
          mainText="Modern medicine gained its power by narrowing its focus. It decided to look only at physical mechanisms and ignore wider realities. This made it great at fixing bodies but created a blind spot: it often treats the physical body as the only 'real' part of the patient."
          highlightBox={{
            title: "The Blind Spot",
            text: "When medicine stops at 'Nature' as the final explanation, it misses the ultimate Causer and the greater reality of the patient."
          }}
          fullText={`The Islamic theocentric approach responds to real tensions that many clinicians already notice in modern biomedical materialism. Modern medicine achieved its remarkable successes by narrowing its focus. It bracketed metaphysical questions and restricted explanation to material, efficient causes. This produced precision, predictive power, and technical effectiveness.

At the same time, the same narrowing created blind spots. Biomedical materialism often treats the physical body as the main, and sometimes the only, “real” site of disease and healing. In doing so, it sidelines dimensions that are central in an Islamic ontology, such as the unseen, the soul and spiritual states, and divine decree (qadar). A medical approach that treats only the body can succeed biologically and still fail to address the full reality of the human condition in which illness occurs.`}
        />

        {/* Section 2: The Solution (Integration) */}
        <ContentCard 
          colorTheme="indigo"
          icon={Globe}
          subtitle="The Islamic Model"
          title="Theocentric Integration"
          mainText="This isn't about rejecting science. It's about 'Theocentric Integration.' We keep the rigorous scientific method (studying causes), but we place it inside a wider reality where Allah is central. We see the body as a mechanism, but we know it serves a higher purpose."
          highlightBox={{
            title: "Completing, Not Replacing",
            text: "The goal is not to weaken medicine’s mechanism. The goal is to complete it by restoring a wider ontology, a fuller anthropology, and a clearer purpose."
          }}
          fullText={`The Islamic model does not propose “adding spirituality” onto medicine. It also does not propose lowering scientific standards. It proposes re-grounding medicine in a wider ontology and epistemology, where empirical science remains fully legitimate, but is placed inside a larger understanding of reality, causation, and human purpose. This is not supplementation. It is a paradigm shift in how the clinician understands what the patient is and what medical work is for.

Historically, many of the questions modern medicine struggles to answer—about meaning, suffering, purpose, and levels of causation—were not treated as “non-medical” in the same way. Islamic civilization absorbed foreign sciences, disciplined them within tawḥīd, and advanced them without needing to sever scientific practice from wider existence and ultimate meaning. The point here is not nostalgia. It is to retrieve a proven intellectual posture that can engage modern medicine.`}
        />

        {/* Section 3: Practitioner Impact */}
        <ContentCard 
          colorTheme="indigo"
          icon={UserCheck}
          subtitle="At the Bedside"
          title="What This Means for You"
          mainText={
            <div>
              For the clinician, this is an internal operating system update. It changes how you see everything:
              <ul className="list-disc list-inside mt-4 space-y-2 text-base font-medium text-stone-700 pl-2">
                <li><strong>Ontology:</strong> You see Allah as the ultimate Sustainer, not just "nature."</li>
                <li><strong>Anthropology:</strong> You treat the whole human, not just a biological machine.</li>
                <li><strong>Ethics:</strong> You cultivate humility (<em>tawāḍuʿ</em>) and patience (<em>ṣabr</em>) because you know you are not in total control.</li>
              </ul>
            </div>
          }
          highlightBox={{
            title: "No Split Identity",
            text: "You don't have to be a 'scientist' at work and a 'believer' at home. You are a believer using science as a tool."
          }}
          fullText={`This framework functions as the practitioner’s internal operating system. It does not dictate specific clinical algorithms; rather, it reshapes how knowledge is interpreted, how patients are understood, and how care is morally situated.

It grounds the practitioner’s ontology: Reality is understood as hierarchically ordered, with the Necessary Creator as ontologically prior to all created beings. Biological processes, the patient, and indeed the practitioner themselves are real, yet fundamentally contingent and dependent.

It informs the practitioner’s epistemology: The clinician pursues empirical knowledge with full seriousness, because the senses and disciplined reasoning are genuine tools. At the same time, evidence is not absolutized into a total worldview.

It shapes their anthropology: The patient is not merely a diseased body, but an integrated human being whose biological state interacts with moral, spiritual, psychological, and social realities.

It clarifies their telos: Health is not an end in itself, but a means that supports the human being’s capacity for truth-seeking (maʿrifah), worship (ʿibādah), moral responsibility, and human flourishing.`}
        />

        {/* Section 4: Challenges & Pathways */}
        <ContentCard 
          colorTheme="teal"
          icon={Map}
          subtitle="Moving Forward"
          title="Challenges & Pathways"
          mainText="Changing a paradigm is hard. You will face the 'Myth of Objectivity' (people thinking modern medicine is neutral) and the fear of losing professional identity. But the path forward is clear: Learn the history, critique the hidden assumptions, and build a community of practice."
          isLast={true}
          highlightBox={{
            title: "De-Naturalization",
            text: "The first step is simply realizing that the current way isn't the 'only' way—it's just a historical choice we can update."
          }}
          fullText={`The move toward an Islamic paradigm in medicine faces real obstacles. These obstacles are not only institutional. They are also intellectual and psychological.

Challenges include the "Myth of Objectivity"—modern medicine presents itself as neutral, so any religious framework feels like "bias." Practitioners also fear that opening up to metaphysics might devalue their hard-won technical expertise.

Pathways for Adoption:
1. Internal Critique: Practitioners must be educated about metaphysical and epistemological assumptions embedded in modern biomedicine. This process “de-naturalizes” biomedical materialism.
2. Developing a Scholarly Synthesis: We need a contemporary ʿIlm al-Ṭibb that rigorously engages modern biomedical knowledge through an Islamic framework.
3. Cultivating a Niche Cultural Shift: Meaningful change can occur within smaller professional communities through personal formation and peer discussion.`}
        />

        {/* Footer / Synthesis Block */}
        <div className="mt-20 p-8 bg-white rounded-3xl border border-stone-200 text-center shadow-lg">
          <RefreshCw className="w-8 h-8 text-stone-300 mx-auto mb-4" />
          <h4 className="font-serif font-bold text-2xl text-stone-800 mb-3">A Call to Complete Medicine</h4>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto italic">
            "We are not replacing medicine. We are completing it. We are restoring the soul to the body, and the Creator to the creation."
          </p>
        </div>

        {/* Closing Slide */}
        <ClosingSlide />

        <div className="mt-16 text-center text-stone-400 text-sm font-medium">
          <p>© 2025 Educational Infographic Series</p>
        </div>

      </main>
    </div>
  );
};

export default App;