// infographics/shifting-paradigms/entry.jsx
import React6, { useEffect, useState as useState6 } from "react";
import { createRoot } from "react-dom/client";

// infographics/shifting-paradigms/1-western-experience.js
import React, { useState } from "react";
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
} from "lucide-react";
var TimelineEvent = ({
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
  align = "left"
}) => {
  const [showFullText, setShowFullText] = useState(false);
  return /* @__PURE__ */ React.createElement("div", { className: `relative flex group ${isLast ? "" : "pb-24"}` }, !isLast && /* @__PURE__ */ React.createElement("div", { className: "absolute left-8 top-16 bottom-0 w-1 bg-stone-200 rounded-full" }), /* @__PURE__ */ React.createElement("div", { className: "absolute left-0 w-16 h-16 flex items-center justify-center z-10" }, /* @__PURE__ */ React.createElement("div", { className: "w-12 h-12 rounded-xl bg-white border-2 border-stone-200 shadow-sm flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:border-teal-500 group-hover:shadow-md" }, /* @__PURE__ */ React.createElement(Icon, { className: "w-6 h-6 text-stone-400 group-hover:text-teal-600 transition-colors" }))), /* @__PURE__ */ React.createElement("div", { className: `ml-20 w-full` }, /* @__PURE__ */ React.createElement("div", { className: "bg-white p-8 rounded-2xl border border-stone-100 shadow-sm hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1 relative overflow-hidden" }, /* @__PURE__ */ React.createElement("div", { className: "absolute top-0 left-0 w-2 h-full bg-stone-100 group-hover:bg-teal-500 transition-colors duration-500" }), /* @__PURE__ */ React.createElement("div", { className: "flex flex-col gap-6 pl-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex-1" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between mb-3" }, /* @__PURE__ */ React.createElement("span", { className: "inline-block px-3 py-1 bg-stone-100 text-stone-500 text-xs font-bold tracking-widest uppercase rounded-full" }, period)), /* @__PURE__ */ React.createElement("h3", { className: "text-2xl font-serif font-bold text-stone-800 mb-3 group-hover:text-teal-800 transition-colors" }, title), /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap gap-2 mb-5" }, keyFigures.map((figure, idx) => /* @__PURE__ */ React.createElement("span", { key: idx, className: "flex items-center text-xs bg-white text-stone-500 px-3 py-1.5 rounded-full border border-stone-200 shadow-sm font-medium" }, /* @__PURE__ */ React.createElement(User, { className: "w-3 h-3 mr-2 text-teal-500" }), " ", figure))), /* @__PURE__ */ React.createElement("p", { className: "text-stone-600 text-lg leading-relaxed mb-6" }, description), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 mb-6" }, /* @__PURE__ */ React.createElement("div", { className: "bg-teal-50 p-4 rounded-xl border border-teal-100" }, /* @__PURE__ */ React.createElement("span", { className: "text-xs font-bold text-teal-600 uppercase tracking-wider mb-2 flex items-center gap-2" }, /* @__PURE__ */ React.createElement(Eye, { className: "w-4 h-4" }), " Reality (Ontology)"), /* @__PURE__ */ React.createElement("span", { className: "text-base font-bold text-stone-800" }, ontologyState)), /* @__PURE__ */ React.createElement("div", { className: "bg-amber-50 p-4 rounded-xl border border-amber-100" }, /* @__PURE__ */ React.createElement("span", { className: "text-xs font-bold text-amber-600 uppercase tracking-wider mb-2 flex items-center gap-2" }, /* @__PURE__ */ React.createElement(Brain, { className: "w-4 h-4" }), " Knowledge (Epistemology)"), /* @__PURE__ */ React.createElement("span", { className: "text-base font-bold text-stone-800" }, epistemyState))), /* @__PURE__ */ React.createElement("div", { className: "bg-slate-50 p-5 rounded-xl border-l-4 border-slate-300 relative group-hover:border-teal-500 transition-colors mb-6" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-start gap-4" }, /* @__PURE__ */ React.createElement("div", { className: "bg-white p-2 rounded-full shadow-sm mt-1" }, /* @__PURE__ */ React.createElement(Stethoscope, { className: "w-5 h-5 text-slate-500" })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h4", { className: "text-sm font-bold text-slate-600 uppercase tracking-wide mb-1" }, "Clinical Impact"), /* @__PURE__ */ React.createElement("p", { className: "text-base text-slate-700 leading-relaxed font-medium" }, medicalImplication)))), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setShowFullText(!showFullText),
      className: "flex items-center gap-2 text-sm font-bold text-teal-700 hover:text-teal-900 transition-colors px-4 py-2 rounded-lg hover:bg-teal-50 border border-transparent hover:border-teal-100 w-full md:w-auto justify-center md:justify-start"
    },
    showFullText ? /* @__PURE__ */ React.createElement(ChevronUp, { className: "w-4 h-4" }) : /* @__PURE__ */ React.createElement(FileText, { className: "w-4 h-4" }),
    showFullText ? "Hide Source Text" : "Read Source Text"
  ), showFullText && /* @__PURE__ */ React.createElement("div", { className: "mt-6 animate-in fade-in slide-in-from-top-2 duration-300" }, /* @__PURE__ */ React.createElement("div", { className: "bg-[#fdfbf7] p-6 rounded-xl border border-stone-200 shadow-inner" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 mb-4 border-b border-stone-200 pb-3" }, /* @__PURE__ */ React.createElement(FileText, { className: "w-4 h-4 text-stone-400" }), /* @__PURE__ */ React.createElement("span", { className: "text-xs font-bold text-stone-400 uppercase tracking-widest" }, 'Excerpts from "Heart of Care"')), /* @__PURE__ */ React.createElement("div", { className: "prose prose-stone prose-sm max-w-none font-serif text-stone-700 leading-relaxed whitespace-pre-line" }, fullText))))))));
};
var FunnelGraphic = ({ title, icon: Icon, steps, type }) => {
  const isTeal = type === "ontology";
  const gradientId = `grad-${type}`;
  return /* @__PURE__ */ React.createElement("div", { className: "flex flex-col items-center w-full" }, /* @__PURE__ */ React.createElement("h3", { className: "font-serif font-bold text-stone-700 mb-6 flex items-center gap-2 text-xl" }, /* @__PURE__ */ React.createElement(Icon, { className: `w-6 h-6 ${isTeal ? "text-teal-600" : "text-amber-600"}` }), title), /* @__PURE__ */ React.createElement("div", { className: "relative w-full max-w-xs h-64 filter drop-shadow-lg transform hover:scale-105 transition-transform duration-500" }, /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 200 300", className: "w-full h-full" }, /* @__PURE__ */ React.createElement("defs", null, /* @__PURE__ */ React.createElement("linearGradient", { id: gradientId, x1: "0%", y1: "0%", x2: "0%", y2: "100%" }, /* @__PURE__ */ React.createElement("stop", { offset: "0%", stopColor: isTeal ? "#14b8a6" : "#f59e0b", stopOpacity: "1" }), /* @__PURE__ */ React.createElement("stop", { offset: "100%", stopColor: isTeal ? "#ccfbf1" : "#fef3c7", stopOpacity: "0.9" }))), /* @__PURE__ */ React.createElement(
    "path",
    {
      d: "M10,10 L190,10 L140,290 L60,290 Z",
      fill: `url(#${gradientId})`,
      stroke: "white",
      strokeWidth: "3",
      className: "opacity-90"
    }
  ), steps.map((step, index) => {
    const yPos = 40 + index * 70;
    return /* @__PURE__ */ React.createElement("g", { key: index }, /* @__PURE__ */ React.createElement(
      "text",
      {
        x: "100",
        y: yPos,
        textAnchor: "middle",
        fill: "white",
        className: "text-[15px] font-bold uppercase tracking-wider",
        style: { textShadow: "0px 2px 4px rgba(0,0,0,0.2)" }
      },
      step
    ), index < steps.length - 1 && /* @__PURE__ */ React.createElement(
      "line",
      {
        x1: "45",
        y1: yPos + 35,
        x2: "155",
        y2: yPos + 35,
        stroke: "white",
        strokeOpacity: "0.4",
        strokeDasharray: "4 4",
        strokeWidth: "1.5"
      }
    ));
  }))), /* @__PURE__ */ React.createElement("p", { className: "text-center text-base text-stone-500 mt-6 italic max-w-xs font-medium bg-white px-4 py-2 rounded-full shadow-sm" }, type === "ontology" ? 'We went from: "God is Essential" \u2192 "God is Excluded"' : 'We went from: "Many ways of knowing" \u2192 "Only Measurement counts"'));
};
var ParadoxVisual = () => /* @__PURE__ */ React.createElement("div", { className: "mt-20 p-8 bg-gradient-to-br from-white to-stone-50 rounded-3xl shadow-lg border border-stone-100" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-col md:flex-row items-center gap-12" }, /* @__PURE__ */ React.createElement("div", { className: "flex-1" }, /* @__PURE__ */ React.createElement("div", { className: "inline-flex items-center gap-2 px-3 py-1 bg-red-50 text-red-600 rounded-full text-xs font-bold uppercase tracking-wider mb-4" }, /* @__PURE__ */ React.createElement(Activity, { className: "w-4 h-4" }), " The Trade-Off"), /* @__PURE__ */ React.createElement("h4", { className: "font-serif font-bold text-3xl text-stone-800 mb-4" }, "The Modern Paradox"), /* @__PURE__ */ React.createElement("p", { className: "text-stone-600 text-lg leading-relaxed mb-6" }, "As medicine got better at fixing the ", /* @__PURE__ */ React.createElement("strong", null, "machine"), " (the body), it got worse at seeing the ", /* @__PURE__ */ React.createElement("strong", null, "person"), " (the soul)."), /* @__PURE__ */ React.createElement("div", { className: "bg-white p-6 rounded-xl border-l-4 border-teal-500 shadow-sm text-base text-stone-600 italic font-medium" }, `"We gained technical power, but lost the 'whole picture' of what a human being actually is."`)), /* @__PURE__ */ React.createElement("div", { className: "w-full md:w-1/2 h-56 relative bg-white rounded-2xl border border-stone-100 shadow-inner p-6" }, /* @__PURE__ */ React.createElement("div", { className: "absolute bottom-4 left-6 right-6 flex justify-between text-xs text-stone-400 font-bold uppercase" }, /* @__PURE__ */ React.createElement("span", null, "Ancient Times"), /* @__PURE__ */ React.createElement("span", null, "Today")), /* @__PURE__ */ React.createElement("svg", { className: "absolute inset-0 w-full h-full p-6 overflow-visible" }, /* @__PURE__ */ React.createElement(
  "path",
  {
    d: "M0,150 C80,140 180,20 280,20",
    fill: "none",
    stroke: "#14b8a6",
    strokeWidth: "4",
    className: "drop-shadow-md",
    style: { vectorEffect: "non-scaling-stroke" }
  }
), /* @__PURE__ */ React.createElement("text", { x: "290", y: "25", fill: "#0d9488", className: "text-sm font-bold" }, "Tech Power (High)"), /* @__PURE__ */ React.createElement(
  "path",
  {
    d: "M0,40 C80,50 180,140 280,150",
    fill: "none",
    stroke: "#f59e0b",
    strokeWidth: "4",
    strokeDasharray: "8,8",
    className: "drop-shadow-md",
    style: { vectorEffect: "non-scaling-stroke" }
  }
), /* @__PURE__ */ React.createElement("text", { x: "290", y: "155", fill: "#d97706", className: "text-sm font-bold" }, "Wholeness (Low)")))));
var App = () => {
  return /* @__PURE__ */ React.createElement("div", { className: "min-h-screen bg-stone-50 text-stone-800 font-sans selection:bg-teal-100 pb-24" }, /* @__PURE__ */ React.createElement("header", { className: "pt-24 pb-16 px-6 max-w-5xl mx-auto text-center" }, /* @__PURE__ */ React.createElement("div", { className: "inline-block px-5 py-2 bg-white text-teal-600 text-sm font-bold tracking-[0.2em] uppercase rounded-full mb-8 border border-stone-100 shadow-sm" }, "A Philosophical Journey"), /* @__PURE__ */ React.createElement("h1", { className: "text-5xl md:text-7xl font-serif font-bold text-stone-900 mb-8 leading-tight tracking-tight" }, "The Western Experience"), /* @__PURE__ */ React.createElement("p", { className: "text-2xl text-stone-500 max-w-3xl mx-auto leading-relaxed font-light" }, "How we went from a universe filled with ", /* @__PURE__ */ React.createElement("span", { className: "text-teal-600 font-semibold" }, "Divine Purpose"), " to a universe run by ", /* @__PURE__ */ React.createElement("span", { className: "text-amber-600 font-semibold" }, "Machine Laws"), "."), /* @__PURE__ */ React.createElement("div", { className: "flex justify-center mt-8" }, /* @__PURE__ */ React.createElement(ArrowDown, { className: "w-8 h-8 text-stone-300 animate-bounce" }))), /* @__PURE__ */ React.createElement("main", { className: "max-w-5xl mx-auto px-6" }, /* @__PURE__ */ React.createElement("div", { className: "bg-white p-10 rounded-3xl shadow-sm border border-stone-200 mb-20" }, /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-16" }, /* @__PURE__ */ React.createElement(
    FunnelGraphic,
    {
      title: "Shrinking Reality",
      type: "ontology",
      icon: Eye,
      steps: ["God is Essential", "God is Allowed", "God is Irrelevant", "God is Excluded"]
    }
  ), /* @__PURE__ */ React.createElement(
    FunnelGraphic,
    {
      title: "Limiting Knowledge",
      type: "epistemology",
      icon: Brain,
      steps: ["Many Sources", "Reason + Logic", "Only Science", "Only Numbers"]
    }
  ))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-center mb-20 opacity-40" }, /* @__PURE__ */ React.createElement("div", { className: "h-1 bg-stone-200 w-32 rounded-full" }), /* @__PURE__ */ React.createElement("div", { className: "mx-6 text-stone-300 bg-stone-100 p-2 rounded-full" }, /* @__PURE__ */ React.createElement(Layers, { className: "w-6 h-6" })), /* @__PURE__ */ React.createElement("div", { className: "h-1 bg-stone-200 w-32 rounded-full" })), /* @__PURE__ */ React.createElement("div", { className: "relative pl-4 md:pl-0" }, /* @__PURE__ */ React.createElement(
    TimelineEvent,
    {
      period: "Ancient Times",
      title: "Nature Makes Sense on Its Own",
      keyFigures: ["Aristotle", "Hippocrates", "Galen"],
      icon: Scale,
      description: "Thinkers started explaining the world using nature's own rules, like weather and atoms, instead of always blaming the gods. They didn't deny God, but they realized they didn't need Him to explain simple things like rain or fever.",
      fullText: `**Philosophical Trajectory:**
            In Classical Antiquity, philosophers in the Greek world began to explain the natural world through nature itself. Thinkers in the centuries BCE proposed that reality could be understood in terms of natural elements, regular patterns, and observable causes. Inquiry and observation became methods for acquiring truth, and material explanations of the universe were articulated in which events unfolded according to natural laws rather than the direct activity of the gods.

This intellectual posture did not deny the existence of divinity, but it increasingly treated divine action as unnecessary for explaining physical phenomena. Thus, the foundations of natural philosophy and early scientific inquiry were laid: nature was rendered intelligible on its own terms, and explanation increasingly proceeded without recourse to metaphysical (non-observable) or theological commitments. This is an early step toward ontological and epistemic narrowing, even though it did not entail a rejection of theism.

**Philosophy of Western Medicine:**
Western medicine begins in Classical Antiquity alongside natural philosophy. Hippocrates (5th century BCE) is credited as among the first to argue that disease arises from natural causes, such as environment, diet, and lifestyle, rather than supernatural forces. This shift established a foundational orientation for medicine: the physician\u2019s task was to assist the body\u2019s inherent capacity to heal by correcting imbalances in nature. Importantly, this move toward natural causation did not imply purposeless materialism.

Galen (2nd century CE) significantly systematized this approach. His theory of the four humors (blood, phlegm, yellow bile, and black bile) offered a unified explanatory framework linking physiology, temperament, and disease. Galen also articulated a key tension that would persist throughout the history of medicine: the debate between rationalist approaches and empiricist approaches. Galenic medicine dominated Western and Islamic medical thought for over thirteen centuries.`,
      ontologyState: "God is Allowed (Permissible)",
      epistemyState: "Logic + Observation",
      medicalImplication: "Hippocrates said disease comes from nature (like bad food or weather), not from angry spirits. This was a huge step forward for medicine."
    }
  ), /* @__PURE__ */ React.createElement(
    TimelineEvent,
    {
      period: "12th\u201315th Centuries",
      title: "Faith and Reason Split Up",
      keyFigures: ["Aquinas", "Ockham", "Scotus"],
      icon: BookOpen,
      description: "When Greek science came back to Europe, it clashed with religion. Some scholars tried to keep them separate to protect their faith. But this had an accident side-effect: it made Logic the only tool for studying the real world, leaving Faith for Sundays.",
      fullText: `**Philosophical Trajectory:**
            Beginning in the twelfth century, ancient Greek writings were reintroduced into Western Europe, largely through contact with the Muslim world. This sudden influx of systematic philosophy posed profound challenges to Christian theology. In response, Christian scholars pursued different strategies to preserve theism. Some thinkers advanced the notion of a \u201Ctwofold truth,\u201D in which a proposition could be true in philosophy while false in theology.

Some, like Thomas Aquinas (1225\u20131274), sought incorporation. For Aquinas, nature was a coherent, law-governed system established by a rational Creator. Other thinkers, such as John Duns Scotus and William of Ockham, pursued a strategy of preservation. Theological truths, they argued, were matters of faith rather than rational demonstration. While intended to safeguard theology, this move had an unintended consequence: it effectively detached reason from theology. Rational inquiry was for the study of nature alone.

By the close of the Middle Ages, philosophy and emerging scientific inquiry had become largely distinct from theology. The supernatural was relegated to the domain of faith, while nature could increasingly be investigated without immediate reference to God.`,
      ontologyState: "Double Truth (Twofold Truth)",
      epistemyState: "Faith vs. Reason",
      medicalImplication: "This started the idea that you study the body with science, and the soul with religion. They became two different worlds."
    }
  ), /* @__PURE__ */ React.createElement(
    TimelineEvent,
    {
      period: "17th Century",
      title: "The Clockwork Universe",
      keyFigures: ["Descartes", "Newton"],
      icon: Settings,
      description: "Scientists began to see the universe as a giant machine or clock. God was the 'Clockmaker' who built it and walked away. If the universe is just a machine, you don't need God to explain how it runs anymore.",
      fullText: `**Philosophical Trajectory:**
            The seventeenth century witnessed the consolidation of mechanistic philosophy through the work of Newton, Descartes, Hobbes, and Spinoza. While many of these figures retained a commitment to theism, their philosophical systems increasingly portrayed nature as a self-contained, law-governed mechanism. God, though acknowledged, receded from explanatory necessity.

It was during this period that methodological naturalism took firm root: in scientific inquiry, explanations should appeal only to natural causes. This approach proved enormously successful in physics and mathematics, lending it growing authority. Over time, it became the implicit rule governing what counted as legitimate knowledge within the sciences. At this stage, the narrowing is mostly about method, not necessarily about belief.

A well-known anecdote captures this shift. When Pierre-Simon Laplace (1749\u20131827) presented his work on celestial mechanics to Napoleon, explaining planetary stability without invoking divine action, Napoleon remarked on the absence of any mention of the Creator. Laplace famously replied, \u201CI had no need of that hypothesis.\u201D

**Philosophy of Western Medicine:**
A decisive shift occurred in the seventeenth century with the rise of mechanical philosophy. Ren\xE9 Descartes (1596\u20131650) advanced mind\u2013body dualism that profoundly shaped modern medicine. The body was reconceived as a machine governed by physical laws, while the mind was treated as a non-material thinking substance. Disease, within this framework, became simply a mechanical failure.

This model proved extraordinarily productive for anatomy, physiology, and later surgery. However, it carried unintended consequences. Cartesian dualism marginalized psychological and emotional dimensions of illness. What could not be easily localized in bodily mechanisms became epistemically inadmissible. Over time, medicine increasingly attended to what could be measured, visualized, or intervened upon mechanically.`,
      ontologyState: "God is Irrelevant (to Science)",
      epistemyState: "Experiments Rule",
      medicalImplication: "Doctors started seeing the body as a machine too. Disease wasn't a spiritual problem; it was just a broken part in the machine. We stopped looking at the patient's feelings or soul."
    }
  ), /* @__PURE__ */ React.createElement(
    TimelineEvent,
    {
      period: "18th\u201319th Centuries",
      title: "Biology Without a Designer",
      keyFigures: ["Darwin", "The Enlightenment"],
      icon: Search,
      description: "Charles Darwin showed that life could develop on its own through evolution. This was the turning point. Now, you could be a 'serious thinker' and an atheist at the same time. Nature became the only thing that mattered.",
      fullText: `**Philosophical Trajectory:**
            Enlightenment intensified these trends. Europeans, particularly French philosophers, became openly atheistic, arguing that only the material world exists and that religion is not merely false but socially harmful. Enlightenment thinkers increasingly offered an alternative to religious conviction grounded in naturalism and mechanism.

Darwin\u2019s On the Origin of Species further consolidated naturalistic explanations. Biological diversity, long viewed as evidence of divine design, was now explained without reference to a Creator. Just as Newton had rendered God explanatorily unnecessary in physics, Darwin did so in biology. Scientific institutions increasingly treated naturalism as the normative framework, promoting \u201Cfreethinking\u201D and portraying the relationship between religion and science as one of inherent conflict. Atheism and agnosticism thereby gained intellectual legitimacy.

**Philosophy of Western Medicine:**
The nineteenth century marked a period of dramatic scientific success in medicine, particularly with the rise of germ theory through figures such as Pasteur and Koch. Diseases were now linked to specific microbial causes. This triumph reinforced a monocausal model of disease: for every illness, there exists a discrete, identifiable cause, and removing or neutralizing that cause restores health.

While immensely successful in infectious disease, monocausal thinking proved less adequate for treating chronic and complex conditions. Most diseases arise not from a single cause but from a convergence of biological, environmental, behavioral, and social factors. Germ theory\u2019s success trained medicine to love clean causal stories. Although helpful, it can also become too narrow when medicine faces multi-factor illness.`,
      ontologyState: "God is Excluded",
      epistemyState: "Only Matter Matters",
      medicalImplication: "Germ Theory proved that one tiny bug causes one disease. This was great for curing infections, but it made doctors think EVERY problem had a single simple cause, ignoring the complex human life."
    }
  ), /* @__PURE__ */ React.createElement(
    TimelineEvent,
    {
      period: "20th Century",
      title: "Science Becomes the Only Reality",
      keyFigures: ["Modern Scientists"],
      icon: Microscope,
      description: "It went from a method ('let's study nature') to a belief ('nature is ALL there is'). If you can't measure it, weigh it, or put it in a test tube, modern medicine acts like it doesn't exist.",
      fullText: `**Philosophical Trajectory:**
            Despite the growing capacity of science to annihilate humanity itself, empiricism hardened into the dominant criterion of proof, and religious claims were increasingly dismissed as unverifiable or irrational. One by one, fields such as psychology, sociology, philosophy, and cosmology adopted naturalistic explanatory models.

Methodological naturalism became the de facto philosophy of science. It was now possible and expected to practice science in exactly the same way as an atheist, while relegating religious belief to the private sphere. Over time, this methodological stance fed into ontological conclusions. What began as a practical method for scientific inquiry gradually transformed into a conviction about reality itself: that nature is all there is. That is, ontological naturalism.

**Philosophy of Western Medicine:**
By the mid-twentieth century, biomedical science had become increasingly reductionist. The prevailing assumption was that higher-level phenomena, such as symptoms, syndromes, even behaviors, ultimately derive from lower-level processes such as molecular pathways, cellular dysfunctions, or genetic variation. This orientation brought unprecedented precision, particularly in pharmacology and molecular biology, but it also narrowed medicine\u2019s explanatory lens.

In response, alternative models emerged, most notably George Engel\u2019s biopsychosocial model in 1977, which argued that illness can only be adequately understood by integrating biological, psychological, and social dimensions. Each approach carries trade-offs. Reductionism can give clarity and targeted intervention. A broader view can restore context and meaning.`,
      ontologyState: "Nature is Everything",
      epistemyState: "Only Numbers Count",
      medicalImplication: "This is why modern medicine is amazing at surgery and pills, but sometimes struggles to help people find meaning, handle suffering, or feel heard as human beings.",
      isLast: true
    }
  )), /* @__PURE__ */ React.createElement(ParadoxVisual, null), /* @__PURE__ */ React.createElement("div", { className: "mt-24 text-center text-stone-400 text-sm font-medium" }, /* @__PURE__ */ React.createElement("p", null, "\xA9 2025 Educational Infographic Series"))));
};
var western_experience_default = App;

