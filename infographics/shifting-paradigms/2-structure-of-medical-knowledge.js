import React, { useState } from 'react';
import { 
  Stethoscope, 
  Scale, 
  FileText, 
  ChevronUp, 
  ChevronDown, 
  Brain, 
  Activity, 
  Eye, 
  EyeOff,
  Split, 
  User, 
  HelpCircle,
  AlertTriangle,
  ArrowDown
} from 'lucide-react';

// --- Content Components ---

const ContentCard = ({ 
  title, 
  subtitle,
  mainText,
  icon: Icon,
  highlightBox,
  fullText,
  colorTheme = "slate" // 'slate' or 'clay'
}) => {
  const [showFullText, setShowFullText] = useState(false);
  
  const colors = {
    slate: {
      border: "group-hover:border-slate-400",
      iconBg: "group-hover:text-slate-700",
      accent: "bg-slate-100 group-hover:bg-slate-500",
      title: "group-hover:text-slate-800",
      tag: "bg-slate-100 text-slate-600 border-slate-200",
      button: "text-slate-700 hover:text-slate-900 hover:bg-slate-100",
      box: "bg-slate-50 border-slate-200 text-slate-700"
    },
    clay: {
      border: "group-hover:border-orange-400",
      iconBg: "group-hover:text-orange-700",
      accent: "bg-orange-50 group-hover:bg-orange-500",
      title: "group-hover:text-orange-900",
      tag: "bg-orange-50 text-orange-700 border-orange-200",
      button: "text-orange-700 hover:text-orange-900 hover:bg-orange-50",
      box: "bg-orange-50 border-orange-200 text-orange-800"
    }
  };

  const theme = colors[colorTheme];

  return (
    <div className="flex flex-col md:flex-row gap-8 mb-20 group relative">
       {/* Connecting Line (Vertical) */}
       <div className="absolute left-8 top-16 bottom-[-80px] w-1 bg-stone-200 rounded-full md:block hidden last:hidden"></div>

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
                  <p className="text-lg text-stone-600 leading-relaxed mb-6">
                    {mainText}
                  </p>

                  {/* Highlight Box (The 'Blind Spot' or 'Key Insight') */}
                  {highlightBox && (
                    <div className={`p-5 rounded-xl border-l-4 ${theme.box} mb-6`}>
                      <div className="flex gap-3">
                        <div className="mt-1"><Activity className="w-5 h-5 opacity-70" /></div>
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
    <div className="min-h-screen bg-stone-50 text-stone-800 font-sans selection:bg-slate-200 pb-24">
      
      {/* Header */}
      <header className="pt-24 pb-16 px-6 max-w-5xl mx-auto text-center">
        <div className="inline-block px-5 py-2 bg-white text-slate-600 text-sm font-bold tracking-[0.2em] uppercase rounded-full mb-8 border border-stone-200 shadow-sm">
          Philosophy in Practice
        </div>
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-stone-900 mb-6 leading-tight tracking-tight">
          The Structure of Medical Knowledge
        </h1>
        <p className="text-xl text-stone-500 max-w-2xl mx-auto leading-relaxed font-light">
          Examining the hidden assumptions, the limits of diagnosis, and the divided reality of the modern clinician.
        </p>
        <div className="flex justify-center mt-12">
            <ArrowDown className="w-6 h-6 text-stone-300 animate-bounce" />
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6">

        {/* Section 1: Diagnosis */}
        <ContentCard 
          colorTheme="slate"
          icon={Stethoscope}
          subtitle="Epistemology of Diagnosis"
          title="The Uncertainty of Knowing"
          mainText="Diagnosis isn't a simple math problem. It's an educated guess based on limited clues. While modern medicine tries to use strict evidence ('Evidence-Based Medicine') to reduce error, it can't remove the need for human judgment."
          highlightBox={{
            title: "The Reality Check",
            text: "Evidence helps us investigate, but judgment is how we decide. Medicine is never purely mechanical; it is always value-laden."
          }}
          fullText={`Most clinicians operate within a realist causal framework, assuming that diseases are real pathological processes (e.g., pneumococcal pneumonia in the lung) that give rise to observable signs and symptoms (e.g., cough, fever, X-ray changes). Diagnosis, however, is an uncertain act: an inference to the best explanation from limited and probabilistic data.

This is where experience and judgment matter. Formal reasoning helps, but it cannot remove uncertainty from clinical life. Evidence-Based Medicine (EBM) rose partly to strengthen medicine’s epistemic foundations through structured research and hierarchies of evidence: “What is your evidence for that?”

Later critiques argued that EBM can become too rigid if it treats evidence as automatically overriding clinical expertise and patient values. That is why newer language such as “evidence-informed medicine” developed, aiming to integrate evidence with judgment and patient priorities. This shift matters because it quietly admits something important: medical knowledge is not purely mechanical. It is shaped by methods, values, and context.`}
        />

        {/* Section 2: Implicit Metaphysics */}
        <ContentCard 
          colorTheme="clay"
          icon={EyeOff}
          subtitle="Contemporary Medicine"
          title="The Invisible Framework"
          mainText="Modern medicine claims to be neutral, but it operates on a hidden philosophy: 'Mechanistic Materialism.' It assumes that only physical things are real and only measurable things count as knowledge. This creates blind spots for anything that isn't a number."
          highlightBox={{
            title: "Emerging Blind Spots",
            text: "Because subjective pain, moral meaning, and spiritual distress cannot be measured in a lab, modern medicine often treats them as if they don't exist."
          }}
          fullText={`Modern Western medicine rests on a set of largely unspoken metaphysical and epistemological assumptions. Chief among them is mechanistic materialism: the view that reality is fundamentally physical and that explanation proceeds through measurable processes. One practical consequence is that phenomena resistant to quantification, such as subjective pain, existential distress, or moral meaning, are often sidelined or treated as secondary.

This orientation reflects the influence of twentieth-century empiricism and logical positivism, which privileged measurable data as the gold standard of knowledge. Although modern medicine often presents itself as objective, it operates with implicit normative commitments about what counts as health, which outcomes matter, and which lives are worth prioritizing. These commitments are rarely examined explicitly.

In summary, the dominant assumptions of modern Western medicine include viewing the body as a mechanistic object, understanding disease as deviation from biophysical norms, privileging reductionist explanations, and treating controlled empirical evidence as the primary source of knowledge.`}
        />

        {/* Section 3: Practitioner's View */}
        <ContentCard 
          colorTheme="slate"
          icon={Split}
          subtitle="Practitioner's Point of View"
          title="The Divided Self"
          mainText="For a believing clinician, this system creates a tension. You are trained to think like a materialist at work (looking only for physical causes) while holding onto your faith in private. This 'compartmentalization' can feel like living a double life."
          highlightBox={{
            title: "Functional Bifurcation",
            text: "You learn to keep 'Iman' (faith) and 'Clinical Reasoning' in separate boxes. Over time, this split can quietly reshape how you view suffering and responsibility."
          }}
          fullText={`A healthcare practitioner’s worldview, often implicit and unexamined, shapes every aspect of medical practice. Its influence operates at multiple levels simultaneously: epistemological (what counts as legitimate knowledge), theoretical (how health, disease, and causation are conceptualized), and operational (how clinical decisions are made and care is delivered).

For the theist practitioner, a deeper tension can appear. Modern training often demands methodological naturalism: in your professional explanations, you are expected to speak and reason as if only natural causes are relevant. When divine action is excluded a priori from the explanatory frame, a clinician may gradually learn to keep īmān and clinical reasoning in separate compartments: Allah is affirmed, while thinking proceeds as if natural causes are the whole story.

Over time, this compartmentalization exacts a cognitive and spiritual cost. The practitioner learns to think, decide, and speak within a framework that implicitly treats metaphysical commitments as irrelevant to clinical reasoning. The result is not necessarily atheism, but a functional bifurcation of the self: one mode of cognition governs professional life, another governs personal belief.`}
        />

        {/* Footer / Synthesis */}
        <div className="mt-20 p-8 bg-white rounded-3xl border border-stone-200 text-center shadow-lg">
          <HelpCircle className="w-8 h-8 text-stone-300 mx-auto mb-4" />
          <h4 className="font-serif font-bold text-2xl text-stone-800 mb-3">The Core Tension</h4>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto italic">
            "Modern medicine gives us powerful tools to treat the body, but its hidden philosophy often forces us to ignore the soul. The challenge is to keep the tools without adopting the blindness."
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