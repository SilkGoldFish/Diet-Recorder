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
            setCalorie(Math.floor(66.5 + 13.75 * Number(user.weight_goal) + 5.003 * Number(user.height) - 6.75 * Number(user.age)));
        } else {
            setCalorie(Math.floor(655.1 + 9.563 * Number(user.weight_goal) + 1.85 * Number(user.height) - 4.676 * Number(user.age)));
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