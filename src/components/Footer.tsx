import Link from "next/link";
import React from "react";
import { Github, Globe, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="grid justify-center p-4 gap-8 bg-gray-200 text-base-content border-t">
      <div className="flex items-center justify-center gap-10">
        <Link href={"#"} className="hover:underline">
          About us
        </Link>
        <Link href={"#"} className="hover:underline">
          Contact
        </Link>
        <Link href={"#"} className="hover:underline">
          Jobs
        </Link>
        <Link href={"#"} className="hover:underline">
          Press kit
        </Link>
      </div>
      <div>
        <div className="flex items-center justify-center gap-8 text-slate-600">
          <Link href={"https://github.com/simmi-verma"} target="_blank" className="hover:text-rose-600 transition-colors">
            <Github />
          </Link>
          <Link href={"https://portfolio-simmi-verma.vercel.app/"} target="_blank" className="hover:text-rose-600 transition-colors">
            <Globe />
          </Link>
          <Link
            href={"https://www.linkedin.com/in/simmi-verma/"}
            target="_blank"
            className="hover:text-rose-600 transition-colors"
          >
            <Linkedin />
          </Link>
        </div>
      </div>
      <div>
        <p className="text-sm text-slate-500 text-center">
          Copyright © 2026 - All rights reserved by{" "}
          <Link
            href={"https://portfolio-simmi-verma.vercel.app/"}
            target="_blank"
            className="hover:underline text-rose-600 font-semibold"
          >
            Simmi Verma
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
