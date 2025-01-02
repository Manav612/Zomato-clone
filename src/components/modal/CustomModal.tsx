import { View, Text, StyleSheet, Modal, TouchableOpacity, Platform } from 'react-native';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { screenHeight } from '@unistyles/Constants';
import Icons from '@components/global/Icons';
import { BlurView } from "@react-native-community/blur";

const CustomModal = forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false);
    const [content, setContent] = useState(null);

    useImperativeHandle(ref, () => ({
        openModal: (data: any) => {
            setContent(data);
            setVisible(true);
        },
        closeModal: () => {
            setVisible(false);
        },
    }));

    return (
        <Modal
            transparent
            visible={visible}
            animationType="slide"
            onRequestClose={() => setVisible(false)}>
            {Platform.OS === 'ios' && (
                <BlurView style={styles.absolute} blurType='light' blurAmount={10} />
            )}
            <View style={styles.modalContainer}>
                <View style={styles.contentContainer}>
                    <TouchableOpacity style={styles.closeIcon}
                        onPress={() => { setVisible(false) }}
                    >
                        <Icons iconFamily='Ionicons' name='close' size={24} color='#fff' />
                    </TouchableOpacity>
                    {
                        content ? (
                            <View style={styles.modelContent}>
                                {content}
                            </View>
                        ) : (
                            <Text style={styles.placeHolderText}>No Content Provided</Text>
                        )
                    }
                </View>
            </View>
        </Modal>
    );
});

const styles = StyleSheet.create({
    modelContent: {
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#fff',
        maxHeight: screenHeight * 0.7,
        minHeight: 150,
        width: '100%',
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        filter: Platform.OS === 'android' ? [{ blur: 4 }] : undefined,
        justifyContent: 'flex-end',
    },
    contentContainer: {
        width: '100%',
        maxHeight: screenHeight * 0.7,
        minHeight: 150,
        borderRadius: 10,
    },
    closeIcon: {
        position: 'absolute',
        top: -60,
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 200,
        padding: 10,
        zIndex: 1
    },
    placeHolderText: {
        textAlign: 'center',
        color: '#666',
        fontFamily: 'Okra-Medium'
    },
    absolute: {
        position: 'absolute',
        width: '100%',
        height: '100%'
    }
});

export default CustomModal;
