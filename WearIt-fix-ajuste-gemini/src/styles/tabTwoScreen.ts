import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  headerview: {
    width: '100%',
    minHeight: 65,
    maxHeight: 85,
    height: '10%',
    backgroundColor: '#ffffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    elevation: 5,
    marginTop: 15,
  },
  card: {
    margin: 8,
    backgroundColor: '#ffffffff',
    justifyContent: 'center',
    width: 395,
    maxWidth: '96%',
  },
  cardHeader: {
    flexDirection: 'row',
    textAlign: 'center',
    paddingTop: 12,
  },
  userIcon: {
    height: 50,
    minWidth: 70,
    borderRadius: 70,
    width: '15%',
    backgroundColor: '#c9c9c9ff',
    marginHorizontal: 4,
  },
  userName: {
    height: 50,
    width: 345,
    marginBottom: 8,
    backgroundColor: '#ffffffff',
  },
  text: {
    flexDirection: 'row',
    gap: 8,
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    paddingLeft: 12,
    paddingTop: 8,
  },
  container: {
    paddingHorizontal: 0,
    marginTop: 20,
    paddingBottom:10,
    display: 'flex',
    width: '100%',
    backgroundColor: '#ffffffff',
  },
  carouselContainer: {
    marginBottom: 20,
    width: '100%',
    height: 430,
  },
  carouselItemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    height: 430,
  },
  carouselImage: {
    width: '100%',
    height: 430,
    borderRadius: 8,
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
