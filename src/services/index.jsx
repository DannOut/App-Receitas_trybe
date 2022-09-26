export const fetchAPI = async (URL) => {
  try {
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  } catch (error) {
    return error.message;
  }
};

export const placeholder = 'placeholder';
