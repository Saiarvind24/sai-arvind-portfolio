import React from "react";
import { motion } from "framer-motion";

const EASE_OUT_EXPO = [0.22, 1, 0.36, 1];

const itemVariants = {
  hidden: { opacity: 0, y: 22, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE_OUT_EXPO }
  }
};

export const Reveal = ({ children, delay = 0, y = 24, className, as = "div" }) => {
  const MotionTag = motion[as] || motion.div;
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px 0px -60px 0px" }}
      transition={{ duration: 0.7, delay, ease: EASE_OUT_EXPO }}
    >
      {children}
    </MotionTag>
  );
};

export const RevealGroup = ({ children, className, stagger = 0.07, delay = 0.05 }) => (
  <motion.div
    className={className}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-60px 0px -40px 0px" }}
    variants={{
      hidden: {},
      visible: { transition: { staggerChildren: stagger, delayChildren: delay } }
    }}
  >
    {children}
  </motion.div>
);

export const RevealItem = ({ children, className }) => (
  <motion.div className={className} variants={itemVariants}>
    {children}
  </motion.div>
);

export const ScaleIn = ({ children, className, delay = 0 }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, scale: 0.96 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.7, delay, ease: EASE_OUT_EXPO }}
  >
    {children}
  </motion.div>
);
