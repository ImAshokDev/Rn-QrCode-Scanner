import React, {useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Linking,
  Share,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import AntDesign from 'react-native-vector-icons/AntDesign';

const App = () => {
  const [statusMsg, setStatusMsg] = useState('');

  const [values, setValues] = useState({
    scan: false,
    scanResult: false,
    result: '',
    linkCheck: '',
  });

  const scanningSuccess = (e) => {
    const httpCheck = e.data.substring(0, 4);

    setValues({
      scan: false,
      scanResult: true,
      result: e.data,
      linkCheck: httpCheck,
    });
  };

  const openLinkFunc = () => {
    if (values.linkCheck === 'http') {
      Linking.openURL(values.result);
    } else {
      setStatusMsg('Not a valid URL');
    }
  };

  // share
  const onShare = async () => {
    await Share.share({
      message: values.result,
    });
  };

  const openScannerFunc = () => {
    setValues({scan: !values.scan});
    setStatusMsg('');
  };

  return (
    <ScrollView style={styles.scrollView}>
      {!values.scan && !values.scanResult ? (
        <View style={styles.buttonView}>
          <TouchableOpacity
            activeOpacity={0.4}
            style={styles.button}
            onPress={openScannerFunc}>
            <Text style={styles.btnText}>Scan QR Code</Text>
          </TouchableOpacity>
        </View>
      ) : null}

      {values.scan ? (
        <QRCodeScanner
          containerStyle={styles.scanContainer}
          reactivate={true}
          showMarker={true}
          markerStyle={styles.markerStyle}
          cameraStyle={styles.scannerCamera}
          onRead={scanningSuccess}
        />
      ) : null}

      {values.scan && (
        <TouchableOpacity
          activeOpacity={0.4}
          style={styles.button}
          onPress={openScannerFunc}>
          <Text style={styles.btnText}>Stop scan</Text>
        </TouchableOpacity>
      )}

      {!values.scan && values.scanResult ? (
        <View style={styles.resultView}>
          {statusMsg ? (
            <Text style={[styles.text, styles.statusText]}>{statusMsg}</Text>
          ) : null}

          <View style={styles.resultDataView}>
            <Text style={[styles.text, styles.resultText]}>
              {values.result}
            </Text>
          </View>

          <View style={styles.resultButtonView}>
            <TouchableOpacity
              activeOpacity={0.4}
              style={[styles.button, styles.siteButton]}
              onPress={openLinkFunc}>
              <Text style={styles.btnText}>Go to site</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.4}
              style={styles.shareButton}
              onPress={onShare}>
              <AntDesign name="sharealt" style={styles.shareIcon} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            activeOpacity={0.4}
            style={styles.button}
            onPress={openScannerFunc}>
            <Text style={styles.btnText}>Scan Again</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </ScrollView>
  );
};

// colors

const electroMagnetic = '#2f3640';
const desire = '#eb3b5a';
const white = '#ffffff';

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: electroMagnetic,
  },

  button: {
    backgroundColor: desire,
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginBottom: 25,
    justifyContent: 'center',
  },
  btnText: {
    color: white,
    alignSelf: 'center',
    fontSize: 20,
  },

  // qr code scanner view

  scanContainer: {
    width: '100%',
    height: 400,
    alignSelf: 'center',
  },
  scannerCamera: {
    alignSelf: 'center',
  },
  markerStyle: {
    borderColor: white,
  },

  // result view

  resultView: {
    backgroundColor: white,
    padding: 10,
  },
  text: {
    color: 'black',
    fontSize: 18,
    marginBottom: 8,
    alignSelf: 'center',
  },
  statusText: {
    color: 'red',
  },
  resultDataView: {
    borderRadius: 2,
    borderWidth: 0.2,
    borderColor: 'black',
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: 'center',
    marginVertical: 20,
    backgroundColor: '#f1f2f6',
  },
  resultText: {
    fontSize: 18,
    alignSelf: 'center',
  },
  resultButtonView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  siteButton: {
    height: 50,
    paddingHorizontal: 20,
    borderRadius: 25,
    backgroundColor: electroMagnetic,
  },
  shareButton: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: electroMagnetic,
    justifyContent: 'center',
  },
  shareIcon: {
    fontSize: 25,
    color: white,
    alignSelf: 'center',
  },
});

export default App;
