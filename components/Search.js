import React, { useState, useContext } from 'react';
import { Button, StyleSheet, View, TextInput } from 'react-native';
import { UserContext } from '../UserContext';

const Input = ({ value, onChange }) => {
    return (
        <View style={styles.input}>
            <TextInput defaultValue={value} onChangeText={onChange} />
        </View>
    );
}

export default function Search() {
    const { user, setData } = useContext(UserContext)
    let date = new Date().toLocaleDateString().split('/')
    date[2] = '20' + date[2]

    const [year, setYear] = useState(date[2]);
    const [month, setMonth] = useState(date[0]);
    const [day, setDay] = useState(date[1]);

    const searchByDate = () => {
        const date = year + '-' + month + '-' + day
        fetch('https://sirusw.pythonanywhere.com/api/record/?user_id=' + user.id + '&date=' + date)
            .then((response) => response.json())
            .then((responseJson) => {
                setData(responseJson);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    return (
        <View style={styles.container}>
            <Input value={year} onChange={(text) => setYear(text)} />
            <Input value={month} onChange={(text) => setMonth(text)} />
            <Input value={day} onChange={(text) => setDay(text)} />
            <Button title='search' onPress={searchByDate} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    input: {
        flex: 1,
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 5,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center'
    }
});