import { toggleTheme } from '@/store/slices/uiSlice';
import type { RootState } from '@/store/store';
import { ArrowLeft, Moon, Sun } from 'lucide-react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export const PrivacyPolicy = () => {
    const theme = useSelector((state: RootState) => state.ui.theme);
    const dispatch = useDispatch();
    const isDark = theme === 'dark';

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDark]);

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
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                                Privacy Policy
                            </h1>
                            <p className="text-slate-600 dark:text-slate-400">
                                Last updated: December 5, 2025
                            </p>
                        </div>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                                1. Information We Collect
                            </h2>
                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                We collect information that you provide directly to us, including your name, email address,
                                and financial data that you choose to input into My-Fi. This information is used solely to
                                provide you with our personal finance management services.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                                2. How We Use Your Information
                            </h2>
                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                Your information is used to:
                            </p>
                            <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-300 ml-4">
                                <li>Provide and maintain our services</li>
                                <li>Process your transactions and manage your account</li>
                                <li>Send you important updates about your account</li>
                                <li>Improve and optimize our application</li>
                                <li>Ensure the security of your data</li>
                            </ul>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                                3. Data Security
                            </h2>
                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                We implement industry-standard security measures to protect your personal information.
                                All data is encrypted both in transit and at rest using Firebase's secure infrastructure.
                                We regularly review and update our security practices to ensure your data remains protected.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                                4. Data Sharing
                            </h2>
                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                We do not sell, trade, or rent your personal information to third parties. Your financial
                                data is private and will never be shared without your explicit consent, except as required
                                by law or to protect our rights.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                                5. Your Rights
                            </h2>
                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                You have the right to:
                            </p>
                            <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-300 ml-4">
                                <li>Access your personal data</li>
                                <li>Correct inaccurate data</li>
                                <li>Request deletion of your data</li>
                                <li>Export your data</li>
                                <li>Opt-out of marketing communications</li>
                            </ul>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                                6. Cookies and Tracking
                            </h2>
                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                We use cookies and similar tracking technologies to enhance your experience, analyze usage
                                patterns, and maintain your session. You can control cookie preferences through your browser
                                settings.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                                7. Changes to This Policy
                            </h2>
                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                We may update this Privacy Policy from time to time. We will notify you of any changes by
                                posting the new Privacy Policy on this page and updating the "Last updated" date.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                                8. Contact Us
                            </h2>
                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                If you have any questions about this Privacy Policy, please contact us at{' '}
                                <a href="mailto:privacy@my-fi.app" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                                    privacy@my-fi.app
                                </a>
                            </p>
                        </section>
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
                                className="text-indigo-600 dark:text-indigo-400 font-semibold"
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
                                className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
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
