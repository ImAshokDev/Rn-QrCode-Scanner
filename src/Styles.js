import {StyleSheet} from 'react-native';
import {electroMagnetic, desire, white} from './Color';

export const styles = StyleSheet.create({
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

  scanImg: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginVertical: 40,
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
    marginTop: 100,
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