// infographics/shifting-paradigms/2-structure-of-medical-knowledge.js
import React2, { useState as useState2 } from "react";
import {
  Stethoscope as Stethoscope2,
  Scale as Scale2,
  FileText as FileText2,
  ChevronUp as ChevronUp2,
  ChevronDown as ChevronDown2,
  Brain as Brain2,
  Activity as Activity2,
  Eye as Eye2,
  EyeOff,
  Split,
  User as User2,
  HelpCircle,
  AlertTriangle,
  ArrowDown as ArrowDown2
} from "lucide-react";
var ContentCard = ({
  title,
  subtitle,
  mainText,
  icon: Icon,
  highlightBox,
  fullText,
  colorTheme = "slate"
  // 'slate' or 'clay'
}) => {
  const [showFullText, setShowFullText] = useState2(false);
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
  return /* @__PURE__ */ React2.createElement("div", { className: "flex flex-col md:flex-row gap-8 mb-20 group relative" }, /* @__PURE__ */ React2.createElement("div", { className: "absolute left-8 top-16 bottom-[-80px] w-1 bg-stone-200 rounded-full md:block hidden last:hidden" }), /* @__PURE__ */ React2.createElement("div", { className: "flex-shrink-0 relative z-10" }, /* @__PURE__ */ React2.createElement("div", { className: `w-16 h-16 rounded-2xl bg-white border-2 border-stone-200 shadow-sm flex items-center justify-center transition-all duration-300 group-hover:scale-105 ${theme.border} group-hover:shadow-md` }, /* @__PURE__ */ React2.createElement(Icon, { className: `w-8 h-8 text-stone-400 transition-colors ${theme.iconBg}` }))), /* @__PURE__ */ React2.createElement("div", { className: "flex-1" }, /* @__PURE__ */ React2.createElement("div", { className: "bg-white p-8 rounded-3xl border border-stone-100 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden group-hover:-translate-y-1" }, /* @__PURE__ */ React2.createElement("div", { className: `absolute top-0 left-0 w-2 h-full ${theme.accent} transition-colors duration-500` }), /* @__PURE__ */ React2.createElement("div", { className: "pl-4" }, /* @__PURE__ */ React2.createElement("div", { className: "flex items-center gap-3 mb-4" }, /* @__PURE__ */ React2.createElement("span", { className: `px-3 py-1 text-xs font-bold tracking-widest uppercase rounded-full border ${theme.tag}` }, subtitle)), /* @__PURE__ */ React2.createElement("div", { className: "flex flex-col gap-8" }, /* @__PURE__ */ React2.createElement("div", { className: "flex-1" }, /* @__PURE__ */ React2.createElement("h3", { className: `text-2xl font-serif font-bold text-stone-800 mb-4 transition-colors ${theme.title}` }, title), /* @__PURE__ */ React2.createElement("p", { className: "text-lg text-stone-600 leading-relaxed mb-6" }, mainText), highlightBox && /* @__PURE__ */ React2.createElement("div", { className: `p-5 rounded-xl border-l-4 ${theme.box} mb-6` }, /* @__PURE__ */ React2.createElement("div", { className: "flex gap-3" }, /* @__PURE__ */ React2.createElement("div", { className: "mt-1" }, /* @__PURE__ */ React2.createElement(Activity2, { className: "w-5 h-5 opacity-70" })), /* @__PURE__ */ React2.createElement("div", null, /* @__PURE__ */ React2.createElement("h4", { className: "text-sm font-bold uppercase tracking-wide opacity-80 mb-1" }, highlightBox.title), /* @__PURE__ */ React2.createElement("p", { className: "text-base font-medium leading-snug" }, highlightBox.text)))), /* @__PURE__ */ React2.createElement(
    "button",
    {
      onClick: () => setShowFullText(!showFullText),
      className: `flex items-center gap-2 text-sm font-bold transition-colors px-4 py-2 rounded-lg border border-transparent hover:border-stone-200 w-full md:w-auto justify-center md:justify-start ${theme.button}`
    },
    showFullText ? /* @__PURE__ */ React2.createElement(ChevronUp2, { className: "w-4 h-4" }) : /* @__PURE__ */ React2.createElement(FileText2, { className: "w-4 h-4" }),
    showFullText ? "Hide Source Text" : "Read Source Text"
  ))), showFullText && /* @__PURE__ */ React2.createElement("div", { className: "mt-8 animate-in fade-in slide-in-from-top-4 duration-300" }, /* @__PURE__ */ React2.createElement("div", { className: "bg-[#fdfbf7] p-8 rounded-xl border border-stone-200 shadow-inner relative" }, /* @__PURE__ */ React2.createElement("div", { className: "absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-stone-200 via-stone-300 to-stone-200 opacity-50" }), /* @__PURE__ */ React2.createElement("div", { className: "flex items-center gap-2 mb-4 border-b border-stone-200 pb-3" }, /* @__PURE__ */ React2.createElement(FileText2, { className: "w-4 h-4 text-stone-400" }), /* @__PURE__ */ React2.createElement("span", { className: "text-xs font-bold text-stone-400 uppercase tracking-widest" }, "Source Excerpt")), /* @__PURE__ */ React2.createElement("div", { className: "prose prose-stone prose-sm max-w-none font-serif text-stone-700 leading-relaxed whitespace-pre-line" }, fullText)))))));
};
var App2 = () => {
  return /* @__PURE__ */ React2.createElement("div", { className: "min-h-screen bg-stone-50 text-stone-800 font-sans selection:bg-slate-200 pb-24" }, /* @__PURE__ */ React2.createElement("header", { className: "pt-24 pb-16 px-6 max-w-5xl mx-auto text-center" }, /* @__PURE__ */ React2.createElement("div", { className: "inline-block px-5 py-2 bg-white text-slate-600 text-sm font-bold tracking-[0.2em] uppercase rounded-full mb-8 border border-stone-200 shadow-sm" }, "Philosophy in Practice"), /* @__PURE__ */ React2.createElement("h1", { className: "text-4xl md:text-6xl font-serif font-bold text-stone-900 mb-6 leading-tight tracking-tight" }, "The Structure of Medical Knowledge"), /* @__PURE__ */ React2.createElement("p", { className: "text-xl text-stone-500 max-w-2xl mx-auto leading-relaxed font-light" }, "Examining the hidden assumptions, the limits of diagnosis, and the divided reality of the modern clinician."), /* @__PURE__ */ React2.createElement("div", { className: "flex justify-center mt-12" }, /* @__PURE__ */ React2.createElement(ArrowDown2, { className: "w-6 h-6 text-stone-300 animate-bounce" }))), /* @__PURE__ */ React2.createElement("main", { className: "max-w-5xl mx-auto px-6" }, /* @__PURE__ */ React2.createElement(
    ContentCard,
    {
      colorTheme: "slate",
      icon: Stethoscope2,
      subtitle: "Epistemology of Diagnosis",
      title: "The Uncertainty of Knowing",
      mainText: "Diagnosis isn't a simple math problem. It's an educated guess based on limited clues. While modern medicine tries to use strict evidence ('Evidence-Based Medicine') to reduce error, it can't remove the need for human judgment.",
      highlightBox: {
        title: "The Reality Check",
        text: "Evidence helps us investigate, but judgment is how we decide. Medicine is never purely mechanical; it is always value-laden."
      },
      fullText: `Most clinicians operate within a realist causal framework, assuming that diseases are real pathological processes (e.g., pneumococcal pneumonia in the lung) that give rise to observable signs and symptoms (e.g., cough, fever, X-ray changes). Diagnosis, however, is an uncertain act: an inference to the best explanation from limited and probabilistic data.

This is where experience and judgment matter. Formal reasoning helps, but it cannot remove uncertainty from clinical life. Evidence-Based Medicine (EBM) rose partly to strengthen medicine\u2019s epistemic foundations through structured research and hierarchies of evidence: \u201CWhat is your evidence for that?\u201D

Later critiques argued that EBM can become too rigid if it treats evidence as automatically overriding clinical expertise and patient values. That is why newer language such as \u201Cevidence-informed medicine\u201D developed, aiming to integrate evidence with judgment and patient priorities. This shift matters because it quietly admits something important: medical knowledge is not purely mechanical. It is shaped by methods, values, and context.`
    }
  ), /* @__PURE__ */ React2.createElement(
    ContentCard,
    {
      colorTheme: "clay",
      icon: EyeOff,
      subtitle: "Contemporary Medicine",
      title: "The Invisible Framework",
      mainText: "Modern medicine claims to be neutral, but it operates on a hidden philosophy: 'Mechanistic Materialism.' It assumes that only physical things are real and only measurable things count as knowledge. This creates blind spots for anything that isn't a number.",
      highlightBox: {
        title: "Emerging Blind Spots",
        text: "Because subjective pain, moral meaning, and spiritual distress cannot be measured in a lab, modern medicine often treats them as if they don't exist."
      },
      fullText: `Modern Western medicine rests on a set of largely unspoken metaphysical and epistemological assumptions. Chief among them is mechanistic materialism: the view that reality is fundamentally physical and that explanation proceeds through measurable processes. One practical consequence is that phenomena resistant to quantification, such as subjective pain, existential distress, or moral meaning, are often sidelined or treated as secondary.

This orientation reflects the influence of twentieth-century empiricism and logical positivism, which privileged measurable data as the gold standard of knowledge. Although modern medicine often presents itself as objective, it operates with implicit normative commitments about what counts as health, which outcomes matter, and which lives are worth prioritizing. These commitments are rarely examined explicitly.

In summary, the dominant assumptions of modern Western medicine include viewing the body as a mechanistic object, understanding disease as deviation from biophysical norms, privileging reductionist explanations, and treating controlled empirical evidence as the primary source of knowledge.`
    }
  ), /* @__PURE__ */ React2.createElement(
    ContentCard,
    {
      colorTheme: "slate",
      icon: Split,
      subtitle: "Practitioner's Point of View",
      title: "The Divided Self",
      mainText: "For a believing clinician, this system creates a tension. You are trained to think like a materialist at work (looking only for physical causes) while holding onto your faith in private. This 'compartmentalization' can feel like living a double life.",
      highlightBox: {
        title: "Functional Bifurcation",
        text: "You learn to keep 'Iman' (faith) and 'Clinical Reasoning' in separate boxes. Over time, this split can quietly reshape how you view suffering and responsibility."
      },
      fullText: `A healthcare practitioner\u2019s worldview, often implicit and unexamined, shapes every aspect of medical practice. Its influence operates at multiple levels simultaneously: epistemological (what counts as legitimate knowledge), theoretical (how health, disease, and causation are conceptualized), and operational (how clinical decisions are made and care is delivered).

For the theist practitioner, a deeper tension can appear. Modern training often demands methodological naturalism: in your professional explanations, you are expected to speak and reason as if only natural causes are relevant. When divine action is excluded a priori from the explanatory frame, a clinician may gradually learn to keep \u012Bm\u0101n and clinical reasoning in separate compartments: Allah is affirmed, while thinking proceeds as if natural causes are the whole story.

Over time, this compartmentalization exacts a cognitive and spiritual cost. The practitioner learns to think, decide, and speak within a framework that implicitly treats metaphysical commitments as irrelevant to clinical reasoning. The result is not necessarily atheism, but a functional bifurcation of the self: one mode of cognition governs professional life, another governs personal belief.`
    }
  ), /* @__PURE__ */ React2.createElement("div", { className: "mt-20 p-8 bg-white rounded-3xl border border-stone-200 text-center shadow-lg" }, /* @__PURE__ */ React2.createElement(HelpCircle, { className: "w-8 h-8 text-stone-300 mx-auto mb-4" }), /* @__PURE__ */ React2.createElement("h4", { className: "font-serif font-bold text-2xl text-stone-800 mb-3" }, "The Core Tension"), /* @__PURE__ */ React2.createElement("p", { className: "text-lg text-stone-600 max-w-2xl mx-auto italic" }, '"Modern medicine gives us powerful tools to treat the body, but its hidden philosophy often forces us to ignore the soul. The challenge is to keep the tools without adopting the blindness."')), /* @__PURE__ */ React2.createElement("div", { className: "mt-16 text-center text-stone-400 text-sm font-medium" }, /* @__PURE__ */ React2.createElement("p", null, "\xA9 2025 Educational Infographic Series"))));
};
var structure_of_medical_knowledge_default = App2;

