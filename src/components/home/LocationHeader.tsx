import {View, Text, SafeAreaView, TouchableOpacity, Image} from 'react-native';
import React, {FC} from 'react';
import {useSharedState} from '@features/tabs/SharedContext';
import {useStyles} from 'react-native-unistyles';
import {homeStyles} from '@unistyles/homeStyles';
import Animated, {interpolate, useAnimatedStyle} from 'react-native-reanimated';
import Icons from '@components/global/Icons';
import CustomText from '@components/global/CustomText';

const LocationHeader: FC = () => {
  const {scrollYGlobal} = useSharedState();
  const {styles} = useStyles(homeStyles);
  const textColor = '#fff';
  const opacityFadingStyles = useAnimatedStyle(() => {
    const opacity = interpolate(scrollYGlobal.value, [0, 80], [1, 0]);
    return {
      opacity: opacity,
    };
  });
  return (
    <Animated.View style={[opacityFadingStyles]}>
      <SafeAreaView />
      <View style={styles.flexRowBetween}>
        <View style={styles.flexRowGap}>
          <Icons
            name="map-marker"
            color={textColor}
            iconFamily="MaterialCommunityIcons"
            size={32}
          />

          <View>
            <TouchableOpacity style={styles.flexRow}>
              <CustomText variant="h5" color={textColor} fontFamily="Okra-Bold">
                B/301,Maxus Mall
              </CustomText>
              <Icons
                name="chevron-down"
                color={textColor}
                size={18}
                iconFamily="MaterialCommunityIcons"
              />
            </TouchableOpacity>
            <CustomText color={textColor} fontFamily="Okra-Medium">
              Mumbai
            </CustomText>
          </View>
        </View>

        <View style={styles.flexRowGap}>
          <TouchableOpacity style={styles.translation}>
            <Image
              style={styles.translationIcon}
              source={require('@assets/icons/translation.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.profileAvatar}>
            <Image
              style={styles.goldenCircle}
              source={require('@assets/icons/golden_circle.png')}
            />
            <Image
              style={styles.profileImage}
              source={require('@assets/images/user.jpg')}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
};

export default LocationHeader;
