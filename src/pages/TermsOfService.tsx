import { toggleTheme } from '@/store/slices/uiSlice';
import type { RootState } from '@/store/store';
import { ArrowLeft, Moon, Sun } from 'lucide-react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export const TermsOfService = () => {
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
                                Terms of Service
                            </h1>
                            <p className="text-slate-600 dark:text-slate-400">
                                Last updated: December 5, 2025
                            </p>
                        </div>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                                1. Acceptance of Terms
                            </h2>
                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                By accessing and using My-Fi, you accept and agree to be bound by the terms and provisions
                                of this agreement. If you do not agree to these terms, please do not use our service.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                                2. Use of Service
                            </h2>
                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                My-Fi provides personal finance management tools to help you track expenses, manage budgets,
                                and achieve your financial goals. You agree to use the service only for lawful purposes and
                                in accordance with these Terms.
                            </p>
                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                You are responsible for:
                            </p>
                            <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-300 ml-4">
                                <li>Maintaining the confidentiality of your account credentials</li>
                                <li>All activities that occur under your account</li>
                                <li>Ensuring the accuracy of information you provide</li>
                                <li>Notifying us immediately of any unauthorized access</li>
                            </ul>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                                3. User Accounts
                            </h2>
                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                To use certain features of My-Fi, you must create an account. You must provide accurate,
                                current, and complete information during registration and keep your account information
                                updated. You are solely responsible for safeguarding your password.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                                4. Financial Information Disclaimer
                            </h2>
                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                My-Fi is a financial tracking and budgeting tool. We do not provide financial advice,
                                investment recommendations, or tax guidance. The information and analytics provided by
                                our service are for informational purposes only. You should consult with qualified
                                financial professionals before making financial decisions.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                                5. Prohibited Activities
                            </h2>
                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                You agree not to:
                            </p>
                            <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-300 ml-4">
                                <li>Use the service for any illegal purpose</li>
                                <li>Attempt to gain unauthorized access to our systems</li>
                                <li>Interfere with or disrupt the service</li>
                                <li>Upload malicious code or viruses</li>
                                <li>Violate any applicable laws or regulations</li>
                                <li>Impersonate another person or entity</li>
                            </ul>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                                6. Intellectual Property
                            </h2>
                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                All content, features, and functionality of My-Fi, including but not limited to text,
                                graphics, logos, and software, are owned by My-Fi and are protected by copyright,
                                trademark, and other intellectual property laws.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                                7. Limitation of Liability
                            </h2>
                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                My-Fi is provided "as is" without warranties of any kind. We shall not be liable for any
                                indirect, incidental, special, consequential, or punitive damages resulting from your use
                                of or inability to use the service.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                                8. Termination
                            </h2>
                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                We reserve the right to terminate or suspend your account and access to the service at our
                                sole discretion, without notice, for conduct that we believe violates these Terms or is
                                harmful to other users, us, or third parties.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                                9. Changes to Terms
                            </h2>
                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                We reserve the right to modify these Terms at any time. We will notify users of any material
                                changes by posting the new Terms on this page and updating the "Last updated" date. Your
                                continued use of the service after changes constitutes acceptance of the new Terms.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                                10. Contact Information
                            </h2>
                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                If you have any questions about these Terms, please contact us at{' '}
                                <a href="mailto:legal@my-fi.app" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                                    legal@my-fi.app
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
                                className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                            >
                                Privacy Policy
                            </Link>
                            <Link
                                to="/terms"
                                className="text-indigo-600 dark:text-indigo-400 font-semibold"
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
