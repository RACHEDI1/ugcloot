import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, UserCheck } from "lucide-react";

interface UsernameModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedItem: any;
}

export default function UsernameModal({ isOpen, onClose, selectedItem }: UsernameModalProps) {
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<"input" | "verifying" | "success">("input");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username) return;

    setIsLoading(true);
    setStep("verifying");

    // Simulate API call / Verification
    setTimeout(() => {
      setIsLoading(false);
      setStep("success");
      sessionStorage.setItem("ugc_username", username);
      if (selectedItem) {
        sessionStorage.setItem("ugc_item", JSON.stringify(selectedItem));
      }
    }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white p-0 overflow-hidden gap-0">
        <div className="bg-primary p-6 border-b-4 border-black">
          <DialogHeader>
            <DialogTitle className="text-2xl font-display text-center">
              {step === "input" && "Enter Roblox Username"}
              {step === "verifying" && "Searching Database..."}
              {step === "success" && "User Found!"}
            </DialogTitle>
            <DialogDescription className="text-center text-black/80 font-bold">
              {selectedItem && `To claim: ${selectedItem.name}`}
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="p-6 bg-white">
          <AnimatePresence mode="wait">
            {step === "input" && (
              <motion.form
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Input
                    placeholder="Username (e.g. RobloxPlayer123)"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="h-14 text-lg border-2 border-black focus-visible:ring-0 focus-visible:border-primary rounded-xl bg-gray-50"
                    pattern="[a-zA-Z0-9_]+"
                    required
                  />
                  <p className="text-xs text-gray-500 text-center">
                    We never ask for your password.
                  </p>
                </div>
                <Button 
                  type="submit" 
                  className="w-full h-14 text-xl font-display bg-green-500 hover:bg-green-600 text-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all"
                >
                  Continue
                </Button>
              </motion.form>
            )}

            {step === "verifying" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex flex-col items-center py-8 space-y-4"
              >
                <Loader2 className="w-16 h-16 text-primary animate-spin" />
                <p className="text-lg font-display text-gray-600">Connecting to Roblox servers...</p>
              </motion.div>
            )}

            {step === "success" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center py-4 space-y-6"
              >
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center border-4 border-green-500">
                  <UserCheck className="w-12 h-12 text-green-600" />
                </div>
                <div className="text-center space-y-2">
                  <h3 className="text-xl font-bold">Hello, @{username}!</h3>
                  <p className="text-gray-600">You are eligible for this item.</p>
                </div>
                <Button 
                  onClick={() => {
                    // In a real scenario, this would trigger the CPA locker
                    // For this demo, we'll simulate completion and redirect
                    window.location.href = "/thank-you";
                  }}
                  className="w-full h-14 text-xl font-display bg-primary hover:bg-primary/90 text-black border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all"
                >
                  Final Step: Verify & Claim
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}
