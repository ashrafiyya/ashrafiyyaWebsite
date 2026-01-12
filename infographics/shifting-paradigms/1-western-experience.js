import React, { useEffect, useRef, useState } from 'react';
import { 
  Scale, 
  BookOpen, 
  Settings, 
  Search, 
  Microscope, 
  Eye, 
  Brain, 
  Layers,
  Activity,
  User,
  Stethoscope,
  ArrowDown,
  FileText,
  ChevronDown,
  ChevronUp,
  X
} from 'lucide-react';

const TimelineEvent = ({ 
  period, 
  title, 
  description, 
  keyFigures,
  medicalImplication,
  fullText,
  icon: Icon, 
  ontologyState, 
  epistemyState, 
  isLast,
  align = 'left' 
}) => {
  const [showFullText, setShowFullText] = useState(false);

  return (
    <div className={`relative flex group ${isLast ? '' : 'pb-24'}`}>
      {/* Central Line */}
      {!isLast && (
        <div className="absolute left-8 top-16 bottom-0 w-1 bg-stone-200 rounded-full"></div>
      )}

      {/* Icon Node */}
      <div className="absolute left-0 w-16 h-16 flex items-center justify-center z-10">
        <div className="w-12 h-12 rounded-xl bg-white border-2 border-stone-200 shadow-sm flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:border-teal-500 group-hover:shadow-md">
          <Icon className="w-6 h-6 text-stone-400 group-hover:text-teal-600 transition-colors" />
        </div>
      </div>

      {/* Content Card */}
      <div className={`ml-20 w-full`}>
        <div className="bg-white p-8 rounded-2xl border border-stone-100 shadow-sm hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1 relative overflow-hidden">
          
          {/* Subtle Accent Bar */}
          <div className="absolute top-0 left-0 w-2 h-full bg-stone-100 group-hover:bg-teal-500 transition-colors duration-500"></div>
          
          <div className="flex flex-col gap-6 pl-4">
            <div className="flex-1">
              {/* Period Badge */}
              <div className="flex items-center justify-between mb-3">
                <span className="inline-block px-3 py-1 bg-stone-100 text-stone-500 text-xs font-bold tracking-widest uppercase rounded-full">
                  {period}
                </span>
              </div>
              
              <h3 className="text-2xl font-serif font-bold text-stone-800 mb-3 group-hover:text-teal-800 transition-colors">
                {title}
              </h3>

              {/* Key Figures Section */}
              <div className="flex flex-wrap gap-2 mb-5">
                 {keyFigures.map((figure, idx) => (
                   <span key={idx} className="flex items-center text-xs bg-white text-stone-500 px-3 py-1.5 rounded-full border border-stone-200 shadow-sm font-medium">
                     <User className="w-3 h-3 mr-2 text-teal-500" /> {figure}
                   </span>
                 ))}
              </div>
              
              <p className="text-stone-600 text-lg leading-relaxed mb-6">
                {description}
              </p>

              {/* Status Indicators Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-teal-50 p-4 rounded-xl border border-teal-100">
                  <span className="text-xs font-bold text-teal-600 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Eye className="w-4 h-4" /> Reality (Ontology)
                  </span>
                  <span className="text-base font-bold text-stone-800">{ontologyState}</span>
                </div>
                <div className="bg-amber-50 p-4 rounded-xl border border-amber-100">
                  <span className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Brain className="w-4 h-4" /> Knowledge (Epistemology)
                  </span>
                  <span className="text-base font-bold text-stone-800">{epistemyState}</span>
                </div>
              </div>

              {/* Clinical Impact Block */}
              <div className="bg-slate-50 p-5 rounded-xl border-l-4 border-slate-300 relative group-hover:border-teal-500 transition-colors mb-6">
                <div className="flex items-start gap-4">
                  <div className="bg-white p-2 rounded-full shadow-sm mt-1">
                    <Stethoscope className="w-5 h-5 text-slate-500" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-600 uppercase tracking-wide mb-1">Clinical Impact</h4>
                    <p className="text-base text-slate-700 leading-relaxed font-medium">
                      {medicalImplication}
                    </p>
                  </div>
                </div>
              </div>

              {/* Full Text Toggle Button */}
              <button 
                onClick={() => setShowFullText(!showFullText)}
                className="flex items-center gap-2 text-sm font-bold text-teal-700 hover:text-teal-900 transition-colors px-4 py-2 rounded-lg hover:bg-teal-50 border border-transparent hover:border-teal-100 w-full md:w-auto justify-center md:justify-start"
              >
                {showFullText ? <ChevronUp className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                {showFullText ? "Hide Source Text" : "Read Source Text"}
              </button>

              {/* Collapsible Source Text Section */}
              {showFullText && (
                <div className="mt-6 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="bg-[#fdfbf7] p-6 rounded-xl border border-stone-200 shadow-inner">
                    <div className="flex items-center gap-2 mb-4 border-b border-stone-200 pb-3">
                      <FileText className="w-4 h-4 text-stone-400" />
                      <span className="text-xs font-bold text-stone-400 uppercase tracking-widest">Excerpts from "Heart of Care"</span>
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
    </div>
  );
};

const FunnelGraphic = ({ title, icon: Icon, steps, type }) => {
  const isTeal = type === 'ontology';
  const gradientId = `grad-${type}`;
  
  return (
    <div className="flex flex-col items-center w-full">
      <h3 className="font-serif font-bold text-stone-700 mb-6 flex items-center gap-2 text-xl">
        <Icon className={`w-6 h-6 ${isTeal ? 'text-teal-600' : 'text-amber-600'}`} /> 
        {title}
      </h3>
      
      <div className="relative w-full max-w-xs h-64 filter drop-shadow-lg transform hover:scale-105 transition-transform duration-500">
        <svg viewBox="0 0 200 300" className="w-full h-full">
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={isTeal ? "#14b8a6" : "#f59e0b"} stopOpacity="1" />
              <stop offset="100%" stopColor={isTeal ? "#ccfbf1" : "#fef3c7"} stopOpacity="0.9" />
            </linearGradient>
          </defs>
          
          <path 
            d="M10,10 L190,10 L140,290 L60,290 Z" 
            fill={`url(#${gradientId})`} 
            stroke="white" 
            strokeWidth="3"
            className="opacity-90"
          />
          
          {steps.map((step, index) => {
            const yPos = 40 + (index * 70);
            return (
              <g key={index}>
                <text 
                  x="100" 
                  y={yPos} 
                  textAnchor="middle" 
                  fill="white" 
                  className="text-[15px] font-bold uppercase tracking-wider"
                  style={{ textShadow: '0px 2px 4px rgba(0,0,0,0.2)' }}
                >
                  {step}
                </text>
                {index < steps.length - 1 && (
                  <line 
                    x1="45" 
                    y1={yPos + 35} 
                    x2="155" 
                    y2={yPos + 35} 
                    stroke="white" 
                    strokeOpacity="0.4" 
                    strokeDasharray="4 4" 
                    strokeWidth="1.5"
                  />
                )}
              </g>
            );
          })}
        </svg>
      </div>
      <p className="text-center text-base text-stone-500 mt-6 italic max-w-xs font-medium bg-white px-4 py-2 rounded-full shadow-sm">
        {type === 'ontology' 
          ? "We went from: \"God is Essential\" → \"God is Excluded\"" 
          : "We went from: \"Many ways of knowing\" → \"Only Measurement counts\""}
      </p>
    </div>
  );
};

const ParadoxVisual = () => {
  const techLabelRef = useRef(null);
  const wholeLabelRef = useRef(null);
  const lineEndX = 320;

  useEffect(() => {
    const updateLabelPositions = () => {
      if (techLabelRef.current) {
        const width = techLabelRef.current.getBBox().width;
        techLabelRef.current.setAttribute('x', String(lineEndX + width + 5));
      }
      if (wholeLabelRef.current) {
        const width = wholeLabelRef.current.getBBox().width;
        wholeLabelRef.current.setAttribute('x', String(lineEndX + width + 5));
      }
    };

    updateLabelPositions();
    window.addEventListener('resize', updateLabelPositions);
    return () => window.removeEventListener('resize', updateLabelPositions);
  }, []);

  return (
    <div className="mt-20 p-8 bg-gradient-to-br from-white to-stone-50 rounded-3xl shadow-lg border border-stone-100">
    <div className="flex flex-col md:flex-row items-center gap-12">
      <div className="flex-1">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 text-red-600 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
          <Activity className="w-4 h-4" /> The Trade-Off
        </div>
        <h4 className="font-serif font-bold text-3xl text-stone-800 mb-4">
          The Modern Paradox
        </h4>
        <p className="text-stone-600 text-lg leading-relaxed mb-6">
          As medicine got better at fixing the <strong>machine</strong> (the body), it got worse at seeing the <strong>person</strong> (the soul).
        </p>
        <div className="bg-white p-6 rounded-xl border-l-4 border-teal-500 shadow-sm text-base text-stone-600 italic font-medium">
          "We gained technical power, but lost the 'whole picture' of what a human being actually is."
        </div>
      </div>
      
      <div className="w-full md:w-1/2 h-56 relative overflow-hidden bg-white rounded-2xl border border-stone-100 shadow-inner p-6">
        <div className="absolute bottom-4 left-6 right-6 flex justify-between text-xs text-stone-400 font-bold uppercase">
          <span>Ancient Times</span>
          <span>Today</span>
        </div>
        
        <svg className="absolute inset-0 w-full h-full p-6" viewBox="0 0 420 180" preserveAspectRatio="xMidYMid meet">
          {/* Technical Power Line */}
          <path 
            d="M0,150 C95,140 205,20 320,20" 
            fill="none" 
            stroke="#14b8a6" 
            strokeWidth="4" 
            className="drop-shadow-md"
            style={{ vectorEffect: 'non-scaling-stroke' }} 
          />
          <text ref={techLabelRef} x={lineEndX} y="24" textAnchor="end" fill="#0d9488" fontSize="12" fontWeight="700">Tech Power (High)</text>

          {/* Wholeness Line */}
          <path 
            d="M0,40 C95,50 205,140 320,150" 
            fill="none" 
            stroke="#f59e0b" 
            strokeWidth="4" 
            strokeDasharray="8,8"
            className="drop-shadow-md"
            style={{ vectorEffect: 'non-scaling-stroke' }} 
          />
          <text ref={wholeLabelRef} x={lineEndX} y="154" textAnchor="end" fill="#d97706" fontSize="12" fontWeight="700">Wholeness (Low)</text>
        </svg>
      </div>
    </div>
  </div>
  );
};

const App = () => {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-sans selection:bg-teal-100 pb-24">
      
      <header className="pt-24 pb-16 px-6 max-w-5xl mx-auto text-center">
        <div className="inline-block px-5 py-2 bg-white text-teal-600 text-sm font-bold tracking-[0.2em] uppercase rounded-full mb-8 border border-stone-100 shadow-sm">
          A Philosophical Journey
        </div>
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-stone-900 mb-8 leading-tight tracking-tight">
          The Western Experience
        </h1>
        <p className="text-2xl text-stone-500 max-w-3xl mx-auto leading-relaxed font-light">
          How we went from a universe filled with <span className="text-teal-600 font-semibold">Divine Purpose</span> to a universe run by <span className="text-amber-600 font-semibold">Machine Laws</span>.
        </p>
        <div className="flex justify-center mt-8">
            <ArrowDown className="w-8 h-8 text-stone-300 animate-bounce" />
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6">
        
        <div className="bg-white p-10 rounded-3xl shadow-sm border border-stone-200 mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <FunnelGraphic 
              title="Shrinking Reality" 
              type="ontology"
              icon={Eye}
              steps={["God is Essential", "God is Allowed", "God is Irrelevant", "God is Excluded"]}
            />
            <FunnelGraphic 
              title="Limiting Knowledge" 
              type="epistemology"
              icon={Brain}
              steps={["Many Sources", "Reason + Logic", "Only Science", "Only Numbers"]}
            />
          </div>
        </div>

        <div className="flex items-center justify-center mb-20 opacity-40">
          <div className="h-1 bg-stone-200 w-32 rounded-full"></div>
          <div className="mx-6 text-stone-300 bg-stone-100 p-2 rounded-full"><Layers className="w-6 h-6"/></div>
          <div className="h-1 bg-stone-200 w-32 rounded-full"></div>
        </div>

        <div className="relative pl-4 md:pl-0">
          
          <TimelineEvent 
            period="Ancient Times"
            title="Nature Makes Sense on Its Own"
            keyFigures={["Aristotle", "Hippocrates", "Galen"]}
            icon={Scale}
            description="Thinkers started explaining the world using nature's own rules, instead of always blaming the gods. They didn't deny God, but they realized they didn't need Him to explain simple things cough and stomach upset."
            fullText={`**Philosophical Trajectory:**
            In Classical Antiquity, philosophers in the Greek world began to explain the natural world through nature itself. Thinkers in the centuries BCE proposed that reality could be understood in terms of natural elements, regular patterns, and observable causes. Inquiry and observation became methods for acquiring truth, and material explanations of the universe were articulated in which events unfolded according to natural laws rather than the direct activity of the gods.

This intellectual posture did not deny the existence of divinity, but it increasingly treated divine action as unnecessary for explaining physical phenomena. Thus, the foundations of natural philosophy and early scientific inquiry were laid: nature was rendered intelligible on its own terms, and explanation increasingly proceeded without recourse to metaphysical (non-observable) or theological commitments. This is an early step toward ontological and epistemic narrowing, even though it did not entail a rejection of theism.

**Philosophy of Western Medicine:**
Western medicine begins in Classical Antiquity alongside natural philosophy. Hippocrates (5th century BCE) is credited as among the first to argue that disease arises from natural causes, such as environment, diet, and lifestyle, rather than supernatural forces. This shift established a foundational orientation for medicine: the physician’s task was to assist the body’s inherent capacity to heal by correcting imbalances in nature. Importantly, this move toward natural causation did not imply purposeless materialism.

Galen (2nd century CE) significantly systematized this approach. His theory of the four humors (blood, phlegm, yellow bile, and black bile) offered a unified explanatory framework linking physiology, temperament, and disease. Galen also articulated a key tension that would persist throughout the history of medicine: the debate between rationalist approaches and empiricist approaches. Galenic medicine dominated Western and Islamic medical thought for over thirteen centuries.`}
            ontologyState="God is Allowed (Permissible)"
            epistemyState="Logic + Observation"
            medicalImplication="Hippocrates said disease comes from nature (like bad food or weather), not from angry spirits. This was a huge step forward for medicine."
          />

          <TimelineEvent 
            period="12th–15th Centuries"
            title="Faith and Reason Split Up"
            keyFigures={["Aquinas", "Ockham", "Scotus"]}
            icon={BookOpen}
            description="When Greek science came back to Europe, it clashed with religion. Some scholars tried to keep them separate to protect their faith. But this had an accidental side-effect: it made Logic the only tool for studying the real world, leaving Faith for Sundays."
            fullText={`**Philosophical Trajectory:**
            Beginning in the twelfth century, ancient Greek writings were reintroduced into Western Europe, largely through contact with the Muslim world. This sudden influx of systematic philosophy posed profound challenges to Christian theology. In response, Christian scholars pursued different strategies to preserve theism. Some thinkers advanced the notion of a “twofold truth,” in which a proposition could be true in philosophy while false in theology.

Some, like Thomas Aquinas (1225–1274), sought incorporation. For Aquinas, nature was a coherent, law-governed system established by a rational Creator. Other thinkers, such as John Duns Scotus and William of Ockham, pursued a strategy of preservation. Theological truths, they argued, were matters of faith rather than rational demonstration. While intended to safeguard theology, this move had an unintended consequence: it effectively detached reason from theology. Rational inquiry was for the study of nature alone.

By the close of the Middle Ages, philosophy and emerging scientific inquiry had become largely distinct from theology. The supernatural was relegated to the domain of faith, while nature could increasingly be investigated without immediate reference to God.`}
            ontologyState="Twofold Truth (Theo/Philo)"
            epistemyState="Faith vs. Reason"
            medicalImplication="This started the idea that you study the body with science, and the soul with religion. They became two different worlds."
          />

          <TimelineEvent 
            period="17th Century"
            title="The Clockwork Universe"
            keyFigures={["Descartes", "Newton"]}
            icon={Settings}
            description="Scientists began to see the universe as a giant machine or clock. God was the 'Clockmaker' who built it and walked away. If the universe is just a machine, you don't need God to explain how it runs anymore."
            fullText={`**Philosophical Trajectory:**
            The seventeenth century witnessed the consolidation of mechanistic philosophy through the work of Newton, Descartes, Hobbes, and Spinoza. While many of these figures retained a commitment to theism, their philosophical systems increasingly portrayed nature as a self-contained, law-governed mechanism. God, though acknowledged, receded from explanatory necessity.

It was during this period that methodological naturalism took firm root: in scientific inquiry, explanations should appeal only to natural causes. This approach proved enormously successful in physics and mathematics, lending it growing authority. Over time, it became the implicit rule governing what counted as legitimate knowledge within the sciences. At this stage, the narrowing is mostly about method, not necessarily about belief.

A well-known anecdote captures this shift. When Pierre-Simon Laplace (1749–1827) presented his work on celestial mechanics to Napoleon, explaining planetary stability without invoking divine action, Napoleon remarked on the absence of any mention of the Creator. Laplace famously replied, “I had no need of that hypothesis.”

**Philosophy of Western Medicine:**
A decisive shift occurred in the seventeenth century with the rise of mechanical philosophy. René Descartes (1596–1650) advanced mind–body dualism that profoundly shaped modern medicine. The body was reconceived as a machine governed by physical laws, while the mind was treated as a non-material thinking substance. Disease, within this framework, became simply a mechanical failure.

This model proved extraordinarily productive for anatomy, physiology, and later surgery. However, it carried unintended consequences. Cartesian dualism marginalized psychological and emotional dimensions of illness. What could not be easily localized in bodily mechanisms became epistemically inadmissible. Over time, medicine increasingly attended to what could be measured, visualized, or intervened upon mechanically.`}
            ontologyState="God is Irrelevant (to Science)"
            epistemyState="Experiments Rule"
            medicalImplication="Doctors started seeing the body as a machine too. Disease wasn't a spiritual problem; it was just a broken part in the machine. We stopped looking at the patient's feelings or soul."
          />

          <TimelineEvent 
            period="18th–19th Centuries"
            title="Biology Without a Designer"
            keyFigures={["Darwin", "The Enlightenment"]}
            icon={Search}
            description="Charles Darwin showed that life could develop on its own through evolution. This was the turning point. Now, you could be a 'serious thinker' and an atheist at the same time. Nature became the only thing that mattered."
            fullText={`**Philosophical Trajectory:**
            Enlightenment intensified these trends. Europeans, particularly French philosophers, became openly atheistic, arguing that only the material world exists and that religion is not merely false but socially harmful. Enlightenment thinkers increasingly offered an alternative to religious conviction grounded in naturalism and mechanism.

Darwin’s On the Origin of Species further consolidated naturalistic explanations. Biological diversity, long viewed as evidence of divine design, was now explained without reference to a Creator. Just as Newton had rendered God explanatorily unnecessary in physics, Darwin did so in biology. Scientific institutions increasingly treated naturalism as the normative framework, promoting “freethinking” and portraying the relationship between religion and science as one of inherent conflict. Atheism and agnosticism thereby gained intellectual legitimacy.

**Philosophy of Western Medicine:**
The nineteenth century marked a period of dramatic scientific success in medicine, particularly with the rise of germ theory through figures such as Pasteur and Koch. Diseases were now linked to specific microbial causes. This triumph reinforced a monocausal model of disease: for every illness, there exists a discrete, identifiable cause, and removing or neutralizing that cause restores health.

While immensely successful in infectious disease, monocausal thinking proved less adequate for treating chronic and complex conditions. Most diseases arise not from a single cause but from a convergence of biological, environmental, behavioral, and social factors. Germ theory’s success trained medicine to love clean causal stories. Although helpful, it can also become too narrow when medicine faces multi-factor illness.`}
            ontologyState="God is Excluded"
            epistemyState="Only Matter Matters"
            medicalImplication="Germ Theory proved that one tiny bug causes one disease. This was great for curing infections, but it made doctors think EVERY problem had a single simple cause, ignoring the complex human life."
          />

          <TimelineEvent 
            period="20th Century"
            title="Science Becomes the Only Reality"
            keyFigures={["Modern Scientists"]}
            icon={Microscope}
            description="It went from a method ('let's study nature') to a belief ('nature is ALL there is'). If you can't measure it, weigh it, or put it in a test tube, modern medicine acts like it doesn't exist."
            fullText={`**Philosophical Trajectory:**
            Despite the growing capacity of science to annihilate humanity itself, empiricism hardened into the dominant criterion of proof, and religious claims were increasingly dismissed as unverifiable or irrational. One by one, fields such as psychology, sociology, philosophy, and cosmology adopted naturalistic explanatory models.

Methodological naturalism became the de facto philosophy of science. It was now possible and expected to practice science in exactly the same way as an atheist, while relegating religious belief to the private sphere. Over time, this methodological stance fed into ontological conclusions. What began as a practical method for scientific inquiry gradually transformed into a conviction about reality itself: that nature is all there is. That is, ontological naturalism.

**Philosophy of Western Medicine:**
By the mid-twentieth century, biomedical science had become increasingly reductionist. The prevailing assumption was that higher-level phenomena, such as symptoms, syndromes, even behaviors, ultimately derive from lower-level processes such as molecular pathways, cellular dysfunctions, or genetic variation. This orientation brought unprecedented precision, particularly in pharmacology and molecular biology, but it also narrowed medicine’s explanatory lens.

In response, alternative models emerged, most notably George Engel’s biopsychosocial model in 1977, which argued that illness can only be adequately understood by integrating biological, psychological, and social dimensions. Each approach carries trade-offs. Reductionism can give clarity and targeted intervention. A broader view can restore context and meaning.`}
            ontologyState="Nature is Everything"
            epistemyState="Only Numbers Count"
            medicalImplication="This is why modern medicine is amazing at surgery and pills, but struggles to help people find meaning, handle suffering, or feel heard as human beings."
            isLast={true}
          />

        </div>

        <ParadoxVisual />

        <div className="mt-24 text-center text-stone-400 text-sm font-medium">
          <p>© 2026 Educational Infographic Series</p>
        </div>

      </main>
    </div>
  );
};

export default App;
