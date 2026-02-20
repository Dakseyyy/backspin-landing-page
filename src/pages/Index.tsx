import { useState } from "react";
import heroBg from "@/assets/hero-bg.jpg";
import { Check, X, DollarSign, Shield, Zap } from "lucide-react";

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

const Index = () => {
  const [step, setStep] = useState<Step>("state");
  const [selectedState, setSelectedState] = useState<string | null>(null);

  const handleStateAnswer = (inExcluded: boolean) => {
    if (inExcluded) {
      setStep("ineligible");
    } else {
      setStep("age");
    }
  };

  const handleAgeAnswer = (is18: boolean) => {
    if (is18) {
      setStep("eligible");
    } else {
      setStep("ineligible");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <img
        src={heroBg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-background/70" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-lg mx-auto px-6 py-12">
        {/* Logo */}
        <div className="text-center mb-10 animate-fade-up">
          <h1 className="text-5xl font-bold tracking-tight text-foreground mb-2">
            Backspin <span className="text-gradient">Games</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Play. Compete. Get Paid.
          </p>
        </div>

        {/* Quiz Card */}
        <div className="glass-card p-8 glow-primary animate-scale-in">
          {step === "state" && <StateStep onAnswer={handleStateAnswer} />}
          {step === "age" && <AgeStep onAnswer={handleAgeAnswer} />}
          {step === "eligible" && <EligibleStep />}
          {step === "ineligible" && <IneligibleStep />}
        </div>

        {/* USPs */}
        {step === "state" && (
          <div className="mt-10 space-y-4 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <USP icon={<Zap className="w-5 h-5 text-accent" />} text="Instant Withdrawals via PayPal & More" />
            <USP icon={<Shield className="w-5 h-5 text-accent" />} text="100% Skill-Based. Zero Bots. Every match is fair." />
            <USP icon={<DollarSign className="w-5 h-5 text-accent" />} text="Win Real Cash — Not Just Points." />
          </div>
        )}
      </div>
    </div>
  );
};

const USP = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <div className="flex items-center gap-3 text-muted-foreground">
    {icon}
    <span className="text-sm">{text}</span>
  </div>
);

const StateStep = ({ onAnswer }: { onAnswer: (inExcluded: boolean) => void }) => (
  <div className="space-y-6">
    <div className="text-center">
      <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Step 1 of 2</p>
      <h2 className="text-2xl font-semibold text-foreground">
        Are you located in any of these states?
      </h2>
    </div>
    <div className="flex flex-wrap gap-2 justify-center">
      {EXCLUDED_STATES.map((state) => (
        <span
          key={state}
          className="px-3 py-1.5 rounded-full text-sm bg-secondary text-secondary-foreground"
        >
          {state}
        </span>
      ))}
    </div>
    <div className="flex gap-3">
      <QuizButton variant="secondary" onClick={() => onAnswer(true)}>
        <X className="w-4 h-4" /> Yes, I am
      </QuizButton>
      <QuizButton variant="primary" onClick={() => onAnswer(false)}>
        <Check className="w-4 h-4" /> No, I'm not
      </QuizButton>
    </div>
  </div>
);

const AgeStep = ({ onAnswer }: { onAnswer: (is18: boolean) => void }) => (
  <div className="space-y-6">
    <div className="text-center">
      <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Step 2 of 2</p>
      <h2 className="text-2xl font-semibold text-foreground">
        Are you 18 years or older?
      </h2>
    </div>
    <div className="flex gap-3">
      <QuizButton variant="secondary" onClick={() => onAnswer(false)}>
        <X className="w-4 h-4" /> No
      </QuizButton>
      <QuizButton variant="primary" onClick={() => onAnswer(true)}>
        <Check className="w-4 h-4" /> Yes, I am
      </QuizButton>
    </div>
  </div>
);

const EligibleStep = () => (
  <div className="space-y-6 text-center">
    <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center mx-auto">
      <Check className="w-8 h-8 text-success" />
    </div>
    <div>
      <h2 className="text-2xl font-semibold text-foreground mb-2">
        You're Eligible! 🎉
      </h2>
      <p className="text-muted-foreground">
        You qualify to play and win real cash on Backspin Games.
      </p>
    </div>
    <a
      href="#"
      className="inline-flex items-center justify-center w-full py-4 px-6 rounded-xl bg-primary text-primary-foreground font-semibold text-lg transition-all hover:brightness-110 glow-primary"
    >
      Start Playing Now →
    </a>
  </div>
);

const IneligibleStep = () => (
  <div className="space-y-6 text-center">
    <div className="w-16 h-16 rounded-full bg-destructive/20 flex items-center justify-center mx-auto">
      <X className="w-8 h-8 text-destructive" />
    </div>
    <div>
      <h2 className="text-2xl font-semibold text-foreground mb-2">
        Sorry, You're Not Eligible
      </h2>
      <p className="text-muted-foreground">
        Unfortunately, Backspin Games isn't available in your area or for your age group at this time.
      </p>
    </div>
  </div>
);

const QuizButton = ({
  variant,
  onClick,
  children,
}: {
  variant: "primary" | "secondary";
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <button
    onClick={onClick}
    className={`flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-semibold text-base transition-all ${
      variant === "primary"
        ? "bg-primary text-primary-foreground hover:brightness-110 glow-primary"
        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
    }`}
  >
    {children}
  </button>
);

export default Index;
