import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, Alert } from 'react-native';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import { FontAwesome } from '@expo/vector-icons';
import { axiospython } from './axios'; // Import axiospython instead of axios

export default function SpeechToTextPage() {
  const [recording, setRecording] = useState(null);
  const [recordingStatus, setRecordingStatus] = useState('idle');
  const [audioPermission, setAudioPermission] = useState(null);
  const [transcript, setTranscript] = useState('');

  useEffect(() => {
    // Get recording permission upon first render
    async function getPermission() {
      try {
        const permission = await Audio.requestPermissionsAsync();
        console.log('Permission Granted: ' + permission.granted);
        setAudioPermission(permission.granted);
      } catch (error) {
        console.log(error);
      }
    }

    // Call function to get recording permission
    getPermission();
    // Cleanup upon unmounting
    return () => {
      if (recording) {
        stopRecording();
      }
    };
  }, []);

  async function startRecording() {
    try {
      // Needed for iOS
      if (audioPermission) {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true
        });
      }

      const newRecording = new Audio.Recording();
      console.log('Starting Recording');
      await newRecording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await newRecording.startAsync();
      setRecording(newRecording);
      setRecordingStatus('recording');
    } catch (error) {
      console.error('Failed to start recording', error);
    }
  }

  async function stopRecording() {
    try {
      if (recordingStatus === 'recording') {
        console.log('Stopping Recording');
        await recording.stopAndUnloadAsync();
        const recordingUri = recording.getURI();
        console.log('Recording URI:', recordingUri);
        // Call speech to text API after recording stops
        await convertSpeechToText(recordingUri);

        // Reset states
        setRecording(null);
        setRecordingStatus('stopped');
      }
    } catch (error) {
      console.error('Failed to stop recording', error);
    }
  }

  async function convertSpeechToText(audioPath) {
    try {
      console.log('Audio file path:', audioPath);

      // Send the absolute path of the audio file to the API
      const response = await axiospython.post('/speech-to-text', { path: audioPath });

      // Update transcript state with the response from the backend
      setTranscript(response.data.transcription);
    } catch (error) {
      console.error('Failed to convert speech to text:', error);
      Alert.alert('Error', 'Failed to convert speech to text');
    }
  }

  async function handleRecordButtonPress() {
    if (recording) {
      await stopRecording(recording);
    } else {
      await startRecording();
    }
  }

  async function handleTestFileUpload() {
    try {
      const testAudioPath = './test.wav'; // Path to the test audio file
      const response = await axiospython.post('/speech-to-text', { path: testAudioPath });
      console.log('Response:', response.data);
      setTranscript(response.data.transcription);
    } catch (error) {
      console.error('Failed to upload test file:', error);
      Alert.alert('Error', 'Failed to upload test file');
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleRecordButtonPress}>
        <FontAwesome name={recording ? 'stop-circle' : 'circle'} size={64} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleTestFileUpload}>
        <Text>Upload Test File</Text>
      </TouchableOpacity>
      <Text style={styles.recordingStatusText}>{`Recording status: ${recordingStatus}`}</Text>
      {transcript ? <Text>{transcript}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: 'red',
    marginBottom: 20,
  },
  recordingStatusText: {
    marginTop: 16,
  },
});