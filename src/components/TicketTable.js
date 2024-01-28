import React, { useState, useEffect } from 'react';

const TicketTable = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for filter values
  const [filters, setFilters] = useState({
    status: '',
    assignedAgent: '',
    severity: '',
    type: ''
  });

  // State for available options
  const [statusOptions, setStatusOptions] = useState([]);
  const [assignedAgentOptions, setAssignedAgentOptions] = useState([]);
  const [severityOptions, setSeverityOptions] = useState([]);
  const [typeOptions, setTypeOptions] = useState([]);

  useEffect(() => {
    // Fetch tickets with applied filters
    const fetchTickets = async () => {
      try {
        const params = new URLSearchParams(filters);
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/support-tickets?${params.toString()}`);
        if (!response.ok) {
          throw new Error('Failed to fetch tickets');
        }
        const data = await response.json();
        setTickets(data.tickets);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tickets:', error);
        setError('Failed to fetch tickets');
        setLoading(false);
      }
    };

    // Fetch available options for filters
    const fetchFilterOptions = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/support-tickets/filter-options`);
        if (!response.ok) {
          throw new Error('Failed to fetch filter options');
        }
        const { status, assignedAgent, severity, type } = await response.json();
        setStatusOptions(status);
        setAssignedAgentOptions(assignedAgent);
        setSeverityOptions(severity);
        setTypeOptions(type);
      } catch (error) {
        console.error('Error fetching filter options:', error);
      }
    };

    fetchTickets();
    fetchFilterOptions();
  }, [filters]);

  const handleFilterChange = e => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  console.log("tttttttttttttttttttt", tickets)
  return (
    <div>
      <h2>Tickets</h2>
      <div>
        <label>Status:</label>
        <select name="status" value={filters.status} onChange={handleFilterChange}>
          <option value="">All</option>
          {statusOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Assigned Agent:</label>
        <select name="assignedAgent" value={filters.assignedAgent} onChange={handleFilterChange}>
          <option value="">All</option>
          {assignedAgentOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Severity:</label>
        <select name="severity" value={filters.severity} onChange={handleFilterChange}>
          <option value="">All</option>
          {severityOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Type:</label>
        <select name="type" value={filters.type} onChange={handleFilterChange}>
          <option value="">All</option>
          {typeOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Topic</th>
            <th>Severity</th>
            <th>Assigned Agent</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map(ticket => (
            <tr key={ticket._id}>
              <td>{ticket._id}</td>
              <td>{ticket.topic}</td>
              <td>{ticket.severity}</td>
              <td>{ticket.assignedAgent?.name}</td>
              <td>{ticket.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TicketTable;
