import AsyncStorage from '@react-native-community/async-storage';
import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import moment from 'moment';

import {electroMagnetic, desire, white} from './Color';

export const HistoryPage = () => {
  const [historyArray, setHistoryArray] = useState([]);

  useEffect(() => {
    const getAsyncData = async () => {
      try {
        const getAsyncData = await AsyncStorage.getItem('scannedData');
        const getAsyncObj = JSON.parse(getAsyncData);
        setHistoryArray(getAsyncObj);
      } catch (err) {
        console.log('get item error');
      }
    };

    getAsyncData();
  }, [historyArray]);

  // Clear
  const clearHistoryFunc = async () => {
    await AsyncStorage.clear();
  };

  // date format
  const dateFormatFunc = (data) => {
    const formattedDate = moment().format('DD/MM/YYYY');
    return formattedDate;
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerView}>
        <Text style={[styles.text, {color: white, fontWeight: 'bold'}]}>
          history
        </Text>
        <Text
          style={[styles.text, {paddingVertical: 10, fontSize: 16}]}
          onPress={clearHistoryFunc}>
          Clear History
        </Text>
      </View>
      <View style={styles.contentView}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}>
          {historyArray ? (
            historyArray.map((obj, index) => (
              <View style={styles.historyCard} key={index}>
                <Text style={styles.dateText}>{dateFormatFunc(obj.date)}</Text>
                <Text style={styles.cardText}>{obj.result}</Text>
              </View>
            ))
          ) : (
            <Text style={[styles.text, {alignSelf: 'center', color: white}]}>
              History Empty
            </Text>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: electroMagnetic,
  },
  headerView: {
    height: 50,
    flexDirection: 'row',
    backgroundColor: desire,
    elevation: 4,
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  text: {
    fontSize: 18,
    color: white,
    textTransform: 'capitalize',
    alignSelf: 'center',
  },
  contentView: {
    flex: 1,
  },
  scrollView: {
    padding: 10,
  },

  // history card
  historyCard: {
    padding: 10,
    backgroundColor: white,
    borderRadius: 6,
    marginBottom: 15,
  },
  dateText: {
    fontSize: 10,
    color: 'black',
    alignSelf: 'flex-end',
  },
  cardText: {
    fontSize: 18,
    color: 'black',
  },
});
