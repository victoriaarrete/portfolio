import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, ExternalLink, User, Briefcase, Heart, Code, Users, MessageCircle } from 'lucide-react';
import victoriaPortrait from '@assets/victoria_pic.png';
import { ParticleSystem } from '@/components/particle-system';
import { Navigation } from '@/components/navigation';
import { ScrollReveal } from '@/components/scroll-reveal';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';


export default function Home() {

  // Creative console logs for fellow developers
  useEffect(() => {
    // ASCII Art Header
    console.log(`
%c╭─────────────────────────────────────────────────────────────╮
│                                                             │
│   ██╗   ██╗██╗ ██████╗████████╗ ██████╗ ██████╗ ██╗ █████╗  │
│   ██║   ██║██║██╔════╝╚══██╔══╝██╔═══██╗██╔══██╗██║██╔══██╗ │
│   ██║   ██║██║██║        ██║   ██║   ██║██████╔╝██║███████║ │
│   ╚██╗ ██╔╝██║██║        ██║   ██║   ██║██╔══██╗██║██╔══██║ │
│    ╚████╔╝ ██║╚██████╗   ██║   ╚██████╔╝██║  ██║██║██║  ██║ │
│     ╚═══╝  ╚═╝ ╚═════╝   ╚═╝    ╚═════╝ ╚═╝  ╚═╝╚═╝╚═╝  ╚═╝ │
│                                                             │
│               R&D Team Leader | AI Innovation               │
╰─────────────────────────────────────────────────────────────╯`, 
'color: #3b82f6; font-family: monospace; font-weight: bold;');

    // Welcome message
    console.log('%c🚀 Welcome to Victoria Kirichenko\'s Portfolio!', 
      'color: #06b6d4; font-size: 18px; font-weight: bold;');
    
    console.log('%c👩‍💻 Hello fellow developer!', 
      'color: #8b5cf6; font-size: 14px; font-weight: bold;');
    
    console.log('%cLooks like you\'re curious about how this site works. I love that! 🔍', 
      'color: #10b981; font-size: 12px;');

    // Tech stack info
    console.log('\n%c🛠️ Tech Stack:', 'color: #f59e0b; font-weight: bold; font-size: 14px;');
    console.log('%c   Frontend: React 18 + TypeScript + Vite', 'color: #3b82f6;');
    console.log('%c   Styling: Tailwind CSS + Framer Motion', 'color: #3b82f6;');
    console.log('%c   UI: Radix UI + shadcn/ui components', 'color: #3b82f6;');
    console.log('%c   Deployment: Static build (no backend needed)', 'color: #3b82f6;');

    // Fun facts
    console.log('\n%c💡 Fun Development Facts:', 'color: #f59e0b; font-weight: bold; font-size: 14px;');
    console.log('%c   • This site has animated particles (check the background!)', 'color: #6366f1;');
    console.log('%c   • Glassmorphism effects everywhere', 'color: #6366f1;');
    console.log('%c   • Contact form uses mailto (perfect for static deployment)', 'color: #6366f1;');
    console.log('%c   • Intersection Observer for scroll animations', 'color: #6366f1;');
    console.log('%c   • Dark mode with custom CSS variables', 'color: #6366f1;');

    // Professional info
    console.log('\n%c🎯 About Victoria:', 'color: #f59e0b; font-weight: bold; font-size: 14px;');
    console.log('%c   • 10+ years in tech (Full Stack → Team Lead → R&D Leader)', 'color: #ec4899;');
    console.log('%c   • Passionate about AI-driven innovation', 'color: #ec4899;');
    console.log('%c   • Building high-performance teams with strong culture', 'color: #ec4899;');

    // Easter egg
    console.log('\n%c🎉 Easter Egg Unlocked!', 'color: #f59e0b; font-weight: bold; font-size: 14px;');
    console.log('%cSince you\'re here, try typing: victoria.skills() in the console!', 'color: #10b981;');

    // Add interactive function
    (window as any).victoria = {
      skills: () => {
        console.log('%c🚀 Victoria\'s Tech Arsenal:', 'color: #3b82f6; font-size: 16px; font-weight: bold;');
        console.log('%c   Languages: TypeScript, Python, JavaScript, .NET', 'color: #8b5cf6;');
        console.log('%c   Frontend: React, HTML5, CSS3', 'color: #8b5cf6;');
        console.log('%c   Backend: Node.js, Express, .NET, PHP', 'color: #8b5cf6;');
        console.log('%c   Cloud & DevOps: AWS, Azure, Docker, Kubernetes, GCP', 'color: #8b5cf6;');
        console.log('%c   Leadership: Team Building, Agile, Strategic Planning', 'color: #8b5cf6;');
        return 'Skills loaded! 💪';
      },
      contact: () => {
        console.log('%c📧 Let\'s connect!', 'color: #f59e0b; font-size: 16px; font-weight: bold;');
        console.log('%c   Email: victoria.arrete@gmail.com', 'color: #10b981;');
        console.log('%c   LinkedIn: https://www.linkedin.com/in/victoria-kirichenko/', 'color: #10b981;');
        return 'Ready to innovate together! 🤝';
      },
      theme: () => {
        console.log('%c🌙 Dark Mode Variables:', 'color: #6366f1; font-size: 16px; font-weight: bold;');
        console.log('%c   --background: 2 6% 10% (slate-950)', 'color: #8b5cf6;');
        console.log('%c   --foreground: 0 0% 98% (white)', 'color: #8b5cf6;');
        console.log('%c   --primary: 217 91% 60% (blue-500)', 'color: #8b5cf6;');
        console.log('%c   --accent: 188 86% 53% (cyan-400)', 'color: #8b5cf6;');
        return 'Theme secrets revealed! 🎨';
      }
    };

    // Performance info
    console.log('\n%c⚡ Performance Notes:', 'color: #f59e0b; font-weight: bold; font-size: 14px;');
    console.log('%c   • Optimized with Vite for fast loading', 'color: #f97316;');
    console.log('%c   • Lazy loading for better performance', 'color: #f97316;');
    console.log('%c   • Minified CSS and JS for production', 'color: #f97316;');

    console.log('\n%c💼 Interested in collaboration?', 'color: #f59e0b; font-weight: bold; font-size: 14px;');
    console.log('%cType: victoria.contact() for contact info!', 'color: #10b981;');
    
    console.log('\n%c─────────────────────────────────────────────────────────────', 'color: #374151;');
    console.log('%c Engineering clarity. Leading with precision. 🎯', 'color: #6366f1; font-style: italic;');
    console.log('%c─────────────────────────────────────────────────────────────', 'color: #374151;');
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-gray-100 overflow-x-hidden">
      <ParticleSystem />
      <Navigation />

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center relative hero-gradient">
        <div className="container mx-auto px-6 text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="mb-8 relative">
              <motion.div
                className="w-32 h-32 mx-auto mb-8 rounded-full overflow-hidden glassmorphism p-1"
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <img
                  src={victoriaPortrait}
                  alt="Victoria Kirichenko"
                  className="w-full h-full object-cover rounded-full"
                />
              </motion.div>
            </div>

            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <span className="block text-white">Victoria</span>
              <span className="block text-gradient">Kirichenko</span>
            </motion.h1>

            <motion.h2
              className="text-xl md:text-2xl text-gray-300 mb-4 font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              R&D Team Leader | Strategic Engineering Leader | AI-Driven Innovator
            </motion.h2>

            <motion.p
              className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              "Engineering clarity. Leading with precision."
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <Button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white rounded-full font-semibold shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105"
              >
                Get In Touch
              </Button>
              <Button
                variant="outline"
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 glassmorphism border-blue-400/30 text-white rounded-full font-semibold hover:bg-white/10 transition-all duration-300"
              >
                Learn More
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Animated geometric elements */}
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 border border-blue-400/30 rotate-45"
          animate={{ y: [0, -20, 0], rotate: [45, 225, 45] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-16 h-16 border border-cyan-400/30 rounded-full"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-5 w-8 h-8 bg-gradient-to-r from-blue-500/50 to-cyan-400/50 rounded-full"
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </section>

      {/* About Section */}
      <section id="about" className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
                About <span className="text-gradient">Me</span>
              </h2>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <ScrollReveal delay={0.2}>
                <div className="flex justify-center mb-8 md:mb-0">
                  <motion.div
                    className="w-80 h-80 rounded-2xl overflow-hidden glassmorphism p-2"
                    whileHover={{ scale: 1.02, rotateY: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src={victoriaPortrait}
                      alt="Victoria Kirichenko"
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </motion.div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.4}>
                <Card className="glassmorphism border-blue-400/20 card-hover">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold mb-6 text-gradient">Strong code needs strong culture. I build both.</h3>
                    <p className="text-gray-300 leading-relaxed mb-6">
                      I'm an R&D Leader, passionate about combining innovation with people-focused leadership. I believe teams thrive in a culture of trust, clarity, and support, and I work hard to balance technical results with emotional well-being.
                    </p>
                    <p className="text-gray-300 leading-relaxed mb-6">
                      Having moved to a new country alone, I built my career on resilience and bold decision-making. At Swish.AI, I lead talented teams to create smarter, more efficient IT workflows with AI, always focusing on delivering real impact.
                    </p>
                    <p className="text-gray-300 leading-relaxed mb-6">
                      Before this, I worked at Perion Network, where I led teams and developed projects for the content arbitrage market. I also hold a Master's degree in Computer Science, which has fueled my passion for solving problems and empowering teams to grow.
                    </p>
                    
                    <div className="space-y-4 mt-8">
                      <h4 className="text-xl font-bold text-blue-400">Core Strengths</h4>
                      {[
                        'Emotional Intelligence & System Thinking',
                        'Team Optimization & Scaling Products',
                        'Executive-Level Communication',
                        'AI-Driven Innovation & Automation',
                      ].map((strength, index) => (
                        <motion.div
                          key={index}
                          className="flex items-center space-x-3"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1, duration: 0.5 }}
                        >
                          <motion.div
                            className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                            animate={{ scale: [1, 1.5, 1] }}
                            transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                          />
                          <span className="text-gray-300">{strength}</span>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 relative">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
              Experience <span className="text-gradient">Timeline</span>
            </h2>
          </ScrollReveal>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-cyan-400"></div>

              {/* Current Position - Swish.ai */}
              <ScrollReveal delay={0.2}>
                <div className="relative mb-12">
                  <div className="flex items-start">
                    <motion.div
                      className="absolute left-6 w-4 h-4 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full z-10"
                      animate={{ scale: [1, 1.3, 1], boxShadow: ['0 0 0 0 rgba(59, 130, 246, 0.7)', '0 0 0 10px rgba(59, 130, 246, 0)', '0 0 0 0 rgba(59, 130, 246, 0)'] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <Card className="ml-16 glassmorphism border-blue-400/20 card-hover">
                      <CardContent className="p-8">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                          <h3 className="text-2xl font-bold text-white">R&D Team Leader</h3>
                          <span className="text-blue-400 font-semibold">April 2024 - Present</span>
                        </div>
                        <h4 className="text-xl text-cyan-400 mb-4">Swish.ai • Tel Aviv, Israel</h4>
                        <p className="text-gray-300 leading-relaxed mb-4">
                          Leading IT workflow optimization with a people-first approach. Driving innovation through AI-driven solutions while fostering collaborative, growth-focused culture using Scrum methodology.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {['AI Automation', 'Team Leadership', 'Scrum', 'Workflow Optimization'].map((skill) => (
                            <span key={skill} className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </ScrollReveal>

              {/* Perion Network - R&D Team Leader */}
              <ScrollReveal delay={0.4}>
                <div className="relative mb-12">
                  <div className="flex items-start">
                    <div className="absolute left-6 w-4 h-4 bg-gradient-to-r from-blue-500/70 to-cyan-400/70 rounded-full z-10" />
                    <Card className="ml-16 glassmorphism border-blue-400/20 card-hover">
                      <CardContent className="p-8">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                          <h3 className="text-2xl font-bold text-white">R&D Team Leader</h3>
                          <span className="text-blue-400 font-semibold">April 2021 - April 2024</span>
                        </div>
                        <h4 className="text-xl text-cyan-400 mb-4">Perion Network • Holon, Israel</h4>
                        <p className="text-gray-300 leading-relaxed mb-4">
                          Led a team of 5 developers and QA through scrum ceremonies, managing back-office projects focusing on configurations for layouts, posts, and advertising logic. Contributed to microservices architecture with MongoDB integration.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {['Team Management', 'Microservices', 'MongoDB', 'Ad Tech'].map((skill) => (
                            <span key={skill} className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </ScrollReveal>

              {/* Perion Network - Full Stack Developer */}
              <ScrollReveal delay={0.6}>
                <div className="relative mb-12">
                  <div className="flex items-start">
                    <div className="absolute left-6 w-4 h-4 bg-gradient-to-r from-blue-500/50 to-cyan-400/50 rounded-full z-10" />
                    <Card className="ml-16 glassmorphism border-blue-400/20 card-hover">
                      <CardContent className="p-8">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                          <h3 className="text-2xl font-bold text-white">Full Stack Developer</h3>
                          <span className="text-blue-400 font-semibold">June 2018 - April 2021</span>
                        </div>
                        <h4 className="text-xl text-cyan-400 mb-4">Perion Network • Holon, Israel</h4>
                        <p className="text-gray-300 leading-relaxed mb-4">
                          Specialized in developing impactful web solutions using React and Next.js. Built scalable backend solutions with Node.js and MongoDB for microservices architecture.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {['React', 'Next.js', 'Node.js', 'MongoDB'].map((skill) => (
                            <span key={skill} className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </ScrollReveal>

              {/* Mind Connect */}
              <ScrollReveal delay={0.8}>
                <div className="relative mb-12">
                  <div className="flex items-start">
                    <div className="absolute left-6 w-4 h-4 bg-gradient-to-r from-blue-500/40 to-cyan-400/40 rounded-full z-10" />
                    <Card className="ml-16 glassmorphism border-blue-400/20 card-hover">
                      <CardContent className="p-8">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                          <h3 className="text-2xl font-bold text-white">Full Stack Developer</h3>
                          <span className="text-blue-400 font-semibold">March 2016 - April 2018</span>
                        </div>
                        <h4 className="text-xl text-cyan-400 mb-4">Mind Connect • Rishon LeZion, Israel</h4>
                        <p className="text-gray-300 leading-relaxed mb-4">
                          Designed and developed a call center management platform (web application) with full-stack implementation using modern technologies and custom solutions.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {['PHP', 'MySQL', 'JavaScript', 'jQuery', 'Bootstrap', 'Google Maps API'].map((skill) => (
                            <span key={skill} className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </ScrollReveal>

              {/* PowerTech */}
              <ScrollReveal delay={1.0}>
                <div className="relative mb-12">
                  <div className="flex items-start">
                    <div className="absolute left-6 w-4 h-4 bg-gradient-to-r from-blue-500/35 to-cyan-400/35 rounded-full z-10" />
                    <Card className="ml-16 glassmorphism border-blue-400/20 card-hover">
                      <CardContent className="p-8">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                          <h3 className="text-2xl font-bold text-white">Full Stack Developer</h3>
                          <span className="text-blue-400 font-semibold">February 2015 - March 2016</span>
                        </div>
                        <h4 className="text-xl text-cyan-400 mb-4">PowerTech • Rishon LeZion, Israel</h4>
                        <p className="text-gray-300 leading-relaxed mb-4">
                          Designed and implemented a project management web application using .NET framework and Microsoft SQL Server with modern frontend technologies.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {['ASP.NET', 'Microsoft SQL Server', 'JavaScript', 'HTML', 'CSS'].map((skill) => (
                            <span key={skill} className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </ScrollReveal>

              {/* Early Career */}
              <ScrollReveal delay={1.2}>
                <div className="relative mb-12">
                  <div className="flex items-start">
                    <div className="absolute left-6 w-4 h-4 bg-gradient-to-r from-blue-500/30 to-cyan-400/30 rounded-full z-10" />
                    <Card className="ml-16 glassmorphism border-blue-400/20 card-hover">
                      <CardContent className="p-8">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                          <h3 className="text-2xl font-bold text-white">Full Stack Developer</h3>
                          <span className="text-blue-400 font-semibold">December 2012 - January 2015</span>
                        </div>
                        <h4 className="text-xl text-cyan-400 mb-4">Early Career Development • Penza, Russia</h4>
                        <p className="text-gray-300 leading-relaxed mb-4">
                          Foundation years building comprehensive full-stack development skills and gaining experience in various technologies and project management methodologies.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {['Full Stack Development', 'Project Management', 'Software Architecture'].map((skill) => (
                            <span key={skill} className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </ScrollReveal>

              {/* Education */}
              <ScrollReveal delay={1.4}>
                <div className="relative">
                  <div className="flex items-start">
                    <div className="absolute left-6 w-4 h-4 bg-gradient-to-r from-blue-500/30 to-cyan-400/30 rounded-full z-10" />
                    <Card className="ml-16 glassmorphism border-blue-400/20 card-hover">
                      <CardContent className="p-8">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                          <h3 className="text-2xl font-bold text-white">Master of Science</h3>
                          <span className="text-blue-400 font-semibold">2007 - 2012</span>
                        </div>
                        <h4 className="text-xl text-cyan-400 mb-4">Penza State University • Computer Science</h4>
                        <p className="text-gray-300 leading-relaxed">
                          Advanced studies in Computer Science, building the foundation for solving complex problems and empowering teams to grow through collaboration, accountability, and purpose.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section id="philosophy" className="py-20 relative">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
              Leadership <span className="text-gradient">Philosophy</span>
            </h2>
          </ScrollReveal>

          <div className="max-w-4xl mx-auto">
            <ScrollReveal delay={0.2}>
              <Card className="glassmorphism border-blue-400/20 p-12 rounded-3xl text-center card-hover">
                <CardContent className="p-0">
                  <div className="mb-8">
                    <motion.div
                      className="w-16 h-16 mx-auto text-blue-400"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                      <MessageCircle className="w-full h-full" />
                    </motion.div>
                  </div>

                  <blockquote className="text-2xl md:text-3xl font-light text-gray-100 leading-relaxed mb-8">
                    "I believe in clarity, feedback culture, and psychological safety with accountability. Teams thrive when they feel trusted, supported, and empowered to take bold decisions."
                  </blockquote>

                  <div className="grid md:grid-cols-3 gap-8 mt-12">
                    {[
                      {
                        icon: Heart,
                        title: 'Clarity',
                        description: 'Clear vision, transparent communication, and defined expectations',
                      },
                      {
                        icon: Users,
                        title: 'Psychological Safety',
                        description: 'Creating environments where teams feel safe to innovate and fail',
                      },
                      {
                        icon: Briefcase,
                        title: 'Accountability',
                        description: 'Empowering teams with ownership while maintaining high standards',
                      },
                    ].map((item, index) => (
                      <ScrollReveal key={index} delay={0.4 + index * 0.2}>
                        <div className="text-center">
                          <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full flex items-center justify-center">
                            <item.icon className="w-6 h-6 text-white" />
                          </div>
                          <h4 className="text-lg font-semibold text-white mb-2">{item.title}</h4>
                          <p className="text-gray-400 text-sm">{item.description}</p>
                        </div>
                      </ScrollReveal>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 relative">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
              Key <span className="text-gradient">Projects</span>
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: Code,
                title: 'AI Workflow Optimizer',
                company: 'Swish.ai',
                description: 'Led development of AI-driven automation platform that optimizes IT workflows, reducing manual tasks by 60% and improving team efficiency across multiple departments.',
                tags: ['AI/ML', 'Automation', 'Workflow'],
              },
              {
                icon: Briefcase,
                title: 'Content Arbitrage Platform',
                company: 'Perion Network',
                description: 'Built scalable microservices architecture for content arbitrage market, handling millions of requests daily with optimized ad delivery and configuration management systems.',
                tags: ['Microservices', 'AdTech', 'Scale'],
              },
              {
                icon: Users,
                title: 'Internal Productivity Tools',
                company: 'Multiple Organizations',
                description: 'Designed and implemented custom productivity tools that streamlined development workflows, improved team collaboration, and enhanced project management across R&D teams.',
                tags: ['Tools', 'Productivity', 'Collaboration'],
              },
            ].map((project, index) => (
              <ScrollReveal key={index} delay={index * 0.2}>
                <Card className="glassmorphism border-blue-400/20 card-hover group">
                  <CardContent className="p-8">
                    <div className="mb-6">
                      <motion.div
                        className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <project.icon className="w-8 h-8 text-white" />
                      </motion.div>
                      <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                      <p className="text-gray-400 text-sm mb-4">{project.company}</p>
                    </div>
                    <p className="text-gray-300 leading-relaxed mb-6">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 relative">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
              What Colleagues <span className="text-gradient">Say</span>
            </h2>
          </ScrollReveal>

          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  quote: "Victoria has a unique ability to challenge conventional thinking and drive meaningful improvements. Her insights and creative approach led to more efficient processes and higher-quality outcomes. Working with her was both inspiring and rewarding.",
                  name: "Ofek",
                  title: "Full-Stack Engineer at Swish.AI",
                  initials: "OF",
                },
                {
                  quote: "Victoria's leadership has been instrumental in optimizing project management and team collaboration. Her adaptability and strategic mindset, combined with technical expertise and leadership acumen, drive innovation and achieve results.",
                  name: "Barak Maoz",
                  title: "Senior Data/Back-End Engineer at Swish.ai",
                  initials: "BM",
                },
                {
                  quote: "Victoria consistently demonstrated a willingness to provide help and support. Her communication skills were always effective and clear. As a true leader, she never failed to bring value to our collaborative efforts. Working with Victoria was an enriching experience!",
                  name: "Palie Răzvan-Mircea",
                  title: "Frontend Developer",
                  initials: "PR",
                },
                {
                  quote: "I've worked with Victoria almost a full year. She's always willing to lend a hand to anyone who needs it. Her ability to overcome challenges with a smile made her stand out as a cut above the rest. Her constant communication helped lift our spirits in challenging situations.",
                  name: "Chirieac Lăcrămioara",
                  title: "QA Engineer at ASSIST Software",
                  initials: "CL",
                },
              ].map((testimonial, index) => (
                <ScrollReveal key={index} delay={index * 0.2}>
                  <Card className="glassmorphism border-blue-400/20 card-hover">
                    <CardContent className="p-8">
                      <div className="mb-6">
                        <motion.div
                          className="w-8 h-8 text-blue-400 mb-4"
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        >
                          <MessageCircle className="w-full h-full" />
                        </motion.div>
                        <p className="text-gray-300 leading-relaxed mb-6">"{testimonial.quote}"</p>
                      </div>
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full flex items-center justify-center mr-4">
                          <span className="text-white font-semibold text-sm">{testimonial.initials}</span>
                        </div>
                        <div>
                          <h4 className="text-white font-semibold">{testimonial.name}</h4>
                          <p className="text-gray-400 text-sm">{testimonial.title}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 relative">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
              Let's <span className="text-gradient">Connect</span>
            </h2>
          </ScrollReveal>

          <div className="max-w-2xl mx-auto">
            <ScrollReveal delay={0.2}>
              <Card className="glassmorphism border-blue-400/20 card-hover">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6 text-white">Get In Touch</h3>
                  <p className="text-gray-300 leading-relaxed mb-8">
                    Ready to discuss AI-driven innovation, team leadership, or potential collaboration opportunities? I'd love to connect and explore how we can work together.
                  </p>

                  <div className="space-y-6">
                    <motion.div
                      className="flex items-center space-x-4"
                      whileHover={{ x: 10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full flex items-center justify-center">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold">Email</h4>
                        <a
                          href="mailto:victoria.arrete@gmail.com"
                          className="text-blue-400 hover:text-cyan-400 transition-colors duration-300"
                        >
                          victoria.arrete@gmail.com
                        </a>
                      </div>
                    </motion.div>

                    <motion.div
                      className="flex items-center space-x-4"
                      whileHover={{ x: 10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full flex items-center justify-center">
                        <ExternalLink className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold">LinkedIn</h4>
                        <a
                          href="https://www.linkedin.com/in/victoria-kirichenko/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-cyan-400 transition-colors duration-300"
                        >
                          linkedin.com/in/victoria-kirichenko
                        </a>
                      </div>
                    </motion.div>

                    <motion.div
                      className="flex items-center space-x-4"
                      whileHover={{ x: 10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold">Location</h4>
                        <p className="text-gray-300">Tel Aviv District, Israel</p>
                      </div>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-800">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-gradient mb-4">Victoria Kirichenko</div>
            <p className="text-gray-400 mb-6">Engineering clarity. Leading with precision.</p>
            <div className="flex justify-center space-x-6">
              <motion.a
                href="mailto:victoria.arrete@gmail.com"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
                whileHover={{ scale: 1.2 }}
              >
                <Mail className="w-6 h-6" />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/victoria-kirichenko/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
                whileHover={{ scale: 1.2 }}
              >
                <ExternalLink className="w-6 h-6" />
              </motion.a>
            </div>
            <p className="text-gray-600 text-sm mt-8">© 2025 Victoria Kirichenko. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
