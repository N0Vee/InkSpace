"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="hero is-medium is-link">
      <div className="hero-body">
        <div className="container">
          <motion.h1
            className="title is-1"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="gradient-text">Inkspace</span>
          </motion.h1>
          <motion.h2
            className="subtitle is-3 mt-3"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            A platform for reading about Web Technology
          </motion.h2>
          <motion.div
            className="buttons"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Link legacyBehavior href="/blogs">
              <a className="button is-light is-medium">Explore Blogs</a>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
