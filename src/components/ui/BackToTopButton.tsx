import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import Icons from '@components/global/Icons';
import {RFValue} from 'react-native-responsive-fontsize';
import CustomText from '@components/global/CustomText';

const BackToTopButton: FC<{onPress: () => void}> = ({onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{flexDirection: 'row', alignItems: 'center', gap: 6}}>
      <Icons
        name="arrow-up-circle-outline"
        iconFamily="Ionicons"
        color="#fff"
        size={RFValue(12)}
      />
      <CustomText variant="h6" style={{color: '#fff'}} fontFamily="Okra-Bold">
        Back to top
      </CustomText>
    </TouchableOpacity>
  );
};

export default BackToTopButton;

const styles = StyleSheet.create({});
