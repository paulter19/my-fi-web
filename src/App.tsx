import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { PrivateRoute } from './components/PrivateRoute'
import { AuthProvider } from './context/AuthContext'
import { AccountDetails } from './pages/AccountDetails'
import { Accounts } from './pages/Accounts'
import { Bills } from './pages/Bills'
import { Dashboard } from './pages/Dashboard'
import { FAQ } from './pages/FAQ'
import { IncomePage } from './pages/Income'
import { Landing } from './pages/Landing'
import { Login } from './pages/Login'
import { PrivacyPolicy } from './pages/PrivacyPolicy'
import { Settings } from './pages/Settings'
import { Signup } from './pages/Signup'
import { TermsOfService } from './pages/TermsOfService'
import { Transactions } from './pages/Transactions'


function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="accounts" element={<Accounts />} />
          <Route path="account/:id" element={<AccountDetails />} />
          <Route path="bills" element={<Bills />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="income" element={<IncomePage />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}

export default App
