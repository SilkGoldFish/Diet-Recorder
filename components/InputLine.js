import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

export default function InputLine({ text, value, onChange, secureTextEntry }) {

    return (
        <View style={styles.inputLine}>
            <Text style={styles.text}>{text}</Text>
            <TextInput style={styles.input} defaultValue={value} onChangeText={onChange} secureTextEntry={secureTextEntry} />
        </View>
    )
}

const styles = StyleSheet.create({
    inputLine: {
        flexDirection: 'row',
        margin: 10,
        paddingHorizontal: 20
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 10,
        textAlign: 'center'
    },
    text: {
        flex: 1,
        textAlign: 'center',
        fontSize: 15
    }
})