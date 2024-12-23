import {
  View,
  Text,
  SectionList,
  NativeSyntheticEvent,
  NativeScrollEvent,
  ViewToken,
} from 'react-native';
import React, {FC, useRef, useState} from 'react';
import ExploreSection from '@components/home/ExploreSection';
import RestaurantsList from './RestaurantsList';
import {useStyles} from 'react-native-unistyles';
import {restaurantStyles} from '@unistyles/restuarantStyles';
import {useSharedState} from '@features/tabs/SharedContext';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';
import BackToTopButton from '@components/ui/BackToTopButton';
import {filtersOption} from '@utils/dummyData';
import SortingAndFilters from '@components/home/SortingAndFilters';

const sectionData = [
  {title: 'Explore', data: [{}], renderItem: () => <ExploreSection />},
  {title: 'Restaurants', data: [{}], renderItem: () => <RestaurantsList />},
];

const MainList: FC = () => {
  const {styles} = useStyles(restaurantStyles);
  const {scrollY, scrollYGlobal, scrollToTop} = useSharedState();
  const previousScrollYTopButton = useRef<number>(0);
  const prevScrollY = useRef(0);
  const sectionListRef = useRef<SectionList>(null);

  const [isRestaurantVisible, setIsRestaurantVisible] = useState(false);
  const [isNearEnd, setIsNearEnd] = useState(false);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentScrollY = event?.nativeEvent?.contentOffset?.y;
    const isScrollingDown = currentScrollY > prevScrollY.current;

    scrollY.value = isScrollingDown
      ? withTiming(1, {duration: 300})
      : withTiming(0, {duration: 300});

    scrollYGlobal.value = currentScrollY;
    prevScrollY.current = currentScrollY;

    const containerHeight = event.nativeEvent.contentSize.height;
    const layoutHeight = event?.nativeEvent?.layoutMeasurement?.height;
    const offset = event?.nativeEvent?.contentOffset.y;

    setIsNearEnd(offset + layoutHeight >= containerHeight - 500);
  };

  const handleScrollToTop = async () => {
    scrollToTop();
    sectionListRef.current?.scrollToLocation({
      sectionIndex: 0,
      itemIndex: 0,
      animated: true,
      viewPosition: 0,
    });
  };

  const backToTopStyle = useAnimatedStyle(() => {
    const isScrollingUp =
      scrollYGlobal?.value < previousScrollYTopButton.current &&
      scrollYGlobal.value > 180;
    const opacity = withTiming(
      isScrollingUp && (isRestaurantVisible || isNearEnd) ? 1 : 0,
      {duration: 300},
    );
    const translateY = withTiming(
      isScrollingUp && (isRestaurantVisible || isNearEnd) ? 0 : 10,
      {duration: 300},
    );
    previousScrollYTopButton.current = scrollYGlobal.value;
    return {
      opacity,
      transform: [{translateY}],
    };
  });

  const viewabilityConfig = {
    viewAreaCoveragePercentThreshold: 80,
  };

  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: Array<ViewToken>;
  }) => {
    const restaurantVisible = viewableItems.some(
      item => item?.section?.title === 'Restaurants' && item?.isViewable,
    );
    setIsRestaurantVisible(restaurantVisible);
  };

  return (
    <>
      <Animated.View style={[styles.backToTopButton, backToTopStyle]}>
        <BackToTopButton onPress={handleScrollToTop} />
      </Animated.View>
      <SectionList
        sections={sectionData}
        overScrollMode="always"
        onScroll={handleScroll}
        scrollEventThrottle={16}
        bounces={false}
        nestedScrollEnabled
        ref={sectionListRef}
        renderSectionHeader={({section}) => {
          if (section.title !== 'Restaurants') {
            return null;
          }
          return (
            <Animated.View
              style={[
                isRestaurantVisible || isNearEnd ? styles.shadowBottom : null,
              ]}>
              <SortingAndFilters menuTitle="Sort" options={filtersOption} />
            </Animated.View>
          );
        }}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContainer}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        stickySectionHeadersEnabled={true}
      />
    </>
  );
};

export default MainList;
