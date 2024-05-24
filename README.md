# Movie-Review-Predictor

## About This Project
The Movie-Review-Predictor is a comprehensive machine learning application designed to predict the sentiment of movie reviews. Utilizing a bag of words model, this project offers both a Flask-based backend and a user-friendly frontend for real-time sentiment prediction. This tool is ideal for movie databases, review aggregators, and content platforms seeking to enhance user interaction by providing sentiment analysis.

## Project Structure

- **frontend/**: Contains the frontend application files for user interaction.
- **IMDB_review_predictor.h5**: The trained machine learning model file.
- **imdb.ipynb**: Jupyter notebook with model training and evaluation.
- **meta.tsv**, **vecs.tsv**: TSV files for model metadata and embeddings visualizations.
- **model_hosting.py**: Python script for hosting the model using Flask.
- **requirements.txt**: Required libraries for the project to run.
- **tokenizer_subword.subwords**: Tokenizer file for text preprocessing.

## Setup & Installation

1. **Clone the Repository**
```bash
git clone https://github.com/yourusername/Movie-Review-Predictor.git
cd Movie-Review-Predictor
```

2. **Install Dependencies**
```bash
pip install -r requirements.txt
```
3. **Run the Flask Application**
```bash
python model_hosting.py
```
## Usage
After setting up the project, you can input movie reviews through the frontend interface. The application will then use the bag of words model to predict and display the sentiment of the review.

## Contributing
Contributions to the Movie-Review-Predictor are welcome. Please ensure to update tests as appropriate and follow the existing coding style.
