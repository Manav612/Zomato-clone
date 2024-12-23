import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
  Image,
} from 'react-native';
import React from 'react';
import {useStyles} from 'react-native-unistyles';
import {homeStyles} from '@unistyles/homeStyles';
import {useAppDispatch, useAppSelector} from '@states/reduxHook';
import {useSharedState} from '@features/tabs/SharedContext';
import Animated, {interpolate, useAnimatedStyle} from 'react-native-reanimated';
import Icons from '@components/global/Icons';
import {Colors} from '@unistyles/Constants';
import RollingContent from 'react-native-rolling-bar';
import CustomText from '@components/global/CustomText';
import {setVegMode} from '@states/reducers/userSlice';

const searchItems: string[] = [
  'Serach "chai"',
  'Serach "samosa"',
  'Serach "cake"',
  'Serach "pizza"',
];

const SearchBar = () => {
  const dispatch = useAppDispatch();
  const isVegMode = useAppSelector(state => state.user.isVegMode);
  const {styles} = useStyles(homeStyles);
  const {scrollYGlobal} = useSharedState();

  const textColorAnimation = useAnimatedStyle(() => {
    const textColor = interpolate(scrollYGlobal.value, [0, 80], [255, 0]);
    return {
      color: `rgb(${textColor},${textColor},${textColor})`,
    };
  });

  return (
    <>
      <SafeAreaView />
      <View style={[styles.flexRowBetween, styles.padding]}>
        <TouchableOpacity
          style={styles.searchInputContainer}
          activeOpacity={0.8}>
          <Icons
            name="search"
            color={isVegMode ? Colors.active : Colors.primary}
            size={20}
            iconFamily="Ionicons"
          />
          <RollingContent
            interval={2500}
            defaultStyle={false}
            customStyle={styles.textContainer}>
            {searchItems?.map((item, index) => {
              return (
                <CustomText
                  fontSize={12}
                  fontFamily="Okra-Medium"
                  key={index}
                  style={styles.rollingText}>
                  {item}
                </CustomText>
              );
            })}
          </RollingContent>
          <Icons
            name="mic-outline"
            color={isVegMode ? Colors.active : Colors.primary}
            size={20}
            iconFamily="Ionicons"
          />
        </TouchableOpacity>
        <Pressable
          style={styles.vegMode}
          onPress={() => dispatch(setVegMode(!isVegMode))}>
          <Animated.Text style={[textColorAnimation, styles.animatedText]}>
            VEG
          </Animated.Text>
          <Animated.Text style={[textColorAnimation, styles.animatedSubText]}>
            MODE
          </Animated.Text>
          <Image
            source={
              isVegMode
                ? require('@assets/icons/switch_on.png')
                : require('@assets/icons/switch_off.png')
            }
            style={styles.switch}
          />
        </Pressable>
      </View>
    </>
  );
};

export default SearchBar;
