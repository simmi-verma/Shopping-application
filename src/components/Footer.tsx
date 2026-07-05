import Link from "next/link";
import React from "react";
import { Github, Globe, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left">
        
        {/* Branding & Copyright */}
        <div>
          <h3 className="text-white font-extrabold text-lg tracking-tight mb-2">
            dev.shopp
          </h3>
          <p className="text-xs text-slate-500">
            Copyright © 2026 - All rights reserved by{" "}
            <Link
              href={"https://portfolio-simmi-verma.vercel.app/"}
              target="_blank"
              className="hover:underline text-rose-500 font-semibold"
            >
              Simmi Verma
            </Link>
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-6 text-sm font-semibold text-slate-300">
          <Link href={"#"} className="hover:text-white transition-colors">
            About us
          </Link>
          <Link href={"#"} className="hover:text-white transition-colors">
            Contact
          </Link>
          <Link href={"#"} className="hover:text-white transition-colors">
            Jobs
          </Link>
          <Link href={"#"} className="hover:text-white transition-colors">
            Press kit
          </Link>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center md:justify-end gap-6 text-slate-400">
          <Link
            href={"https://github.com/simmi-verma"}
            target="_blank"
            className="hover:text-rose-500 transition-colors"
            title="Github"
          >
            <Github size={20} />
          </Link>
          <Link
            href={"https://portfolio-simmi-verma.vercel.app/"}
            target="_blank"
            className="hover:text-rose-500 transition-colors"
            title="Globe"
          >
            <Globe size={20} />
          </Link>
          <Link
            href={"https://www.linkedin.com/in/simmi-verma/"}
            target="_blank"
            className="hover:text-rose-500 transition-colors"
            title="LinkedIn"
          >
            <Linkedin size={20} />
          </Link>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