// infographics/shifting-paradigms/3-islamic-narrative.js
import React3, { useState as useState3 } from "react";
import {
  BookOpen as BookOpen2,
  Scale as Scale3,
  FileText as FileText3,
  ChevronUp as ChevronUp3,
  ChevronDown as ChevronDown3,
  Globe,
  Moon,
  Sun,
  Shield,
  Zap,
  Sprout,
  ArrowDown as ArrowDown3,
  Anchor,
  Library
} from "lucide-react";
var ContentCard2 = ({
  period,
  title,
  subtitle,
  mainText,
  icon: Icon,
  highlightBox,
  fullText,
  colorTheme = "emerald",
  // 'emerald' or 'indigo'
  isLast
}) => {
  const [showFullText, setShowFullText] = useState3(false);
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
  return /* @__PURE__ */ React3.createElement("div", { className: "flex flex-col md:flex-row gap-8 mb-20 group relative" }, !isLast && /* @__PURE__ */ React3.createElement("div", { className: "absolute left-8 top-16 bottom-[-80px] w-1 bg-stone-200 rounded-full md:block hidden" }), /* @__PURE__ */ React3.createElement("div", { className: "flex-shrink-0 relative z-10" }, /* @__PURE__ */ React3.createElement("div", { className: `w-16 h-16 rounded-2xl bg-white border-2 border-stone-200 shadow-sm flex items-center justify-center transition-all duration-300 group-hover:scale-105 ${theme.border} group-hover:shadow-md` }, /* @__PURE__ */ React3.createElement(Icon, { className: `w-8 h-8 text-stone-400 transition-colors ${theme.iconBg}` }))), /* @__PURE__ */ React3.createElement("div", { className: "flex-1" }, /* @__PURE__ */ React3.createElement("div", { className: "bg-white p-8 rounded-3xl border border-stone-100 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden group-hover:-translate-y-1" }, /* @__PURE__ */ React3.createElement("div", { className: `absolute top-0 left-0 w-2 h-full ${theme.accent} transition-colors duration-500` }), /* @__PURE__ */ React3.createElement("div", { className: "pl-4" }, /* @__PURE__ */ React3.createElement("div", { className: "flex items-center gap-3 mb-4" }, /* @__PURE__ */ React3.createElement("span", { className: `px-3 py-1 text-xs font-bold tracking-widest uppercase rounded-full border ${theme.tag}` }, period)), /* @__PURE__ */ React3.createElement("div", { className: "flex flex-col gap-8" }, /* @__PURE__ */ React3.createElement("div", { className: "flex-1" }, /* @__PURE__ */ React3.createElement("h3", { className: `text-2xl font-serif font-bold text-stone-800 mb-2 transition-colors ${theme.title}` }, title), /* @__PURE__ */ React3.createElement("h4", { className: "text-sm font-bold text-stone-400 uppercase tracking-wide mb-4" }, subtitle), /* @__PURE__ */ React3.createElement("p", { className: "text-lg text-stone-600 leading-relaxed mb-6" }, mainText), highlightBox && /* @__PURE__ */ React3.createElement("div", { className: `p-5 rounded-xl border-l-4 ${theme.box} mb-6` }, /* @__PURE__ */ React3.createElement("div", { className: "flex gap-3" }, /* @__PURE__ */ React3.createElement("div", { className: "mt-1" }, /* @__PURE__ */ React3.createElement(Scale3, { className: "w-5 h-5 opacity-70" })), /* @__PURE__ */ React3.createElement("div", null, /* @__PURE__ */ React3.createElement("h4", { className: "text-sm font-bold uppercase tracking-wide opacity-80 mb-1" }, highlightBox.title), /* @__PURE__ */ React3.createElement("p", { className: "text-base font-medium leading-snug" }, highlightBox.text)))), /* @__PURE__ */ React3.createElement(
    "button",
    {
      onClick: () => setShowFullText(!showFullText),
      className: `flex items-center gap-2 text-sm font-bold transition-colors px-4 py-2 rounded-lg border border-transparent hover:border-stone-200 w-full md:w-auto justify-center md:justify-start ${theme.button}`
    },
    showFullText ? /* @__PURE__ */ React3.createElement(ChevronUp3, { className: "w-4 h-4" }) : /* @__PURE__ */ React3.createElement(FileText3, { className: "w-4 h-4" }),
    showFullText ? "Hide Source Text" : "Read Source Text"
  ))), showFullText && /* @__PURE__ */ React3.createElement("div", { className: "mt-8 animate-in fade-in slide-in-from-top-4 duration-300" }, /* @__PURE__ */ React3.createElement("div", { className: "bg-[#fdfbf7] p-8 rounded-xl border border-stone-200 shadow-inner relative" }, /* @__PURE__ */ React3.createElement("div", { className: "absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-stone-200 via-stone-300 to-stone-200 opacity-50" }), /* @__PURE__ */ React3.createElement("div", { className: "flex items-center gap-2 mb-4 border-b border-stone-200 pb-3" }, /* @__PURE__ */ React3.createElement(FileText3, { className: "w-4 h-4 text-stone-400" }), /* @__PURE__ */ React3.createElement("span", { className: "text-xs font-bold text-stone-400 uppercase tracking-widest" }, "Source Excerpt")), /* @__PURE__ */ React3.createElement("div", { className: "prose prose-stone prose-sm max-w-none font-serif text-stone-700 leading-relaxed whitespace-pre-line" }, fullText)))))));
};
var App3 = () => {
  return /* @__PURE__ */ React3.createElement("div", { className: "min-h-screen bg-stone-50 text-stone-800 font-sans selection:bg-emerald-200 pb-24" }, /* @__PURE__ */ React3.createElement("header", { className: "pt-24 pb-16 px-6 max-w-5xl mx-auto text-center" }, /* @__PURE__ */ React3.createElement("div", { className: "inline-block px-5 py-2 bg-white text-emerald-600 text-sm font-bold tracking-[0.2em] uppercase rounded-full mb-8 border border-stone-200 shadow-sm" }, "A Comparative Paradigm"), /* @__PURE__ */ React3.createElement("h1", { className: "text-4xl md:text-6xl font-serif font-bold text-stone-900 mb-6 leading-tight tracking-tight" }, "The Islamic Experience"), /* @__PURE__ */ React3.createElement("p", { className: "text-xl text-stone-500 max-w-2xl mx-auto leading-relaxed font-light" }, "From the Prophetic foundation to the modern era: tracing the formation of an integrative intellectual order."), /* @__PURE__ */ React3.createElement("div", { className: "flex justify-center mt-12" }, /* @__PURE__ */ React3.createElement(ArrowDown3, { className: "w-6 h-6 text-stone-300 animate-bounce" }))), /* @__PURE__ */ React3.createElement("main", { className: "max-w-5xl mx-auto px-6" }, /* @__PURE__ */ React3.createElement(
    ContentCard2,
    {
      colorTheme: "emerald",
      icon: Sun,
      period: "7th Century",
      title: "The Prophetic Foundation",
      subtitle: "Unity of Truth",
      mainText: "Islam began by linking faith and reason. The Qur'an challenged people to look at nature as 'signs' (\u0101y\u0101t) of God. From the start, observation and revelation were partners, not enemies.",
      highlightBox: {
        title: "Core Principle",
        text: "The clinician does not need to treat God as irrelevant to take evidence seriously."
      },
      fullText: `The Prophet \uFDFA restored taw\u1E25\u012Bd to the Arabian Peninsula in the seventh century, not merely as a theological assertion but as a comprehensive reorientation of how reality itself was to be understood. The Qur\u2019an did not present faith as blind affirmation; rather, it repeatedly appealed to reflection, inference, and signs (\u0101y\u0101t) in both the natural world and human experience. Alongside the Prophet \uFDFA as a living proof, the Qur\u2019an advanced dialectical arguments addressing causation, contingency, purpose, and moral responsibility.

From its inception, Islam established a worldview in which observation, reason, and revelation were not competitors but coordinated sources of knowledge. This foundational harmony would prove decisive as Muslims encountered foreign intellectual traditions in the centuries that followed. The clinician does not need to treat God as irrelevant in order to take evidence seriously.`
    }
  ), /* @__PURE__ */ React3.createElement(
    ContentCard2,
    {
      colorTheme: "indigo",
      icon: Moon,
      period: "8th\u20139th Centuries",
      title: "Early Encounters with Greek Philosophy",
      subtitle: "The Challenge of Integration",
      mainText: "Muslims translated Greek philosophy and science. Some groups (like the Mu'tazilah) tried to make Greek logic rule over faith, which caused tension. The challenge was: how do we use these tools without losing our own worldview?",
      highlightBox: {
        title: "The Tension",
        text: "Intellectual tools can be helpful, but they also carry hidden assumptions. Islam's concern was always about who sets the frame."
      },
      fullText: `By the eighth and ninth centuries, Greek philosophy and Hellenistic modes of reasoning entered the Muslim intellectual sphere, particularly through translation and scholarly exchange. Certain groups, most notably the Mu\u02BFtazilah, adopted these philosophical tools as governing worldviews rather than subordinate instruments. Drawing heavily from falsafah, they reinterpreted theological, ethical, and even legal questions through a primarily Greek rationalist framework, often subordinating revelation to prior philosophical commitments.

This development generated significant theological tension. The concern was not with the use of reason per se, but with reason becoming autonomous and normative in a way that reshaped Islamic doctrine from the outside inward.`
    }
  ), /* @__PURE__ */ React3.createElement(
    ContentCard2,
    {
      colorTheme: "emerald",
      icon: Shield,
      period: "10th Century",
      title: "The Discipline of Reason",
      subtitle: "Sunni Theology Codified",
      mainText: "Scholars like Al-Ash'ari and Al-Maturidi built a system where logic was used to clarify and defend faith, not replace it. This 'Middle Path' ensured that Muslims didn't have to choose between thinking and believing.",
      highlightBox: {
        title: "Intellectual Equilibrium",
        text: "A Muslim clinician does not need to choose between 'faith' and 'thinking.' The tradition built an internal structure where both can operate coherently."
      },
      fullText: `In response to these challenges and further doctrinal deviations, Sunni theology was systematically articulated and codified by the Ash\u02BFar\u012B and M\u0101tur\u012Bd\u012B schools. This effort was led by Ab\u016B al-\u1E24asan al-Ash\u02BFar\u012B (d. 936) and Ab\u016B Man\u1E63\u016Br al-M\u0101tur\u012Bd\u012B (d. 944), whose works established enduring theological frameworks grounded in revelation while employing disciplined rational argumentation.

Both schools affirmed reason as a valid and necessary tool for discerning truth, especially in matters of theology. However, reason was carefully defined as an instrument rather than an independent worldview. Logic (man\u1E6Diq) and dialectical reasoning (kal\u0101m) were used to clarify beliefs, resolve contradictions, and defend doctrine, not to override revelation or impose external metaphysical assumptions. This approach represented a deliberate middle path between uncritical literalism and unfettered rationalism.

Crucially, from this period onward, Muslim civilization did not experience a rupture between religion and reason. Intellectual inquiry was understood as a servant of faith, illuminating rather than undermining it.`
    }
  ), /* @__PURE__ */ React3.createElement(
    ContentCard2,
    {
      colorTheme: "indigo",
      icon: Globe,
      period: "8th\u201310th Centuries",
      title: "The Translation Movement",
      subtitle: "Critical Integration",
      mainText: "Muslims gathered knowledge from Greece, India, and Persia. They didn't just copy it; they filtered it through Islamic values (Tawhid). This created a Golden Age of science that was both innovative and faith-based.",
      highlightBox: {
        title: "Synthesis",
        text: "Islamic civilization shows a workable model for engaging external scientific knowledge without surrendering the worldview frame that gives knowledge its meaning."
      },
      fullText: `In parallel with theological consolidation, Abbasid rulers patronized one of history\u2019s most ambitious translation movements, centered in Baghdad and extending across the Islamic world. From the eighth century onward, works of Greek, Syriac, Persian, and Sanskrit origin covering medicine, mathematics, astronomy, philosophy, and the natural sciences were translated into Arabic.

What distinguished this movement was not mere preservation, but critical integration. Foreign knowledges were not accepted or rejected wholesale; they were evaluated, filtered, and subordinated to Islamic metaphysical principles. Ideas incompatible with taw\u1E25\u012Bd were rejected or reworked, while useful methods and insights were retained and developed further. The result was not imitation, but synthesis and innovation.

By the ninth and tenth centuries, multiple intellectual centers had emerged, bringing together Muslim, Christian, and Jewish scholars under an overarching Islamic framework.`
    }
  ), /* @__PURE__ */ React3.createElement(
    ContentCard2,
    {
      colorTheme: "emerald",
      icon: Zap,
      period: "13th Century Onward",
      title: "Decline & Disruption",
      subtitle: "External Shocks",
      mainText: "Science didn't stop because Islam opposes reason. It slowed down due to wars (Mongols, Crusades) and loss of stability. Later, colonialism brought Western ideas that replaced local ways of thinking.",
      highlightBox: {
        title: "Loss of Primacy",
        text: "The modern global dominance of Western biomedicine is not only about better tools. It also reflects political power and the export of a worldview."
      },
      fullText: `The Muslim world\u2019s scientific and intellectual primacy did not decline due to an internal rejection of reason or science. Rather, from the thirteenth century onward, a convergence of external and internal disruptions took a cumulative toll. The Crusades, followed by the devastating Mongol invasions, culminating in the sack of Baghdad in 1258, severely damaged institutional centers of learning. These shocks were compounded by the loss of economic dominance, fragmentation of political authority, gradual shifts in global trade routes, and loss of patronage.

In later centuries, European imperial expansion introduced a new challenge. Colonialism brought not only military and administrative control, but also Western philosophical assumptions as discussed above. Positivist and materialist frameworks were imported as markers of modernity and progress. For many Muslims, these frameworks displaced earlier Islamic epistemologies rather than being critically assessed through them.`
    }
  ), /* @__PURE__ */ React3.createElement(
    ContentCard2,
    {
      colorTheme: "indigo",
      icon: Sprout,
      period: "20th Century \u2013 Present",
      title: "Reform and Revival",
      subtitle: "The Path Forward",
      mainText: "Today, some try to simply copy Western science. But a revivalist movement argues we must recover the Islamic framework: keeping rigorous science while anchoring it in an Islamic view of reality (Metaphysics).",
      isLast: true,
      highlightBox: {
        title: "The Goal",
        text: "To gather knowledge from every source, subject it to Islamic metaphysics, digest it critically, and then build upon it."
      },
      fullText: `By the late nineteenth and twentieth centuries, Muslim intellectual responses to Western modernity largely crystallized into two broad tendencies. Reformist-modernists such as Jam\u0101l al-D\u012Bn al-Afgh\u0101n\u012B, Mu\u1E25ammad \u02BFAbd\u016Bh, and Sir Sayyid A\u1E25mad Kh\u0101n sought to harmonize Islam with modern Western science, often rearticulating Islamic teachings in the language and categories of European thought. Their project aimed at compatibility and survival within a rapidly changing intellectual landscape.

In contrast, traditionalist-revivalist thinkers such as Deoband\u012B scholars, Mu\u1E63\u1E6Daf\u0101 \u1E62abr\u012B, Sa\u02BF\u012Bd Nurs\u012B, Seyyed Hossein Nasr, and Syed Naquib al-Attas recognized that the challenge was not scientific data but metaphysical framing. They argued that uncritical adoption of Western epistemology entailed profound theological consequences. Their response called for a return to the earlier Islamic method: to gather knowledge from every source, subject it to Islamic metaphysics, digest it critically, and then build upon it.

This historical trajectory reveals a key distinction. Whereas Western intellectual history gradually narrowed the scope of reason to exclude metaphysics and theology, Islamic civilization developed a stable internal structure that preserved metaphysical foundations while encouraging empirical and rational investigation.`
    }
  ), /* @__PURE__ */ React3.createElement("div", { className: "mt-20 p-8 bg-white rounded-3xl border border-stone-200 text-center shadow-lg" }, /* @__PURE__ */ React3.createElement(Library, { className: "w-8 h-8 text-stone-300 mx-auto mb-4" }), /* @__PURE__ */ React3.createElement("h4", { className: "font-serif font-bold text-2xl text-stone-800 mb-3" }, "Integrative Intellectual Order"), /* @__PURE__ */ React3.createElement("p", { className: "text-lg text-stone-600 max-w-2xl mx-auto italic" }, '"Knowledge was never neutral; it was always situated within a broader understanding of reality, purpose, and truth."')), /* @__PURE__ */ React3.createElement("div", { className: "mt-16 text-center text-stone-400 text-sm font-medium" }, /* @__PURE__ */ React3.createElement("p", null, "\xA9 2025 Educational Infographic Series"))));
};
var islamic_narrative_default = App3;

