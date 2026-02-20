import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";
import { Check, X, DollarSign, Shield, Zap } from "lucide-react";

declare global {
  interface Window {
    ttq: any;
    snaptr: any;
  }
}

const BASE_AFFILIATE_URL = "https://gloffers.org/aff_c?offer_id=4016&aff_id=158638";

const EXCLUDED_STATES = [
  "Michigan", "Arizona", "Arkansas", "Delaware", "Louisiana", "South Carolina", "South Dakota",
];

type Step = "state" | "age" | "eligible" | "ineligible";

// Animation configs
const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const item = { 
  hidden: { opacity: 0, y: 12 }, 
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const } } 
};
const cardVariants = {
  initial: { opacity: 0, y: 30, scale: 0.97 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const } },
  exit: { opacity: 0, y: -20, scale: 0.97, transition: { duration: 0.3, ease: "easeIn" as const } },
};

const Index = () => {
  const [step, setStep] = useState<Step>("state");
  const urlParams = new URLSearchParams(window.location.search);
  
  // Detect Click IDs
  const ttclid = urlParams.get("ttclid");
  const sccid = urlParams.get("ScCid"); // Snap's standard Click ID parameter

  // Generate Affiliate Link based on source
  let affiliateLink = BASE_AFFILIATE_URL;
  if (ttclid) {
    affiliateLink += `&aff_sub=${ttclid}&ttclid=${ttclid}`;
  } else if (sccid) {
    affiliateLink += `&aff_sub=${sccid}&sccid=${sccid}`;
  }

  // Combined Tracking Helper
  const track = (eventName: string) => {
    console.log(`📡 [Tracking] Firing: ${eventName}`);

    // TikTok Logic
    if (typeof window !== "undefined" && window.ttq) {
      window.ttq.track(eventName, { content_name: 'Backspin_Games' });
    }

    // Snapchat Logic
    if (typeof window !== "undefined" && window.snaptr) {
      let snapEvent = 'PAGE_VIEW';
      if (eventName === 'ViewContent') snapEvent = 'PAGE_VIEW';
      if (eventName === 'SubmitForm') snapEvent = 'VIEW_CONTENT';
      if (eventName === 'ClickButton') snapEvent = 'AD_CLICK';
      
      window.snaptr('track', snapEvent);
    }
  };

  const handleStateAnswer = (inExcluded: boolean) => {
    // TRIGGER: User interacted with the quiz (Step 1)
    // As per your request, we fire ViewContent here instead of on page load.
    track("ViewContent");
    
    // We also track the form submission progress
    track("SubmitForm"); 
    
    setStep(inExcluded ? "ineligible" : "age");
  };

  const handleAgeAnswer = (is18: boolean) => {
    setStep(is18 ? "eligible" : "ineligible");
  };

  const handleCtaClick = () => {
    // TRIGGER: Final Click on the Affiliate Link
    track("ClickButton");
    console.log(`🔗 Redirecting to: ${affiliateLink}`);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <motion.img
        src={heroBg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover transform-gpu"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
      />
      <div className="absolute inset-0 bg-background/70" />

      <div className="relative z-10 w-full max-w-lg mx-auto px-6 py-12">
        <motion.div className="text-center mb-10 transform-gpu" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-5xl font-bold tracking-tight text-foreground mb-2">
            Backspin <span className="text-gradient">Games</span>
          </h1>
          <p className="text-muted-foreground text-lg">Play. Compete. Get Paid.</p>
        </motion.div>

        <div className="glass-card p-8 glow-primary overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div key={step} variants={cardVariants} initial="initial" animate="animate" exit="exit" className="transform-gpu">
              {step === "state" && <StateStep onAnswer={handleStateAnswer} />}
              {step === "age" && <AgeStep onAnswer={handleAgeAnswer} />}
              {step === "eligible" && <EligibleStep onCtaClick={handleCtaClick} affiliateLink={affiliateLink} />}
              {step === "ineligible" && <IneligibleStep />}
            </motion.div>
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {step === "state" && (
            <motion.div className="mt-10 space-y-4 transform-gpu" variants={container} initial="hidden" animate="show" exit={{ opacity: 0 }}>

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// Sub-components
const USP = ({ icon, text }: any) => (
  <motion.div variants={item} className="flex items-center gap-3 text-muted-foreground"><>{icon} <span className="text-sm">{text}</span></></motion.div>
);

const StateStep = ({ onAnswer }: any) => (
  <div className="space-y-6 text-center">
    <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Step 1 of 2</p>
    <h2 className="text-2xl font-semibold text-foreground">Are you located in any of these states?</h2>
    <div className="flex flex-wrap gap-2 justify-center">
      {EXCLUDED_STATES.map((state) => (
        <span key={state} className="px-3 py-1.5 rounded-full text-sm bg-secondary text-secondary-foreground">{state}</span>
      ))}
    </div>
    <div className="flex gap-3">
      <QuizButton variant="secondary" onClick={() => onAnswer(true)}><X className="w-4 h-4" /> Yes</QuizButton>
      <QuizButton variant="primary" onClick={() => onAnswer(false)}><Check className="w-4 h-4" /> No</QuizButton>
    </div>
  </div>
);

const AgeStep = ({ onAnswer }: any) => (
  <div className="space-y-6 text-center">
    <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Step 2 of 2</p>
    <h2 className="text-2xl font-semibold text-foreground">Are you 18 years or older?</h2>
    <div className="flex gap-3">
      <QuizButton variant="secondary" onClick={() => onAnswer(false)}><X className="w-4 h-4" /> No</QuizButton>
      <QuizButton variant="primary" onClick={() => onAnswer(true)}><Check className="w-4 h-4" /> Yes</QuizButton>
    </div>
  </div>
);

const EligibleStep = ({ onCtaClick, affiliateLink }: any) => (
  <div className="space-y-6 text-center">
    <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto"><Check className="w-8 h-8 text-green-500" /></div>
    <h2 className="text-2xl font-semibold text-foreground">You're Eligible! 🎉</h2>
    <motion.a href={affiliateLink} onClick={onCtaClick} className="inline-flex items-center justify-center w-full py-4 px-6 rounded-xl bg-primary text-primary-foreground font-semibold text-lg glow-primary">
      Start Playing Now →
    </motion.a>
  </div>
);

const IneligibleStep = () => (
  <div className="space-y-6 text-center">
    <div className="w-16 h-16 rounded-full bg-destructive/20 flex items-center justify-center mx-auto"><X className="w-8 h-8 text-destructive" /></div>
    <h2 className="text-2xl font-semibold text-foreground">Not Eligible</h2>
    <p className="text-muted-foreground">Sorry, this offer isn't available in your area.</p>
  </div>
);

const QuizButton = ({ variant, onClick, children }: any) => (
  <motion.button onClick={onClick} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className={`flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-semibold ${variant === "primary" ? "bg-primary text-primary-foreground glow-primary" : "bg-secondary text-secondary-foreground"}`}>
    {children}
  </motion.button>
);

export default Index;