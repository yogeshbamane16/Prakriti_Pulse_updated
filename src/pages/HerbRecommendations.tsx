import { useState } from "react";
import turmericImage from "@/assets/turmeric-herb.jpg";
import gingerImage from "@/assets/ginger-herb.jpg";
import ashwagandhaImage from "@/assets/ashwagandha-herb.jpg";
import herbBackground from "@/assets/herb-recommendations-bg.jpg";

interface Herb {
  id: string;
  name: string;
  image: string;
  description: string;
  dosage: string;
  safetyNotes: string;
  benefits: string[];
  whyRecommended: string;
  dosha: "vata" | "pitta" | "kapha";
}

const herbs: Herb[] = [
  {
    id: "turmeric",
    name: "Turmeric (Haldi)",
    image: turmericImage,
    description: "A powerful anti-inflammatory and antioxidant herb, turmeric is considered one of the most important spices in Ayurveda. It supports digestion, joint health, and overall immunity.",
    dosage: "1/2 to 1 teaspoon of turmeric powder daily with warm milk or water. Best taken with a pinch of black pepper to enhance absorption.",
    safetyNotes: "Generally safe for most people. Avoid high doses if you have gallstones or are taking blood-thinning medications. Consult your healthcare provider if pregnant or nursing.",
    benefits: ["Reduces inflammation", "Supports joint health", "Boosts immunity", "Aids digestion", "Promotes healthy skin"],
    whyRecommended: "Turmeric is recommended for your constitution because it helps balance Pitta dosha while supporting overall inflammatory response. Its warming yet cooling properties make it suitable for most body types, especially during seasonal transitions.",
    dosha: "pitta"
  },
  {
    id: "ginger",
    name: "Ginger (Adrak)",
    image: gingerImage,
    description: "Fresh ginger is a warming digestive herb that kindles the digestive fire (Agni). It's excellent for nausea, cold symptoms, and improving circulation throughout the body.",
    dosage: "1-2 slices of fresh ginger with meals, or 1/4 teaspoon dried ginger powder. Can be made into tea by steeping in hot water for 5-10 minutes.",
    safetyNotes: "Generally safe in culinary amounts. Avoid large medicinal doses if you have gallstones, heartburn, or are taking blood-thinning medications. Reduce dose if experiencing heartburn.",
    benefits: ["Improves digestion", "Reduces nausea", "Warms the body", "Boosts circulation", "Supports respiratory health"],
    whyRecommended: "Ginger is particularly beneficial for Vata and Kapha constitutions due to its warming and stimulating properties. It helps improve sluggish digestion and enhances circulation, making it perfect for those with cold constitution or digestive weakness.",
    dosha: "vata"
  },
  {
    id: "ashwagandha",
    name: "Ashwagandha",
    image: ashwagandhaImage,
    description: "Known as 'Indian Winter Cherry,' Ashwagandha is a premier adaptogenic herb that helps the body manage stress. It's particularly valued for supporting energy, sleep, and overall vitality.",
    dosage: "300-500mg of standardized extract twice daily with meals, or 1-2 teaspoons of powder mixed with warm milk before bedtime.",
    safetyNotes: "Generally well-tolerated. Avoid if pregnant, nursing, or have autoimmune conditions. May interact with thyroid medications. Start with lower doses to assess tolerance.",
    benefits: ["Reduces stress and anxiety", "Improves sleep quality", "Boosts energy levels", "Supports immune function", "Enhances physical performance"],
    whyRecommended: "Ashwagandha is especially beneficial for Vata imbalances, helping to ground excessive mental activity and nervous system stress. Its nourishing and strengthening properties make it ideal for those experiencing fatigue, anxiety, or difficulty sleeping.",
    dosha: "kapha"
  }
];

