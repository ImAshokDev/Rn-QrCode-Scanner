import AsyncStorage from '@react-native-community/async-storage';
import React, {useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Linking,
  Share,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {styles} from './Styles';

export const Home = () => {
  const [statusMsg, setStatusMsg] = useState('');
  const [historyArray, setHistoryArray] = useState(null);
  console.log('hittttt', historyArray);

  const [values, setValues] = useState({
    scan: false,
    scanResult: false,
    result: 'data3',
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

  // async set item

  const setAsyncData = async () => {
    try {
      const checkGetData = await AsyncStorage.getItem('scannedData');
      const getAsyncObj = JSON.parse(checkGetData);
      console.log(' asyncccc ', getAsyncObj);

      if (!checkGetData) {
        const firstArray = [];
        firstArray.push(values.result);
        const scanData = JSON.stringify(firstArray);
        await AsyncStorage.setItem('scannedData', scanData);
      } else {
        getAsyncObj.push(values.result);
        const scanData = JSON.stringify(getAsyncObj);
        await AsyncStorage.setItem('scannedData', scanData);
      }
    } catch (err) {
      console.log('set item error', values.result);
    }
  };

  // async get item

  const getAsyncData = async () => {
    // await AsyncStorage.clear();

    try {
      const getAsyncData = await AsyncStorage.getItem('scannedData');
      const getAsyncObj = JSON.parse(getAsyncData);
      setHistoryArray(getAsyncObj);
      console.log('get array ', getAsyncObj);
    } catch (err) {
      console.log('get item error');
    }
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

      <View style={styles.resultView}>
        <Text style={[styles.text, styles.resultText]}>history</Text>

        <TouchableOpacity
          activeOpacity={0.4}
          style={styles.button}
          onPress={setAsyncData}>
          <Text style={styles.btnText}>Set Item</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.4}
          style={styles.button}
          onPress={getAsyncData}>
          <Text style={styles.btnText}>get Item</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
