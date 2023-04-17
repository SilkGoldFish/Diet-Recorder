import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View, Modal, Pressable, ActivityIndicator, FlatList, TextInput } from 'react-native';

const Input = ({value, onChange}) => {
    return (
        <View style={styles.input}>
            <TextInput defaultValue={value} onChangeText={onChange}/>
        </View>
    );
}

export default function Search({ date, setDate, loadUserData}) {
    const d = date.split('-')
    const [year, setYear] = useState(d[0]);
    const [month, setMonth] = useState(d[1]);
    const [day, setDay] = useState(d[2]);

    const searchByDate = () => {
        console.log(year+'-'+month+'-'+day)
        setDate(year+'-'+month+'-'+day)
    }

    return (
        <View style={styles.container}>
            <Input value={year} onChange={(text)=>setYear(text)}/>
            <Input value={month} onChange={(text)=>setMonth(text)}/>
            <Input value={day} onChange={(text)=>setDay(text)}/>
            <Button title='search' onPress={searchByDate}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'white'
    },
    input: {
        flex:1,
        borderColor:'grey',
        borderWidth:1,
        borderRadius:5,
        margin:10,
        justifyContent:'center',
        alignItems:'center'
    }
});