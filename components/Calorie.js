import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View, Modal, Pressable, ActivityIndicator, FlatList } from 'react-native';


export default function Calorie({ data, userId }) {
    const [calorie, setCalorie] = useState(0);
    let cnt = 0
    
    for (let i = 0; i < data.length; i++) {
        if (data[i].type == 'sports') {
            cnt -= data[i].calories
        } else {
            cnt += data[i].calories
        }
    }
    
    const loadCalorie = () => {
        fetch('https://sirusw.pythonanywhere.com/api/profile/' + userId)
            .then((response) => response.json())
            .then((responseJson) => {
                const newdata = responseJson;
                if (newdata.gender == 'M') {
                    setCalorie((66.5 + 13.8 * Number(newdata.weight_goal) + 5 * Number(newdata.height)) / (6.8 * Number(newdata.age)));
                } else {
                    setCalorie((655.1 + 9.6 * Number(newdata.weight_goal) + 1.9 * Number(newdata.height)) / (4.7 * Number(newdata.age)));
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };
    
    useEffect(() => {
        loadCalorie();
    }, []);
    
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
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'white'
    },
    text: {
        margin:10
    }
})