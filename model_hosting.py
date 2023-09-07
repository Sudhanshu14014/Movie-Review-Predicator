from flask import request, jsonify, Flask
import keras
from keras.models import load_model
import tensorflow_datasets as tfds
import tensorflow as tf
import sys

app = Flask(__name__)


def get_model():
    global model
    model = load_model('IMDB_review_predictor.h5')
    print("Model Loaded!")


def get_tokenizer():
    global tokenizer_subword
    # Load the tokenizer from the file
    tokenizer_subword = tfds.deprecated.text.SubwordTextEncoder.load_from_file(
        'tokenizer_subword')


print("Loading model...")
get_model()
get_tokenizer()


@app.route("/home")
def running():
    return "Flask is running!"


@app.route("/predict", methods=["POST"])
def predict():
    try:
        message = request.get_json(force=True)

        user_input_encoded = tokenizer_subword.encode(message['text'])

        predicted_prob = model.predict([user_input_encoded])

        response = {
            'sentiment': str(predicted_prob),
        }

        return jsonify(response)
    except Exception as e:
        print(str(e) + " this is fuck up")
        return jsonify({'error': str(e)})


if __name__ == "__main__":
    app.run()
