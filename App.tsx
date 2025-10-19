import React, { useState } from 'react';
import { Header } from './components/Header';
import { FormSection, Input, Select, RadioGroup, RangeSlider } from './components/FormControls';
import { CarIcon, CheckCircleIcon, DollarSignIcon, UserIcon } from './components/Icons';

const initialFormData = {
  name: "Sami Miri",
  age: 21,
  employment_status: "Student",
  location: "Austin, TX",
  monthly_income: 3200,
  monthly_expenses: 1800,
  existing_debt: 400,
  credit_score: 700,
  savings_balance: 2500,
  checking_balance: 1200,
  monthly_rent_or_mortgage: 900,
  buy_or_lease: "Lease",
  down_payment: 2000,
  desired_monthly_payment: 350,
  preferred_loan_term_months: "48",
  vehicle_type: "Hybrid",
  desired_make: "Toyota",
  desired_model: "Corolla",
  model_year_from: 2021,
  model_year_to: 2025,
  expected_annual_mileage: 12000,
  fuel_preference: "Electric",
  color_preference: "Blue",
  driving_habits: "Daily commute",
  trade_in_vehicle_value: 5000,
  financial_goal: "Buy first car",
  financial_confidence_score: 6,
};

const App: React.FC = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const isNumber = type === 'number';
    setFormData(prev => ({
      ...prev,
      [name]: isNumber ? (value === '' ? '' : Number(value)) : value,
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("Form Submitted Data:", formData);
    
    // Simulate API call to AI model
    setTimeout(() => {
      setIsLoading(false);
      alert("Success! Your personalized financing summary has been generated. Please check the browser console for the data payload.");
    }, 2000);
  };

  return (
    <div className="bg-brand-blue-light min-h-screen text-brand-gray">
      <Header />
      <main className="max-w-3xl mx-auto p-4 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          
          <FormSection title="About You" icon={<UserIcon />} description="Let's start with some basic information.">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input label="Full Name" name="name" value={formData.name} onChange={handleChange} />
              <Input label="Age" name="age" type="number" value={formData.age} onChange={handleChange} />
              <Select label="Employment Status" name="employment_status" value={formData.employment_status} onChange={handleChange} options={['Student', 'Employed', 'Self-Employed', 'Unemployed']} />
              <Input label="Location (City, State)" name="location" value={formData.location} onChange={handleChange} />
            </div>
          </FormSection>

          <FormSection title="Financial Snapshot" icon={<DollarSignIcon />} description="Provide a picture of your current finances.">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input label="Monthly Income" name="monthly_income" type="number" value={formData.monthly_income} onChange={handleChange} prefix="$"/>
                <Input label="Monthly Expenses" name="monthly_expenses" type="number" value={formData.monthly_expenses} onChange={handleChange} prefix="$"/>
                <Input label="Existing Debt" name="existing_debt" type="number" value={formData.existing_debt} onChange={handleChange} prefix="$"/>
                <Input label="Credit Score" name="credit_score" type="number" value={formData.credit_score} onChange={handleChange} />
                <Input label="Savings Balance" name="savings_balance" type="number" value={formData.savings_balance} onChange={handleChange} prefix="$"/>
                <Input label="Checking Balance" name="checking_balance" type="number" value={formData.checking_balance} onChange={handleChange} prefix="$"/>
                <Input label="Monthly Rent / Mortgage" name="monthly_rent_or_mortgage" type="number" value={formData.monthly_rent_or_mortgage} onChange={handleChange} prefix="$"/>
             </div>
          </FormSection>

          <FormSection title="Vehicle Preferences" icon={<CarIcon />} description="Tell us about the car you're looking for.">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <RadioGroup label="Buy or Lease?" name="buy_or_lease" value={formData.buy_or_lease} onChange={handleChange} options={['Buy', 'Lease']} />
              <div />
              <Input label="Down Payment" name="down_payment" type="number" value={formData.down_payment} onChange={handleChange} prefix="$"/>
              <Input label="Desired Monthly Payment" name="desired_monthly_payment" type="number" value={formData.desired_monthly_payment} onChange={handleChange} prefix="$"/>
              <Select label="Preferred Loan Term" name="preferred_loan_term_months" value={formData.preferred_loan_term_months.toString()} onChange={handleChange} options={[
                {label: '24 months', value: '24'}, {label: '36 months', value: '36'}, {label: '48 months', value: '48'}, {label: '60 months', value: '60'}, {label: '72 months', value: '72'}
              ]}/>
              <Select label="Vehicle Type" name="vehicle_type" value={formData.vehicle_type} onChange={handleChange} options={['Sedan', 'SUV', 'Truck', 'Hybrid', 'Electric']} />
              <Input label="Desired Make" name="desired_make" value={formData.desired_make} onChange={handleChange} />
              <Input label="Desired Model" name="desired_model" value={formData.desired_model} onChange={handleChange} />
              <div className="flex gap-4">
                <Input label="Year From" name="model_year_from" type="number" value={formData.model_year_from} onChange={handleChange} />
                <Input label="Year To" name="model_year_to" type="number" value={formData.model_year_to} onChange={handleChange} />
              </div>
               <Input label="Expected Annual Mileage" name="expected_annual_mileage" type="number" value={formData.expected_annual_mileage} onChange={handleChange} />
               <Input label="Color Preference" name="color_preference" value={formData.color_preference} onChange={handleChange} />
               <Input label="Trade-in Value" name="trade_in_vehicle_value" type="number" value={formData.trade_in_vehicle_value} onChange={handleChange} prefix="$" />
            </div>
          </FormSection>

          <FormSection title="Your Goal" icon={<CheckCircleIcon />} description="Confirm your goal and tell us how you feel.">
            <Input label="Financial Goal" name="financial_goal" value={formData.financial_goal} onChange={handleChange} />
            <RangeSlider label="Financial Confidence Score" name="financial_confidence_score" value={formData.financial_confidence_score} onChange={handleChange} min={1} max={10} />
          </FormSection>

          <div className="flex justify-end pt-4">
            <button type="submit" disabled={isLoading} className="bg-brand-teal text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-brand-teal-light hover:text-brand-blue transition-all duration-300 disabled:bg-slate-500 disabled:cursor-not-allowed flex items-center gap-2">
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating Plan...
                </>
              ) : 'Generate My Plan'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default App;
