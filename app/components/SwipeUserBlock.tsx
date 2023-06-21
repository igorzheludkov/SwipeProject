import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

interface IProps {
  url: string;
  width: number;
  height: number;
  title: string;
  description: string;
  onLike: () => void;
  onDislike: () => void;
}

export default function SwipeUserBlock(props: IProps) {
  const {url, width, height, title, description} = props;

  return (
    <View style={styles.wrapper}>
      <View style={[styles.imageContainer, {width}]}>
        <Image source={{uri: url}} style={[styles.image, {width, height}]} />
        <View style={styles.likeBlock}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
          <View style={styles.likeButton}>
            <Text>Like</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    zIndex: 1,
  },
  imageContainer: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  image: {
    flex: 1,
  },
  likeBlock: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    color: 'white',
    fontSize: 14,
    marginBottom: 5,
  },
  likeButton: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
  },
  dislikeButton: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
  },
});