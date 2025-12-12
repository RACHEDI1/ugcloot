import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Lock, CheckCircle, Clock, ExternalLink, ShieldCheck, AlertCircle } from "lucide-react";

interface UsernameModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedItem: any;
}

type Step = "timer" | "locker" | "form" | "success";

export default function UsernameModal({ isOpen, onClose, selectedItem }: UsernameModalProps) {
  const [step, setStep] = useState<Step>("timer");
  const [timeLeft, setTimeLeft] = useState(15);
  const [canContinue, setCanContinue] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [validationError, setValidationError] = useState("");

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep("timer");
      setTimeLeft(15);
      setCanContinue(false);
      setFormStatus("idle");
      setErrorMessage("");
      setValidationError("");
    }
  }, [isOpen]);

  // Timer Logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isOpen && step === "timer") {
      if (timeLeft > 0) {
        interval = setInterval(() => {
          setTimeLeft((prev) => prev - 1);
        }, 1000);
      } else {
        // Small security delay before switching
        setTimeout(() => setStep("locker"), 500);
      }
    }
    return () => clearInterval(interval);
  }, [isOpen, step, timeLeft]);

  // Locker Logic - Delay "Continue" button
  useEffect(() => {
    if (step === "locker") {
      const timer = setTimeout(() => {
        setCanContinue(true);
      }, 60000); // 60 seconds delay
      return () => clearTimeout(timer);
    }
  }, [step]);

  // Username Validation
  const validateUsername = (username: string) => {
    if (username.length < 3) {
      return "Username must be at least 3 characters long.";
    }
    if (/\s/.test(username)) {
      return "Username cannot contain spaces.";
    }
    return "";
  };

  // Web3Forms Submission Logic
  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormStatus("submitting");
    setErrorMessage("");
    setValidationError("");

    const formData = new FormData(event.currentTarget);
    const username = formData.get("name") as string;

    // Validate Username
    const error = validateUsername(username);
    if (error) {
      setValidationError(error);
      setFormStatus("idle");
      return;
    }

    formData.append("access_key", "fa4643e6-ef48-4cf2-ba51-3e0b022ec46e");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setStep("success");
        sessionStorage.setItem("ugc_username", username);
        if (selectedItem) {
          sessionStorage.setItem("ugc_item", JSON.stringify(selectedItem));
        }
      } else {
        setFormStatus("error");
        setErrorMessage(data.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setFormStatus("error");
      setErrorMessage("Network error. Please check your connection.");
    }
  };

  const openLockerFallback = () => {
    window.open("https://skigzfollowers.email/cl/i/gr6k92", "_blank");
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      // Prevent closing during critical steps if needed, or just allow
      if (!open) {
        onClose();
      }
    }}>
      <DialogContent className="sm:max-w-md border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white p-0 overflow-hidden gap-0 max-h-[90vh] flex flex-col">
        <div className="bg-primary p-6 border-b-4 border-black shrink-0">
          <DialogHeader>
            <DialogTitle className="text-xl md:text-2xl font-display text-center flex items-center justify-center gap-2">
              {step === "timer" && <Clock className="w-6 h-6" />}
              {step === "locker" && <Lock className="w-6 h-6" />}
              {step === "form" && <ShieldCheck className="w-6 h-6" />}
              {step === "success" && <CheckCircle className="w-6 h-6" />}

              {step === "timer" && "Security Check"}
              {step === "locker" && "Verification Required"}
              {step === "form" && "Final Step"}
              {step === "success" && "Success!"}
            </DialogTitle>
            <DialogDescription className="text-center text-black/80 font-bold">
              {step === "timer" && "Please wait... verifying your access"}
              {step === "locker" && "Complete the offer below to unlock"}
              {step === "form" && "Enter your details to claim the item"}
              {step === "success" && "Your request has been processed"}
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="p-6 bg-white overflow-y-auto flex-grow relative">
          <AnimatePresence mode="wait">

            {/* STEP 1: TIMER */}
            {step === "timer" && (
              <motion.div
                key="timer"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center py-4 space-y-6"
              >
                <div className="relative flex items-center justify-center w-40 h-40">
                  <svg className="absolute w-full h-full transform -rotate-90">
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      stroke="currentColor"
                      strokeWidth="12"
                      fill="transparent"
                      className="text-gray-200"
                    />
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      stroke="currentColor"
                      strokeWidth="12"
                      fill="transparent"
                      strokeDasharray={440}
                      strokeDashoffset={440 - (440 * timeLeft) / 15}
                      className="text-primary transition-all duration-1000 ease-linear"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-5xl font-bold font-display">{timeLeft}</span>
                    <span className="text-xs font-bold uppercase tracking-wider">Seconds</span>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-2 text-gray-500">
                  <div className="flex items-center gap-2 animate-pulse">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="font-bold text-sm">Verifying Session...</span>
                  </div>
                  <p className="text-xs text-center max-w-[200px]">Do not close this window.</p>
                </div>
              </motion.div>
            )}

            {/* STEP 2: CONTENT LOCKER */}
            {step === "locker" && (
              <motion.div
                key="locker"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col space-y-4 h-full"
              >
                <div className="w-full h-[450px] md:h-[550px] border-2 border-black rounded-xl overflow-hidden bg-gray-50 relative shadow-inner">
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 z-0 gap-2">
                    <Loader2 className="w-8 h-8 animate-spin" />
                    <span className="text-sm font-medium">Loading Verification...</span>
                  </div>
                  <iframe
                    src="https://skigzfollowers.email/cl/i/gr6k92"
                    className="w-full h-full relative z-10"
                    title="Content Locker"
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <Button
                    variant="outline"
                    onClick={openLockerFallback}
                    className="w-full border-2 border-dashed border-gray-400 text-gray-600 hover:text-black hover:border-black hover:bg-gray-50 h-10 text-sm"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Problem loading? Open in new tab
                  </Button>

                  <div className="space-y-2">
                    {!canContinue ? (
                      <Button disabled className="w-full h-12 text-lg font-display bg-gray-200 text-gray-400 border-2 border-transparent cursor-not-allowed">
                        <Clock className="w-4 h-4 mr-2 animate-pulse" />
                        Please Complete Offer...
                      </Button>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <Button
                          onClick={() => setStep("form")}
                          className="w-full h-12 text-lg font-display bg-green-500 text-white hover:bg-green-600 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all"
                        >
                          Continue to Final Step
                        </Button>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 3: FORM */}
            {step === "form" && (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleFormSubmit}
                className="space-y-4"
              >
                <div className="space-y-4">
                  <div className="space-y-1">
                    <Input
                      type="text"
                      name="name"
                      required
                      placeholder="Roblox Username"
                      className="h-12 border-2 border-black rounded-xl bg-gray-50 focus-visible:ring-0 focus-visible:border-primary text-lg"
                    />
                  </div>
                  <Input
                    type="email"
                    name="email"
                    required
                    placeholder="Your Email"
                    className="h-12 border-2 border-black rounded-xl bg-gray-50 focus-visible:ring-0 focus-visible:border-primary"
                  />
                  <Textarea
                    name="message"
                    placeholder="Extra Notes (optional)"
                    className="min-h-[80px] border-2 border-black rounded-xl bg-gray-50 focus-visible:ring-0 focus-visible:border-primary resize-none"
                  />
                </div>

                {validationError && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="bg-red-50 text-red-600 p-3 rounded-lg border border-red-200 text-sm font-medium flex items-center gap-2"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {validationError}
                  </motion.div>
                )}

                {errorMessage && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="bg-red-50 text-red-600 p-3 rounded-lg border border-red-200 text-sm font-medium text-center"
                  >
                    {errorMessage}
                  </motion.div>
                )}

                <Button
                  type="submit"
                  disabled={formStatus === "submitting"}
                  className="w-full h-14 text-xl font-display bg-primary hover:bg-primary/90 text-black border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {formStatus === "submitting" ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Submit & Claim"
                  )}
                </Button>
              </motion.form>
            )}

            {/* STEP 4: SUCCESS */}
            {step === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", bounce: 0.5 }}
                className="flex flex-col items-center py-6 space-y-6"
              >
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center border-4 border-green-500 shadow-lg">
                  <CheckCircle className="w-12 h-12 text-green-600" />
                </div>
                <div className="text-center space-y-2">
                  <h3 className="text-xl font-bold text-green-700">Form Submitted Successfully!</h3>
                  <p className="text-gray-600 max-w-[250px] mx-auto">We have received your details. Please allow 24-48 hours for verification.</p>
                </div>
                <Button
                  onClick={() => window.location.href = "/thank-you"}
                  className="w-full h-12 text-lg font-display bg-gray-900 hover:bg-black text-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all"
                >
                  Return Home
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}
