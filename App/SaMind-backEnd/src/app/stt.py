from flask import Flask, request, jsonify
from google.cloud import speech
from google.oauth2 import service_account
from pydub import AudioSegment
import os

app = Flask(__name__)

# Load service account credentials from JSON key file
credentials = service_account.Credentials.from_service_account_file('./sa_speech.json')

# Initialize Google Cloud Speech client with explicit credentials
client = speech.SpeechClient(credentials=credentials)

# Function to transcribe audio
def transcribe_audio(audio_content):
    try:
        # Perform speech-to-text conversion
        audio = speech.RecognitionAudio(content=audio_content)
        config = speech.RecognitionConfig(
            encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
            sample_rate_hertz=44100,
            language_code="th-TH",
        )

        print("Sending audio for transcription...")

        response = client.recognize(config=config, audio=audio)

        print("Transcription received.")

        # Extracting text from response
        transcripts = [result.alternatives[0].transcript for result in response.results]
        final_text = '\n'.join(transcripts)

        if final_text:
            print("Transcription successful.")
            return final_text
        else:
            print("No transcription results found.")
            return None
    except Exception as e:
        print("Error occurred during speech-to-text conversion:", str(e))
        return None

@app.route('/speech-to-text', methods=['POST'])
def handle_speech_to_text():
    try:
        # Check if the request contains the path of an audio file
        if 'path' in request.json:
            audio_path = request.json['path']
            print("Audio path received:", audio_path)
            # Check if the audio file exists
            if not os.path.exists(audio_path):
                print("can't find")
                audio_path = "./t2.wav"
                # return jsonify({'error': 'Audio file not found'}), 404
            # Convert stereo to mono
            print("Audio path received:", audio_path)
            audio = AudioSegment.from_file(audio_path)
            audio = audio.set_channels(1)
            audio_content = audio.raw_data
            transcript = transcribe_audio(audio_content)
            print("tran:", transcript)
            if transcript:
                return jsonify({'transcription': transcript}), 200
            else:
                return jsonify({'error': 'Failed to transcribe audio'}), 500
        else:
            # Fallback to using test.wav
            test_audio_path = './test.wav'
            print("Audio path received:", audio_path)
            if not os.path.exists(test_audio_path):
                return jsonify({'error': 'Test audio file not found'}), 404
            # Convert stereo to mono
            audio = AudioSegment.from_file(test_audio_path)
            audio = audio.set_channels(1)
            audio_content = audio.raw_data
            transcript = transcribe_audio(audio_content)

            if transcript:
                return jsonify({'transcription': transcript}), 200
            else:
                return jsonify({'error': 'Failed to transcribe audio'}), 500
    except Exception as e:
        print("Error occurred:", str(e))
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='192.168.1.38', port=5000)