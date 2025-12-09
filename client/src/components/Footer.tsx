export default function Footer() {
  return (
    <footer className="bg-black text-white py-12 border-t-4 border-primary">
      <div className="container px-4 text-center space-y-6">
        <h3 className="text-2xl font-display text-primary">Roblox UGC Free Limiteds</h3>
        
        <div className="flex justify-center gap-6 text-sm font-bold text-gray-400">
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Contact Us</a>
        </div>

        <div className="max-w-2xl mx-auto text-xs text-gray-500 space-y-2">
          <p>
            This experience is not affiliated with, endorsed by, or sponsored by Roblox Corporation.
          </p>
          <p>
            ROBLOX is a trademark of Roblox Corporation. All other trademarks are the property of their respective owners.
          </p>
          <p>
            &copy; {new Date().getFullYear()} Roblox UGC Limiteds Event. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
