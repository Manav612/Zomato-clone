import {View, Text, FlatList} from 'react-native';
import React from 'react';
import CustomText from '@components/global/CustomText';
import {useStyles} from 'react-native-unistyles';
import {cardStyles} from '@unistyles/cardStyles';
import {recommendedListData} from '@utils/dummyData';
import RestaurantCard from './RestaurantCard';

const RestaurantsList = () => {
  const {styles} = useStyles(cardStyles);

  const renderItem = ({item}: any) => {
    return <RestaurantCard item={item} />;
  };

  return (
    <View>
      <CustomText
        style={styles.centerText}
        fontFamily="Okra-Bold"
        fontSize={12}>
        1666 restaurants delivering to you
      </CustomText>
      <CustomText
        style={styles.centerText}
        fontFamily="Okra-Medium"
        fontSize={12}>
        FEATURED
      </CustomText>

      <FlatList
        data={recommendedListData}
        renderItem={renderItem}
        scrollEnabled={false}
        keyExtractor={item => item?.id?.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        style={styles.recommendedContainer}
      />
    </View>
  );
};

export default RestaurantsList;
