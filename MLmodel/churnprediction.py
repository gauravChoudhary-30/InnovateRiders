# Importing Libraries
import pandas as pd
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
from sklearn.preprocessing import LabelEncoder
from transformers import pipeline
from wordcloud import WordCloud
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
import xgboost as xgb
from sklearn.metrics import roc_curve, roc_auc_score, precision_recall_curve, average_precision_score
import seaborn as sns

# Importing dfs
df = pd.read_csv('/content/ISMDatasetSentiment.csv', encoding='ISO-8859-1')
print(df.sample(5))
print(df.shape)
print(df.head())

# Checking Null values
print(df.isnull().sum())

# Checking duplicate values
print(df.duplicated().sum())

# Checking Churn Values
print(df['Churn'].value_counts())

# Plotting the values
plt.pie(df['Churn'].value_counts(), labels=['not churn', 'churn'], autopct="%0.2f")
plt.show()

# Encoding gender to binary value
lb = LabelEncoder()
df['Gender'] = lb.fit_transform(df['Gender'])
print(df.head())

# Adding Sentiment analysis to get sentiment score
sentiment_pipeline = pipeline("sentiment-analysis", model="cardiffnlp/twitter-roberta-base-sentiment")

def get_sentiment_score(text):
    if len(text) > 512:
        text = text[:510]
    try:
        result = sentiment_pipeline(text)[0]
        score = round(result['score'], 2)
        if result['label'] == 'LABEL_0':
            score *= -1
        return score
    except Exception as e:
        print(f"Error processing text: {text}, Error: {e}")
        return None

sample_texts = [
    "I love this product, it's amazing!",
    "This movie was terrible, I hated it.",
    "The weather today is perfect.",
    "I'm feeling neutral about this situation.",
]
results = list(map(get_sentiment_score, sample_texts))
for text, score in zip(sample_texts, results):
    print(f"Text: {text}")
    print(f"Sentiment Score: {score}")
    print()

df.loc[df['Sentiment_Score'].isnull(), 'Sentiment_Score'] = df[df['Sentiment_Score'].isnull()]['Summary'].apply(get_sentiment_score)

# Visual Feature Description
numerical_features = ['Tenure', 'AppTime', 'OrderIncrease', 'OrderCount', 'InactiveDays', 'CashbackAmount', 'Sentiment_Score']
df[numerical_features].hist(bins=20, figsize=(15, 10))
plt.show()

# Explore Categorical Features
plt.figure(figsize=(10, 5))
sns.countplot(x='Gender', hue='Churn', data=df)
plt.show()

plt.figure(figsize=(10, 5))
sns.countplot(x='Complain', hue='Churn', data=df)
plt.show()

# Correlation analysis
correlation_matrix = df[numerical_features].corr()
plt.figure(figsize=(12, 8))
sns.heatmap(correlation_matrix, annot=True, cmap="coolwarm", fmt=".2f")
plt.show()

# Feature Relationships
plt.figure(figsize=(12, 8))
sns.boxplot(x='Churn', y='Tenure', data=df)
plt.show()

plt.figure(figsize=(12, 8))
sns.scatterplot(x='OrderCount', y='Sentiment_Score', hue='Churn', data=df)
plt.show()

# Text Analysis
text = " ".join(review for review in df.Text)
wordcloud = WordCloud(max_font_size=50, max_words=100, background_color="white").generate(text)
plt.figure(figsize=(10, 6))
plt.imshow(wordcloud, interpolation="bilinear")
plt.axis("off")
plt.show()

# Feature Engineering
df['OrderRatio'] = df['OrderCount'] / df['OrderIncrease']
df.drop(columns=["Summary", "Text"], inplace=True)

# Feature Importance
X = df.drop('Churn', axis=1)
y = df['Churn']
model = RandomForestClassifier()
model.fit(X, y)
feature_importances = pd.Series(model.feature_importances_, index=X.columns)
feature_importances.nlargest(10).plot(kind='barh')
plt.show()

df['Sentiment_Score'] = df['Summary'].apply(get_sentiment_score)
print(df[['Summary', 'Sentiment_Score']].sample(6))

# Model Building
# Assuming X contains the features and y contains the target variable (Churn)

X = df.drop('Churn', axis=1)
y = df['Churn']

# Split the df into train and test sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Initialize and train the logistic regression model
model = LogisticRegression()
model.fit(X_train, y_train)

# Make predictions on the test set
y_pred = model.predict(X_test)

# Evaluate the model
accuracy = accuracy_score(y_test, y_pred)
print("Accuracy:", accuracy)

# Print classification report and confusion matrix
print(classification_report(y_test, y_pred))
print("Confusion Matrix:")
print(confusion_matrix(y_test, y_pred))

#XGBoost Classifier
# Assuming X contains the features and y contains the target variable (Churn)
X = df.drop('Churn', axis=1)
y = df['Churn']

# Split the df into train and test sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Initialize and train the XGBoost model
model = xgb.XGBClassifier()
model.fit(X_train, y_train)

# Make predictions on the test set
y_pred = model.predict(X_test)

# Evaluate the model
accuracy = accuracy_score(y_test, y_pred)
print("Accuracy:", accuracy)

# Print classification report and confusion matrix
print(classification_report(y_test, y_pred))
print("Confusion Matrix:")
print(confusion_matrix(y_test, y_pred))


# Evaluation and More
# The code for this section should continue here in the same manner as above.
