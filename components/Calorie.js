import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { UserContext } from '../UserContext';

export default function Calorie() {
    const { user, data } = useContext(UserContext)
    const [calorie, setCalorie] = useState(0);

    let cnt = 0;
    for (let i = 0; i < data.length; i++) {
        if (data[i].type == 'sports') {
            cnt -= data[i].calories
        } else {
            cnt += data[i].calories
        }
    }

    const loadCalorie = () => {
        if (Number(user.age) == 0) {
            setCalorie(0)
            return;
        }
        if (user.gender == 'M') {
            setCalorie(Math.floor(1000 * (66.5 + 13.8 * Number(user.weight_goal) + 5 * Number(user.height)) / (6.8 * Number(user.age))));
        } else {
            setCalorie(Math.floor(1000 * (655.1 + 9.6 * Number(user.weight_goal) + 1.9 * Number(user.height)) / (4.7 * Number(user.age))));
        }
    }

    useEffect(() => {
        loadCalorie();
    }, [user])

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Target Calorie: {calorie}</Text>
            <Text style={styles.text}>Already Calorie: {cnt}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    text: {
        margin: 10
    }
})