import axios from 'axios';

export const createNote = async (authToken, description) => {
  try {
    const response = await axios.post('http://localhost:4002/notes/new-note', description, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    console.log(description);

    return response.data;
  } catch (error) {
    console.error('Error creating note:', error);
    throw error;
  }
};

export const getNotes = async (authToken) => {
  try {
    const response = await axios.get('http://localhost:4002/notes/all', {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    return response;
  } catch (error) {
    console.error('Error fetching notes:', error);
    throw error;
  }
};

