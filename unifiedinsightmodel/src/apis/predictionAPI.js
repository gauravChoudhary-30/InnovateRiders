const apiUrl = 'http://127.0.0.1:5000';

const predictSentiment = async (text) => {
  try {
    const response = await fetch(`${apiUrl}/predict_sentiment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text })
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

const predictChurn = async (data) => {
  try {
      const response = await fetch('/predict_churn', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      });
      
      if (!response.ok) {
          throw new Error('Failed to fetch predictions');
      }

      const result = await response.json();
      return result.predictions; 

  } catch (error) {
      console.error('Error predicting churn:', error);
      return null; 
  }
};


export { predictSentiment , predictChurn };
