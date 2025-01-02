import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { FC, memo, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '@states/reduxHook'
import { addCustomizableItem, removeCustomizableItem, selectRestaurantCartItem } from '@states/reducers/cartSlice'
import { useStyles } from 'react-native-unistyles'
import { foodStyles } from '@unistyles/foodStyles'
import { modelStyles } from '@unistyles/modelStyles'
import CustomText from '@components/global/CustomText'
import Icons from '@components/global/Icons'
import { RFValue } from 'react-native-responsive-fontsize'
import { Colors } from '@unistyles/Constants'
import AnimatedNumber from 'react-native-animated-numbers'
import CustomModal from '@components/modal/CustomModal'
import EditItemModal from '@components/modal/EditItemModal'

const MiniFoodCard: FC<{
    item: any,
    cus: any,
    restaurant: any
}> = ({ item, cus, restaurant }) => {

    const dispatch = useAppDispatch()
    const { styles } = useStyles(modelStyles)
    const cartItem = useAppSelector(selectRestaurantCartItem(restaurant?.id, item?.id))
    const modalRef = useRef<any>(null)


    const openEditModal = () => {
        modalRef?.current?.openModal(
            <EditItemModal
                item={item}
                cus={cus}
                restaurant={restaurant}
                onClose={() => modalRef?.current?.closeModal()}
            />
        )
    }

    const removeCartHandler = (cus: any) => {
        dispatch(removeCustomizableItem({
            restaurant_id: restaurant?.id,
            customizationId: cus?.id,
            itemId: item?.id
        }))
    }

    const addCartHandler = (cus: any) => {
        const data = {
            restaurant: restaurant,
            item: item,
            customization: {
                quantity: 1,
                price: cus?.price,
                customizationOptions: cus?.customizationOptions
            }
        }
        dispatch(addCustomizableItem(data))
    }

    return (
        <>
            <CustomModal ref={modalRef} />
            <View style={styles.flexRowItemBaseline}>
                <View style={styles.flexRowGapBaseline}>
                    <Image
                        style={styles.vegIcon}
                        source={cartItem?.isVeg ? require('@assets/icons/veg.png') : require('@assets/icons/non_veg.png')}
                    />
                    <View>
                        <CustomText fontFamily='Okra-Bold'>{cartItem?.name}</CustomText>
                        <CustomText fontFamily='Okra-Medium'>₹{cus?.price}</CustomText>
                        <CustomText style={styles.selectedOptions}>{cus?.customizationOptions?.map((i: any, idx: number) => {
                            return (
                                <CustomText key={idx} fontFamily='Okra-Medium' fontSize={9}>
                                    {i?.selectedOption?.name},
                                </CustomText>
                            )
                        })}</CustomText>
                        <TouchableOpacity style={styles.flexRow} onPress={openEditModal}>
                            <CustomText fontFamily='Okra-Medium' fontSize={9} color='#444'>
                                Edit
                            </CustomText>
                            <View style={{ bottom: -1 }}>
                                <Icons name='arrow-right' iconFamily='MaterialIcons' color='#888' size={16} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.cartOperationContainer}>
                    <View style={styles.miniAddButtonContainer}>
                        <TouchableOpacity onPress={() => removeCartHandler(cus)}>
                            <Icons name='minus-thick' size={RFValue(10)} iconFamily='MaterialCommunityIcons' color={Colors.active} />
                        </TouchableOpacity>
                        <AnimatedNumber
                            includeComma={false}
                            animationDuration={300}
                            fontStyle={styles.miniAnimatedCount}
                            animateToNumber={cus?.quantity}
                        />
                        <TouchableOpacity onPress={() => addCartHandler(cus)}>
                            <Icons name='plus-thick' size={RFValue(10)} iconFamily='MaterialCommunityIcons' color={Colors.active} />
                        </TouchableOpacity>
                    </View>
                    <CustomText fontFamily='Okra-Medium'>₹{cus?.cartPrice}</CustomText>
                </View>

            </View>
        </>
    )
}

export default memo(MiniFoodCard)