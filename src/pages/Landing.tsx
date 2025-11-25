import { toggleTheme } from '@/store/slices/uiSlice';
import type { RootState } from '@/store/store';
import { ArrowRight, Download, Moon, Sun } from 'lucide-react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export const Landing = () => {
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
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <span className="text-white font-bold text-2xl">M</span>
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-gradient">My-Fi</h1>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Personal Finance</p>
                    </div>
                </div>

                <button
                    onClick={() => dispatch(toggleTheme())}
                    className="p-3 rounded-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-800 transition-all duration-200 shadow-md hover:shadow-lg border border-slate-200 dark:border-slate-700"
                >
                    {isDark ? <Sun size={20} className="text-slate-200" /> : <Moon size={20} className="text-slate-700" />}
                </button>
            </header>

            {/* Hero Section */}
            <main className="relative z-10 px-6 py-12 md:py-20">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left Column - Content */}
                        <div className="space-y-8 animate-fade-in">
                            <div className="space-y-4">
                                <div className="inline-block">
                                    <span className="px-4 py-2 rounded-full bg-gradient-to-r from-indigo-600/10 to-purple-600/10 dark:from-indigo-600/20 dark:to-purple-600/20 text-indigo-600 dark:text-indigo-400 text-sm font-semibold border border-indigo-600/20 dark:border-indigo-600/30">
                                        ✨ Smart Financial Management
                                    </span>
                                </div>

                                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white leading-tight">
                                    Take Control of Your{' '}
                                    <span className="text-gradient">Finances</span>
                                </h1>

                                <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 leading-relaxed">
                                    Track expenses, manage budgets, and achieve your financial goals with our beautiful and intuitive platform.
                                </p>
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link
                                    to="/dashboard"
                                    className="group btn-primary flex items-center justify-center gap-2 text-lg"
                                >
                                    Start Budgeting
                                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </Link>

                                <a
                                    href="#"
                                    className="group flex items-center justify-center gap-3 px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
                                >
                                    <Download size={20} />
                                    <div className="text-left">
                                        <div className="text-xs opacity-80">Download on the</div>
                                        <div className="text-sm font-bold">App Store</div>
                                    </div>
                                </a>
                            </div>
                        </div>

                        {/* Right Column - App Screenshots */}
                        <div className="relative animate-fade-in delay-200">
                            <div className="relative flex items-center justify-center gap-6">
                                {/* Screenshot 1 */}
                                <div className="relative transform -rotate-6 hover:rotate-0 transition-transform duration-500">
                                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl blur-2xl opacity-30" />
                                    <div className="relative card-glass p-3 rounded-3xl shadow-2xl">
                                        <img
                                            src="/app-screenshot-1.png"
                                            alt="My-Fi App Dashboard"
                                            className="rounded-2xl w-64 md:w-72 lg:w-80 h-auto"
                                        />
                                    </div>
                                </div>

                                {/* Screenshot 2 */}
                                <div className="relative transform rotate-6 hover:rotate-0 transition-transform duration-500 mt-12">
                                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl blur-2xl opacity-30" />
                                    <div className="relative card-glass p-3 rounded-3xl shadow-2xl">
                                        <img
                                            src="/app-screenshot-2.png"
                                            alt="My-Fi App Accounts"
                                            className="rounded-2xl w-64 md:w-72 lg:w-80 h-auto"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Features Section */}
            <section className="relative z-10 px-6 py-16 md:py-24">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                            Everything You Need to{' '}
                            <span className="text-gradient">Succeed</span>
                        </h2>
                        <p className="text-xl text-slate-600 dark:text-slate-300">
                            Powerful features to help you manage your money better
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="card-glass p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
                            <div className="w-14 h-14 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <span className="text-3xl">📊</span>
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                                Smart Analytics
                            </h3>
                            <p className="text-slate-600 dark:text-slate-300">
                                Visualize your spending patterns with beautiful charts and insights that help you make better financial decisions.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="card-glass p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
                            <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <span className="text-3xl">💰</span>
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                                Budget Tracking
                            </h3>
                            <p className="text-slate-600 dark:text-slate-300">
                                Set budgets for different categories and track your progress in real-time with smart notifications.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="card-glass p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
                            <div className="w-14 h-14 bg-gradient-to-br from-pink-600 to-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <span className="text-3xl">🔒</span>
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                                Secure & Private
                            </h3>
                            <p className="text-slate-600 dark:text-slate-300">
                                Your financial data is encrypted and stored securely. We never share your information with third parties.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="relative z-10 px-6 py-12 border-t border-slate-200 dark:border-slate-800">
                <div className="max-w-7xl mx-auto text-center">
                    <p className="text-slate-600 dark:text-slate-400">
                        © 2025 My-Fi. Built with ❤️ for better financial management.
                    </p>
                </div>
            </footer>
        </div>
    );
};