// infographics/shifting-paradigms/4-ontology-and-epistemology.js
import React4, { useState as useState4 } from "react";
import {
  Layers as Layers2,
  Repeat,
  Heart,
  Lightbulb,
  Stethoscope as Stethoscope3,
  FileText as FileText4,
  ChevronUp as ChevronUp4,
  ChevronDown as ChevronDown4,
  ArrowDown as ArrowDown4,
  Compass,
  Scale as Scale4,
  Eye as Eye3,
  Brain as Brain3,
  BookOpen as BookOpen3,
  Share2
} from "lucide-react";
var ContentCard3 = ({
  title,
  subtitle,
  mainText,
  icon: Icon,
  highlightBox,
  fullText,
  colorTheme = "cyan",
  // 'cyan' or 'gold'
  isLast
}) => {
  const [showFullText, setShowFullText] = useState4(false);
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
  return /* @__PURE__ */ React4.createElement("div", { className: "flex flex-col md:flex-row gap-8 mb-20 group relative" }, !isLast && /* @__PURE__ */ React4.createElement("div", { className: "absolute left-8 top-16 bottom-[-80px] w-1 bg-stone-200 rounded-full md:block hidden" }), /* @__PURE__ */ React4.createElement("div", { className: "flex-shrink-0 relative z-10" }, /* @__PURE__ */ React4.createElement("div", { className: `w-16 h-16 rounded-2xl bg-white border-2 border-stone-200 shadow-sm flex items-center justify-center transition-all duration-300 group-hover:scale-105 ${theme.border} group-hover:shadow-md` }, /* @__PURE__ */ React4.createElement(Icon, { className: `w-8 h-8 text-stone-400 transition-colors ${theme.iconBg}` }))), /* @__PURE__ */ React4.createElement("div", { className: "flex-1" }, /* @__PURE__ */ React4.createElement("div", { className: "bg-white p-8 rounded-3xl border border-stone-100 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden group-hover:-translate-y-1" }, /* @__PURE__ */ React4.createElement("div", { className: `absolute top-0 left-0 w-2 h-full ${theme.accent} transition-colors duration-500` }), /* @__PURE__ */ React4.createElement("div", { className: "pl-4" }, /* @__PURE__ */ React4.createElement("div", { className: "flex items-center gap-3 mb-4" }, /* @__PURE__ */ React4.createElement("span", { className: `px-3 py-1 text-xs font-bold tracking-widest uppercase rounded-full border ${theme.tag}` }, subtitle)), /* @__PURE__ */ React4.createElement("div", { className: "flex flex-col gap-8" }, /* @__PURE__ */ React4.createElement("div", { className: "flex-1" }, /* @__PURE__ */ React4.createElement("h3", { className: `text-2xl font-serif font-bold text-stone-800 mb-4 transition-colors ${theme.title}` }, title), /* @__PURE__ */ React4.createElement("div", { className: "text-lg text-stone-600 leading-relaxed mb-6" }, mainText), highlightBox && /* @__PURE__ */ React4.createElement("div", { className: `p-5 rounded-xl border-l-4 ${theme.box} mb-6` }, /* @__PURE__ */ React4.createElement("div", { className: "flex gap-3" }, /* @__PURE__ */ React4.createElement("div", { className: "mt-1" }, /* @__PURE__ */ React4.createElement(Scale4, { className: "w-5 h-5 opacity-70" })), /* @__PURE__ */ React4.createElement("div", null, /* @__PURE__ */ React4.createElement("h4", { className: "text-sm font-bold uppercase tracking-wide opacity-80 mb-1" }, highlightBox.title), /* @__PURE__ */ React4.createElement("p", { className: "text-base font-medium leading-snug" }, highlightBox.text)))), /* @__PURE__ */ React4.createElement(
    "button",
    {
      onClick: () => setShowFullText(!showFullText),
      className: `flex items-center gap-2 text-sm font-bold transition-colors px-4 py-2 rounded-lg border border-transparent hover:border-stone-200 w-full md:w-auto justify-center md:justify-start ${theme.button}`
    },
    showFullText ? /* @__PURE__ */ React4.createElement(ChevronUp4, { className: "w-4 h-4" }) : /* @__PURE__ */ React4.createElement(FileText4, { className: "w-4 h-4" }),
    showFullText ? "Hide Source Text" : "Read Source Text"
  ))), showFullText && /* @__PURE__ */ React4.createElement("div", { className: "mt-8 animate-in fade-in slide-in-from-top-4 duration-300" }, /* @__PURE__ */ React4.createElement("div", { className: "bg-[#fdfbf7] p-8 rounded-xl border border-stone-200 shadow-inner relative" }, /* @__PURE__ */ React4.createElement("div", { className: "absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-stone-200 via-stone-300 to-stone-200 opacity-50" }), /* @__PURE__ */ React4.createElement("div", { className: "flex items-center gap-2 mb-4 border-b border-stone-200 pb-3" }, /* @__PURE__ */ React4.createElement(FileText4, { className: "w-4 h-4 text-stone-400" }), /* @__PURE__ */ React4.createElement("span", { className: "text-xs font-bold text-stone-400 uppercase tracking-widest" }, "Source Excerpt")), /* @__PURE__ */ React4.createElement("div", { className: "prose prose-stone prose-sm max-w-none font-serif text-stone-700 leading-relaxed whitespace-pre-line" }, fullText)))))));
};
var App4 = () => {
  return /* @__PURE__ */ React4.createElement("div", { className: "min-h-screen bg-stone-50 text-stone-800 font-sans selection:bg-cyan-200 pb-24" }, /* @__PURE__ */ React4.createElement("header", { className: "pt-24 pb-16 px-6 max-w-5xl mx-auto text-center" }, /* @__PURE__ */ React4.createElement("div", { className: "inline-block px-5 py-2 bg-white text-cyan-700 text-sm font-bold tracking-[0.2em] uppercase rounded-full mb-8 border border-stone-200 shadow-sm" }, "Foundations of Science"), /* @__PURE__ */ React4.createElement("h1", { className: "text-4xl md:text-6xl font-serif font-bold text-stone-900 mb-6 leading-tight tracking-tight" }, "Ontology & Epistemology"), /* @__PURE__ */ React4.createElement("p", { className: "text-xl text-stone-500 max-w-2xl mx-auto leading-relaxed font-light" }, "Defining Reality and Knowledge within an integrated Islamic framework."), /* @__PURE__ */ React4.createElement("div", { className: "flex justify-center mt-12" }, /* @__PURE__ */ React4.createElement(ArrowDown4, { className: "w-6 h-6 text-stone-300 animate-bounce" }))), /* @__PURE__ */ React4.createElement("main", { className: "max-w-5xl mx-auto px-6" }, /* @__PURE__ */ React4.createElement(
    ContentCard3,
    {
      colorTheme: "cyan",
      icon: Layers2,
      subtitle: "Reality (Ontology)",
      title: "Allah & Creation",
      mainText: "Reality isn't just physical stuff. It has levels. It starts with Allah, who exists on His own. Everything else\u2014nature, humans, the universe\u2014depends entirely on Him to exist every single second. We call this 'Contingent' (mumkin).",
      highlightBox: {
        title: "The Core Difference",
        text: "Nature doesn't stand next to Allah; it stands beneath Him. He holds it together constantly."
      },
      fullText: `Islamic metaphysical inquiry begins with existence itself, not with nature as an independent explanatory domain. The first task of dialectic theology (kal\u0101m) was to establish that existence is not uniform in kind. Rather, beings fall into fundamentally different ontological categories. At the apex stands the Necessary Being, Allah, whose existence is intrinsic and uncaused. All other beings are contingent, deriving their existence, continuity, and intelligibility entirely from Him.

Contingent existences (mumkin al-wuj\u016Bd) are defined precisely by their dependence. They begin, change, and cease. They require causes and conditions. Their existence is not self-explanatory. This dependence necessitates a Being whose existence is necessary in itself (w\u0101jib al-wuj\u016Bd), who does not depend on anything else, and upon whom all else depends at every moment.`
    }
  ), /* @__PURE__ */ React4.createElement(
    ContentCard3,
    {
      colorTheme: "gold",
      icon: Repeat,
      subtitle: "Allah's Consistency",
      title: "Why Science Works",
      mainText: "Science works because nature is predictable. But why? Because Allah is wise and consistent. He runs the world in a steady rhythm called 'Divine Habit' (sunnat All\u0101h). Because Allah doesn't change His mind randomly, nature is reliable.",
      highlightBox: {
        title: "Methodological Naturalism",
        text: "We study the patterns (science), but we know Who created the pattern."
      },
      fullText: `Since all causation ultimately traces back to Allah, creation unfolds in accordance with stable, intelligible regularities. These regularities are described as Allah\u2019s habit (sunnat All\u0101h or \u02BF\u0101dat All\u0101h). They are neither autonomous laws nor arbitrary sequences, but consistent expressions of divine wisdom (\u1E25ikmah). The Qur\u2019anic insistence on order, coherence, and non-contradiction in creation (e.g., 21:22) grounds the expectation that nature is reliable and thus knowable.`
    }
  ), /* @__PURE__ */ React4.createElement(
    ContentCard3,
    {
      colorTheme: "cyan",
      icon: Heart,
      subtitle: "Who We Are",
      title: "The Whole Human",
      mainText: /* @__PURE__ */ React4.createElement("div", null, "You are not just a biological organism. You are an integrated being created for a purpose. This integration includes:", /* @__PURE__ */ React4.createElement("ul", { className: "list-disc list-inside mt-4 space-y-2 text-base font-medium text-stone-700 pl-2" }, /* @__PURE__ */ React4.createElement("li", null, /* @__PURE__ */ React4.createElement("strong", null, "Body"), " (", /* @__PURE__ */ React4.createElement("em", null, "jism"), ")"), /* @__PURE__ */ React4.createElement("li", null, /* @__PURE__ */ React4.createElement("strong", null, "Intellect"), " (", /* @__PURE__ */ React4.createElement("em", null, "\u2018aql"), ")"), /* @__PURE__ */ React4.createElement("li", null, /* @__PURE__ */ React4.createElement("strong", null, "Heart"), " (", /* @__PURE__ */ React4.createElement("em", null, "qalb"), ")"), /* @__PURE__ */ React4.createElement("li", null, /* @__PURE__ */ React4.createElement("strong", null, "Soul/Self"), " (", /* @__PURE__ */ React4.createElement("em", null, "nafs"), ")"), /* @__PURE__ */ React4.createElement("li", null, /* @__PURE__ */ React4.createElement("strong", null, "Spirit"), " (", /* @__PURE__ */ React4.createElement("em", null, "r\u016B\u1E25"), ")"))),
      highlightBox: {
        title: "The Missing Piece",
        text: "Treating only the biological mechanism fails to address the full reality of the human person."
      },
      fullText: `Within this ordered creation, the human being occupies a unique ontological position. Humans are not merely biological organisms. They are created as integrated beings composed of body (jism), intellect (\u02BFaql), heart (qalb), soul (nafs), and spirit (r\u016B\u1E25). This integration is not accidental; it is purposive.

Humans are created for recognition (ma\u02BFrifah) and worship (\u02BFib\u0101dah) of Allah. They are moral agents, entrusted with responsibility as vicegerents (khal\u012Bfah), capable of apprehending truth and acting upon it.`
    }
  ), /* @__PURE__ */ React4.createElement(
    ContentCard3,
    {
      colorTheme: "gold",
      icon: Share2,
      subtitle: "Epistemology Overview",
      title: "Sources of Knowledge",
      mainText: /* @__PURE__ */ React4.createElement("div", null, "Knowledge is not limited to the physical. It relies on three integrated sources:", /* @__PURE__ */ React4.createElement("ul", { className: "list-disc list-inside mt-4 space-y-2 text-base font-medium text-stone-700 pl-2" }, /* @__PURE__ */ React4.createElement("li", null, /* @__PURE__ */ React4.createElement("strong", null, "The Five Senses"), " (perceived data)"), /* @__PURE__ */ React4.createElement("li", null, /* @__PURE__ */ React4.createElement("strong", null, "Truthful Testimony"), " (conveyed truth)"), /* @__PURE__ */ React4.createElement("li", null, /* @__PURE__ */ React4.createElement("strong", null, "The Sound Intellect"), " (processing and deduction)"))),
      highlightBox: {
        title: "The Intellect's Role",
        text: "The Intellect is the central processor. It evaluates sensory data, authenticates testimony, and performs pure deduction."
      },
      fullText: `Corresponding to this ontological status, humans are granted epistemological tools that other creatures do not possess in full. Classical Muslim scholars identified three primary sources of definitive (qa\u1E6D\u012B\u02BB) knowledge: the external senses (\u1E25aw\u0101s khamsah), the sound intellect (\u02BFaql sal\u012Bm), and truthful testimony (khabar \u1E63\u0101diq).
          
Together, these epistemological tools position the human being in a way unmatched by other creatures.`
    }
  ), /* @__PURE__ */ React4.createElement(
    ContentCard3,
    {
      colorTheme: "gold",
      icon: Eye3,
      subtitle: "Knowledge Source 1",
      title: "The Senses (\u1E24aw\u0101s)",
      mainText: "Our five senses provide direct access to the physical, observable world. This is the foundation of empirical science\u2014observing symptoms, testing biological facts, and witnessing reality as it is.",
      highlightBox: {
        title: "Empirical Grounding",
        text: "The senses ground investigation in observable fact, preventing speculation."
      },
      fullText: `The senses provide access to the observable world and ground empirical investigation. Classical Muslim scholars identified three primary sources of definitive (qa\u1E6D\u012B\u02BB) knowledge, starting with the external senses (\u1E25aw\u0101s khamsah). These allow us to engage with the material world created by Allah.`
    }
  ), /* @__PURE__ */ React4.createElement(
    ContentCard3,
    {
      colorTheme: "gold",
      icon: Brain3,
      subtitle: "Knowledge Source 2",
      title: "The Sound Intellect (\u02BFAql)",
      mainText: "Reason is the engine that processes everything else. It organizes sensory data into patterns. It evaluates testimony to see if it is reliable. And it deduces pure logical truths. It connects the dots.",
      highlightBox: {
        title: "Rational Capacity",
        text: "Reason allows for inference, judgment, and abstraction\u2014essential for science and diagnosis."
      },
      fullText: `The intellect enables humans to reason beyond immediate perception, allowing inference and judgment. It organizes sensory data into meaningful patterns and coherent explanations. It also evaluates conveyed testimony by assessing transmitted reports, accumulated knowledge, and expert claims. In addition, the intellect engages in purely intellectual deductions that do not depend directly on sensory input or testimony, such as logical relations and metaphysical distinctions.`
    }
  ), /* @__PURE__ */ React4.createElement(
    ContentCard3,
    {
      colorTheme: "gold",
      icon: BookOpen3,
      subtitle: "Knowledge Source 3",
      title: "Truthful Testimony (Khabar \u1E62\u0101diq)",
      mainText: "Not all knowledge is discovered personally; much of it is conveyed to us by others. The highest form of this is Revelation (Wa\u1E25\u012B), which gives us ultimate truths about purpose and meaning that science cannot measure.",
      highlightBox: {
        title: "Ultimate Meaning",
        text: "Revelation provides the 'Why' behind the scientific 'How'."
      },
      fullText: `Truthful testimony grants access to knowledge that lies beyond sensory observation and rational deduction. The most important form of such testimony is revelation (wa\u1E25\u012B), which discloses ultimate purpose, moral obligation, the meaning of suffering, and the end toward which human life is directed. These are not peripheral concerns. They define the context within which all other knowledge finds its proper place.`
    }
  ), /* @__PURE__ */ React4.createElement(
    ContentCard3,
    {
      colorTheme: "cyan",
      icon: Stethoscope3,
      subtitle: "Why We Heal",
      title: "Medicine's Real Goal",
      mainText: "Healing isn't just about fixing broken parts. It is a support system. We fix the body so the patient can get back to their real purpose: worshiping Allah (\u02BFib\u0101dah) and living a good, moral life.",
      isLast: true,
      highlightBox: {
        title: "Medicine with a Purpose",
        text: "Health isn't the final goal. Health is a tool to help us live a purposeful life."
      },
      fullText: `Within this framework, healthcare assumes a significance that exceeds just technical intervention. Medicine is not merely the repair of biological machinery nor the optimization of physiological parameters. It is a supportive discipline that enables human beings to fulfill their ontological purpose. Preserving health, alleviating suffering, and restoring functional integrity serve the higher aim of allowing the patient to seek truth, worship Allah, and discharge their moral responsibilities.

This ontological and epistemological vision stands in stark contrast to modern frameworks that treat health as an end in itself.`
    }
  ), /* @__PURE__ */ React4.createElement("div", { className: "mt-20 p-8 bg-white rounded-3xl border border-stone-200 text-center shadow-lg" }, /* @__PURE__ */ React4.createElement(Compass, { className: "w-8 h-8 text-stone-300 mx-auto mb-4" }), /* @__PURE__ */ React4.createElement("h4", { className: "font-serif font-bold text-2xl text-stone-800 mb-3" }, "A Complete Framework"), /* @__PURE__ */ React4.createElement("p", { className: "text-lg text-stone-600 max-w-2xl mx-auto italic" }, '"We neither diminish empirical investigation nor absolutize it. We place science within a hierarchy of meaning that restores purpose, wisdom, and moral clarity."')), /* @__PURE__ */ React4.createElement("div", { className: "mt-16 text-center text-stone-400 text-sm font-medium" }, /* @__PURE__ */ React4.createElement("p", null, "\xA9 2025 Educational Infographic Series"))));
};
var ontology_and_epistemology_default = App4;

