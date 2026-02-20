import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";
import { Check, X, DollarSign, Shield, Zap } from "lucide-react";

// Tell TypeScript that the TikTok Pixel object ('ttq') exists on the window
declare global {
  interface Window {
    ttq: any;
  }
}

const BASE_AFFILIATE_URL = "https://gloffers.org/aff_c?offer_id=4016&aff_id=158638";

const EXCLUDED_STATES = [
  "Michigan",
  "Arizona",
  "Arkansas",
  "Delaware",
  "Louisiana",
  "South Carolina",
  "South Dakota",
];

type Step = "state" | "age" | "eligible" | "ineligible";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

const cardVariants = {
  initial: { opacity: 0, y: 30, scale: 0.97 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const } },
  exit: { opacity: 0, y: -20, scale: 0.97, transition: { duration: 0.3, ease: "easeIn" as const } },
};

const Index = () => {
  const [step, setStep] = useState<Step>("state");
  const urlParams = new URLSearchParams(window.location.search);
  const ttclid = urlParams.get("ttclid");

  // Generate the Affiliate Link immediately 
  const affiliateLink = ttclid
    ? `${BASE_AFFILIATE_URL}&aff_sub=${ttclid}&ttclid=${ttclid}`
    : BASE_AFFILIATE_URL;

  // Standardized Tracking Helper using Browser Pixel
  const track = (eventName: string) => {
    console.log(`📡 [TikTok Pixel] Preparing to fire: ${eventName}`);

    if (typeof window !== "undefined" && window.ttq) {
      window.ttq.track(eventName, {
        content_name: 'Backspin_Games',
      });
      console.log(`✅ [TikTok Pixel] ${eventName} successfully fired!`);
    } else {
      console.warn(`❌ [TikTok Pixel] window.ttq is missing. Make sure the base pixel is in index.html.`);
    }
  };

  // 1. Initial Load Events
  useEffect(() => {
    if ((navigator.maxTouchPoints || 0) > 0) {
      console.log("📱 Touch device detected. Firing load events...");
      // The base script in index.html automatically fires 'Pageview', 
      // so we just fire 'ViewContent' here.
      track("ViewContent");
    } else {
      console.log("💻 Non-touch device. Skipping load events.");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStateAnswer = (inExcluded: boolean) => {
    // 2. Track "SubmitForm" using TikTok's standard naming convention
    track("SubmitForm");
    setStep(inExcluded ? "ineligible" : "age");
  };

  const handleAgeAnswer = (is18: boolean) => {
    setStep(is18 ? "eligible" : "ineligible");
  };

  const handleCtaClick = () => {
    // 3. Track "ClickButton" using TikTok's standard naming convention
    console.log(`🔗 CTA Clicked! Redirecting user to: ${affiliateLink}`);
    track("ClickButton");
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <motion.img
        src={heroBg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
      />
      <div className="absolute inset-0 bg-background/70" />

      {/* Floating orbs */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px]"
        animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{ top: "10%", left: "20%" }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full bg-accent/10 blur-[100px]"
        animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        style={{ bottom: "10%", right: "15%" }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-lg mx-auto px-6 py-12">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <h1 className="text-5xl font-bold tracking-tight text-foreground mb-2">
            Backspin <span className="text-gradient">Games</span>
          </h1>
          <motion.p className="text-muted-foreground text-lg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.6 }}>
            Play. Compete. Get Paid.
          </motion.p>
        </motion.div>

        <div className="glass-card p-8 glow-primary overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div key={step} variants={cardVariants} initial="initial" animate="animate" exit="exit">
              {step === "state" && <StateStep onAnswer={handleStateAnswer} />}
              {step === "age" && <AgeStep onAnswer={handleAgeAnswer} />}
              {step === "eligible" && <EligibleStep onCtaClick={handleCtaClick} affiliateLink={affiliateLink} />}
              {step === "ineligible" && <IneligibleStep />}
            </motion.div>
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {step === "state" && (
            <motion.div className="mt-10 space-y-4" variants={container} initial="hidden" animate="show" exit={{ opacity: 0, transition: { duration: 0.2 } }}>
              <USP icon={<Zap className="w-5 h-5 text-accent" />} text="Instant Withdrawals via PayPal & More" />
              <USP icon={<Shield className="w-5 h-5 text-accent" />} text="100% Skill-Based. Zero Bots. Every match is fair." />
              <USP icon={<DollarSign className="w-5 h-5 text-accent" />} text="Win Real Cash — Not Just Points." />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const USP = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <motion.div variants={item} className="flex items-center gap-3 text-muted-foreground">
    {icon} <span className="text-sm">{text}</span>
  </motion.div>
);

const StateStep = ({ onAnswer }: { onAnswer: (inExcluded: boolean) => void }) => (
  <div className="space-y-6">
    <div className="text-center">
      <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Step 1 of 2</p>
      <h2 className="text-2xl font-semibold text-foreground">Are you located in any of these states?</h2>
    </div>
    <motion.div className="flex flex-wrap gap-2 justify-center" variants={container} initial="hidden" animate="show">
      {EXCLUDED_STATES.map((state) => (
        <motion.span key={state} variants={item} className="px-3 py-1.5 rounded-full text-sm bg-secondary text-secondary-foreground">{state}</motion.span>
      ))}
    </motion.div>
    <div className="flex gap-3">
      <QuizButton variant="secondary" onClick={() => onAnswer(true)}><X className="w-4 h-4" /> Yes, I am</QuizButton>
      <QuizButton variant="primary" onClick={() => onAnswer(false)}><Check className="w-4 h-4" /> No, I'm not</QuizButton>
    </div>
  </div>
);

const AgeStep = ({ onAnswer }: { onAnswer: (is18: boolean) => void }) => (
  <div className="space-y-6">
    <div className="text-center">
      <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Step 2 of 2</p>
      <h2 className="text-2xl font-semibold text-foreground">Are you 18 years or older?</h2>
    </div>
    <div className="flex gap-3">
      <QuizButton variant="secondary" onClick={() => onAnswer(false)}><X className="w-4 h-4" /> No</QuizButton>
      <QuizButton variant="primary" onClick={() => onAnswer(true)}><Check className="w-4 h-4" /> Yes, I am</QuizButton>
    </div>
  </div>
);

const EligibleStep = ({ onCtaClick, affiliateLink }: { onCtaClick: () => void, affiliateLink: string }) => (
  <div className="space-y-6 text-center">
    <motion.div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.2 }}>
      <Check className="w-8 h-8 text-green-500" />
    </motion.div>
    <div>
      <h2 className="text-2xl font-semibold text-foreground mb-2">You're Eligible! 🎉</h2>
      <p className="text-muted-foreground">You qualify to play and win real cash on Backspin Games.</p>
    </div>
    <motion.a
      href={affiliateLink}
      onClick={onCtaClick}
      className="inline-flex items-center justify-center w-full py-4 px-6 rounded-xl bg-primary text-primary-foreground font-semibold text-lg glow-primary"
      whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      Start Playing Now →
    </motion.a>
  </div>
);

const IneligibleStep = () => (
  <div className="space-y-6 text-center">
    <motion.div className="w-16 h-16 rounded-full bg-destructive/20 flex items-center justify-center mx-auto" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.2 }}>
      <X className="w-8 h-8 text-destructive" />
    </motion.div>
    <h2 className="text-2xl font-semibold text-foreground mb-2">Sorry, You're Not Eligible</h2>
    <p className="text-muted-foreground">Unfortunately, Backspin Games isn't available in your area or for your age group at this time.</p>
  </div>
);

const QuizButton = ({ variant, onClick, children }: any) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}
    className={`flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-semibold text-base transition-colors ${variant === "primary" ? "bg-primary text-primary-foreground hover:brightness-110 glow-primary" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"}`}
  >
    {children}
  </motion.button>
);

export default Index;