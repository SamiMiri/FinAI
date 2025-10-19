import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Chat } from '@google/genai';
import { marked } from 'marked';
import type { FormData } from '../App';
import { ChatMessage } from '../components/ChatMessage';

interface PlanPageProps {
  formData: FormData;
  onBack: () => void;
}

interface Message {
  role: 'user' | 'model';
  text: string;
}

export const PlanPage: React.FC<PlanPageProps> = ({ formData, onBack }) => {
  const [chat, setChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    const initChat = async () => {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const newChat = ai.chats.create({
          model: 'gemini-2.5-flash',
        });
        setChat(newChat);

        const initialPrompt = `
You are OptiLife, an expert financial advisor AI. Your tone is encouraging, empathetic, and professional. You provide clear, actionable financial advice.

A new user, ${formData.name}, has provided their information. Your task is to analyze their data and give them a concise and highly actionable starting point.

Instead of a full, overwhelming financial plan, identify the **top 2-3 most impactful, small, and actionable steps** they can take right now to move towards their primary goal of "${formData.financial_goal}".

1.  Start with a warm welcome to ${formData.name}.
2.  Present these 2-3 steps as a simple, numbered list using Markdown.
3.  For each step, briefly explain *why* it's important based on their specific financial situation.
4.  Keep the language simple and direct.

Here is the user's data for your analysis:
- Monthly Income: $${formData.monthly_income}
- Monthly Expenses: $${formData.monthly_expenses}
- Total Debt: $${formData.total_debt}
- Bank Balance: $${formData.bank_account_balance}
- Primary Goal: "${formData.financial_goal}"
- Other user details: Age: ${formData.age}, Employment: ${formData.employment_status}, Housing: ${formData.housing_situation}

After presenting the initial steps, end with a question to encourage conversation, such as "These are just the first few steps to get you started. Which one would you like to explore in more detail?"
        `;

        setMessages([]); 
        setIsLoading(true);

        const responseStream = await newChat.sendMessageStream({ message: initialPrompt });
        
        let currentText = '';
        setMessages([{ role: 'model', text: '...' }]);

        for await (const chunk of responseStream) {
          currentText += chunk.text;
          setMessages([{ role: 'model', text: currentText }]);
        }
        
      } catch (error) {
        console.error("Chat initialization failed:", error);
        setMessages([{ role: 'model', text: 'Sorry, I encountered an error while generating your plan. Please try again.' }]);
      } finally {
        setIsLoading(false);
      }
    };

    initChat();
  }, [formData]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || !chat || isLoading) return;

    const userMessage: Message = { role: 'user', text: userInput };
    setMessages(prev => [...prev, userMessage]);
    setUserInput('');
    setIsLoading(true);

    try {
      const responseStream = await chat.sendMessageStream({ message: userInput });
      
      let currentText = '';
      setMessages(prev => [...prev, { role: 'model', text: '...' }]);

      for await (const chunk of responseStream) {
        currentText += chunk.text;
        setMessages(prev => {
            const newMessages = [...prev];
            newMessages[newMessages.length - 1] = { role: 'model', text: currentText };
            return newMessages;
        });
      }

    } catch (error) {
      console.error("Error sending message:", error);
      setMessages(prev => [...prev, { role: 'model', text: 'My apologies, I ran into a problem. Could you please rephrase that?' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-brand-blue p-4 sm:p-6 rounded-xl shadow-lg border border-slate-700 flex flex-col h-[calc(100vh-12rem)]">
      <div className="flex-grow overflow-y-auto pr-4 -mr-4 space-y-4">
        {messages.map((msg, index) => (
          <ChatMessage key={index} message={msg} />
        ))}
        {isLoading && messages.length > 0 && messages[messages.length-1].role === 'user' && (
             <ChatMessage message={{role: 'model', text: '...'}} />
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="mt-6 pt-4 border-t border-slate-700/50">
        <form onSubmit={handleSendMessage} className="flex items-center gap-3">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Ask a follow-up question..."
            className="flex-grow bg-brand-blue-light border border-slate-600 rounded-md py-2 px-3 text-white focus:ring-brand-teal-light focus:border-brand-teal-light transition"
            disabled={isLoading}
          />
          <button type="submit" disabled={isLoading || !userInput.trim()} className="bg-brand-teal text-white font-bold py-2 px-5 rounded-lg shadow-md hover:bg-brand-teal-light hover:text-brand-blue transition-all duration-300 disabled:bg-slate-500 disabled:cursor-not-allowed">
            Send
          </button>
        </form>
      </div>
       <div className="text-center mt-4">
          <button onClick={onBack} className="text-sm text-slate-400 hover:text-white transition-colors">
              &larr; Back to form
          </button>
      </div>
    </div>
  );
};