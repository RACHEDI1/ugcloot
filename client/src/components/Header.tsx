import { Link } from "wouter";

export default function Header() {
  return (
    <header className="w-full pt-4 pb-0 flex justify-center relative z-50 bg-transparent">
      <Link href="/">
        <img 
          src="/images/ugcloot-logo-transparent.png" 
          alt="UGCLoot Logo" 
          className="mx-auto w-auto max-w-[160px] md:max-w-[220px] hover:scale-105 transition-transform cursor-pointer drop-shadow-lg" 
        />
      </Link>
    </header>
  );
}
