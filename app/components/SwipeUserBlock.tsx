import React from 'react';
import {View, Text, StyleSheet, Image, Animated} from 'react-native';
import HeartIcon from '../assets/icons/Heart';
import CrossIcon from '../assets/icons/Cross';
import LinearGradient from 'react-native-linear-gradient';

interface IProps {
  url: string;
  width: number | string;
  height: number;
  title: string;
  description: string;
  overlayOpacity?: Animated.AnimatedInterpolation<string | number>;
  likeDislikeStatus?: boolean;
}

export default function SwipeUserBlock(props: IProps) {
  const {
    url,
    width,
    height,
    title,
    description,
    overlayOpacity = 0,
    likeDislikeStatus = false,
  } = props;

  return (
    <View style={styles.wrapper}>
      <View style={[styles.imageContainer, {width}]}>
        <Image source={{uri: url}} style={[styles.image, {width, height}]} />
        <View style={[styles.info]}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.descriptionContainer}>
            <Text style={styles.description}>{description}</Text>
          </View>
          <View style={styles.likeButton}>
            <HeartIcon color={'#fff'} size={45} />
          </View>
        </View>
        {likeDislikeStatus ? (
          <Animated.View
            style={[styles.likeOverlay, {opacity: overlayOpacity}]}>
            <LinearGradient
              colors={['rgb(88, 48, 216)', 'rgba(255, 255, 255, 0)']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={styles.likeOverlay}>
              <View style={styles.likeBlock}>
                <HeartIcon color={'white'} size={45} />
                <Text style={styles.likeText}>Like</Text>
              </View>
            </LinearGradient>
          </Animated.View>
        ) : (
          <Animated.View
            style={[styles.dislikeOverlay, {opacity: overlayOpacity}]}>
            <LinearGradient
              colors={['rgba(255, 255, 255, 0)', '#d31a38']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={styles.dislikeOverlay}>
              <View style={styles.dislikeBlock}>
                <CrossIcon color={'white'} size={45} />
                <Text style={styles.dislikeText}>Nope</Text>
              </View>
            </LinearGradient>
          </Animated.View>
        )}
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

  title: {
    color: 'white',
    fontSize: 42,
    fontWeight: '900',
    marginBottom: 5,
  },
  descriptionContainer: {
    alignSelf: 'flex-start',
  },
  description: {
    color: 'white',
    fontSize: 16,
    fontWeight: '400',
    marginBottom: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    backgroundColor: 'rgb(88, 48, 216)',
  },
  info: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingLeft: 20,
    paddingBottom: 15,
  },
  likeButton: {
    position: 'absolute',
    right: 15,
    bottom: 15,
    backgroundColor: 'rgba(150, 150, 150, 0.7)',
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  likeOverlay: {
    width: '100%',
    position: 'absolute',
    height: '100%',
    justifyContent: 'center',
    right: 0,
    top: 0,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
  },
  likeBlock: {
    transform: [{rotate: '270deg'}, {translateY: -150}],
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
  },
  dislikeOverlay: {
    width: '100%',
    position: 'absolute',
    height: '100%',
    justifyContent: 'center',
    right: 0,
    top: 0,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
  },
  dislikeBlock: {
    transform: [{rotate: '90deg'}, {translateY: -150}],
    flexDirection: 'row',
    alignItems: 'center',
  },
  dislikeText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
  },
});
