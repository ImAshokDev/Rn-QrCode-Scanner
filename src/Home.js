import AsyncStorage from '@react-native-community/async-storage';
import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Linking,
  Share,
  Image,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import AntDesign from 'react-native-vector-icons/AntDesign';

import scanImg from './Images/scan.jpg';

import {styles} from './Styles';

export const Home = () => {
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

  // async set item
  useEffect(() => {
    const setAsyncData = async () => {
      try {
        const checkGetData = await AsyncStorage.getItem('scannedData');
        const getAsyncObj = JSON.parse(checkGetData);
        if (values.result) {
          if (!checkGetData) {
            const firstArray = [];
            firstArray.push({result: values.result, date: new Date()});

            const scanData = JSON.stringify(firstArray);
            await AsyncStorage.setItem('scannedData', scanData);
          } else {
            getAsyncObj.push({result: values.result, date: new Date()});
            const scanData = JSON.stringify(getAsyncObj);
            await AsyncStorage.setItem('scannedData', scanData);
          }
        }
      } catch (err) {
        console.log('set item error', values.result);
      }
    };

    setAsyncData();
  }, [values.result]);

  return (
    <ScrollView style={styles.scrollView}>
      {!values.scan && !values.scanResult ? (
        <View style={styles.container}>
          <View style={styles.buttonView}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.btnText}>QR Code Scanner</Text>
            </TouchableOpacity>
          </View>
          <Image source={scanImg} style={styles.scanImg} />

          <View style={styles.buttonView}>
            <TouchableOpacity
              activeOpacity={0.4}
              style={[styles.button, {alignSelf: 'flex-end'}]}
              onPress={openScannerFunc}>
              <Text style={styles.btnText}>Scan QR Code</Text>
            </TouchableOpacity>
          </View>
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
