import { View, Text, TouchableOpacity } from 'react-native';
import React, { FC, memo, useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useStyles } from 'react-native-unistyles';
import { foodStyles } from '@unistyles/foodStyles';
import { useAppSelector } from '@states/reduxHook';
import ScalePress from '@components/ui/ScalePress';
import {
    addItemToCart,
    removeCustomizableItem,
    removeItemFromCart,
    selectRestaurantCartItem,
} from '@states/reducers/cartSlice';
import CustomText from '@components/global/CustomText';
import { Colors } from '@unistyles/Constants';
import Icons from '@components/global/Icons';
import { RFValue } from 'react-native-responsive-fontsize';
import AnimatedNumbers from 'react-native-animated-numbers';
import CustomModal from '@components/modal/CustomModal';
import AddItemModal from '@components/modal/AddItemModal';
import RepeatItemModal from '@components/modal/RepeatItemModal';
import RemoveItemModal from '@components/modal/RemoveItemModal';
const AddButton: FC<{ item: any; restaurant: any }> = ({ item, restaurant }) => {
    const dispatch = useDispatch();
    const { styles } = useStyles(foodStyles);
    const cart = useAppSelector(
        selectRestaurantCartItem(restaurant?.id, item?.id),
    );

    const modalRef = useRef<any>(null)

    const openAddModal = () => {
        modalRef?.current?.openModal(
            <AddItemModal
                item={item}
                onClose={() => modalRef.current?.closeModal()}
                restaurant={restaurant}
            />
        )
    }
    const openRemoveModal = () => {
        modalRef?.current?.openModal(
            <RemoveItemModal
                item={item}
                closeModal={() => modalRef.current?.closeModal()}
                restaurant={restaurant}
            />
        )
    }
    const openRepeatModal = () => {
        modalRef?.current?.openModal(
            <RepeatItemModal
                item={item}
                onOpenAddModal={() => {
                    modalRef?.current?.closeModal()
                    setTimeout(() => {
                        openAddModal()
                    }, 200)
                }}
                closeModal={() => modalRef.current?.closeModal()}
                restaurant={restaurant}
            />
        )
    }

    const addCartHandler = useCallback(() => {
        if (item?.isCustomizable) {
            if (cart !== null) {
                openRepeatModal()
                return
            }
            openAddModal()
        } else {
            dispatch(
                addItemToCart({
                    restaurant: restaurant,
                    item: { ...item, customisation: [] },
                }),
            );
        }
    }, [dispatch, item, restaurant, cart]);

    const removeCartHandler = useCallback(() => {
        if (item?.isCustomizable) {
            if (cart?.customizations && cart?.customizations?.length > 1) {
                openRemoveModal()
                return
            }
            dispatch(removeCustomizableItem({
                restaurant_id: restaurant?.id,
                customizationId: cart?.customizations![0]?.id,
                itemId: item?.id
            }))
        } else {
            dispatch(
                removeItemFromCart({
                    restaurant_id: restaurant?.id,
                    itemId: item?.id,
                }),
            );
        }
    }, [dispatch, item, restaurant, cart]);

    return (
        <>
            <CustomModal ref={modalRef} />
            <View style={styles.addButtonContainer(cart != null)}>
                {cart ? (
                    <View style={styles.selectedContainer}>
                        <ScalePress onPress={removeCartHandler}>
                            <Icons
                                iconFamily="MaterialCommunityIcons"
                                color="#fff"
                                name="minus-thick"
                                size={RFValue(13)}
                            />
                        </ScalePress>
                        <AnimatedNumbers
                            includeComma={false}
                            animationDuration={300}
                            animateToNumber={cart?.quantity}
                            fontStyle={styles.animatedCount}
                        />
                        <ScalePress onPress={addCartHandler}>
                            <Icons
                                iconFamily="MaterialCommunityIcons"
                                color="#fff"
                                name="plus-thick"
                                size={RFValue(13)}
                            />
                        </ScalePress>
                    </View>
                ) : (
                    <TouchableOpacity
                        onPress={addCartHandler}
                        style={styles.noSelectionContainer}
                        activeOpacity={0.8}
                        accessibilityLabel="Add item to cart">
                        <CustomText
                            fontFamily="Okra-Bold"
                            variant="h5"
                            color={Colors.primary}>
                            ADD
                        </CustomText>
                        <CustomText
                            variant="h5"
                            color={Colors.primary}
                            style={styles.plusSmallIcon}>
                            +
                        </CustomText>
                    </TouchableOpacity>
                )}
            </View>
            {item?.isCustomizable && (
                <CustomText fontFamily="Okra-Medium" style={styles.customizeText}>
                    Customisable
                </CustomText>
            )}
        </>
    );
};

export default memo(AddButton);