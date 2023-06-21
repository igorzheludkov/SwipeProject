import React, {useState} from 'react';
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
import {profileMocks} from './app/data/profileMocks';
import SwipeUserBlock from './app/components/SwipeUserBlock';
function App(): JSX.Element {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [position] = useState(new Animated.ValueXY());
  const [currentUsers, setCurrentUsers] = useState([
    profileMocks[0],
    profileMocks[1],
  ]);

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
      console.log('Liked!');
      moveOffTheScreen('right');
    } else if (action === 'dislike') {
      // Implement logic for a dislike action
      console.log('Disliked!');
      moveOffTheScreen('left');
    }

    // Move to the next picture
    setTimeout(() => setCurrentIndex(currentIndex + 1), 2000);

    function moveOffTheScreen(direction: 'left' | 'right') {
      const shiftX =
        direction === 'left'
          ? -Dimensions.get('window').width
          : Dimensions.get('window').width;
      const shiftY = 140;
      // Animate the current picture to move off the screen
      Animated.timing(position, {
        toValue: {x: shiftX, y: shiftY},
        duration: 500, // Adjust the duration of the animation as needed
        useNativeDriver: false,
      }).start(() => {
        // Reset position for the next picture
        position.setValue({x: 0, y: 0});
      });
    }
  };

  const calculateArcPosition = (x: number) => {
    const radius = 400; // Adjust the radius of the arc
    const angleOffset = Math.PI / 2; // Adjust the angle offset of the arc

    // Calculate the y-coordinate using the equation of a circle
    const result = radius - Math.sqrt(radius * radius - x * x) + angleOffset;
    // console.log('~~~~~~~~~~~~~~ result', result);
    // console.log('~~~~ x', x);
    return result;
  };

  return (
    <SafeAreaView>
      <StatusBar />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={{flex: 1}}>
          {profileMocks.map((picture, index) => {
            if (index < currentIndex) {
              return null; // Skip pictures that have been swiped
            } else if (index === currentIndex + 1) {
              // Render the next picture with scale-up effect
              const scale = position.x.interpolate({
                inputRange: [
                  -Dimensions.get('window').width,
                  0,
                  Dimensions.get('window').width,
                ],
                outputRange: [1, 0.8, 1], // Adjust the scale values as desired
                extrapolate: 'clamp',
              });

              return (
                <Animated.View
                  key={picture.id}
                  style={[
                    styles.nextPicture,
                    {
                      transform: [{scale}],
                    },
                  ]}>
                  <SwipeUserBlock
                    width={300}
                    height={400}
                    url={picture.url}
                    title={picture.title}
                    description={picture.description}
                    onDislike={() => {}}
                    onLike={() => {}}
                  />
                </Animated.View>
              );
            } else if (index === currentIndex) {
              // Render the current picture with swipe gestures
              return (
                <Animated.View
                  {...panResponder.panHandlers}
                  style={[
                    {
                      transform: [
                        {translateX: position.x},
                        {translateY: position.y},
                      ],
                    },
                  ]}
                  key={picture.id}>
                  <SwipeUserBlock
                    width={300}
                    height={400}
                    url={picture.url}
                    title={picture.title}
                    description={picture.description}
                    onDislike={() => {}}
                    onLike={() => {}}
                  />
                </Animated.View>
              );
            } else {
              return null; // Skip upcoming pictures
            }
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  nextPicture: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    zIndex: -1,
    // alignItems: 'center',
    backgroundColor: 'blue',
  },
});

export default App;
