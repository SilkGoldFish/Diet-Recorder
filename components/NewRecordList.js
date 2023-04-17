import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View, Modal, Pressable, ActivityIndicator, FlatList, RefreshControl } from 'react-native';


export default function NewRecordList({ data, refreshing, loadUserData}) {

    const Item = ({ title, value }) => {
        return (
            <View style={styles.item}>
                <View style={styles.textLeft}>
                    <Text style={styles.text}>{title}</Text>

                </View>
                <View style={styles.textRight}>
                    <Text style={styles.text}>{value}</Text>

                </View>

            </View>
        );
    }

    const ItemView = ({ item }) => {
        return (
            <View style={styles.container}>
                <Item title='name' value={item.name} />
                <Item title='date' value={item.date} />
                <Item title='time' value={item.time} />
                <Item title='type' value={item.type} />
                <Item title='calories' value={item.calories} />
                <Item title='quantity' value={item.quantity} />
                <Item title='duration' value={item.duration} />
                <Item title='description' value={item.description} />
            </View>

        );
    };

    const ItemSeparatorView = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: '100%',
                    backgroundColor: '#C8C8C8',
                }}
            />
        );
    };


    return (
        <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={ItemSeparatorView}
            enableEmptySections={true}
            renderItem={ItemView}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={loadUserData} />
            }
        />
    );
}


const styles = StyleSheet.create({
    item: {
        flexDirection:'row'
    }
});