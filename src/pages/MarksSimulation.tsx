import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import marksBackground from "@/assets/marks-simulation-bg.jpg";

interface SectionMarks {
  registration: string;
  prakritiQuiz: string;
  symptomChecker: string;
  herbRecommendation: string;
}

interface Results {
  totalMarks: number;
  maxMarks: number;
  percentage: number;
  grade: string;
  feedback: string;
}

const MarksSimulation = () => {
  const { toast } = useToast();
  const [marks, setMarks] = useState<SectionMarks>({
    registration: "",
    prakritiQuiz: "",
    symptomChecker: "",
    herbRecommendation: "",
  });
  
  const [results, setResults] = useState<Results | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const maxMarksPerSection = 25;
  const totalMaxMarks = 100;

  const sections = [
    {
      key: "registration" as keyof SectionMarks,
      name: "User Registration & Login",
      description: "Form validation, UI design, user experience",
      icon: "👤",
    },
    {
      key: "prakritiQuiz" as keyof SectionMarks,
      name: "Prakriti Assessment Quiz",
      description: "Interactive quiz, dosha calculation, result display",
      icon: "🧘",
    },
    {
      key: "symptomChecker" as keyof SectionMarks,
      name: "Symptom Checker",
      description: "Symptom selection, severity tracking, categorization",
      icon: "🔍",
    },
    {
      key: "herbRecommendation" as keyof SectionMarks,
      name: "Herb Recommendation System",
      description: "Herb display, detailed information, interactions",
      icon: "🌿",
    },
  ];

  const handleMarksChange = (section: keyof SectionMarks, value: string) => {
    setMarks(prev => ({ ...prev, [section]: value }));
  };

  const calculateResults = async () => {
    // Validate all fields are filled
    const emptyFields = Object.entries(marks).filter(([_, value]) => !value);
    if (emptyFields.length > 0) {
      toast({
        title: "Missing Marks",
        description: "Please enter marks for all sections before calculating.",
        variant: "destructive",
      });
      return;
    }

    // Validate marks are within range
    const invalidMarks = Object.entries(marks).filter(([_, value]) => {
      const numValue = parseFloat(value);
      return isNaN(numValue) || numValue < 0 || numValue > maxMarksPerSection;
    });

    if (invalidMarks.length > 0) {
      toast({
        title: "Invalid Marks",
        description: `Marks must be between 0 and ${maxMarksPerSection} for each section.`,
        variant: "destructive",
      });
      return;
    }

    setIsCalculating(true);

    // Simulate calculation delay
    setTimeout(() => {
      const totalMarks = Object.values(marks).reduce((sum, mark) => sum + parseFloat(mark), 0);
      const percentage = (totalMarks / totalMaxMarks) * 100;
      
      let grade = "";
      let feedback = "";

      if (percentage >= 90) {
        grade = "A+";
        feedback = "Outstanding! 🎉 Exceptional work on the Ayurvedic Recommendation System. Your implementation demonstrates mastery of React concepts, beautiful UI design, and excellent user experience. The attention to detail in form validation, interactive elements, and overall aesthetics is remarkable.";
      } else if (percentage >= 80) {
        grade = "A";
        feedback = "Excellent work! 🌟 Your Ayurvedic Recommendation System shows strong technical skills and good understanding of user interface design. The functionality is well-implemented with smooth interactions and professional appearance.";
      } else if (percentage >= 70) {
        grade = "B+";
        feedback = "Good effort! ✨ The system functions well and shows understanding of core concepts. There's room for improvement in some areas like UI polish, validation feedback, or interactive elements to make it more engaging.";
      } else if (percentage >= 60) {
        grade = "B";
        feedback = "Satisfactory work. 👍 The basic functionality is there, but consider enhancing the user experience with better visual feedback, smoother animations, and more detailed error handling.";
      } else if (percentage >= 50) {
        grade = "C";
        feedback = "Needs improvement. 📚 While some components work, focus on completing all required features, improving form validation, and enhancing the overall user interface design.";
      } else {
        grade = "F";
        feedback = "Requires significant improvement. 💪 Consider revisiting the requirements and focusing on implementing core functionality first, then gradually adding interactive features and improving the design.";
      }

      setResults({
        totalMarks,
        maxMarks: totalMaxMarks,
        percentage: Math.round(percentage * 100) / 100,
        grade,
        feedback,
      });

      setIsCalculating(false);

      toast({
        title: "Results Calculated!",
        description: `Total Score: ${totalMarks}/${totalMaxMarks} (${Math.round(percentage)}%)`,
      });
    }, 2000);
  };

  const resetForm = () => {
    setMarks({
      registration: "",
      prakritiQuiz: "",
      symptomChecker: "",
      herbRecommendation: "",
    });
    setResults(null);
  };

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case "A+":
      case "A":
        return "text-green-600 bg-green-100 border-green-200";
      case "B+":
      case "B":
        return "text-blue-600 bg-blue-100 border-blue-200";
      case "C":
        return "text-yellow-600 bg-yellow-100 border-yellow-200";
      default:
        return "text-red-600 bg-red-100 border-red-200";
    }
  };

  return (
    <div 
      className="min-h-screen py-12 px-4 bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url(${marksBackground})` }}
    >
      {/* Enhanced overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-amber-900/20"></div>
      
      {/* Floating academic elements */}
      <div className="absolute top-16 left-20 w-3 h-3 bg-amber-400/30 rounded-full rotate-slow"></div>
      <div className="absolute bottom-24 right-12 w-4 h-4 bg-primary/20 rounded-full float-animation" style={{animationDelay: '1s'}}></div>
      <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-accent/40 rounded-full pulse-glow" style={{animationDelay: '1.5s'}}></div>
      
      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="backdrop-blur-elegant border border-white/20 rounded-2xl p-8 shadow-2xl hover-lift fade-in mb-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              📊 Assignment Grading System
            </h1>
            <p className="text-muted-foreground">
              Enter marks for each section of the Ayurvedic Recommendation System
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {sections.map((section) => (
              <div
                key={section.key}
                className="bg-muted/20 p-6 rounded-lg border border-muted"
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl">{section.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-2">
                      {section.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {section.description}
                    </p>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="0"
                        max={maxMarksPerSection}
                        step="0.5"
                        value={marks[section.key]}
                        onChange={(e) => handleMarksChange(section.key, e.target.value)}
                        placeholder="0"
                        className="input-ayurvedic w-20 text-center"
                      />
                      <span className="text-muted-foreground">
                        / {maxMarksPerSection} marks
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={calculateResults}
              disabled={isCalculating}
              className={`btn-primary ${isCalculating ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {isCalculating ? "Calculating..." : "Calculate Results"}
            </button>
            <button
              onClick={resetForm}
              disabled={isCalculating}
              className="btn-secondary"
            >
              Reset Form
            </button>
          </div>
        </div>

        {/* Results Display */}
        {results && (
          <div className="backdrop-blur-elegant border border-white/20 rounded-2xl p-8 shadow-2xl scale-in-delay">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                📋 Assessment Results
              </h2>
              
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">
                    Total Score
                  </h3>
                  <p className="text-2xl font-bold text-primary">
                    {results.totalMarks} / {results.maxMarks}
                  </p>
                </div>
                
                <div className="bg-accent/10 p-4 rounded-lg border border-accent/20">
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">
                    Percentage
                  </h3>
                  <p className="text-2xl font-bold text-accent-foreground">
                    {results.percentage}%
                  </p>
                </div>
                
                <div className={`p-4 rounded-lg border ${getGradeColor(results.grade)}`}>
                  <h3 className="text-sm font-medium mb-1">
                    Grade
                  </h3>
                  <p className="text-2xl font-bold">
                    {results.grade}
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between text-sm text-muted-foreground mb-2">
                  <span>Progress</span>
                  <span>{results.percentage}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-4">
                  <div
                    className="bg-gradient-to-r from-primary to-accent h-4 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${Math.min(results.percentage, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Detailed Breakdown */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Section Breakdown
              </h3>
              <div className="space-y-3">
                {sections.map((section) => {
                  const sectionMarks = parseFloat(marks[section.key]);
                  const sectionPercentage = (sectionMarks / maxMarksPerSection) * 100;
                  
                  return (
                    <div key={section.key} className="flex items-center gap-4">
                      <div className="text-2xl">{section.icon}</div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-medium text-foreground">
                            {section.name}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {sectionMarks} / {maxMarksPerSection}
                          </span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full transition-all duration-500"
                            style={{ width: `${Math.min(sectionPercentage, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Feedback */}
            <div className="bg-muted/30 p-6 rounded-lg border border-muted">
              <h3 className="text-lg font-semibold text-foreground mb-3">
                📝 Instructor Feedback
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {results.feedback}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarksSimulation;