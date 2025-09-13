import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import prakritiBackground from "@/assets/prakriti-quiz-bg.jpg";

interface Question {
  id: number;
  text: string;
  options: {
    text: string;
    dosha: "vata" | "pitta" | "kapha";
    score: number;
  }[];
}

interface DoshaScores {
  vata: number;
  pitta: number;
  kapha: number;
}

const questions: Question[] = [
  {
    id: 1,
    text: "How would you describe your physical build?",
    options: [
      { text: "Thin, light frame, prominent joints", dosha: "vata", score: 3 },
      { text: "Medium build, well-proportioned", dosha: "pitta", score: 3 },
      { text: "Large frame, heavy build, solid", dosha: "kapha", score: 3 },
    ],
  },
  {
    id: 2,
    text: "What is your skin type like?",
    options: [
      { text: "Dry, rough, cool to touch", dosha: "vata", score: 3 },
      { text: "Warm, oily, prone to rashes", dosha: "pitta", score: 3 },
      { text: "Thick, moist, cool, smooth", dosha: "kapha", score: 3 },
    ],
  },
  {
    id: 3,
    text: "How is your appetite generally?",
    options: [
      { text: "Variable, sometimes forget to eat", dosha: "vata", score: 3 },
      { text: "Strong, get irritable when hungry", dosha: "pitta", score: 3 },
      { text: "Slow but steady, can skip meals easily", dosha: "kapha", score: 3 },
    ],
  },
  {
    id: 4,
    text: "How do you handle stress?",
    options: [
      { text: "Worry, become anxious and restless", dosha: "vata", score: 3 },
      { text: "Become irritable and angry", dosha: "pitta", score: 3 },
      { text: "Remain calm but may withdraw", dosha: "kapha", score: 3 },
    ],
  },
  {
    id: 5,
    text: "What is your sleep pattern like?",
    options: [
      { text: "Light sleeper, mind very active", dosha: "vata", score: 3 },
      { text: "Moderate sleep, vivid dreams", dosha: "pitta", score: 3 },
      { text: "Deep, long sleep, hard to wake up", dosha: "kapha", score: 3 },
    ],
  },
];

