import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import {useStyles} from 'react-native-unistyles';
import {phoneStyles} from '@unistyles/phoneStyles';
import Icons from '@components/global/Icons';
import {RFValue} from 'react-native-responsive-fontsize';

const SocialLogin: FC = () => {
  const {styles} = useStyles(phoneStyles);

  return (
    <View style={styles.socialContainer}>
      <TouchableOpacity style={styles.iconContainer}>
        <Image
          source={require('@assets/icons/google.png')}
          style={styles.gimg}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer}>
        <Icons
          name="logo-apple"
          iconFamily="Ionicons"
          color="#222"
          size={RFValue(18)}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer}>
        <Icons
          name="ellipsis-horizontal-sharp"
          iconFamily="Ionicons"
          color="#222"
          size={RFValue(18)}
        />
      </TouchableOpacity>
    </View>
  );
};

export default SocialLogin;

const styles = StyleSheet.create({});
