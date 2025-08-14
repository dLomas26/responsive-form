import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";
import { CheckCircle, AlertCircle, Shield, User, CreditCard } from 'lucide-react';

export const UdyamForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    aadhaarNumber: '',
    otp: '',
    entrepreneurName: '',
    panNumber: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const { toast } = useToast();

  // Validation patterns
  const aadhaarPattern = /^\d{12}$/;
  const panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  const otpPattern = /^\d{6}$/;

  const validateStep1 = () => {
    const newErrors = {};

    if (!aadhaarPattern.test(formData.aadhaarNumber)) {
      newErrors.aadhaarNumber = 'Aadhaar number must be 12 digits';
    }

    if (formData.entrepreneurName.trim().length < 2) {
      newErrors.entrepreneurName = 'Name must be at least 2 characters';
    }

    if (otpSent && !otpPattern.test(formData.otp)) {
      newErrors.otp = 'OTP must be 6 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};

    if (!panPattern.test(formData.panNumber)) {
      newErrors.panNumber = 'PAN format: AAAAA1111A (5 letters, 4 numbers, 1 letter)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendOTP = async () => {
    if (!aadhaarPattern.test(formData.aadhaarNumber)) {
      setErrors({ aadhaarNumber: 'Please enter a valid 12-digit Aadhaar number' });
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setOtpSent(true);
      setIsLoading(false);
      toast({
        title: "OTP Sent",
        description: "OTP has been sent to your registered mobile number",
        duration: 3000,
      });
    }, 2000);
  };

  const handleStep1Submit = () => {
    if (validateStep1()) {
      setCurrentStep(2);
      toast({
        title: "Step 1 Completed",
        description: "Aadhaar verification successful",
        duration: 3000,
      });
    }
  };

  const handleStep2Submit = () => {
    if (validateStep2()) {
      toast({
        title: "Registration Complete",
        description: "Your Udyam registration has been submitted successfully",
        duration: 5000,
      });
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-government-light-blue via-background to-government-light-blue py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="h-10 w-10 text-government-blue" />
            <h1 className="text-3xl font-bold text-government-blue">Udyam Registration</h1>
          </div>
          <p className="text-muted-foreground">
            Ministry of Micro, Small and Medium Enterprises
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Government of India
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center mb-8 space-x-4">
          <div className="flex items-center">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
              currentStep >= 1 ? 'bg-government-blue text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              {currentStep > 1 ? <CheckCircle className="h-5 w-5" /> : <User className="h-5 w-5" />}
            </div>
            <span className="ml-2 text-sm font-medium">Aadhaar Verification</span>
          </div>
          <div className={`h-1 w-16 ${currentStep >= 2 ? 'bg-government-blue' : 'bg-gray-200'}`} />
          <div className="flex items-center">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
              currentStep >= 2 ? 'bg-government-blue text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              <CreditCard className="h-5 w-5" />
            </div>
            <span className="ml-2 text-sm font-medium">PAN Verification</span>
          </div>
        </div>

        {/* Form Card */}
        <Card className="shadow-government border-0">
          <CardHeader className="bg-gradient-to-r from-government-blue to-government-dark-blue text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              {currentStep === 1 ? <User className="h-5 w-5" /> : <CreditCard className="h-5 w-5" />}
              {currentStep === 1 ? 'Aadhaar Verification With OTP' : 'PAN Verification'}
            </CardTitle>
            <CardDescription className="text-blue-100">
              {currentStep === 1 
                ? 'Enter your Aadhaar details for verification'
                : 'Enter your PAN details for verification'
              }
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6 space-y-6">
            {currentStep === 1 ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="aadhaar" className="text-sm font-medium">
                    Aadhaar Number / आधार संख्या <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="aadhaar"
                    type="text"
                    maxLength={12}
                    value={formData.aadhaarNumber}
                    onChange={(e) => handleInputChange('aadhaarNumber', e.target.value.replace(/\D/g, ''))}
                    placeholder="Enter 12-digit Aadhaar number"
                    className={errors.aadhaarNumber ? 'border-destructive' : ''}
                  />
                  {errors.aadhaarNumber && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {errors.aadhaarNumber}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">
                    Name of Entrepreneur / उद्यमी का नाम <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.entrepreneurName}
                    onChange={(e) => handleInputChange('entrepreneurName', e.target.value)}
                    placeholder="Enter entrepreneur name"
                    className={errors.entrepreneurName ? 'border-destructive' : ''}
                  />
                  {errors.entrepreneurName && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {errors.entrepreneurName}
                    </p>
                  )}
                </div>

                {!otpSent ? (
                  <Button 
                    onClick={handleSendOTP}
                    disabled={isLoading}
                    className="w-full bg-government-blue hover:bg-government-dark-blue"
                  >
                    {isLoading ? 'Sending OTP...' : 'Send OTP'}
                  </Button>
                ) : (
                  <>
                    <Alert className="border-success bg-green-50">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <AlertDescription className="text-success">
                        OTP sent successfully to your registered mobile number
                      </AlertDescription>
                    </Alert>

                    <div className="space-y-2">
                      <Label htmlFor="otp" className="text-sm font-medium">
                        Enter OTP <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="otp"
                        type="text"
                        maxLength={6}
                        value={formData.otp}
                        onChange={(e) => handleInputChange('otp', e.target.value.replace(/\D/g, ''))}
                        placeholder="Enter 6-digit OTP"
                        className={errors.otp ? 'border-destructive' : ''}
                      />
                      {errors.otp && (
                        <p className="text-sm text-destructive flex items-center gap-1">
                          <AlertCircle className="h-4 w-4" />
                          {errors.otp}
                        </p>
                      )}
                    </div>

                    <Button 
                      onClick={handleStep1Submit}
                      className="w-full bg-government-blue hover:bg-government-dark-blue"
                    >
                      Verify & Continue
                    </Button>
                  </>
                )}
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <Label htmlFor="pan" className="text-sm font-medium">
                    PAN Number <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="pan"
                    type="text"
                    maxLength={10}
                    value={formData.panNumber}
                    onChange={(e) => handleInputChange('panNumber', e.target.value.toUpperCase())}
                    placeholder="AAAAA1111A"
                    className={errors.panNumber ? 'border-destructive' : ''}
                  />
                  {errors.panNumber && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {errors.panNumber}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Format: 5 letters, 4 numbers, 1 letter (e.g., ABCDE1234F)
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button 
                    variant="outline"
                    onClick={() => setCurrentStep(1)}
                    className="flex-1"
                  >
                    Previous
                  </Button>
                  <Button 
                    onClick={handleStep2Submit}
                    className="flex-1 bg-government-blue hover:bg-government-dark-blue"
                  >
                    Submit Registration
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Important Notes */}
        <Card className="mt-6 border-government-orange/20 bg-orange-50">
          <CardContent className="p-4">
            <h3 className="font-semibold text-government-orange mb-2">Important Notes:</h3>
            <ul className="text-sm space-y-1 text-gray-700">
              <li>• Aadhaar number shall be required for Udyam Registration.</li>
              <li>• The Aadhaar number shall be of the proprietor in case of proprietorship firm.</li>
              <li>• PAN and Aadhaar linking is mandatory for registration.</li>
              <li>• Ensure all details are accurate before submission.</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};