import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { retrieveTicket, updateTicket } from '../api/ticketAPI';
import { TicketData } from '../interfaces/TicketData';

const EditTicket = () => {
  const [ticket, setTicket] = useState<TicketData | undefined>();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const { id } = useParams(); // Get ID from URL params instead of location state

  const fetchTicket = async () => {
    setIsLoading(true);
    try {
      if (id) {
        const data = await retrieveTicket(Number(id));
        setTicket(data);
      } else {
        setError('No ticket ID provided');
      }
    } catch (err) {
      console.error('Failed to retrieve ticket:', err);
      setError('Failed to retrieve ticket');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchTicket();
  }, [id]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (ticket && ticket.id !== null){
      setIsLoading(true);
      updateTicket(ticket.id, ticket)
        .then(() => {
          navigate('/board'); // Navigate to board instead of root
        })
        .catch(error => {
          console.error('Error updating ticket:', error);
          setError('Failed to update ticket');
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
    else{
      console.error('Ticket data is undefined.');
      setError('Ticket data is missing');
    }
  }

  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTicket((prev) => (prev ? { ...prev, [name]: value } : undefined));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTicket((prev) => (prev ? { ...prev, [name]: value } : undefined));
  };

  return (
    <>
      <div className='container'>
        {isLoading ? (
          <div>Loading ticket data...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : ticket ? (
          <form className='form' onSubmit={handleSubmit}>
            <h1>Edit Ticket</h1>
            <label htmlFor='tName'>Ticket Name</label>
            <textarea
              id='tName'
              name='name'
              value={ticket.name || ''}
              onChange={handleTextAreaChange}
              />
            <label htmlFor='tStatus'>Ticket Status</label>
            <select
              name='status'
              id='tStatus'
              value={ticket.status || ''}
              onChange={handleChange}
            >
              <option value='Todo'>Todo</option>
              <option value='In Progress'>In Progress</option>
              <option value='Done'>Done</option>
            </select>
            <label htmlFor='tDescription'>Ticket Description</label>
            <textarea
              id='tDescription'
              name='description'
              value={ticket.description || ''}
              onChange={handleTextAreaChange}
            />
            <button 
              type='submit'
              disabled={isLoading}
            >
              {isLoading ? 'Updating...' : 'Submit Form'}
            </button>
          </form>
        ) : (
          <div>Issues fetching ticket</div>
        )}
      </div>  
    </>
  );
};

export default EditTicket;
