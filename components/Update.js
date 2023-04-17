import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View, Modal, Pressable, ActivityIndicator, FlatList } from 'react-native';
import InputLine from './InputLine';

export default function Update({ showUpdate, setShowUpdate }) {

    return (
        <Modal animationType="fade"
            transparent={true}
            visible={showUpdate}>
                <View style={styles.container}>
                    <InputLine text='First Name'/>
                    <InputLine text='Last Name'/>
                    <InputLine text='Date of Birth'/>
                    <InputLine text='Gender'/>
                    <InputLine text='Age'/>
                    <InputLine text='Weight'/>
                    <InputLine text='Height'/>
                    <InputLine text='Weight Goal'/>
                <Button
                title='Cancel'
                onPress={() => { setShowUpdate(false) }}/>
                <Button
                title='Submit'
                onPress={() => { setShowUpdate(false) }}/>
                </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'white',
        margin:50
    }
})