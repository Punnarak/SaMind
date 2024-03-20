// import React, { useState, useEffect } from 'react';
// import { Text, TouchableOpacity, View, StyleSheet, Alert } from 'react-native';
// import { Audio } from 'expo-av';
// import * as FileSystem from 'expo-file-system';
// import { FontAwesome } from '@expo/vector-icons';
// import { axiospython } from './axios'; // Import axiospython instead of axios

// export default function SpeechToTextPage() {
//   const [recording, setRecording] = useState(null);
//   const [recordingStatus, setRecordingStatus] = useState('idle');
//   const [audioPermission, setAudioPermission] = useState(null);
//   const [transcript, setTranscript] = useState('');

//   useEffect(() => {
//     // Get recording permission upon first render
//     async function getPermission() {
//       try {
//         const permission = await Audio.requestPermissionsAsync();
//         console.log('Permission Granted: ' + permission.granted);
//         setAudioPermission(permission.granted);
//       } catch (error) {
//         console.log(error);
//       }
//     }

//     // Call function to get recording permission
//     getPermission();
//     // Cleanup upon unmounting
//     return () => {
//       if (recording) {
//         stopRecording();
//       }
//     };
//   }, []);

//   async function startRecording() {
//     try {
//       // Needed for iOS
//       if (audioPermission) {
//         await Audio.setAudioModeAsync({
//           allowsRecordingIOS: true,
//           playsInSilentModeIOS: true
//         });
//       }

//       const newRecording = new Audio.Recording();
//       console.log('Starting Recording');
//       await newRecording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
//       await newRecording.startAsync();
//       setRecording(newRecording);
//       setRecordingStatus('recording');
//     } catch (error) {
//       console.error('Failed to start recording', error);
//     }
//   }

//   async function stopRecording() {
//     try {
//       if (recordingStatus === 'recording') {
//         console.log('Stopping Recording');
//         await recording.stopAndUnloadAsync();
//         const recordingUri = recording.getURI();
//         console.log('Recording URI:', recordingUri);
//         // Call speech to text API after recording stops
//         await convertSpeechToText(recordingUri);

//         // Reset states
//         setRecording(null);
//         setRecordingStatus('stopped');
//       }
//     } catch (error) {
//       console.error('Failed to stop recording', error);
//     }
//   }

//   async function convertSpeechToText(audioPath) {
//     try {
//         console.log('Audio file path:', audioPath);

//         // Send the absolute path of the audio file to the API
//         const formData = new FormData();
//         formData.append('path', audioPath); // Use 'path' as the key

//         const response = await axiospython.post('/speech-to-text', formData, {
//             headers: {
//                 'Content-Type': 'application/json', // Set Content-Type header
//             },
//         });

//         // Update transcript state with the response from the backend
//         setTranscript(response.data.transcription); // Adjust to match your API response structure
//     } catch (error) {
//         console.error('Failed to convert speech to text:', error);
//         Alert.alert('Error', 'Failed to convert speech to text');
//     }
// }


//   async function handleRecordButtonPress() {
//     if (recording) {
//       await stopRecording(recording.getURI());
//     } else {
//       await startRecording();
//     }
//   }

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity style={styles.button} onPress={handleRecordButtonPress}>
//         <FontAwesome name={recording ? 'stop-circle' : 'circle'} size={64} color="white" />
//       </TouchableOpacity>
//       <Text style={styles.recordingStatusText}>{`Recording status: ${recordingStatus}`}</Text>
//       {transcript ? <Text>{transcript}</Text> : null}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   button: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: 128,
//     height: 128,
//     borderRadius: 64,
//     backgroundColor: 'red',
//     marginBottom: 20,
//   },
//   recordingStatusText: {
//     marginTop: 16,
//   },
// });


// import React, { Component } from 'react'
// import {
//   StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Platform,
// } from 'react-native'
// import { Audio, Permissions, FileSystem } from 'expo'
// import axios from './axios' // Import your axios instance

// const recordingOptions = Platform.select({
//   ios: {
//     extension: '.wav',
//     audioQuality: 'High',
//     sampleRate: 44100,
//     numberOfChannels: 1,
//     bitRate: 128000,
//     linearPCMBitDepth: 16,
//     linearPCMIsBigEndian: false,
//     linearPCMIsFloat: false,
//   },
//   android: {
//     extension: '.m4a',
//     outputFormat: 'mpeg_4',
//     audioEncoder: 'aac',
//     sampleRate: 44100,
//     numberOfChannels: 1,
//     bitRate: 128000,
//   },
// });



// const styles = StyleSheet.create({
//   container: {
//     marginTop: 40,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//   },
//   button: {
//     backgroundColor: '#1e88e5',
//     paddingVertical: 20,
//     width: '90%',
//     alignItems: 'center',
//     borderRadius: 5,
//     padding: 8,
//     marginTop: 20,
//   },
//   text: {
//     color: '#fff',
//   }
// })

// export default class SpeechToTextButton extends Component {
//   constructor(props) {
//     super(props)
//     this.recording = null
//     this.state = {
//       isFetching: false,
//       isRecording: false,
//       transcript: '',
//     }
//   }

//   deleteRecordingFile = async () => {
//     try {
//       if (this.recording) {
//         const info = await FileSystem.getInfoAsync(this.recording.getURI());
//         if (info.exists) {
//           await FileSystem.deleteAsync(info.uri);
//         }
//       } else {
//         console.error('Recording object is undefined');
//       }
//     } catch (error) {
//       console.error('Error deleting recorded file:', error);
//     }
//   };
  
