import { View, Text, StyleSheet, Platform, ScrollView, Image, SafeAreaView } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { useAppDispatch, useAppSelector } from '@states/reduxHook'
import { clearRestaurantCart, selectRestaurantCart } from '@states/reducers/cartSlice'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { goBack, replace } from '@utils/NavigationUtils'
import { Colors } from '@unistyles/Constants'
import CheckoutHeader from '@components/checkout/CheckoutHeader'
import OrderList from '@components/checkout/OrderList'
import CustomText from '@components/global/CustomText'
import Icons from '@components/global/Icons'
import { RFValue } from 'react-native-responsive-fontsize'
import BillDetails from './BillDetails'
import ArrowButton from '@components/checkout/ArrowButton'

const CheckoutScreen: FC = () => {
    const route = useRoute() as any
    const restaurant = route?.params?.item
    const dispatch = useAppDispatch()
    const cart = useAppSelector(selectRestaurantCart(restaurant?.id))
    const totalItemPrice = cart?.reduce((total, item) => total + (item.cartPrice || 0), 0) || 0
    const totalItem = cart?.reduce((total, item) => total + (item.quantity || 0), 0) || 0
    const insets = useSafeAreaInsets()

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!cart || cart?.length === 0) {
            goBack()
        }
    }, [cart])

    const handlePlaceOrder = async () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            replace('OrderSuccessScreen', { restaurant: restaurant })
        }, 2000);

    }

    return (
        <View style={styles.container}>
            <View style={{ height: Platform.OS === 'android' ? insets.top : 0 }} />
            <CheckoutHeader title={restaurant?.name} />
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <OrderList cartItems={cart} restaurant={restaurant} totalItems={totalItem} />

                <View style={styles.flexRowBetween}>
                    <View style={styles.flexRow}>
                        <Image source={require('@assets/icons/coupon.png')} style={{ width: 25, height: 25 }} />
                        <CustomText variant='h6' fontFamily='Okra-Medium'>View all restaurant coupons</CustomText>
                    </View>
                    <Icons iconFamily='MaterialCommunityIcons' name='chevron-right' size={RFValue(16)} color={Colors.text} />
                </View>

                <BillDetails totalItemPrice={totalItemPrice} />

                <View style={styles.flexRowBetween}>
                    <View>
                        <CustomText fontSize={10} fontFamily='Okra-Medium'>Cancellation Policy</CustomText>
                        <CustomText fontSize={9} style={styles.cancleText} fontFamily='Okra-Bold'>Orders cannot be cancelled once packed for delivery. In case of unexpected delays, a refund will be provided, if applicable</CustomText>
                    </View>
                </View>

            </ScrollView>

            <View style={styles.paymentGateway}>
                <View style={{ width: '30%' }}>

                    <CustomText fontSize={RFValue(6)} fontFamily='Okra-Medium'>💵 PAY USING</CustomText>
                    <CustomText fontSize={10} fontFamily='Okra-Medium' style={{ marginTop: 2 }}>Cash on Delivery</CustomText>
                </View>
                <View style={{ width: '70%' }}>
                    <ArrowButton
                        loading={loading}
                        price={totalItemPrice}
                        title="Place Order"
                        onPress={handlePlaceOrder}
                    />
                </View>

            </View>
            <SafeAreaView />

        </View>
    )
}

const styles = StyleSheet.create({
    cancleText: {
        marginTop: 4,
        opacity: 0.6
    },
    paymentGateway: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: "#fff",
        alignItems: 'center',
        paddingLeft: 14,
        position: 'absolute',
        paddingBottom: Platform.OS === 'ios' ? 25 : 5,
        paddingTop: 10,
        bottom: 0,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.3,
        elevation: 5,
        shadowRadius: 5,
        shadowColor: Colors.lightText,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    scrollContainer: {
        padding: 10,
        backgroundColor: Colors.background_light
    },
    flexRow: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: 10
    },
    flexRowBetween: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 15,
        marginBottom: 10
    }
})

export default CheckoutScreen