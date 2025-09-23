import React, { useState } from 'react';
import { StyleSheet, Button, View } from 'react-native';
import { CameraView, useCameraPermissions, BarcodeScanningResult } from 'expo-camera';
import { ThemedText } from '@/components/themed-text';

export default function QRScannerScreen() {
  const [scanned, setScanned] = useState(false);
  const [openCamera, setOpenCamera] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();

  const handleBarCodeScanned = async ({ data }: BarcodeScanningResult) => {
    console.log('Zeskanowano:', data);
    setScanned(true);
    setOpenCamera(false);
  };

  if (!permission) {
    return (
      <View style={styles.container}>
        <ThemedText>Sprawdzanie uprawnień...</ThemedText>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <ThemedText>Brak dostępu do aparatu</ThemedText>
        <Button title="Daj dostęp do kamery" onPress={requestPermission} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {openCamera ? (
        <CameraView
          style={StyleSheet.absoluteFillObject}
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ['qr'],
          }}
        />
      ) : (
        <Button title="Otwórz kamerę" onPress={() => setOpenCamera(true)} />
      )}
      {scanned && (
        <View style={styles.buttonContainer}>
          <Button title="Skanuj ponownie" onPress={() => setScanned(false)} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
});