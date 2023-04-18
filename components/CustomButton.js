import React from 'react';
import { Button, StyleSheet, View } from 'react-native';

export default function CustomButton({ title, onPress }) {

    return (
        <View style={styles.buttonContainer}>
            <Button title={title} onPress={onPress} />
        </View>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        margin: 10
    }
})