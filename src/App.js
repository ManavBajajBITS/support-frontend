import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SupportAgentForm from './components/SupportAgentForm';
import SupportTicketForm from './components/SupportTicketForm';
import TicketTable from './components/TicketTable';

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/support-agent">Support Agent</Link>
            </li>
            <li>
              <Link to="/support-ticket">Support Ticket</Link>
            </li>
            <li>
              <Link to="/view-tickets">View Tickets</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/support-agent" element={<SupportAgentForm />}> </Route>
          <Route path="/support-ticket" element={<SupportTicketForm />}> </Route>
          <Route path="/view-tickets" element={<TicketTable />}></Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
