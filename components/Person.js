import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function Person({ data }) {

    const Line = ({ title, value }) => {
        return (
            <View style={styles.line}>
                <Text style={styles.text}>{title}</Text>
                <Text style={styles.text}>{value}</Text>
            </View>
        )
    }

    return (

        <View style={styles.container}>
            <Image
                style={styles.tinyLogo}
                source={{
                    uri: 'https://i.redd.it/v7k1yoflgpl61.jpg',
                }}
            />
            <Line title='First Name:' value={data.firstname} />
            <Line title='Last Name:' value={data.lastname} />
            <Line title='Date of Birth:' value={data.date_of_birth} />
            <Line title='Gender:' value={data.gender} />
            <Line title='Age:' value={data.age} />
            <Line title='Weight:' value={data.weight} />
            <Line title='Height:' value={data.height} />
            <Line title='Weight Goal:' value={data.weight_goal} />
        </View>
    );
}

const styles = StyleSheet.create({
    tinyLogo: {
        width: 200,
        height: 200,
        marginBottom: 50
    },
    container: {
        flex: 3,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20,
        borderRadius: 20
    },
    line: {
        flexDirection: 'row',
        margin: 5,
        width: '60%'
    },
    text: {
        flex: 1,
        textAlign: 'center'
    }
})