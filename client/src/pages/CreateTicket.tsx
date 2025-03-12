import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTicket } from '../api/ticketAPI';
import { TicketData } from '../interfaces/TicketData';
import { UserData } from '../interfaces/UserData';
import { retrieveUsers } from '../api/userAPI';

const CreateTicket = () => {
  const [newTicket, setNewTicket] = useState<TicketData>({
    id: 0,
    name: '',
    description: '',
    status: 'Todo',
    assignedUserId: 1,
    assignedUser: null
  });

  const navigate = useNavigate();

  const [users, setUsers] = useState<UserData[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const getAllUsers = async () => {
    try {
      const data = await retrieveUsers();
      setUsers(data || []);
    } catch (err) {
      console.error('Failed to retrieve user info', err);
      setError('Failed to load users. Please try again.');
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!newTicket.name || !newTicket.description) {
      setError('Please fill out all required fields');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    try {
      // Ensure assignedUserId is a number
      const ticketToCreate = {
        ...newTicket,
        assignedUserId: Number(newTicket.assignedUserId)
      };
      
      console.log('Creating ticket:', ticketToCreate);
      const data = await createTicket(ticketToCreate);
      console.log('Ticket created successfully:', data);
      
      // Navigate to board instead of root to avoid redirect to login
      navigate('/board');
    } catch (err) {
      console.error('Failed to create ticket:', err);
      setError(err instanceof Error ? err.message : 'Failed to create ticket. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewTicket({ ...newTicket, [name]: value });
  };

  const handleTextChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewTicket({ ...newTicket, [name]: value });
  };

  const handleUserChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewTicket({ ...newTicket, [name]: parseInt(value, 10) });
  };

  return (
    <>
      <div className='container'>
        <form className='form' onSubmit={handleSubmit}>
          <h1>Create Ticket</h1>
          
          {error && (
            <div className="error-message" style={{ color: 'red', marginBottom: '1rem' }}>
              {error}
            </div>
          )}
          
          <label htmlFor='tName'>Ticket Name</label>
          <textarea 
            id='tName'
            name='name'
            value={newTicket.name}
            onChange={handleTextAreaChange}
            required
          />
            
          <label htmlFor='tStatus'>Ticket Status</label>
          <select 
            name='status' 
            id='tStatus'
            value={newTicket.status}
            onChange={handleTextChange}
          >
            <option value='Todo'>Todo</option>
            <option value='In Progress'>In Progress</option>
            <option value='Done'>Done</option>
          </select>
          
          <label htmlFor='tDescription'>Ticket Description</label>
          <textarea 
            id='tDescription'
            name='description'
            value={newTicket.description}
            onChange={handleTextAreaChange}
            required
          />
          
          <label htmlFor='tUserId'>User's ID</label>
          <select
            id='tUserId'
            name='assignedUserId'
            value={String(newTicket.assignedUserId)}
            onChange={handleUserChange}
          >
            {users.map((user) => (
              <option key={user.id} value={String(user.id)}>
                {user.username}
              </option>
            ))}
            {users.length === 0 && (
              <option value="">No users available</option>
            )}
          </select>
          
          <button 
            type='submit' 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating...' : 'Submit Form'}
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateTicket;