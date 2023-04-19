import React from 'react';
import { StyleSheet, Text, View, FlatList, RefreshControl } from 'react-native';

export default function RecordList({ data, refreshing, loadUserData }) {

    const Item = ({ title, value }) => {
        return (
            <View style={styles.item}>
                <Text style={styles.text}>{title}</Text>
                <Text style={styles.text}>{value}</Text>
            </View>
        );
    }

    const ItemView = ({ item }) => {
        return (
            <View style={styles.container}>
                <Item title='name:' value={item.name} />
                <Item title='date:' value={item.date} />
                <Item title='time:' value={item.time} />
                <Item title='type:' value={item.type} />
                <Item title='calories:' value={item.calories} />
                <Item title='quantity:' value={item.quantity} />
                <Item title='duration:' value={item.duration} />
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
            style={styles.list}
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
        flexDirection: 'row',
        borderRadius: 10,
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        padding: 10,
        margin: 20,
        borderRadius: 20
    },
    text: {
        flex: 1,
        padding: 5,
        fontSize: 15,
        textAlign: 'center',

    },
    list: {
        marginBottom: 90
    }

});