//   getTranscription = async () => {
//     try {
//       if (!this.recording) {
//         console.error('Recording object is undefined');
//         return;
//       }
  
//       const info = await FileSystem.getInfoAsync(this.recording.getURI());
//       if (!info.exists) {
//         console.error('Recorded file does not exist');
//         return;
//       }
  
//       const formData = new FormData();
//       formData.append('file', {
//         uri: info.uri,
//         type: Platform.OS === 'ios' ? 'audio/x-wav' : 'audio/m4a',
//         name: Platform.OS === 'ios' ? `${Date.now()}.wav` : `${Date.now()}.m4a`,
//       });
  
//       const { data } = await axios.post('/speech', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
  
//       this.setState({ transcript: data.transcript });
//     } catch (error) {
//       console.error('Error getting transcription:', error);
//     }
//   };
  
//   startRecording = async () => {
//     try {
//       const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
//       if (status !== 'granted') {
//         console.error('Permission to record audio not granted');
//         return;
//       }
  
//       this.recording = new Audio.Recording();
//       await this.recording.prepareToRecordAsync(recordingOptions);
  
//       await Audio.setAudioModeAsync({
//         allowsRecordingIOS: true,
//         interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
//         playsInSilentModeIOS: true,
//         interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
//         playThroughEarpieceAndroid: true,
//       });
  
//       await this.recording.startAsync();
//       this.setState({ isRecording: true });
//     } catch (error) {
//       console.error('Error starting recording:', error);
//       this.setState({ isRecording: false });
//     }
//   };
  
//   stopRecording = async () => {
//     this.setState({ isRecording: false });
//     try {
//       if (this.recording) {
//         await this.recording.stopAndUnloadAsync();
//       }
//     } catch (error) {
//       // Handle error
//     }
//   };
  

//   resetRecording = () => {
//     this.deleteRecordingFile()
//     this.recording = null
//   }

//   handleOnPressOut = () => {
//     this.stopRecording()
//     this.getTranscription()
//   }

//   render() {
//     const {
//       isRecording, transcript, isFetching,
//     } = this.state
//     return (
//       <View style={styles.container}>
//         <TouchableOpacity
//           style={styles.button}
//           onPressIn={this.startRecording}
//           onPressOut={this.handleOnPressOut}
//         >
//           {isFetching && <ActivityIndicator color="#ffffff" />}
//           {!isFetching && 
//             <Text style={styles.text}>
//               {isRecording ? 'Recording...' : 'Start recording'}
//             </Text>
//           }
//         </TouchableOpacity>
//         <Text>
//           {`${transcript}`}
//         </Text>
//       </View>
//     )
//   }
// }

import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, Alert } from 'react-native';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import { FontAwesome } from '@expo/vector-icons';
import { axios,axiospython } from './axios'; // Import axiospython instead of axios

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
      const fileType = 'audio/3gpp';
        console.log('Audio file path:', audioPath);

        // Send the absolute path of the audio file to the API
        // const formData = new FormData();
        // formData.append('path', audioPath); // Use 'path' as the key = {}
        const formData = {
          file: audioPath
        }
        console.log("param",formData)

        // const blob = await FileSystem.readAsStringAsync(audioPath, { encoding: FileSystem.EncodingType.Base64 });
        // const blobData = `data:${fileType};base64,${blob}`;
    
        // Prepare the blob for FormData
        // const formData = new FormData();
        // formData.append('file', {
        //     name: 'recording.3gp', // You may want to dynamically set the name
        //     type: fileType,
        //     uri: blobData,
        // });

  //       formData.append('file', fileBlob, 'filename.3gp');

  //       const response = await axios.post('/speech', formData)
  // .then(response => {
  //  console.log('success', response)
  // })
  // .catch(error => {
  //   // Handle error
  //   consolelog("error juuuuuuuuuuu",error)

  // });
let response = ''
  try {
     response = await FileSystem.uploadAsync("http://192.168.1.101:4343/speech", audioPath, {
      httpMethod: 'POST',
      uploadType: FileSystem.FileSystemUploadType.MULTIPART,
      fieldName: 'file', // Must match the field expected by your server
    });
    console.log('Upload result:', response);
  } catch (e) {
    console.error('Upload error:', e);
  }

        // const response = await axios.post('/speech', formData, {
        //     headers: {
        //         'Content-Type': 'application/json', // Set Content-Type header
        //         // 'Content-Type': 'multipart/form-data'

        //     },

        // });

      // const response = await axios.post('/speech', formData)
      //   .then(response => {
      //     // Handle success
      //     console.log(response);
      //   })
      //   .catch(error => {
      //     // Handle error
      //     console.error('Upload error', error);
      //   });
      console.log("response", response.body)
      // Update transcript state with the response from the backend
      setTranscript(response.body); // Adjust to match your API response structure
    } catch (error) {
      console.error('Failed to convert speech to text:', error);
      Alert.alert('Error', 'Failed to convert speech to text');
    }
  }


  async function handleRecordButtonPress() {
    if (recording) {
      await stopRecording(recording.getURI());
    } else {
      await startRecording();
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleRecordButtonPress}>
        <FontAwesome name={recording ? 'stop-circle' : 'circle'} size={64} color="white" />
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