const HerbRecommendations = () => {
  const [expandedHerb, setExpandedHerb] = useState<string | null>(null);

  const toggleExpansion = (herbId: string) => {
    setExpandedHerb(expandedHerb === herbId ? null : herbId);
  };

  const getDoshaColor = (dosha: string) => {
    switch (dosha) {
      case "vata": return "border-blue-500 bg-blue-50";
      case "pitta": return "border-red-500 bg-red-50";
      case "kapha": return "border-green-500 bg-green-50";
      default: return "border-gray-300 bg-gray-50";
    }
  };

  const getDoshaIcon = (dosha: string) => {
    switch (dosha) {
      case "vata": return "💨";
      case "pitta": return "🔥";
      case "kapha": return "🌱";
      default: return "🌿";
    }
  };

  return (
    <div 
      className="min-h-screen py-12 px-4 bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url(${herbBackground})` }}
    >
      {/* Light overlay for text readability */}
      <div className="absolute inset-0 bg-white/70"></div>
      
      {/* Floating herbal elements */}
      <div className="absolute top-20 left-12 w-4 h-4 bg-green-400/30 rounded-full float-animation"></div>
      <div className="absolute bottom-28 right-16 w-3 h-3 bg-accent/40 rounded-full bounce-gentle" style={{animationDelay: '1s'}}></div>
      <div className="absolute top-1/3 left-1/4 w-2 h-2 bg-primary/30 rounded-full pulse-glow" style={{animationDelay: '2s'}}></div>
      
      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="text-center mb-12 fade-in">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Herbal Recommendations
          </h1>
          <p className="text-xl text-muted-foreground">
            Discover the power of Ayurvedic herbs for natural wellness
          </p>
        </div>

        <div className="space-y-6">
          {herbs.map((herb, index) => (
            <div
              key={herb.id}
              className={`backdrop-blur-elegant border border-white/20 rounded-2xl p-8 shadow-2xl hover-lift slide-up border-l-4 ${getDoshaColor(herb.dosha)}`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Herb Image */}
                <div className="lg:w-1/3">
                  <img
                    src={herb.image}
                    alt={herb.name}
                    className="w-full h-64 lg:h-full object-cover rounded-lg shadow-soft"
                  />
                </div>

                {/* Herb Information */}
                <div className="lg:w-2/3 space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                      {getDoshaIcon(herb.dosha)} {herb.name}
                    </h2>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDoshaColor(herb.dosha)} capitalize`}>
                      {herb.dosha} Balancing
                    </span>
                  </div>

                  <p className="text-muted-foreground leading-relaxed">
                    {herb.description}
                  </p>

                  {/* Benefits */}
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Key Benefits:</h3>
                    <div className="flex flex-wrap gap-2">
                      {herb.benefits.map((benefit, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                        >
                          {benefit}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Dosage */}
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      💊 Recommended Dosage
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {herb.dosage}
                    </p>
                  </div>

                  {/* Safety Notes */}
                  <div className="bg-accent/10 p-4 rounded-lg border border-accent/20">
                    <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      ⚠️ Safety Notes
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {herb.safetyNotes}
                    </p>
                  </div>

                  {/* Why Recommended - Expandable */}
                  <div className="border border-muted rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleExpansion(herb.id)}
                      className="w-full p-4 text-left bg-muted/20 hover:bg-muted/30 transition-colors duration-200 flex items-center justify-between"
                    >
                      <span className="font-semibold text-foreground">
                        Why Recommended for You?
                      </span>
                      <svg
                        className={`w-5 h-5 text-foreground transition-transform duration-200 ${
                          expandedHerb === herb.id ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    <div
                      className={`transition-all duration-300 ease-in-out ${
                        expandedHerb === herb.id
                          ? "max-h-96 opacity-100"
                          : "max-h-0 opacity-0 overflow-hidden"
                      }`}
                    >
                      <div className="p-4 bg-card">
                        <p className="text-muted-foreground leading-relaxed">
                          {herb.whyRecommended}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="mt-12 backdrop-blur-elegant border border-white/20 rounded-2xl p-8 shadow-lg fade-in-delay">
          <div className="text-center">
            <h3 className="font-semibold text-foreground mb-2 flex items-center justify-center gap-2">
              🏥 Important Disclaimer
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              These recommendations are for educational purposes only and should not replace professional medical advice. 
              Always consult with a qualified healthcare provider or Ayurvedic practitioner before starting any herbal regimen, 
              especially if you have existing health conditions or are taking medications.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HerbRecommendations;