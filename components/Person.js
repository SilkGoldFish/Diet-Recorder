import React, { useContext } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { UserContext } from '../UserContext';

export default function Person() {

    const { user } = useContext(UserContext)

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
            <Line title='First Name:' value={user.firstname} />
            <Line title='Last Name:' value={user.lastname} />
            <Line title='Date of Birth:' value={user.date_of_birth} />
            <Line title='Gender:' value={user.gender} />
            <Line title='Age:' value={user.age} />
            <Line title='Weight:' value={user.weight} />
            <Line title='Height:' value={user.height} />
            <Line title='Weight Goal:' value={user.weight_goal} />
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