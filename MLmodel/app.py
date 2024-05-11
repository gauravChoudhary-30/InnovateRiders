from flask import Flask, request, jsonify
from transformers import pipeline
from flask_cors import CORS 

app = Flask(__name__)
CORS(app) 
sentiment_pipeline = pipeline("sentiment-analysis" , model = "cardiffnlp/twitter-roberta-base-sentiment")

label_mapping = {
    'LABEL_0': 'Negative',
    'LABEL_1': 'Neutral',
    'LABEL_2': 'Positive'
}
def score_to_rank(label, score):
    if label == 'Positive':
        if score > 0.7:
            return 'High'
        elif score > 0.5:
            return 'Medium'
        else:
            return 'Low'
    elif label == 'Negative':
        if score > 0.7:
            return 'Low'
        elif score > 0.5:
            return 'Medium'
        else:
            return 'High'
    else:
        return 'N/A'
    
@app.route('/')
def home():
    return 'Python Server running'

@app.route('/predict_sentiment', methods=['POST'])
def predict_sentiment():
    data = request.json
    text = data['text']
    result = sentiment_pipeline(text)
    sentiment_label = label_mapping[result[0]['label']]
    sentiment_score = result[0]['score']
    sentiment_score_rank = score_to_rank(sentiment_label, sentiment_score)
    return jsonify({
        'sentiment': sentiment_label,
        'score_rank': sentiment_score_rank
    })

if __name__ == '__main__':
    app.run(debug=True)