const PrakritiQuiz = () => {
  const { toast } = useToast();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [scores, setScores] = useState<DoshaScores>({ vata: 0, pitta: 0, kapha: 0 });
  const [showResults, setShowResults] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
    const newAnswers = { ...answers, [currentQuestion]: optionIndex };
    setAnswers(newAnswers);

    // Update scores
    const option = questions[currentQuestion].options[optionIndex];
    const newScores = { ...scores };
    newScores[option.dosha] += option.score;
    setScores(newScores);
  };

  const handleNext = () => {
    if (selectedOption === null) {
      toast({
        title: "Please select an answer",
        description: "Choose the option that best describes you.",
        variant: "destructive",
      });
      return;
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(answers[currentQuestion + 1] ?? null);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOption(answers[currentQuestion - 1] ?? null);
    }
  };

  const getDominantDosha = () => {
    const maxScore = Math.max(scores.vata, scores.pitta, scores.kapha);
    if (scores.vata === maxScore) return "vata";
    if (scores.pitta === maxScore) return "pitta";
    return "kapha";
  };

  const getDoshaInfo = (dosha: string) => {
    switch (dosha) {
      case "vata":
        return {
          name: "Vata",
          element: "Air & Space",
          characteristics: "Creative, energetic, quick thinking",
          recommendations: "Focus on grounding foods, regular routines, and stress management",
          icon: "💨",
          color: "vata-accent",
        };
      case "pitta":
        return {
          name: "Pitta",
          element: "Fire & Water",
          characteristics: "Focused, competitive, natural leader",
          recommendations: "Cool foods, moderate exercise, and emotional balance",
          icon: "🔥",
          color: "pitta-accent",
        };
      default:
        return {
          name: "Kapha",
          element: "Earth & Water",
          characteristics: "Calm, stable, compassionate",
          recommendations: "Stimulating foods, regular exercise, and variety in routine",
          icon: "🌱",
          color: "kapha-accent",
        };
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setScores({ vata: 0, pitta: 0, kapha: 0 });
    setShowResults(false);
    setSelectedOption(null);
  };

  if (showResults) {
    const dominantDosha = getDominantDosha();
    const doshaInfo = getDoshaInfo(dominantDosha);

    return (
      <div 
        className="min-h-screen py-12 px-4 bg-cover bg-center bg-no-repeat relative"
        style={{ backgroundImage: `url(${prakritiBackground})` }}
      >
        {/* Enhanced overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40"></div>
        
        <div className="relative z-10 max-w-2xl mx-auto">
          <div className={`backdrop-blur-elegant border border-white/20 rounded-2xl p-8 shadow-2xl scale-in ${doshaInfo.color} dosha-card`}>
            <div className="text-center mb-8">
              <div className="text-8xl mb-4">{doshaInfo.icon}</div>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                Your Dominant Dosha: {doshaInfo.name}
              </h1>
              <p className="text-xl text-muted-foreground">
                {doshaInfo.element}
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-card/50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3 text-foreground">Your Characteristics</h3>
                <p className="text-muted-foreground">{doshaInfo.characteristics}</p>
              </div>

              <div className="bg-card/50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3 text-foreground">Recommendations</h3>
                <p className="text-muted-foreground">{doshaInfo.recommendations}</p>
              </div>

              <div className="bg-card/50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4 text-foreground">Your Dosha Breakdown</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2">
                      <span>💨 Vata</span>
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-muted rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${(scores.vata / 15) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{scores.vata}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2">
                      <span>🔥 Pitta</span>
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-muted rounded-full h-2">
                        <div
                          className="bg-red-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${(scores.pitta / 15) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{scores.pitta}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2">
                      <span>🌱 Kapha</span>
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-muted rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${(scores.kapha / 15) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{scores.kapha}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-8">
            <button onClick={resetQuiz} className="flex-1 px-4 py-2 rounded-lg bg-muted/50 hover:bg-muted transition-all">
              Take Quiz Again
            </button>
            <button className="flex-1 px-4 py-2 rounded-lg bg-primary/20 hover:bg-primary/30 text-primary transition-all">
              Get Personalized Plan
            </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen py-12 px-4 bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url(${prakritiBackground})` }}
    >
      {/* Enhanced overlay */}
      <div className="absolute inset 0 bg-gradient-to-b from-black/30 via-transparent to-black/40"></div>
      
      {/* Floating meditation elements */}
      <div className="absolute top-16 left-8 w-4 h-4 bg-primary/20 rounded-full float-animation"></div>
      <div className="absolute bottom-20 right-12 w-3 h-3 bg-accent/30 rounded-full bounce-gentle" style={{animationDelay: '1s'}}></div>
      <div className="absolute top-1/4 right-1/5 w-2 h-2 bg-primary/40 rounded-full pulse-glow" style={{animationDelay: '2s'}}></div>
      
      <div className="relative z-10 max-w-2xl mx-auto">
        <div className="backdrop-blur-elegant border border-white/20 rounded-2xl p-8 shadow-2xl hover-lift fade-in">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Prakriti Assessment Quiz
            </h1>
            <p className="text-muted-foreground">
              Discover your unique Ayurvedic constitution
            </p>
            <div className="mt-4">
              <div className="flex justify-between text-sm text-muted-foreground mb-2">
                <span>Question {currentQuestion + 1} of {questions.length}</span>
                <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-6">
              {questions[currentQuestion].text}
            </h2>
            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => (
                <label
                  key={index}
                  className={`block p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                    selectedOption === index
                      ? "bg-primary/20 shadow-lg"
                      : "bg-muted/30 hover:bg-primary/10"
                  }`}
                >
                  <input
                    type="radio"
                    name={`question-${currentQuestion}`}
                    value={index}
                    checked={selectedOption === index}
                    onChange={() => handleOptionSelect(index)}
                    className="sr-only"
                  />
                  <span className="text-foreground">{option.text}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className={`px-4 py-2 rounded-lg bg-muted/50 hover:bg-muted transition-all ${
                currentQuestion === 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Previous
            </button>
            <button onClick={handleNext} className="px-4 py-2 rounded-lg bg-primary/20 hover:bg-primary/30 text-primary transition-all">
              {currentQuestion === questions.length - 1 ? "View Results" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrakritiQuiz;