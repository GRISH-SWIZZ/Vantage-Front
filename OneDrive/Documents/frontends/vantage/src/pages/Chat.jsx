import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Sparkles, AlertCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';
import TypingAnimation from '../components/ui/TypingAnimation';
import { chatSuggestions } from '../lib/constants';
import { chatWithVantage } from '../lib/api';

export default function Chat() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      content: "Hello! I'm Vantage, your AI security assistant. How can I help you today? You can ask me about threat analysis, security recommendations, or explain any blocked URLs.",
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: input,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    setError(null);

    try {
      // Call backend chat API
      const response = await chatWithVantage(input);
      
      const assistantMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: response.reply,
        timestamp: new Date().toLocaleTimeString(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error('Chat error:', err);
      setError('Failed to connect to Vantage AI. Please ensure the backend server is running.');
      
      // Add error message to chat
      const errorMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: "I'm having trouble connecting to my backend services. Please ensure the server is running at http://127.0.0.1:5000 and try again.",
        timestamp: new Date().toLocaleTimeString(),
        isError: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4"
      >
        <h1 className="text-3xl font-bold font-heading text-accent-gold text-glow-gold">
          Chat with Vantage
        </h1>
        <p className="text-accent-gold/60 mt-1">
          Your AI-powered security assistant
        </p>
      </motion.div>

      {/* Chat Container */}
      <Card className="flex-1 flex flex-col p-0 overflow-hidden" hover={false}>
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                {/* Avatar */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                  message.role === 'assistant' 
                    ? message.isError 
                      ? 'bg-primary-red/20 border border-primary-red/30'
                      : 'bg-gradient-to-br from-vibrant-orange to-accent-gold' 
                    : 'bg-primary-red/20 border border-primary-red/30'
                }`}>
                  {message.role === 'assistant' ? (
                    message.isError ? (
                      <AlertCircle className="w-5 h-5 text-primary-red" />
                    ) : (
                      <Bot className="w-5 h-5 text-deep-shadow" />
                    )
                  ) : (
                    <User className="w-5 h-5 text-primary-red" />
                  )}
                </div>

                {/* Message Bubble */}
                <div className={`max-w-[75%] ${message.role === 'user' ? 'text-right' : ''}`}>
                  <div className={`rounded-2xl px-4 py-3 ${
                    message.role === 'assistant'
                      ? message.isError
                        ? 'bg-primary-red/10 border border-primary-red/30 rounded-tl-sm'
                        : 'bg-deep-shadow/80 border border-accent-gold/20 rounded-tl-sm'
                      : 'bg-primary-red/20 border border-primary-red/30 rounded-tr-sm'
                  }`}>
                    <p className={`whitespace-pre-line text-sm leading-relaxed ${
                      message.isError ? 'text-primary-red' : 'text-accent-gold/90'
                    }`}>
                      {message.content}
                    </p>
                  </div>
                  <span className="text-xs text-accent-gold/40 mt-1 block">
                    {message.timestamp}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing Indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-vibrant-orange to-accent-gold flex items-center justify-center">
                <Bot className="w-5 h-5 text-deep-shadow" />
              </div>
              <div className="bg-deep-shadow/80 border border-accent-gold/20 rounded-2xl rounded-tl-sm">
                <TypingAnimation />
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggestions */}
        {messages.length === 1 && (
          <div className="px-4 pb-2">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-accent-gold/60" />
              <span className="text-xs text-accent-gold/60">Suggested questions</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {chatSuggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="px-3 py-1.5 rounded-full bg-accent-gold/10 border border-accent-gold/20 text-accent-gold/80 text-sm hover:bg-accent-gold/20 hover:border-accent-gold/30 transition-all"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t border-accent-gold/10">
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                disabled={isTyping}
              />
            </div>
            <Button
              onClick={handleSend}
              disabled={isTyping || !input.trim()}
              icon={Send}
            >
              Send
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