// infographics/shifting-paradigms/5-the-paradigm-shift.js
import React5, { useState as useState5 } from "react";
import {
  Microscope as Microscope2,
  Globe as Globe2,
  UserCheck,
  Map,
  AlertTriangle as AlertTriangle2,
  ArrowRight,
  CheckCircle,
  FileText as FileText5,
  ChevronUp as ChevronUp5,
  ChevronDown as ChevronDown5,
  ArrowDown as ArrowDown5,
  RefreshCw,
  Anchor as Anchor2,
  ExternalLink
} from "lucide-react";
var ContentCard4 = ({
  title,
  subtitle,
  mainText,
  icon: Icon,
  highlightBox,
  fullText,
  colorTheme = "teal",
  // 'teal' or 'indigo'
  isLast
}) => {
  const [showFullText, setShowFullText] = useState5(false);
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
  return /* @__PURE__ */ React5.createElement("div", { className: "flex flex-col md:flex-row gap-8 mb-20 group relative" }, !isLast && /* @__PURE__ */ React5.createElement("div", { className: "absolute left-8 top-16 bottom-[-80px] w-1 bg-stone-200 rounded-full md:block hidden" }), /* @__PURE__ */ React5.createElement("div", { className: "flex-shrink-0 relative z-10" }, /* @__PURE__ */ React5.createElement("div", { className: `w-16 h-16 rounded-2xl bg-white border-2 border-stone-200 shadow-sm flex items-center justify-center transition-all duration-300 group-hover:scale-105 ${theme.border} group-hover:shadow-md` }, /* @__PURE__ */ React5.createElement(Icon, { className: `w-8 h-8 text-stone-400 transition-colors ${theme.iconBg}` }))), /* @__PURE__ */ React5.createElement("div", { className: "flex-1" }, /* @__PURE__ */ React5.createElement("div", { className: "bg-white p-8 rounded-3xl border border-stone-100 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden group-hover:-translate-y-1" }, /* @__PURE__ */ React5.createElement("div", { className: `absolute top-0 left-0 w-2 h-full ${theme.accent} transition-colors duration-500` }), /* @__PURE__ */ React5.createElement("div", { className: "pl-4" }, /* @__PURE__ */ React5.createElement("div", { className: "flex items-center gap-3 mb-4" }, /* @__PURE__ */ React5.createElement("span", { className: `px-3 py-1 text-xs font-bold tracking-widest uppercase rounded-full border ${theme.tag}` }, subtitle)), /* @__PURE__ */ React5.createElement("div", { className: "flex flex-col gap-8" }, /* @__PURE__ */ React5.createElement("div", { className: "flex-1" }, /* @__PURE__ */ React5.createElement("h3", { className: `text-2xl font-serif font-bold text-stone-800 mb-4 transition-colors ${theme.title}` }, title), /* @__PURE__ */ React5.createElement("div", { className: "text-lg text-stone-600 leading-relaxed mb-6" }, mainText), highlightBox && /* @__PURE__ */ React5.createElement("div", { className: `p-5 rounded-xl border-l-4 ${theme.box} mb-6` }, /* @__PURE__ */ React5.createElement("div", { className: "flex gap-3" }, /* @__PURE__ */ React5.createElement("div", { className: "mt-1" }, colorTheme === "teal" ? /* @__PURE__ */ React5.createElement(AlertTriangle2, { className: "w-5 h-5 opacity-70" }) : /* @__PURE__ */ React5.createElement(CheckCircle, { className: "w-5 h-5 opacity-70" })), /* @__PURE__ */ React5.createElement("div", null, /* @__PURE__ */ React5.createElement("h4", { className: "text-sm font-bold uppercase tracking-wide opacity-80 mb-1" }, highlightBox.title), /* @__PURE__ */ React5.createElement("p", { className: "text-base font-medium leading-snug" }, highlightBox.text)))), /* @__PURE__ */ React5.createElement(
    "button",
    {
      onClick: () => setShowFullText(!showFullText),
      className: `flex items-center gap-2 text-sm font-bold transition-colors px-4 py-2 rounded-lg border border-transparent hover:border-stone-200 w-full md:w-auto justify-center md:justify-start ${theme.button}`
    },
    showFullText ? /* @__PURE__ */ React5.createElement(ChevronUp5, { className: "w-4 h-4" }) : /* @__PURE__ */ React5.createElement(FileText5, { className: "w-4 h-4" }),
    showFullText ? "Hide Source Text" : "Read Source Text"
  ))), showFullText && /* @__PURE__ */ React5.createElement("div", { className: "mt-8 animate-in fade-in slide-in-from-top-4 duration-300" }, /* @__PURE__ */ React5.createElement("div", { className: "bg-[#fdfbf7] p-8 rounded-xl border border-stone-200 shadow-inner relative" }, /* @__PURE__ */ React5.createElement("div", { className: "absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-stone-200 via-stone-300 to-stone-200 opacity-50" }), /* @__PURE__ */ React5.createElement("div", { className: "flex items-center gap-2 mb-4 border-b border-stone-200 pb-3" }, /* @__PURE__ */ React5.createElement(FileText5, { className: "w-4 h-4 text-stone-400" }), /* @__PURE__ */ React5.createElement("span", { className: "text-xs font-bold text-stone-400 uppercase tracking-widest" }, "Source Excerpt")), /* @__PURE__ */ React5.createElement("div", { className: "prose prose-stone prose-sm max-w-none font-serif text-stone-700 leading-relaxed whitespace-pre-line" }, fullText)))))));
};
var ClosingSlide = () => /* @__PURE__ */ React5.createElement("div", { className: "mt-32 relative group" }, /* @__PURE__ */ React5.createElement("div", { className: "absolute inset-0 border-2 border-stone-200 rounded-3xl transform translate-x-2 translate-y-2" }), /* @__PURE__ */ React5.createElement("div", { className: "relative p-16 bg-white rounded-3xl border border-stone-200 shadow-xl text-center overflow-hidden" }, /* @__PURE__ */ React5.createElement("div", { className: "absolute inset-0 bg-stone-50 opacity-30 bg-[radial-gradient(#0f766e_0.5px,transparent_0.5px)] [background-size:24px_24px]" }), /* @__PURE__ */ React5.createElement("div", { className: "absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-teal-600 via-emerald-500 to-teal-600" }), /* @__PURE__ */ React5.createElement("div", { className: "relative z-10 flex flex-col items-center" }, /* @__PURE__ */ React5.createElement("h2", { className: "font-serif text-4xl md:text-6xl text-teal-900 mb-8 font-bold leading-relaxed drop-shadow-sm", style: { fontFamily: "Amiri, serif" } }, "\u062C\u0632\u0627\u0643\u0645 \u0627\u0644\u0644\u0647 \u062E\u064A\u0631\u0627"), /* @__PURE__ */ React5.createElement("div", { className: "w-24 h-px bg-gradient-to-r from-transparent via-stone-300 to-transparent mb-8" }), /* @__PURE__ */ React5.createElement("h3", { className: "text-2xl font-serif text-stone-800 tracking-widest uppercase mb-8" }, "Ashrafiyya Health"), /* @__PURE__ */ React5.createElement(
  "a",
  {
    href: "https://ashrafiyya.com",
    target: "_blank",
    rel: "noopener noreferrer",
    className: "group inline-flex items-center gap-3 px-8 py-3 bg-white text-teal-700 font-medium rounded-full border border-teal-100 hover:border-teal-300 hover:bg-teal-50 transition-all shadow-sm hover:shadow-md"
  },
  /* @__PURE__ */ React5.createElement("span", { className: "tracking-wide" }, "ashrafiyya.com"),
  /* @__PURE__ */ React5.createElement(ExternalLink, { className: "w-4 h-4 group-hover:translate-x-1 transition-transform" })
))));
var App5 = () => {
  return /* @__PURE__ */ React5.createElement("div", { className: "min-h-screen bg-stone-50 text-stone-800 font-sans selection:bg-teal-200 pb-24" }, /* @__PURE__ */ React5.createElement("header", { className: "pt-24 pb-16 px-6 max-w-5xl mx-auto text-center" }, /* @__PURE__ */ React5.createElement("div", { className: "inline-block px-5 py-2 bg-white text-teal-700 text-sm font-bold tracking-[0.2em] uppercase rounded-full mb-8 border border-stone-200 shadow-sm" }, "A New Path Forward"), /* @__PURE__ */ React5.createElement("h1", { className: "text-4xl md:text-6xl font-serif font-bold text-stone-900 mb-6 leading-tight tracking-tight" }, "The Paradigm Shift"), /* @__PURE__ */ React5.createElement("p", { className: "text-xl text-stone-500 max-w-2xl mx-auto leading-relaxed font-light" }, "Moving from a narrow biomedical focus to a fully integrated, theocentric model of care."), /* @__PURE__ */ React5.createElement("div", { className: "flex justify-center mt-12" }, /* @__PURE__ */ React5.createElement(ArrowDown5, { className: "w-6 h-6 text-stone-300 animate-bounce" }))), /* @__PURE__ */ React5.createElement("main", { className: "max-w-5xl mx-auto px-6" }, /* @__PURE__ */ React5.createElement(
    ContentCard4,
    {
      colorTheme: "teal",
      icon: Microscope2,
      subtitle: "The Current State",
      title: "Biomedical Narrowing",
      mainText: "Modern medicine gained its power by narrowing its focus. It decided to look only at physical mechanisms and ignore wider realities. This made it great at fixing bodies but created a blind spot: it often treats the physical body as the only 'real' part of the patient.",
      highlightBox: {
        title: "The Blind Spot",
        text: "When medicine stops at 'Nature' as the final explanation, it misses the ultimate Causer and the greater reality of the patient."
      },
      fullText: `The Islamic theocentric approach responds to real tensions that many clinicians already notice in modern biomedical materialism. Modern medicine achieved its remarkable successes by narrowing its focus. It bracketed metaphysical questions and restricted explanation to material, efficient causes. This produced precision, predictive power, and technical effectiveness.

At the same time, the same narrowing created blind spots. Biomedical materialism often treats the physical body as the main, and sometimes the only, \u201Creal\u201D site of disease and healing. In doing so, it sidelines dimensions that are central in an Islamic ontology, such as the unseen, the soul and spiritual states, and divine decree (qadar). A medical approach that treats only the body can succeed biologically and still fail to address the full reality of the human condition in which illness occurs.`
    }
  ), /* @__PURE__ */ React5.createElement(
    ContentCard4,
    {
      colorTheme: "indigo",
      icon: Globe2,
      subtitle: "The Islamic Model",
      title: "Theocentric Integration",
      mainText: "This isn't about rejecting science. It's about 'Theocentric Integration.' We keep the rigorous scientific method (studying causes), but we place it inside a wider reality where Allah is central. We see the body as a mechanism, but we know it serves a higher purpose.",
      highlightBox: {
        title: "Completing, Not Replacing",
        text: "The goal is not to weaken medicine\u2019s mechanism. The goal is to complete it by restoring a wider ontology, a fuller anthropology, and a clearer purpose."
      },
      fullText: `The Islamic model does not propose \u201Cadding spirituality\u201D onto medicine. It also does not propose lowering scientific standards. It proposes re-grounding medicine in a wider ontology and epistemology, where empirical science remains fully legitimate, but is placed inside a larger understanding of reality, causation, and human purpose. This is not supplementation. It is a paradigm shift in how the clinician understands what the patient is and what medical work is for.

Historically, many of the questions modern medicine struggles to answer\u2014about meaning, suffering, purpose, and levels of causation\u2014were not treated as \u201Cnon-medical\u201D in the same way. Islamic civilization absorbed foreign sciences, disciplined them within taw\u1E25\u012Bd, and advanced them without needing to sever scientific practice from wider existence and ultimate meaning. The point here is not nostalgia. It is to retrieve a proven intellectual posture that can engage modern medicine.`
    }
  ), /* @__PURE__ */ React5.createElement(
    ContentCard4,
    {
      colorTheme: "indigo",
      icon: UserCheck,
      subtitle: "At the Bedside",
      title: "What This Means for You",
      mainText: /* @__PURE__ */ React5.createElement("div", null, "For the clinician, this is an internal operating system update. It changes how you see everything:", /* @__PURE__ */ React5.createElement("ul", { className: "list-disc list-inside mt-4 space-y-2 text-base font-medium text-stone-700 pl-2" }, /* @__PURE__ */ React5.createElement("li", null, /* @__PURE__ */ React5.createElement("strong", null, "Ontology:"), ' You see Allah as the ultimate Sustainer, not just "nature."'), /* @__PURE__ */ React5.createElement("li", null, /* @__PURE__ */ React5.createElement("strong", null, "Anthropology:"), " You treat the whole human, not just a biological machine."), /* @__PURE__ */ React5.createElement("li", null, /* @__PURE__ */ React5.createElement("strong", null, "Ethics:"), " You cultivate humility (", /* @__PURE__ */ React5.createElement("em", null, "taw\u0101\u1E0Du\u02BF"), ") and patience (", /* @__PURE__ */ React5.createElement("em", null, "\u1E63abr"), ") because you know you are not in total control."))),
      highlightBox: {
        title: "No Split Identity",
        text: "You don't have to be a 'scientist' at work and a 'believer' at home. You are a believer using science as a tool."
      },
      fullText: `This framework functions as the practitioner\u2019s internal operating system. It does not dictate specific clinical algorithms; rather, it reshapes how knowledge is interpreted, how patients are understood, and how care is morally situated.

It grounds the practitioner\u2019s ontology: Reality is understood as hierarchically ordered, with the Necessary Creator as ontologically prior to all created beings. Biological processes, the patient, and indeed the practitioner themselves are real, yet fundamentally contingent and dependent.

It informs the practitioner\u2019s epistemology: The clinician pursues empirical knowledge with full seriousness, because the senses and disciplined reasoning are genuine tools. At the same time, evidence is not absolutized into a total worldview.

It shapes their anthropology: The patient is not merely a diseased body, but an integrated human being whose biological state interacts with moral, spiritual, psychological, and social realities.

It clarifies their telos: Health is not an end in itself, but a means that supports the human being\u2019s capacity for truth-seeking (ma\u02BFrifah), worship (\u02BFib\u0101dah), moral responsibility, and human flourishing.`
    }
  ), /* @__PURE__ */ React5.createElement(
    ContentCard4,
    {
      colorTheme: "teal",
      icon: Map,
      subtitle: "Moving Forward",
      title: "Challenges & Pathways",
      mainText: "Changing a paradigm is hard. You will face the 'Myth of Objectivity' (people thinking modern medicine is neutral) and the fear of losing professional identity. But the path forward is clear: Learn the history, critique the hidden assumptions, and build a community of practice.",
      isLast: true,
      highlightBox: {
        title: "De-Naturalization",
        text: "The first step is simply realizing that the current way isn't the 'only' way\u2014it's just a historical choice we can update."
      },
      fullText: `The move toward an Islamic paradigm in medicine faces real obstacles. These obstacles are not only institutional. They are also intellectual and psychological.

Challenges include the "Myth of Objectivity"\u2014modern medicine presents itself as neutral, so any religious framework feels like "bias." Practitioners also fear that opening up to metaphysics might devalue their hard-won technical expertise.

Pathways for Adoption:
1. Internal Critique: Practitioners must be educated about metaphysical and epistemological assumptions embedded in modern biomedicine. This process \u201Cde-naturalizes\u201D biomedical materialism.
2. Developing a Scholarly Synthesis: We need a contemporary \u02BFIlm al-\u1E6Cibb that rigorously engages modern biomedical knowledge through an Islamic framework.
3. Cultivating a Niche Cultural Shift: Meaningful change can occur within smaller professional communities through personal formation and peer discussion.`
    }
  ), /* @__PURE__ */ React5.createElement("div", { className: "mt-20 p-8 bg-white rounded-3xl border border-stone-200 text-center shadow-lg" }, /* @__PURE__ */ React5.createElement(RefreshCw, { className: "w-8 h-8 text-stone-300 mx-auto mb-4" }), /* @__PURE__ */ React5.createElement("h4", { className: "font-serif font-bold text-2xl text-stone-800 mb-3" }, "A Call to Complete Medicine"), /* @__PURE__ */ React5.createElement("p", { className: "text-lg text-stone-600 max-w-2xl mx-auto italic" }, '"We are not replacing medicine. We are completing it. We are restoring the soul to the body, and the Creator to the creation."')), /* @__PURE__ */ React5.createElement(ClosingSlide, null), /* @__PURE__ */ React5.createElement("div", { className: "mt-16 text-center text-stone-400 text-sm font-medium" }, /* @__PURE__ */ React5.createElement("p", null, "\xA9 2025 Educational Infographic Series"))));
};
var the_paradigm_shift_default = App5;

