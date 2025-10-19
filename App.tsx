import React, { useState } from 'react';
import { Header } from './components/Header';
import { FormSection, Input, Select, RangeSlider } from './components/FormControls';
import { CheckCircleIcon, DollarSignIcon, SparklesIcon, UserIcon } from './components/Icons';

const initialFormData = {
  // About You
  name: "Sami Miri",
  age: 21,
  employment_status: "Student",
  location: "Austin, TX",

  // Lifestyle & Habits
  housing_situation: "Renting",
  dining_habits: "Mix of Both",
  monthly_subscriptions: 75,

  // Financial Snapshot (Simplified)
  monthly_income: 3200,
  monthly_expenses: 1800, // Consolidated
  total_debt: 400, // Renamed from existing_debt
  credit_score: 700,
  bank_account_balance: 3700, // Consolidated savings and checking

  // Your Goal
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

          <FormSection title="Lifestyle & Habits" icon={<SparklesIcon />} description="Tell us about your daily life to create a holistic financial picture.">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select label="Housing Situation" name="housing_situation" value={formData.housing_situation} onChange={handleChange} options={['Renting', 'Owning', 'Living with Family', 'Other']} />
              <Select label="Dining Habits" name="dining_habits" value={formData.dining_habits} onChange={handleChange} options={['Mostly Cook at Home', 'Frequent Dining Out', 'Mix of Both']} />
              <Input label="Monthly Subscriptions & Memberships" name="monthly_subscriptions" type="number" value={formData.monthly_subscriptions} onChange={handleChange} prefix="$"/>
            </div>
          </FormSection>

          <FormSection title="Financial Snapshot" icon={<DollarSignIcon />} description="Provide a high-level picture of your current finances.">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input 
                  label="Monthly Income" 
                  name="monthly_income" 
                  type="number" 
                  value={formData.monthly_income} 
                  onChange={handleChange} 
                  prefix="$"
                  tooltip="Your total take-home pay per month after taxes and other deductions."
                />
                <Input 
                  label="Estimated Total Monthly Expenses" 
                  name="monthly_expenses" 
                  type="number" 
                  value={formData.monthly_expenses} 
                  onChange={handleChange} 
                  prefix="$"
                  tooltip="Include all regular monthly costs like rent/mortgage, utilities, groceries, transportation, and entertainment."
                />
                <Input 
                  label="Total Debt" 
                  name="total_debt" 
                  type="number" 
                  value={formData.total_debt} 
                  onChange={handleChange} 
                  prefix="$"
                  tooltip="The combined total of all outstanding loans, such as student loans, credit card balances, and personal loans."
                />
                <Input 
                  label="Credit Score" 
                  name="credit_score" 
                  type="number" 
                  value={formData.credit_score} 
                  onChange={handleChange}
                  tooltip="A number between 300-850 that estimates your creditworthiness. You can find this on your credit card statement or a free credit report website."
                />
                <Input 
                  label="Total Bank Account Balance" 
                  name="bank_account_balance" 
                  type="number" 
                  value={formData.bank_account_balance} 
                  onChange={handleChange} 
                  prefix="$"
                  tooltip="The sum of all funds in your checking and savings accounts."
                />
             </div>
          </FormSection>

          <FormSection title="Your Goal" icon={<CheckCircleIcon />} description="Describe your primary financial goal.">
            <Input label="Financial Goal" name="financial_goal" value={formData.financial_goal} onChange={handleChange} placeholder="e.g., Save for a down payment, pay off debt..." />
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