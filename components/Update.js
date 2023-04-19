import React, { useState } from 'react';
import { StyleSheet, View, Modal, ActivityIndicator } from 'react-native';
import InputLine from './InputLine';
import CustomButton from './CustomButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function Update({ data, setData, showUpdate, setShowUpdate, userId }) {
    const [loading, setLoading] = useState(false)

    let profile = JSON.parse(JSON.stringify(data))

    const submit = async () => {
        setLoading(true)
        try {
            const response = await fetch('https://sirusw.pythonanywhere.com/api/profile/update_profile/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: userId,
                    ...profile,
                }),
            });
            const data = await response.json();
            setLoading(false)
            if (response.ok) {
                alert('Profile updated successfully!')
                setShowUpdate(false)
                setData(profile)
            } else {
                alert('Profile update failed: ', data.message, '!')
            }
        } catch (error) {
            console.error('Profile update error:', error);
        }
    }

    return (
        <Modal animationType="fade"
            transparent={false}
            visible={showUpdate}>
            <KeyboardAwareScrollView>
                <View style={[styles.container, styles.shadow]}>
                    <InputLine text='First Name' value={profile.firstname} onChange={(text) => profile.firstname = text} />
                    <InputLine text='Last Name' value={profile.lastname} onChange={(text) => profile.lastname = text} />
                    <InputLine text='Date of Birth' value={profile.date_of_birth} onChange={(text) => profile.dateOfBirth = text} />
                    <InputLine text='Gender' value={profile.gender} onChange={(text) => profile.gender = text} />
                    <InputLine text='Age' value={String(profile.age)} onChange={(text) => profile.age = text} />
                    <InputLine text='Weight' value={profile.weight} onChange={(text) => profile.weight = text} />
                    <InputLine text='Height' value={profile.height} onChange={(text) => profile.height = text} />
                    <InputLine text='Weight Goal' value={profile.weight_goal} onChange={(text) => profile.weightGoal = text} />
                    {loading ? <ActivityIndicator /> : null}
                    <CustomButton title='Cancel' onPress={() => { setShowUpdate(false) }} />
                    <CustomButton title='Submit' onPress={submit} />
                </View>
            </KeyboardAwareScrollView>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        marginHorizontal: 50,
        marginVertical: 130,
        borderRadius: 20
    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    }
})