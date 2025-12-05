import { toggleTheme } from '@/store/slices/uiSlice';
import type { RootState } from '@/store/store';
import { ArrowLeft, ChevronDown, Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

interface FAQItem {
    question: string;
    answer: string;
}

const faqData: FAQItem[] = [
    {
        question: "What is My-Fi?",
        answer: "My-Fi is a modern personal finance management application that helps you track expenses, manage budgets, monitor accounts, and achieve your financial goals. It provides beautiful visualizations and insights to help you make better financial decisions."
    },
    {
        question: "Is My-Fi free to use?",
        answer: "Yes! My-Fi offers a free tier with essential features for personal finance management. We also offer premium plans with advanced features like unlimited accounts, detailed analytics, and priority support."
    },
    {
        question: "How secure is my financial data?",
        answer: "Security is our top priority. All your data is encrypted both in transit and at rest using industry-standard encryption protocols. We use Firebase's secure infrastructure and never store sensitive banking credentials. Your data is private and will never be shared with third parties."
    },
    {
        question: "Can I connect my bank accounts?",
        answer: "Yes, My-Fi supports secure bank account connections through Stripe integration. This allows you to automatically sync transactions and account balances. All connections are secured with bank-level encryption."
    },
    {
        question: "What types of accounts can I track?",
        answer: "You can track various account types including checking accounts, savings accounts, credit cards, investment accounts, and cash. Each account type has customized features to help you manage it effectively."
    },
    {
        question: "How do I create a budget?",
        answer: "Creating a budget is easy! Navigate to the Bills section where you can set up recurring expenses and budget categories. You can also track one-time expenses and monitor your spending against your budget in real-time."
    },
    {
        question: "Can I access My-Fi on mobile devices?",
        answer: "Yes! My-Fi is fully responsive and works seamlessly on all devices including smartphones, tablets, and desktop computers. We also have a dedicated mobile app available on the App Store."
    },
    {
        question: "How do I categorize transactions?",
        answer: "When adding transactions, you can assign them to predefined categories like groceries, utilities, entertainment, etc. You can also create custom categories to match your specific needs. Categories help you understand your spending patterns better."
    },
    {
        question: "Can I export my financial data?",
        answer: "Absolutely! You can export your transaction history, account summaries, and reports in various formats including CSV and PDF. This is useful for tax preparation or sharing with financial advisors."
    },
    {
        question: "What if I forget my password?",
        answer: "No worries! Click on the 'Forgot Password' link on the login page, and we'll send you a password reset email. Follow the instructions in the email to create a new password and regain access to your account."
    },
    {
        question: "How do I delete my account?",
        answer: "If you wish to delete your account, go to Settings and select 'Delete Account'. Please note that this action is permanent and will remove all your data from our servers. Make sure to export any data you want to keep before deleting your account."
    },
    {
        question: "Do you offer customer support?",
        answer: "Yes! We offer email support for all users. Premium users get priority support with faster response times. You can reach us at support@my-fi.app for any questions or issues."
    }
];

export const FAQ = () => {
    const theme = useSelector((state: RootState) => state.ui.theme);
    const dispatch = useDispatch();
    const isDark = theme === 'dark';
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDark]);

    const toggleQuestion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Animated Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950" />

            {/* Animated Gradient Orbs */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/30 rounded-full blur-3xl animate-pulse delay-1000" />

            {/* Header */}
            <header className="relative z-10 px-6 py-6 flex items-center justify-between max-w-7xl mx-auto">
                <div className="flex items-center gap-3">
                    <Link to="/" className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                            <span className="text-white font-bold text-2xl">M</span>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gradient">My-Fi</h1>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Personal Finance</p>
                        </div>
                    </Link>
                </div>

                <button
                    onClick={() => dispatch(toggleTheme())}
                    className="p-3 rounded-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-800 transition-all duration-200 shadow-md hover:shadow-lg border border-slate-200 dark:border-slate-700"
                >
                    {isDark ? <Sun size={20} className="text-slate-200" /> : <Moon size={20} className="text-slate-700" />}
                </button>
            </header>

            {/* Content */}
            <main className="relative z-10 px-6 py-12">
                <div className="max-w-4xl mx-auto">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 mb-8 transition-colors"
                    >
                        <ArrowLeft size={20} />
                        Back to Home
                    </Link>

                    <div className="card-glass p-8 md:p-12 space-y-8">
                        <div className="text-center">
                            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                                Frequently Asked Questions
                            </h1>
                            <p className="text-slate-600 dark:text-slate-400 text-lg">
                                Find answers to common questions about My-Fi
                            </p>
                        </div>

                        <div className="space-y-4 mt-12">
                            {faqData.map((item, index) => (
                                <div
                                    key={index}
                                    className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden transition-all duration-200 hover:shadow-md"
                                >
                                    <button
                                        onClick={() => toggleQuestion(index)}
                                        className="w-full px-6 py-4 flex items-center justify-between bg-white dark:bg-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                                    >
                                        <span className="text-left font-semibold text-slate-900 dark:text-white">
                                            {item.question}
                                        </span>
                                        <ChevronDown
                                            size={20}
                                            className={`text-slate-600 dark:text-slate-400 transition-transform duration-200 flex-shrink-0 ml-4 ${openIndex === index ? 'rotate-180' : ''
                                                }`}
                                        />
                                    </button>
                                    {openIndex === index && (
                                        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-700">
                                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                                {item.answer}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 rounded-xl border border-indigo-200 dark:border-indigo-800">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                                Still have questions?
                            </h3>
                            <p className="text-slate-600 dark:text-slate-300 mb-4">
                                Can't find the answer you're looking for? Please reach out to our support team.
                            </p>
                            <a
                                href="mailto:support@my-fi.app"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
                            >
                                Contact Support
                            </a>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="relative z-10 px-6 py-12 border-t border-slate-200 dark:border-slate-800 mt-12">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <p className="text-slate-600 dark:text-slate-400">
                            © 2025 My-Fi. Built with ❤️ for better financial management.
                        </p>
                        <div className="flex gap-6">
                            <Link
                                to="/privacy"
                                className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                            >
                                Privacy Policy
                            </Link>
                            <Link
                                to="/terms"
                                className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                            >
                                Terms of Service
                            </Link>
                            <Link
                                to="/faq"
                                className="text-indigo-600 dark:text-indigo-400 font-semibold"
                            >
                                FAQ
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};
