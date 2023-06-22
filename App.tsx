import React, {useEffect, useState} from 'react';
import {
  StatusBar,
  ScrollView,
  SafeAreaView,
  View,
  Animated,
  PanResponder,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {IProfileMocks, profileMocks} from './app/data/profileMocks';
import SwipeUserBlock from './app/components/SwipeUserBlock';
function App(): JSX.Element {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [position] = useState(new Animated.ValueXY());
  const [currentUser, setCurrentUser] = useState<IProfileMocks>(
    profileMocks[0],
  );
  const [nextUser, setNextUser] = useState<IProfileMocks>(profileMocks[1]);
  const [likeDislikeStatus, setLikeDislikeStatus] = useState(false);
  const [likedUser, setLikedUser] = useState<IProfileMocks>();
  console.log('~~~~~~~~~~~~~~ likedUser', likedUser?.title);

  useEffect(() => {
    currentIndex > 0 && setCurrentUser(profileMocks[currentIndex]);
    currentIndex > 0 && setNextUser(profileMocks[currentIndex + 1]);
  }, [currentIndex]);

  useEffect(() => {
    position.x.addListener(({value}) => {
      setLikeDislikeStatus(value > 0);
    });
    return () => position.x.removeAllListeners();
  }, [position.x]);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, {dx, dy}) => {
      position.setValue({
        x: dx,
        y: Number(calculateArcPosition(dx)) ? calculateArcPosition(dx) : dy,
      });
    },

    onPanResponderRelease: (_, {dx}: {dx: number}) => {
      const screenWidth = Dimensions.get('window').width;
      const swipeThreshold = 0.25 * screenWidth;

      if (dx > swipeThreshold) {
        // Swiped right, handle like action
        handleSwipe('like');
      } else if (dx < -swipeThreshold) {
        // Swiped left, handle dislike action
        handleSwipe('dislike');
      } else {
        Animated.spring(position, {
          toValue: {x: 0, y: 0},
          useNativeDriver: false,
        }).start();
      }
    },
  });

  const handleSwipe = (action: 'like' | 'dislike') => {
    if (action === 'like') {
      // Implement logic for a like action
      setLikedUser(currentUser);
      moveOffTheScreen('right');
    } else if (action === 'dislike') {
      // Implement logic for a dislike action
      console.log('Disliked!');
      moveOffTheScreen('left');
    }

    function moveOffTheScreen(direction: 'left' | 'right') {
      const shiftX =
        direction === 'left'
          ? -Dimensions.get('window').width - 200
          : Dimensions.get('window').width + 200;
      const shiftY = 140;
      // Animate the current picture to move off the screen
      Animated.timing(position, {
        toValue: {x: shiftX, y: shiftY},
        duration: 500, // Adjust the duration of the animation as needed
        useNativeDriver: false,
      }).start(() => {
        // Reset position for the next picture
        position.setValue({x: 0, y: 0});
        // Set the next current user
        currentIndex + 2 < profileMocks.length &&
          setCurrentIndex(currentIndex + 1);
      });
    }
  };

  const calculateArcPosition = (x: number) => {
    const radius = 800; // Adjust the radius of the arc
    const angleOffset = Math.PI / 2; // Adjust the angle offset of the arc

    // Calculate the y-coordinate using the equation of a circle
    const result = radius - Math.sqrt(radius * radius - x * x) + angleOffset;
    return result;
  };

  // Values for effects for cards
  const scale = position.x.interpolate({
    inputRange: [
      -Dimensions.get('window').width,
      0,
      Dimensions.get('window').width,
    ],
    outputRange: [1, 0.8, 1], // Adjust the scale values as desired
    extrapolate: 'clamp',
  });

  const rotation = position.x.interpolate({
    inputRange: [-300, 0, 300],
    outputRange: ['-30deg', '0deg', '30deg'], // Adjust the rotation values as desired
    extrapolate: 'clamp',
  });

  const overlayOpacity = position.x.interpolate({
    inputRange: [-230, 0, 230],
    outputRange: [0.8, 0, 0.8], // Adjust the opacity values as desired
    extrapolate: 'clamp',
  });

  return (
    <SafeAreaView>
      <StatusBar />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.container}>
          <Animated.View
            style={[
              styles.nextPicture,
              {
                transform: [{scale}],
              },
            ]}>
            <SwipeUserBlock
              width={'100%'}
              height={500}
              url={nextUser.url}
              title={`${currentUser.title}, ${currentUser.age}`}
              description={nextUser.description}
            />
          </Animated.View>
          <Animated.View
            {...panResponder.panHandlers}
            style={[
              {
                transform: [
                  {rotate: rotation},
                  {translateX: position.x},
                  {translateY: position.y},
                ],
              },
            ]}>
            <SwipeUserBlock
              width={'100%'}
              height={500}
              url={currentUser.url}
              title={`${currentUser.title}, ${currentUser.age}`}
              description={currentUser.description}
              overlayOpacity={overlayOpacity}
              likeDislikeStatus={likeDislikeStatus}
            />
          </Animated.View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    marginBottom: 80,
    marginTop: 50,
  },
  nextPicture: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    zIndex: -1,
  },
});

export default App;
