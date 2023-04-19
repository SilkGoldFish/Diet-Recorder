import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

export default function NewRecordList({ data }) {

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
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={ItemSeparatorView}
            enableEmptySections={true}
            renderItem={ItemView}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%'
    },
    item: {
        flexDirection: 'row',
        width: '100%',
        margin: 5,
    },
    text: {
        fontSize: 15,
        width: '50%',
        textAlign: 'center'
    }
});