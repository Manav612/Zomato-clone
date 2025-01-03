import { Animated, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC, memo, useEffect, useMemo, useRef, useState } from 'react'
import { useStyles } from 'react-native-unistyles';
import { searchStyles } from '@unistyles/restuarantStyles';
import { selectRestaurantCart } from '@states/reducers/cartSlice';
import { useAppSelector } from '@states/reduxHook';
import Icons from '@components/global/Icons';
import { Colors } from '@unistyles/Constants';
import { RFValue } from 'react-native-responsive-fontsize';
import RollingBar from 'react-native-rolling-bar';
import CustomText from '@components/global/CustomText';
import LinearGradient from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';
import { navigate } from '@utils/NavigationUtils';
import AnimatedNumber from 'react-native-animated-numbers';

const searchItems: string[] = [
    'Serach "chai"',
    'Serach "samosa"',
    'Serach "cake"',
    'Serach "pizza"',
];

const SearchAndOffers: FC<{ item: any }> = ({ item }) => {
    const { styles } = useStyles(searchStyles)
    const cart = useAppSelector(selectRestaurantCart(item?.id))
    const summary = useMemo(() => {
        return cart.reduce(
            (acc, item) => {
                acc.totalPrice += item?.cartPrice || 0
                acc.totalItem += item?.quantity
                return acc
            },
            { totalPrice: 0, totalItem: 0 }
        )
    }, [cart])

    const slideAnim = useRef(new Animated.Value(0)).current
    const scaleAnim = useRef(new Animated.Value(1)).current
    const [showOffer, setShowOffer] = useState(summary.totalItem > 0)
    const [showConfetti, setShowConfetti] = useState(false)
    const hasShownCongrats = useRef(false)

    useEffect(() => {
        if (summary?.totalItem > 0) {
            setShowOffer(true)
            Animated.timing(slideAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true
            }).start()
        } else {
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true
            }).start(() => setShowOffer(false))
        }

        if (summary?.totalPrice > 500 && !showConfetti && !hasShownCongrats.current) {
            setShowConfetti(true)
            hasShownCongrats.current = true

            Animated.loop(
                Animated.sequence([
                    Animated.timing(scaleAnim, {
                        toValue: 1.1,
                        duration: 1500,
                        useNativeDriver: true
                    }),
                    Animated.timing(scaleAnim, {
                        toValue: 1,
                        duration: 1500,
                        useNativeDriver: true
                    }),
                ]),
                { iterations: 2 }
            ).start()
        } else if (summary.totalPrice <= 500) {
            setShowConfetti(false)
            hasShownCongrats.current = false
            scaleAnim.setValue(1)
        }

    }, [summary.totalItem, summary.totalPrice])

    const translateY = slideAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [50, 0]
    })



    return (
        <View style={styles.container}>
            <View style={[styles.flexRowBetween, styles.padding]}>
                <TouchableOpacity style={styles.searchInputContainer} activeOpacity={0.8}>
                    <Icons iconFamily='Ionicons' name='search' color={Colors.active} size={RFValue(20)} />
                    <RollingBar
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
                    </RollingBar>
                </TouchableOpacity>
                <TouchableOpacity style={styles.flexRowGap}>
                    <Icons iconFamily='MaterialCommunityIcons' name='silverware-fork-knife' color={Colors.background_light} size={20} />
                    <CustomText color={Colors.background} fontSize={12} fontFamily='Okra-Bold'>Menu</CustomText>
                </TouchableOpacity>
            </View>
            {showOffer &&
                <Animated.View style={{ transform: [{ translateY }] }}>
                    <LinearGradient
                        colors={showConfetti ? ['#3a7bd5', '#3a6073'] : ['#e9425e', '#9145b6']}
                        start={{ x: 1, y: 0 }}
                        end={{ x: 1, y: 1.2 }}
                        style={styles.offerContainer}
                    >
                        <View style={{
                            padding: 15,
                            paddingBottom: Platform.OS === 'ios' ? 25 : 15,
                            paddingHorizontal: 20,
                        }}>
                            {
                                showConfetti && (
                                    <LottieView
                                        source={require('@assets/animations/confetti_2.json')}
                                        style={styles.confetti}
                                        autoPlay
                                        loop={false}
                                        onAnimationFinish={() => setShowConfetti(false)}
                                    />

                                )
                            }
                            <TouchableOpacity
                                style={styles.offerContent}
                                activeOpacity={0.8}
                                onPress={() => {
                                    navigate('CheckoutScreen', {
                                        item: item
                                    })
                                }}
                            >
                                <AnimatedNumber
                                    includeComma={false}
                                    animationDuration={300}
                                    animateToNumber={summary?.totalItem}
                                    fontStyle={styles.animatedCount}
                                />
                                <CustomText style={styles.offerText}>{` item${summary?.totalItem > 1 ? 's' : ''} added`}</CustomText>
                                <Icons iconFamily='MaterialCommunityIcons' name='arrow-right-circle' color={Colors.background_light} size={RFValue(14)} />
                            </TouchableOpacity>
                            <Animated.Text
                                style={[styles.offerSubtitle, { transform: [{ scale: scaleAnim }] }]}
                            >
                                {summary?.totalPrice > 500 ? 'Congratulations! You get an extra 15% OFF!' : `Add items worth ₹${Math.max(1, 500 - summary?.totalPrice)} more to get extra 15% OFF!`}
                            </Animated.Text>
                        </View>
                    </LinearGradient>
                </Animated.View>
            }
        </View>
    )
}

export default memo(SearchAndOffers)

const styles = StyleSheet.create({})