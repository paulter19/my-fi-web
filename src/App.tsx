import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { AccountDetails } from './pages/AccountDetails'
import { Accounts } from './pages/Accounts'
import { Bills } from './pages/Bills'
import { Dashboard } from './pages/Dashboard'
import { IncomePage } from './pages/Income'
import { Landing } from './pages/Landing'
import { Settings } from './pages/Settings'
import { Transactions } from './pages/Transactions'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/" element={<Layout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="accounts" element={<Accounts />} />
        <Route path="account/:id" element={<AccountDetails />} />
        <Route path="bills" element={<Bills />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="income" element={<IncomePage />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  )
}

export default App