// infographics/shifting-paradigms/entry.jsx
var sections = [
  {
    id: "western-experience",
    title: "The Western Experience",
    subtitle: "From divine purpose to machine laws",
    Component: western_experience_default
  },
  {
    id: "structure-of-medical-knowledge",
    title: "The Structure of Medical Knowledge",
    subtitle: "Diagnosis, hidden philosophy, and the divided self",
    Component: structure_of_medical_knowledge_default
  },
  {
    id: "islamic-experience",
    title: "The Islamic Experience",
    subtitle: "An integrative intellectual order",
    Component: islamic_narrative_default
  },
  {
    id: "ontology-epistemology",
    title: "Ontology & Epistemology",
    subtitle: "Reality and knowledge in an Islamic framework",
    Component: ontology_and_epistemology_default
  },
  {
    id: "paradigm-shift",
    title: "The Paradigm Shift",
    subtitle: "Completing medicine with a theocentric model",
    Component: the_paradigm_shift_default
  }
];
var useActiveSection = (ids) => {
  const [activeId, setActiveId] = useState6(ids[0] || "");
  useEffect(() => {
    if (!ids.length) return void 0;
    const handleScroll = () => {
      const midpoint = window.scrollY + window.innerHeight * 0.4;
      let current = ids[0];
      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= midpoint) {
          current = id;
        }
      });
      setActiveId(current);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [ids]);
  return activeId;
};
var TocCard = ({ id, title, subtitle, index }) => /* @__PURE__ */ React6.createElement(
  "a",
  {
    href: `#${id}`,
    className: "group block rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-teal-300 hover:shadow-md"
  },
  /* @__PURE__ */ React6.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React6.createElement("span", { className: "text-xs font-semibold tracking-[0.25em] text-stone-400" }, String(index + 1).padStart(2, "0"))),
  /* @__PURE__ */ React6.createElement("h3", { className: "mt-3 text-xl font-serif font-bold text-stone-800 group-hover:text-teal-800" }, title),
  /* @__PURE__ */ React6.createElement("p", { className: "mt-2 text-sm text-stone-500" }, subtitle)
);
var Page = () => {
  const sectionIds = sections.map((section) => section.id);
  const activeId = useActiveSection(sectionIds);
  const [showSideNav, setShowSideNav] = useState6(false);
  const [hoveredId, setHoveredId] = useState6("");
  useEffect(() => {
    const topMenu = document.getElementById("top-menu");
    if (!topMenu) return void 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowSideNav(entry.intersectionRatio < 0.2);
      },
      { threshold: [0, 0.2, 1] }
    );
    observer.observe(topMenu);
    return () => observer.disconnect();
  }, []);
  return /* @__PURE__ */ React6.createElement("div", { className: "relative bg-[#f7f5f0] text-stone-900" }, /* @__PURE__ */ React6.createElement("header", { className: "relative overflow-hidden px-6 pb-16 pt-20" }, /* @__PURE__ */ React6.createElement("div", { className: "absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,#d6f5f0,transparent_60%)]" }), /* @__PURE__ */ React6.createElement("div", { className: "mx-auto max-w-6xl text-center" }, /* @__PURE__ */ React6.createElement("div", { className: "inline-flex items-center gap-2 rounded-full border border-teal-100 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-teal-700 shadow-sm" }, "Resources"), /* @__PURE__ */ React6.createElement("h1", { className: "mt-6 text-4xl font-serif font-bold text-stone-900 md:text-6xl" }, "Shifting Paradigms"), /* @__PURE__ */ React6.createElement("p", { className: "mx-auto mt-4 max-w-2xl text-lg text-stone-600" }, "A curated set of five infographics exploring the philosophical journey of medicine and the Islamic framework for knowledge, reality, and healing."))), /* @__PURE__ */ React6.createElement("section", { id: "top-menu", className: "px-6 pb-10" }, /* @__PURE__ */ React6.createElement("div", { className: "mx-auto grid max-w-6xl gap-4 md:grid-cols-2 lg:grid-cols-3" }, sections.map((section, index) => /* @__PURE__ */ React6.createElement(TocCard, { key: section.id, index, ...section })))), /* @__PURE__ */ React6.createElement(
    "nav",
    {
      className: `fixed left-1/2 top-4 z-[9999] flex -translate-x-1/2 flex-row gap-2 rounded-full border border-stone-200 bg-white/80 p-2 text-xs font-semibold uppercase tracking-[0.18em] text-stone-500 shadow-sm backdrop-blur transition-opacity duration-300 sm:gap-3 sm:p-3 sm:scale-90 md:scale-95 xl:left-auto xl:right-6 xl:top-1/2 xl:-translate-x-0 xl:-translate-y-1/2 xl:flex-col xl:scale-100 ${showSideNav ? "opacity-100" : "pointer-events-none opacity-0"}`,
      onMouseLeave: () => setHoveredId(""),
      onBlur: () => setHoveredId("")
    },
    sections.map((section, index) => {
      const isActive = activeId === section.id;
      return /* @__PURE__ */ React6.createElement(
        "a",
        {
          key: section.id,
          href: `#${section.id}`,
          className: "group relative flex items-center justify-end",
          "aria-label": `Jump to ${section.title}`,
          onMouseEnter: () => setHoveredId(section.id),
          onFocus: () => setHoveredId(section.id),
          onPointerEnter: () => setHoveredId(section.id)
        },
        /* @__PURE__ */ React6.createElement(
          "span",
          {
            className: `pointer-events-none absolute bottom-full left-1/2 mb-3 hidden -translate-x-1/2 whitespace-nowrap rounded-full border border-stone-200 bg-white/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-500 opacity-0 shadow-sm transition-all duration-200 group-hover:opacity-100 group-hover:-translate-y-1 group-focus-visible:opacity-100 group-focus-visible:-translate-y-1 xl:bottom-auto xl:left-auto xl:right-full xl:top-1/2 xl:mb-0 xl:mr-3 xl:block xl:-translate-x-0 xl:-translate-y-1/2 xl:group-hover:-translate-x-1 xl:group-focus-visible:-translate-x-1 ${isActive ? "border-teal-100 text-teal-700" : ""}`
          },
          section.title
        ),
        /* @__PURE__ */ React6.createElement(
          "span",
          {
            className: `flex h-9 w-9 items-center justify-center rounded-full border transition ${isActive ? "border-teal-500 bg-teal-500 text-white shadow-md" : "border-transparent text-stone-400 group-hover:border-teal-200 group-hover:bg-teal-50 group-hover:text-teal-700"}`
          },
          String(index + 1).padStart(2, "0")
        )
      );
    }),
    /* @__PURE__ */ React6.createElement("div", { className: "pointer-events-none absolute left-1/2 top-full mt-3 -translate-x-1/2 whitespace-nowrap rounded-full border border-stone-200 bg-white/95 px-4 py-1 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-500 shadow-sm xl:hidden" }, (sections.find((section) => section.id === hoveredId) || sections.find((section) => section.id === activeId) || sections[0])?.title)
  ), /* @__PURE__ */ React6.createElement("main", { className: "space-y-24 pb-24" }, sections.map(({ id, Component }) => /* @__PURE__ */ React6.createElement("section", { key: id, id, className: "scroll-mt-24" }, /* @__PURE__ */ React6.createElement(Component, null)))));
};
var root = document.getElementById("root");
if (root) {
  createRoot(root).render(/* @__PURE__ */ React6.createElement(Page, null));
}
