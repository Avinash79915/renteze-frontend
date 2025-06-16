import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";

function OtpVerification({ onBackToLogin, username }) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          setCanResend(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    
    // Handle paste
    if (e.key === 'v' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      navigator.clipboard.readText().then(text => {
        const digits = text.replace(/\D/g, '').slice(0, 6);
        const newOtp = [...otp];
        for (let i = 0; i < digits.length && i < 6; i++) {
          newOtp[i] = digits[i];
        }
        setOtp(newOtp);
        
        // Focus the next empty input or the last input
        const nextIndex = Math.min(digits.length, 5);
        inputRefs.current[nextIndex]?.focus();
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      toast.error("Please enter the complete 6-digit OTP");
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate OTP verification
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would typically dispatch an OTP verification action
      // dispatch(verifyOtp({ username, otp: otpString }));
      
      // For demo purposes, accept any 6-digit OTP
      if (otpString === "123456") {
        toast.success("OTP verified successfully!");
        // Redirect to dashboard or complete login process
      } else {
        toast.success("OTP verified successfully! (Demo mode - any 6-digit code works)");
      }
      
      onBackToLogin();
    } catch (error) {
      toast.error("Invalid OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!canResend) return;
    
    try {
      // Simulate resending OTP
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Here you would typically dispatch a resend OTP action
      // dispatch(resendOtp({ username }));
      
      toast.success("New OTP sent successfully!");
      setTimeLeft(300);
      setCanResend(false);
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } catch (error) {
      toast.error("Failed to resend OTP. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Verify OTP</h2>
          <p className="text-blue-100 mb-2">
            We've sent a 6-digit code to your registered device
          </p>
          {username && (
            <p className="text-blue-300 text-sm font-medium">
              for {username}
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-white/90 mb-4 font-medium text-center">
              Enter 6-digit OTP
            </label>
            <div className="flex justify-center space-x-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-12 text-center text-xl font-bold bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                  autoComplete="off"
                />
              ))}
            </div>
          </div>

          <div className="text-center">
            <div className="text-white/70 mb-2">
              {timeLeft > 0 ? (
                <span>Time remaining: <span className="font-mono text-blue-300">{formatTime(timeLeft)}</span></span>
              ) : (
                <span className="text-red-300">OTP expired</span>
              )}
            </div>
            
            {canResend ? (
              <button
                type="button"
                onClick={handleResendOtp}
                className="text-blue-300 hover:text-blue-200 font-medium transition-colors duration-200 underline"
              >
                Resend OTP
              </button>
            ) : (
              <span className="text-white/50 text-sm">
                Resend available in {formatTime(timeLeft)}
              </span>
            )}
          </div>

          <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-3">
            <p className="text-blue-200 text-sm text-center">
              <strong>Demo Mode:</strong> Use <code className="bg-blue-500/30 px-1 rounded">123456</code> or any 6-digit code
            </p>
          </div>

          <button
            type="submit"
            disabled={isLoading || otp.join('').length !== 6}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Verifying OTP...
              </div>
            ) : (
              "Verify OTP"
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-white/70">
            Having trouble?{" "}
            <button
              onClick={onBackToLogin}
              className="text-blue-300 hover:text-blue-200 font-medium transition-colors duration-200"
            >
              Back to Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default OtpVerification;