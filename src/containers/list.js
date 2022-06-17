//import liraries
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';


// create a component
const List = () => {

    const [list, setList] = useState(null);
    const isFocused = useIsFocused();
    useEffect(() => {
        (async function(){
            if (isFocused) {
                let result = await AsyncStorage.getItem('userSavedDatas');
                result && setList(JSON.parse(result))
            }
        })();
    }, [isFocused]);
    return (
        <View style={styles.container}>
            {list ?
                <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
                    {/* <Row data={state.tableHead} style={styles.head} textStyle={styles.text} /> */}
                    <Rows data={list} textStyle={styles.text} />
                </Table> :
                <Text>No data found</Text>
            }
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { margin: 6 }
});

//make this component available to the app
export default List;
