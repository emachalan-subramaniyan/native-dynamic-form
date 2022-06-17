//import liraries
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, StatusBar, Dimensions, ScrollView, Alert } from 'react-native';
import Textarea from 'react-native-textarea';
import { useSelector, useDispatch } from 'react-redux'
import { addForm } from '../redux/reducer/form';

const { width, height } = Dimensions.get('window');

// create a component
const Home = ({ navigation }) => {

    const [formValue, setFormValue] = useState(null);
    const dispatch = useDispatch();

    const onChangeText = (data) => {
        setFormValue(data);
    }

    const isJsonFormat = (data) => {
        try {
            JSON.parse(data);
        } catch (e) {
            return false;
        }
        return true;
    }

    const onSubmit = () => {
        console.log("isJsonFormat(formValue)...", isJsonFormat(formValue), formValue)
        if(formValue != null && isJsonFormat(formValue)){
            dispatch(addForm(formValue));
            navigation.navigate('Form');
        }else {
            Alert.alert("Not a json format")
        }
    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}
                keyboardShouldPersistTaps='handled'
            >
                <Textarea
                    containerStyle={styles.textareaContainer}
                    style={styles.textInput}
                    onChangeText={d => onChangeText(d)}
                    defaultValue={formValue}
                    placeholder={'Enter json here...'}
                    placeholderTextColor={'#c7c7c7'}
                    underlineColorAndroid={'transparent'}
                />
                <View style={{ marginTop: 40, width: width / 2 }}>
                    <Button
                        title="Submit"
                        style={styles.btnStyle}
                        onPress={() => onSubmit()}
                    />
                </View>
                <View style={{ marginTop: 40, width: width / 2 }}>
                    <Button
                        title="Show saved items"
                        style={styles.btnStyle}
                        onPress={() => navigation.navigate("List")}
                    />
                </View>
            </ScrollView>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width,
        // justifyContent: 'center',
        alignItems: 'center',
        paddingTop: StatusBar.currentHeight,
        backgroundColor: '#e0ebeb',
    },
    textareaContainer: {
        height: height / 4,
        width: width - 40,
        paddingLeft: 5,
        backgroundColor: '#F5FCFF',
    },
    textInput: {
        textAlignVertical: 'top',  // hack android
        height: height / 3.9,
        fontSize: 14,
        color: '#333',
    },
    btnStyle: {
        display: 'flex',
        marginTop: 40,
        width: width / 2,
        height: 40
    }
});

//make this component available to the app
export default Home;
