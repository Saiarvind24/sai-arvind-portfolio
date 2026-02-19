import React, { useState, useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import emailjs from '@emailjs/browser';
import styles from './Portfolio.module.css';

const SaiArvindPortfolio = () => {
  const [enquiryType, setEnquiryType] = useState('Request CV');
  const [status, setStatus] = useState('');
  const hireSectionRef = useRef(null);
  const formRef = useRef();

  const scrollToHire = () => hireSectionRef.current.scrollIntoView({ behavior: 'smooth' });

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus('TRANSMITTING...');

    // service_1pdhb59 is your Gmail Service ID
    emailjs.sendForm('service_1pdhb59', 'YOUR_TEMPLATE_ID', formRef.current, 'YOUR_PUBLIC_KEY')
      .then(() => {
        setStatus('SUCCESS: UPLINK ESTABLISHED');
        e.target.reset();
      }, () => {
        setStatus('ERROR: SIGNAL INTERRUPTED');
      });
  };

  const popIn = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6 } }
  };

  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <div className={styles.logo}>SAI_ARVIND_VS // MS_CS</div>
        <button onClick={scrollToHire} className={styles.hireTopBtn}>HIRE_ME</button>
      </nav>

      <div className={styles.mainLayout}>
        {/* SIDEBAR: Photo Section */}
        <aside className={styles.sidebar}>
          <div className={styles.stickyPhotoContainer}>
            <div className={styles.glassPhotoFrame}>
              <img src="/sai-arvind.jpg" alt="Sai Arvind VS" className={styles.photo} />
              <div className={styles.scanline}></div>
            </div>
            <div className={styles.statusBox}>
              <span className={styles.pulseDot}></span>
              <span>SYSTEM: ONLINE</span>
            </div>
          </div>
        </aside>

        {/* CONTENT: Sections */}
        <main className={styles.content}>
          <motion.section initial="hidden" whileInView="visible" variants={popIn} className={styles.section}>
            <h2 className={styles.cyberHeader}>01_ABOUT_SUMMARY</h2>
            <p>Ambitious Software Engineer and Digital Entrepreneur. MSc Computer Science (2:1) from University College Dublin. Specialized in delivering extensible, maintainable, and highly diagnosable systems in Java and Python.</p>
          </motion.section>

          <motion.section initial="hidden" whileInView="visible" variants={popIn} className={styles.section}>
            <h2 className={styles.cyberHeader}>02_TECHNICAL_SKILLS</h2>
            <div className={styles.skillGrid}>
              <div><strong>LANGUAGES:</strong> Java (Proficient), Python (Advanced), C/C++, SQL, JavaScript.</div>
              <div><strong>CLOUD:</strong> AWS (EC2, ELB, Auto Scaling), Azure AI, Identity Management.</div>
              <div><strong>SYSTEMS:</strong> Distributed Storage, REST API Architecture, Socket.IO.</div>
            </div>
          </motion.section>

          <motion.section initial="hidden" whileInView="visible" variants={popIn} className={styles.section}>
            <h2 className={styles.cyberHeader}>03_CORE_PROJECTS</h2>
            <div className={styles.projectCard}>
              <h3>LingoBridge</h3>
              <p>Architected a scalable cloud-based service using Java Spring Boot with Azure AI.</p>
            </div>
            <div className={styles.projectCard}>
              <h3>Visual AI Inference</h3>
              <p>Engineered a low-latency computer vision backend using C++ and CUDA to accelerate SmolVLM.</p>
            </div>
          </motion.section>

          <motion.section initial="hidden" whileInView="visible" variants={popIn} className={styles.section}>
            <h2 className={styles.cyberHeader}>04_ACHIEVEMENTS</h2>
            <ul className={styles.awardList}>
              <li>India Book of Records Holder (Technical Mastery).</li>
              <li>Scaled digital distribution to 500,000+ streams across 123 countries.</li>
              <li>Managed a global base of 36,700+ users.</li>
              <li>Trinity College London (Grade 7) - Electronic Keyboard.</li>
            </ul>
          </motion.section>

          <motion.section initial="hidden" whileInView="visible" variants={popIn} className={styles.section}>
            <h2 className={styles.cyberHeader}>05_EDUCATION</h2>
            <p><strong>MSc Computer Science (2:1)</strong> - University College Dublin (2024-2025).</p>
            <p><strong>B.E Computer Science (2:1)</strong> - KCG College of Technology (2020-2024).</p>
          </motion.section>

          {/* HIRE ME SECTION */}
          <section ref={hireSectionRef} className={styles.hireSection}>
            <div className={styles.hireGlassContainer}>
              <h2>INITIALIZE_HIRE_PROTOCOL</h2>
              <p>Ready for on-call rotations and mission-critical deployment.</p>
              
              <form ref={formRef} onSubmit={sendEmail} className={styles.cyberForm}>
                <div className={styles.formRow}>
                  <input type="text" name="first_name" placeholder="FIRST_NAME" required />
                  <input type="text" name="last_name" placeholder="LAST_NAME" required />
                </div>
                
                <select name="enquiry_type" onChange={(e) => setEnquiryType(e.target.value)}>
                  <option value="Request CV">REQUEST_CV</option>
                  <option value="HR Enquiry">HR_ENQUIRY</option>
                </select>

                {enquiryType === 'HR Enquiry' && (
                  <motion.input 
                    initial={{ opacity: 0, y: -10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    type="text" name="company" placeholder="ENTER_COMPANY" required 
                  />
                )}

                <input type="email" name="email" placeholder="CONTACT_EMAIL" required />
                <button type="submit" className={styles.submitBtn}>{status || 'EXECUTE_SEND'}</button>
              </form>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default SaiArvindPortfolio;