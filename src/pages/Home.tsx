import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import heroBackground from "@/assets/ayurvedic-hero-bg.jpg";

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section
        className="relative h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBackground})` }}
      >
        {/* Enhanced overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/30 to-green-900/20"></div>
        
        {/* Floating elements for ambiance */}
        <div className="absolute top-20 left-10 w-3 h-3 bg-white/20 rounded-full animate-ping"></div>
        <div className="absolute bottom-32 right-16 w-2 h-2 bg-accent/40 rounded-full animate-bounce delay-700"></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-white/30 rounded-full animate-pulse delay-1000"></div>

        <div className={`relative z-10 text-center text-white max-w-5xl mx-auto px-4 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="mb-8">
            <div className="text-accent/80 text-lg font-medium mb-4 tracking-wider">
              🌿 ANCIENT WISDOM • MODERN WELLNESS
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Discover Your
              <span className="block bg-gradient-to-r from-accent via-yellow-300 to-accent bg-clip-text text-transparent mt-2">
                Ayurvedic Balance
              </span>
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl mb-8 opacity-90 max-w-3xl mx-auto leading-relaxed">
              Experience personalized wellness recommendations based on 5,000 years of 
              <span className="text-accent font-semibold"> ancient Ayurvedic wisdom</span>
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              to="/register"
              className="group relative btn-primary text-lg px-10 py-4 min-w-[200px] overflow-hidden transform hover:scale-105 transition-all duration-300"
            >
              <span className="relative z-10">Start Your Journey</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            <Link
              to="/quiz"
              className="group btn-secondary text-lg px-10 py-4 min-w-[200px] bg-white/10 hover:bg-white/20 text-white border-2 border-white/30 hover:border-white/50 backdrop-blur-sm"
            >
              <span className="flex items-center gap-2">
                <span>Take Prakriti Quiz</span>
                <span className="group-hover:translate-x-1 transition-transform">🧘</span>
              </span>
            </Link>
          </div>
          
          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-white/70 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              <span>5000+ Years of Wisdom</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-accent rounded-full"></span>
              <span>Personalized Assessment</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
              <span>Natural Recommendations</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-background to-secondary/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary font-medium mb-4">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              COMPREHENSIVE WELLNESS SYSTEM
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-foreground">
              Your Path to <span className="text-primary">Natural Balance</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience the power of ancient Ayurvedic wisdom through our modern, interactive platform
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: "🧘",
                title: "Prakriti Assessment",
                description: "Discover your unique constitution through our comprehensive Dosha analysis with detailed explanations",
                features: ["5 Interactive Questions", "Real-time Scoring", "Detailed Results"],
                link: "/quiz"
              },
              {
                icon: "🌿",
                title: "Herbal Recommendations",
                description: "Get personalized herb suggestions based on your symptoms and constitution with safety guidelines",
                features: ["3 Premium Herbs", "Dosage Guidelines", "Safety Information"],
                link: "/herbs"
              },
              {
                icon: "💚",
                title: "Symptom Analysis",
                description: "Analyze your symptoms with our intelligent assessment system covering multiple body systems",
                features: ["Multiple Categories", "Severity Tracking", "Duration Analysis"],
                link: "/symptoms"
              }
            ].map((feature, index) => (
              <div key={index} className={`group card-ayurvedic text-center hover:scale-105 hover:shadow-xl transition-all duration-500 ${
                index === 1 ? 'lg:scale-105 lg:shadow-lg border-primary/20' : ''
              }`}>
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-primary group-hover:text-accent transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {feature.description}
                </p>
                <ul className="space-y-2 mb-6">
                  {feature.features.map((item, i) => (
                    <li key={i} className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  to={feature.link}
                  className="inline-flex items-center gap-2 text-primary font-medium hover:text-accent transition-colors group-hover:translate-y-[-2px] transform duration-300"
                >
                  Explore Now
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <div className="bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 rounded-2xl p-8 border border-primary/10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: "5000+", label: "Years of Wisdom" },
                { number: "3", label: "Dosha Types" },
                { number: "100%", label: "Natural Approach" },
                { number: "∞", label: "Wellness Potential" }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl lg:text-3xl font-bold text-primary mb-2">{stat.number}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-muted/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-foreground">
              How It <span className="text-primary">Works</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience wellness through our simple 4-step process
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Register", desc: "Create your wellness profile", icon: "👤" },
              { step: "2", title: "Assess", desc: "Take the Prakriti quiz", icon: "🧘" },
              { step: "3", title: "Analyze", desc: "Input your symptoms", icon: "🔍" },
              { step: "4", title: "Discover", desc: "Get herb recommendations", icon: "🌿" }
            ].map((item, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <span className="text-2xl">{item.icon}</span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    {item.step}
                  </div>
                  {index < 3 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-primary/20 -translate-x-8"></div>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent"></div>
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/50 backdrop-blur-sm rounded-full text-primary font-medium mb-6">
              <span className="animate-pulse">✨</span>
              START YOUR WELLNESS JOURNEY TODAY
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-foreground leading-tight">
              Ready to Transform Your
              <span className="block text-primary">Health Naturally?</span>
            </h2>
            <p className="text-lg lg:text-xl mb-8 text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Join thousands who have discovered their path to natural wellness through 
              personalized Ayurvedic recommendations
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Link
              to="/register"
              className="group btn-primary text-lg px-10 py-4 min-w-[220px] pulse-glow relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Begin Your Assessment
                <span className="group-hover:translate-x-1 transition-transform">🚀</span>
              </span>
            </Link>
            <Link
              to="/quiz"
              className="btn-secondary text-lg px-10 py-4 min-w-[220px] hover:scale-105 transition-transform"
            >
              Quick Dosha Quiz
            </Link>
          </div>

          {/* Social proof */}
          <div className="flex flex-wrap justify-center items-center gap-6 text-muted-foreground text-sm">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                <div className="w-6 h-6 bg-primary/20 rounded-full border-2 border-white"></div>
                <div className="w-6 h-6 bg-accent/20 rounded-full border-2 border-white"></div>
                <div className="w-6 h-6 bg-secondary/20 rounded-full border-2 border-white"></div>
              </div>
              <span>1000+ users started their journey</span>
            </div>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-accent">⭐</span>
              ))}
              <span className="ml-1">5.0 wellness rating</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;