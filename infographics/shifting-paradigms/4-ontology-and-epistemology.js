import React, { useState } from 'react';
import { 
  Layers, 
  Repeat, 
  Heart, 
  Lightbulb, 
  Stethoscope, 
  FileText, 
  ChevronUp, 
  ChevronDown, 
  ArrowDown, 
  Compass,
  Scale,
  Eye,
  Brain,
  BookOpen,
  Share2
} from 'lucide-react';

// --- Content Component ---

const ContentCard = ({ 
  title, 
  subtitle,
  mainText,
  icon: Icon,
  highlightBox,
  fullText,
  colorTheme = "cyan", // 'cyan' or 'gold'
  isLast
}) => {
  const [showFullText, setShowFullText] = useState(false);
  
  const colors = {
    cyan: {
      border: "group-hover:border-cyan-400",
      iconBg: "group-hover:text-cyan-700",
      accent: "bg-cyan-50 group-hover:bg-cyan-500",
      title: "group-hover:text-cyan-900",
      tag: "bg-cyan-50 text-cyan-700 border-cyan-200",
      button: "text-cyan-700 hover:text-cyan-900 hover:bg-cyan-50",
      box: "bg-cyan-50 border-cyan-200 text-cyan-800"
    },
    gold: {
      border: "group-hover:border-amber-400",
      iconBg: "group-hover:text-amber-700",
      accent: "bg-amber-50 group-hover:bg-amber-500",
      title: "group-hover:text-amber-900",
      tag: "bg-amber-50 text-amber-700 border-amber-200",
      button: "text-amber-700 hover:text-amber-900 hover:bg-amber-50",
      box: "bg-amber-50 border-amber-200 text-amber-800"
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
    <div className="min-h-screen bg-stone-50 text-stone-800 font-sans selection:bg-cyan-200 pb-24">
      
      {/* Header */}
      <header className="pt-24 pb-16 px-6 max-w-5xl mx-auto text-center">
        <div className="inline-block px-5 py-2 bg-white text-cyan-700 text-sm font-bold tracking-[0.2em] uppercase rounded-full mb-8 border border-stone-200 shadow-sm">
          Foundations of Science
        </div>
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-stone-900 mb-6 leading-tight tracking-tight">
          Ontology & Epistemology
        </h1>
        <p className="text-xl text-stone-500 max-w-2xl mx-auto leading-relaxed font-light">
          Defining Reality (what exists) and Knowledge (how we know it) within an integrated Islamic framework.
        </p>
        <div className="flex justify-center mt-12">
            <ArrowDown className="w-6 h-6 text-stone-300 animate-bounce" />
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6">

        {/* Section 1: Ontology */}
        <ContentCard 
          colorTheme="cyan"
          icon={Layers}
          subtitle="Reality (Ontology)"
          title="Allah & Creation"
          mainText="Reality isn't just physical stuff. It has levels. It starts with Allah, who exists on His own. Everything else—nature, humans, the universe—depends entirely on Him to exist every single second. We call this 'Contingent' (mumkin)."
          highlightBox={{
            title: "The Core Difference",
            text: "Nature doesn't stand next to Allah; it stands beneath Him. He holds it together constantly."
          }}
          fullText={`Islamic metaphysical inquiry begins with existence itself, not with nature as an independent explanatory domain. The first task of dialectic theology (kalām) was to establish that existence is not uniform in kind. Rather, beings fall into fundamentally different ontological categories. At the apex stands the Necessary Being, Allah, whose existence is intrinsic and uncaused. All other beings are contingent, deriving their existence, continuity, and intelligibility entirely from Him.

Contingent existences (mumkin al-wujūd) are defined precisely by their dependence. They begin, change, and cease. They require causes and conditions. Their existence is not self-explanatory. This dependence necessitates a Being whose existence is necessary in itself (wājib al-wujūd), who does not depend on anything else, and upon whom all else depends at every moment.

Ontologically, then, all created beings, whether material or immaterial, visible (shahādah) or unseen (ghayb), are secondary, derivative, and completely dependent. No created cause or natural process possesses independent efficacy or self-sustaining. The created order does not stand alongside Allah as a parallel explanatory layer; it stands beneath Him, continuously sustained by Him. This is the ontological heart of tawḥīd.`}
        />

        {/* Section 2: Divine Regularity */}
        <ContentCard 
          colorTheme="gold"
          icon={Repeat}
          subtitle="Allah's Consistency"
          title="Why Science Works"
          mainText="Science works because nature is predictable. But why? Because Allah is wise and consistent. He runs the world in a steady rhythm called 'Divine Habit' (sunnat Allāh). Because Allah doesn't change His mind randomly, nature is reliable."
          highlightBox={{
            title: "Methodological Naturalism",
            text: "We study the patterns (science), but we know Who created the pattern."
          }}
          fullText={`Since all causation ultimately traces back to Allah, creation unfolds in accordance with stable, intelligible regularities. These regularities are described as Allah’s habit (sunnat Allāh or ʿādat Allāh). They are neither autonomous laws nor arbitrary sequences, but consistent expressions of divine wisdom (ḥikmah). The Qur’anic insistence on order, coherence, and non-contradiction in creation (e.g., 21:22) grounds the expectation that nature is reliable and thus knowable.

This point is crucial for the philosophy of science and medicine. The predictability of biological processes does not marginalize divine agency; it presupposes it. Regularity exists because the Creator is one, wise, and consistent in His action. From this vantage point, science becomes the disciplined study of divine habit, and medicine becomes the focused study of how those habits relate to health, illness, and restoration.

The emphasis on ḥikmah gives particular force to this outlook. Rather than viewing events as mere sequences of occurrences, this approach affirms that created processes are ordered toward intelligible ends.`}
        />

        {/* Section 3: Anthropology */}
        <ContentCard 
          colorTheme="cyan"
          icon={Heart}
          subtitle="Who We Are"
          title="The Whole Human"
          mainText={
            <div>
              You are not just a biological organism. You are an integrated being created for a purpose. This integration includes:
              <ul className="list-disc list-inside mt-4 space-y-2 text-base font-medium text-stone-700 pl-2">
                <li><strong>Body</strong> (<em>jism</em>)</li>
                <li><strong>Intellect</strong> (<em>‘aql</em>)</li>
                <li><strong>Heart</strong> (<em>qalb</em>)</li>
                <li><strong>Soul/Self</strong> (<em>nafs</em>)</li>
                <li><strong>Spirit</strong> (<em>rūḥ</em>)</li>
              </ul>
            </div>
          }
          highlightBox={{
            title: "The Missing Piece",
            text: "Treating only the biological mechanism fails to address the full reality of the human person."
          }}
          fullText={`Within this ordered creation, the human being occupies a unique ontological position. Humans are not merely biological organisms. They are created as integrated beings composed of body (jism), intellect (ʿaql), heart (qalb), soul (nafs), and spirit (rūḥ). This integration is not accidental; it is purposive.

Humans are created for recognition (maʿrifah) and worship (ʿibādah) of Allah. They are moral agents, entrusted with responsibility as vicegerents (khalīfah), capable of apprehending truth and acting upon it. This truth-seeking orientation is not a byproduct of survival, but a defining feature of human nature. Ontologically, the human is a being ordered toward meaning, responsibility, and ultimate accountability.`}
        />

        {/* Section 4: Epistemology Overview */}
        <ContentCard 
          colorTheme="gold"
          icon={Share2}
          subtitle="Epistemology Overview"
          title="Sources of Knowledge"
          mainText={
            <div>
              Knowledge is not limited to the physical. It relies on three integrated sources:
              <ul className="list-disc list-inside mt-4 space-y-2 text-base font-medium text-stone-700 pl-2">
                <li><strong>The Five Senses</strong> (perceived data)</li>
                <li><strong>Truthful Testimony</strong> (conveyed truth)</li>
                <li><strong>The Sound Intellect</strong> (processing and deduction)</li>
              </ul>
            </div>
          }
          highlightBox={{
            title: "The Intellect's Role",
            text: "The Intellect is the central processor. It evaluates sensory data, authenticates testimony, and performs pure deduction."
          }}
          fullText={`Corresponding to their ontological status, human beings are endowed with epistemological capacities that other creatures do not possess in full. Classical Muslim scholars identified three primary sources of definitive (qaṭīʿ) knowledge: the external senses (ḥawās khamsah), truthful testimony (khabar ṣādiq), and the sound intellect (ʿaql salīm). These sources are conceptually distinct yet epistemically interdependent, forming a unified framework through which humans access truth at multiple levels of reality.
          
Taken together, these epistemological tools position the human being uniquely among created beings.`}
        />

        {/* Section 4.1: Senses */}
        <ContentCard 
          colorTheme="gold"
          icon={Eye}
          subtitle="Knowledge Source 1"
          title="The Senses (Ḥawās)"
          mainText="Our five senses provide direct access to the physical, observable world. This is the foundation of empirical science—observing symptoms, testing biological facts, and witnessing reality as it is."
          highlightBox={{
            title: "Empirical Grounding",
            text: "The senses ground investigation in observable fact, preventing speculation."
          }}
          fullText={`The external senses provide access to the observable world and thus serve as the foundational point of contact between the knower and empirical reality. Through sensory perception, human beings encounter concrete particulars such as bodies, changes, and regularities. This grounds observation, experimentation, and empirical investigation. Contemporary biomedicine operates primarily at this level, relying on data obtained through physical examination, imaging, laboratory testing, and other measurable indicators of physiological function. Sensory knowledge, however, yields raw data rather than explanation. By itself, it discloses what is observed, not how it should be interpreted or situated within a broader account of reality.`}
        />

        {/* Section 4.2: Testimony (Moved Before Reason) */}
        <ContentCard 
          colorTheme="gold"
          icon={BookOpen}
          subtitle="Knowledge Source 2"
          title="Truthful Testimony (Khabar Ṣādiq)"
          mainText="Not all knowledge is discovered personally; much of it is conveyed to us by others. The highest form of this is Revelation (Waḥī), which gives us ultimate truths about purpose and meaning that science cannot measure."
          highlightBox={{
            title: "Ultimate Meaning",
            text: "Revelation provides the 'Why' behind the scientific 'How'."
          }}
          fullText={`Truthful testimony constitutes a second source of knowledge and plays a central role in human knowing. Much of what humans know is not acquired through direct observation, but received through transmission: reports, accumulated scholarship, expert consensus, and authoritative instruction. In medical practice, this takes the form of training, published studies, clinical guidelines, and institutional knowledge.

Truthful testimony, in its highest form as revelation (waḥī), grants access to realities that lie beyond sensory observation and rational deduction. It discloses ultimate purpose, moral obligation, the meaning of suffering, and the end toward which human life is directed. These are not peripheral concerns appended to an otherwise complete epistemic system. Rather, they establish the horizon within which all other forms of knowledge find their proper place.`}
        />

        {/* Section 4.3: Reason (Moved After Testimony) */}
        <ContentCard 
          colorTheme="gold"
          icon={Brain}
          subtitle="Knowledge Source 3"
          title="The Sound Intellect (ʿAql)"
          mainText="Reason is the engine that processes everything else. It organizes sensory data into patterns. It evaluates testimony to see if it is reliable. And it deduces pure logical truths. It connects the dots."
          highlightBox={{
            title: "Rational Capacity",
            text: "Reason allows for inference, judgment, and abstraction—essential for science and diagnosis."
          }}
          fullText={`The intellect occupies a central and integrative position within this epistemological structure. It enables humans to reason beyond immediate perception, allowing inference, judgment, and the organization of sensory data into coherent explanatory models. Through the intellect, empirical observations are processed into diagnoses, probabilities are weighed, and ethical decisions are made under uncertainty.

At the same time, the Islamic epistemological framework assigns the intellect a broader scope. In addition to interpreting sensory data and assessing testimony, the intellect is capable of purely rational operations that do not depend directly on either. These include logical deduction and induction, as well as necessary reasoning used to establish metaphysical realities.

The intellect is also indispensable in engaging truthful testimony. It evaluates transmitted reports, distinguishes between reliable and unreliable sources, and determines how received knowledge should be properly understood and applied. Testimony, therefore, does not bypass reason; it presupposes rational interrogation and judgment.`}
        />

        {/* Section 5: Medical Implications */}
        <ContentCard 
          colorTheme="cyan"
          icon={Stethoscope}
          subtitle="Why We Heal"
          title="Medicine's Real Goal"
          mainText="Healing isn't just about fixing broken parts. It is a support system. We fix the body so the patient can get back to their real purpose: worshiping Allah (ʿibādah) and living a good, moral life."
          isLast={true}
          highlightBox={{
            title: "Medicine with a Purpose",
            text: "Health isn't the final goal. Health is a tool to help us live a purposeful life."
          }}
          fullText={`Within this framework, healthcare assumes a significance that exceeds just technical intervention. Medicine is not merely the repair of biological machinery nor the optimization of physiological parameters. It is a supportive discipline that enables human beings to fulfill their ontological purpose. Preserving health, alleviating suffering, and restoring functional integrity serve the higher aim of allowing the patient to seek truth, worship Allah, and discharge their moral responsibilities.

Illness is not only a biological disruption. It can limit a person’s capacity for worship, cognition, and responsibility. This elevates the physician’s role. Clinical care participates in preserving the patient’s ability to recognize Allah, act rightly, and live purposefully.

This ontological and epistemological vision stands in stark contrast to modern frameworks that treat health as an end in itself or reduce medicine to value-neutral techniques. In the Islamic worldview, medicine is teleologically ordered: it serves life, and life serves the knowledge and worship of Allah.`}
        />

        {/* Footer / Synthesis */}
        <div className="mt-20 p-8 bg-white rounded-3xl border border-stone-200 text-center shadow-lg">
          <Compass className="w-8 h-8 text-stone-300 mx-auto mb-4" />
          <h4 className="font-serif font-bold text-2xl text-stone-800 mb-3">A Complete Framework</h4>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto italic">
            "We neither diminish empirical investigation nor absolutize it. We place science within a hierarchy of meaning that restores purpose, wisdom, and moral clarity."
          </p>
        </div>

        <div className="mt-16 text-center text-stone-400 text-sm font-medium">
          <p>© 2025 Educational Infographic Series</p>
        </div>

      </main>
    </div>
  );
};

export default App;