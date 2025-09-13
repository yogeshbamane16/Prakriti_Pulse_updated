import { useState } from "react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import registerBackground from "@/assets/register-bg.jpg";

interface FormData {
  name: string;
  email: string;
  password: string;
  age: string;
  gender: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  age?: string;
  gender?: string;
}

const Register = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    age: "",
    gender: "",
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validateField = (name: keyof FormData, value: string): string => {
    switch (name) {
      case "name":
        return value.length < 2 ? "Name must be at least 2 characters" : "";
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !emailRegex.test(value) ? "Please enter a valid email address" : "";
      case "password":
        if (value.length < 6) return "Password must be at least 6 characters";
        if (!/(?=.*[a-z])(?=.*[A-Z])/.test(value)) return "Password must contain uppercase and lowercase letters";
        return "";
      case "age":
        const ageNum = parseInt(value);
        return !value || ageNum < 1 || ageNum > 120 ? "Please enter a valid age (1-120)" : "";
      case "gender":
        return !value ? "Please select your gender" : "";
      default:
        return "";
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Real-time validation
    const error = validateField(name as keyof FormData, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate all fields
    const newErrors: FormErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key as keyof FormData, formData[key as keyof FormData]);
      if (error) newErrors[key as keyof FormErrors] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    // Simulate API call with realistic delay
    setTimeout(() => {
      toast({
        title: "Welcome to AyurWellness! 🎉",
        description: `Hello ${formData.name}! Your wellness journey begins now. Check your email for next steps.`,
      });
      setIsSubmitting(false);
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        password: "",
        age: "",
        gender: "",
      });
      setErrors({});
    }, 2000);
  };

  const getInputClassName = (fieldName: keyof FormData) => {
    const baseClass = "input-ayurvedic w-full";
    if (errors[fieldName]) {
      return `${baseClass} border-red-500 focus:border-red-500 focus:ring-red-500/20 bg-red-50/50`;
    }
    if (formData[fieldName] && !errors[fieldName]) {
      return `${baseClass} border-green-500 focus:border-green-500 focus:ring-green-500/20 bg-green-50/50`;
    }
    return baseClass;
  };

  return (
    <div 
      className="min-h-screen py-12 px-4 bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url(${registerBackground})` }}
    >
      {/* Enhanced overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/30 to-primary/20 backdrop-blur-[1px]"></div>
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-accent/40 rounded-full bounce-gentle"></div>
      <div className="absolute bottom-32 right-16 w-3 h-3 bg-primary/30 rounded-full float-animation"></div>
      <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-accent/50 rounded-full pulse-glow"></div>
      
      <div className="relative z-10 max-w-lg mx-auto">
        {/* Header */}
        <div className="text-center mb-8 fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white font-medium mb-4 border border-white/30">
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
            WELLNESS REGISTRATION
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-3 drop-shadow-lg">
            Join <span className="text-accent">AyurWellness</span>
          </h1>
          <p className="text-white/90 text-lg drop-shadow">
            Begin your personalized journey to natural health and balance
          </p>
        </div>

        <div className="backdrop-blur-elegant border border-white/20 rounded-2xl p-8 shadow-2xl hover-lift slide-up">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div className="space-y-2">
              <label htmlFor="name" className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <span className="text-primary">👤</span>
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={getInputClassName("name")}
                placeholder="Enter your full name"
                required
              />
              {errors.name && (
                <div className="flex items-center gap-2 text-red-600 text-sm">
                  <span>⚠️</span>
                  {errors.name}
                </div>
              )}
              {formData.name && !errors.name && (
                <div className="flex items-center gap-2 text-green-600 text-sm">
                  <span>✅</span>
                  Looks good!
                </div>
              )}
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <span className="text-primary">📧</span>
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={getInputClassName("email")}
                placeholder="your.email@example.com"
                required
              />
              {errors.email && (
                <div className="flex items-center gap-2 text-red-600 text-sm">
                  <span>⚠️</span>
                  {errors.email}
                </div>
              )}
              {formData.email && !errors.email && (
                <div className="flex items-center gap-2 text-green-600 text-sm">
                  <span>✅</span>
                  Valid email format
                </div>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <span className="text-primary">🔒</span>
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`${getInputClassName("password")} pr-12`}
                  placeholder="Create a secure password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
              {errors.password && (
                <div className="flex items-center gap-2 text-red-600 text-sm">
                  <span>⚠️</span>
                  {errors.password}
                </div>
              )}
              {formData.password && !errors.password && (
                <div className="flex items-center gap-2 text-green-600 text-sm">
                  <span>✅</span>
                  Strong password
                </div>
              )}
            </div>

            {/* Age and Gender Row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="age" className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <span className="text-primary">🎂</span>
                  Age
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  className={getInputClassName("age")}
                  placeholder="25"
                  min="1"
                  max="120"
                  required
                />
                {errors.age && (
                  <div className="text-red-600 text-xs flex items-center gap-1">
                    <span>⚠️</span>
                    {errors.age}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="gender" className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <span className="text-primary">⚖️</span>
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className={getInputClassName("gender")}
                  required
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {errors.gender && (
                  <div className="text-red-600 text-xs flex items-center gap-1">
                    <span>⚠️</span>
                    {errors.gender}
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full btn-primary py-4 text-lg font-semibold relative overflow-hidden group ${
                isSubmitting ? "opacity-75 cursor-not-allowed" : "hover:scale-[1.02]"
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                  Creating Your Profile...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Start My Wellness Journey
                  <span className="group-hover:translate-x-1 transition-transform">🚀</span>
                </span>
              )}
            </button>

            {/* Sign In Link */}
            <div className="text-center pt-4 border-t border-muted">
              <p className="text-muted-foreground text-sm">
                Already have an account?{" "}
                <Link to="/login" className="text-primary hover:text-accent font-medium transition-colors">
                  Sign in here
                </Link>
              </p>
            </div>
          </form>

          {/* Trust Indicators */}
          <div className="mt-6 pt-6 border-t border-muted/50">
            <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <span className="text-green-500">🔒</span>
                <span>Secure & Private</span>
              </div>
              <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
              <div className="flex items-center gap-1">
                <span className="text-primary">✨</span>
                <span>Free Assessment</span>
              </div>
              <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
              <div className="flex items-center gap-1">
                <span className="text-accent">💚</span>
                <span>Natural Approach</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;