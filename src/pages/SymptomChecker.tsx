import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import symptomBackground from "@/assets/symptom-checker-bg.jpg";

interface Symptom {
  id: string;
  name: string;
  category: string;
}

interface SymptomSelection {
  symptom: Symptom;
  severity: number;
  duration: string;
}

const symptoms: Symptom[] = [
  // Digestive symptoms
  { id: "indigestion", name: "Indigestion", category: "digestive" },
  { id: "bloating", name: "Bloating", category: "digestive" },
  { id: "constipation", name: "Constipation", category: "digestive" },
  { id: "acid-reflux", name: "Acid Reflux", category: "digestive" },
  { id: "nausea", name: "Nausea", category: "digestive" },
  
  // Respiratory symptoms
  { id: "cough", name: "Cough", category: "respiratory" },
  { id: "congestion", name: "Nasal Congestion", category: "respiratory" },
  { id: "sore-throat", name: "Sore Throat", category: "respiratory" },
  { id: "breathing-difficulty", name: "Difficulty Breathing", category: "respiratory" },
  { id: "sinus-pressure", name: "Sinus Pressure", category: "respiratory" },
];

const SymptomChecker = () => {
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<string>("digestive");
  const [selectedSymptoms, setSelectedSymptoms] = useState<SymptomSelection[]>([]);
  const [globalSeverity, setGlobalSeverity] = useState<number>(5);
  const [globalDuration, setGlobalDuration] = useState<string>("1-3 days");

  const categories = [
    { id: "digestive", name: "Digestive System", icon: "🍃", description: "Stomach, intestinal, and digestive issues" },
    { id: "respiratory", name: "Respiratory System", icon: "🫁", description: "Breathing, throat, and lung related symptoms" },
  ];

  const durationOptions = [
    "Less than 1 day",
    "1-3 days",
    "4-7 days",
    "1-2 weeks",
    "More than 2 weeks",
  ];

  const handleSymptomToggle = (symptom: Symptom) => {
    const existingIndex = selectedSymptoms.findIndex(s => s.symptom.id === symptom.id);
    
    if (existingIndex > -1) {
      // Remove symptom
      setSelectedSymptoms(selectedSymptoms.filter((_, index) => index !== existingIndex));
    } else {
      // Add symptom with default values
      setSelectedSymptoms([
        ...selectedSymptoms,
        {
          symptom,
          severity: globalSeverity,
          duration: globalDuration,
        },
      ]);
    }
  };

  const updateSymptomSeverity = (symptomId: string, severity: number) => {
    setSelectedSymptoms(selectedSymptoms.map(s => 
      s.symptom.id === symptomId ? { ...s, severity } : s
    ));
  };

  const updateSymptomDuration = (symptomId: string, duration: string) => {
    setSelectedSymptoms(selectedSymptoms.map(s => 
      s.symptom.id === symptomId ? { ...s, duration } : s
    ));
  };

  const applyGlobalSettings = () => {
    setSelectedSymptoms(selectedSymptoms.map(s => ({
      ...s,
      severity: globalSeverity,
      duration: globalDuration,
    })));
    
    toast({
      title: "Settings Applied",
      description: "Global severity and duration applied to all selected symptoms.",
    });
  };

  const getSeverityColor = (severity: number) => {
    if (severity <= 3) return "text-green-600";
    if (severity <= 6) return "text-yellow-600";
    return "text-red-600";
  };

  const getSeverityText = (severity: number) => {
    if (severity <= 3) return "Mild";
    if (severity <= 6) return "Moderate";
    return "Severe";
  };

  const filteredSymptoms = symptoms.filter(s => s.category === selectedCategory);
  const isSymptomSelected = (symptomId: string) => 
    selectedSymptoms.some(s => s.symptom.id === symptomId);

  return (
    <div 
      className="min-h-screen py-12 px-4 bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url(${symptomBackground})` }}
    >
      {/* Enhanced overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/20 to-primary/10"></div>
      
      {/* Floating consultation elements */}
      <div className="absolute top-24 left-16 w-3 h-3 bg-accent/30 rounded-full rotate-slow"></div>
      <div className="absolute bottom-32 right-20 w-2 h-2 bg-primary/40 rounded-full bounce-gentle" style={{animationDelay: '1.5s'}}></div>
      
      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="backdrop-blur-elegant border border-white/20 rounded-2xl p-8 shadow-2xl hover-lift fade-in mb-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Symptom Assessment
            </h1>
            <p className="text-muted-foreground">
              Select your symptoms and describe their severity and duration
            </p>
          </div>

          {/* Category Selection */}
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-6 rounded-lg text-left transition-all duration-200 ${
                  selectedCategory === category.id
                    ? "bg-primary/20 shadow-lg"
                    : "bg-muted/30 hover:bg-primary/10"
                }`}
              >
                <div className="text-3xl mb-2">{category.icon}</div>
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  {category.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {category.description}
                </p>
              </button>
            ))}
          </div>

          {/* Symptom Selection */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-foreground mb-4">
              Select {categories.find(c => c.id === selectedCategory)?.name} Symptoms
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredSymptoms.map((symptom) => (
                <label
                  key={symptom.id}
                  className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                    isSymptomSelected(symptom.id)
                      ? "bg-primary/20 shadow-md"
                      : "bg-muted/30 hover:bg-primary/10"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isSymptomSelected(symptom.id)}
                    onChange={() => handleSymptomToggle(symptom)}
                    className="sr-only"
                  />
                  <div className={`w-4 h-4 rounded mr-3 flex items-center justify-center ${
                    isSymptomSelected(symptom.id)
                      ? "bg-primary"
                      : "bg-muted/50"
                  }`}>
                    {isSymptomSelected(symptom.id) && (
                      <svg className="w-3 h-3 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <span className="text-foreground">{symptom.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Global Settings */}
          {selectedSymptoms.length > 0 && (
            <div className="bg-muted/50 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Global Settings (Apply to All Selected)
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Default Severity: {getSeverityText(globalSeverity)} ({globalSeverity}/10)
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={globalSeverity}
                    onChange={(e) => setGlobalSeverity(parseInt(e.target.value))}
                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Mild</span>
                    <span>Moderate</span>
                    <span>Severe</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Default Duration
                  </label>
                  <select
                    value={globalDuration}
                    onChange={(e) => setGlobalDuration(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-background/80 backdrop-blur-sm focus:bg-background transition-all"
                  >
                    {durationOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <button
                onClick={applyGlobalSettings}
                className="mt-4 px-4 py-2 rounded-lg bg-primary/20 hover:bg-primary/30 text-primary transition-all"
              >
                Apply to All Selected Symptoms
              </button>
            </div>
          )}
        </div>

        {/* Selected Symptoms Summary */}
        {selectedSymptoms.length > 0 && (
          <div className="backdrop-blur-elegant border border-white/20 rounded-2xl p-8 shadow-2xl slide-up-delay">
            <h3 className="text-xl font-semibold text-foreground mb-4">
              Your Symptom Summary ({selectedSymptoms.length} symptoms)
            </h3>
            <div className="space-y-4">
              {selectedSymptoms.map((selection, index) => (
                <div
                  key={selection.symptom.id}
                  className="bg-muted/30 rounded-lg p-4 border border-muted"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-medium text-foreground">
                      {selection.symptom.name}
                    </h4>
                    <button
                      onClick={() => handleSymptomToggle(selection.symptom)}
                      className="text-destructive hover:text-destructive/80 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Severity: <span className={getSeverityColor(selection.severity)}>
                          {getSeverityText(selection.severity)} ({selection.severity}/10)
                        </span>
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={selection.severity}
                        onChange={(e) => updateSymptomSeverity(selection.symptom.id, parseInt(e.target.value))}
                        className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Duration
                      </label>
                      <select
                        value={selection.duration}
                        onChange={(e) => updateSymptomDuration(selection.symptom.id, e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-background/80 backdrop-blur-sm focus:bg-background transition-all"
                      >
                        {durationOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
              <h4 className="font-semibold text-foreground mb-2">Assessment Summary</h4>
              <div className="text-sm text-muted-foreground">
                You have selected <strong>{selectedSymptoms.length}</strong> symptoms from the{" "}
                <strong>{categories.find(c => c.id === selectedCategory)?.name}</strong> category.
                Average severity: <strong>
                  {Math.round(selectedSymptoms.reduce((sum, s) => sum + s.severity, 0) / selectedSymptoms.length)}/10
                </strong>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SymptomChecker;