//import liraries
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, StatusBar, Dimensions, Button, Alert } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get("window");
// create a component
const Form = ({ navigation }) => {

    const {formData} = useSelector(state => state.form);
    const isFocused = useIsFocused();

    const [currentForm, setCurrentForm] = useState(null);

    useEffect(() => {
        if (isFocused && formData) {
            const formValue = formData
            let dupForm = formValue['form'];
            let finalform = dupForm.map(item => {
                if (item.type === 'radio') {
                    let ss = item.options.map(innerItem => {
                        let dd = { label: innerItem, value: innerItem }
                        return dd;
                    })
                    item.options = ss;
                    return item;
                } else {
                    return item;
                }
            })
            formValue['form'] = finalform;
            isJsonFormat(formData) && setCurrentForm(formData);
        }
    }, [formData, isFocused]);

    const isJsonFormat = (data) => {
        try {
            return data?.form && data?.form.length > 0;
        } catch (e) {
            return false;
        }
    }

    const onChangeText = (data, index) => {
        const formData = [...currentForm['form']];
        let ss = formData[index];
        ss['value'] = data;
        formData[index] = ss;
    }

    const onRadioSelect = (data, index) => {
        const formData = [...currentForm['form']];
        let ss = formData[index];
        ss['value'] = data;
        formData[index] = ss;
        let dd = { ...currentForm, form: formData }
        setCurrentForm(dd);
    }
    const onCheckBoxSelect = (data, index, currentValue) => {
        const formData = [...currentForm['form']];
        let ss = formData[index];
        ss['value'] = currentValue;
        formData[index] = ss;
        let dd = { ...currentForm, form: formData }
        setCurrentForm(dd);
    }

    const onSubmit = async () => {
        const allContainValue = currentForm && currentForm.form && currentForm.form.find(item => !item.value)
        if (!allContainValue) {
            let alreadyPresentedDatas = await AsyncStorage.getItem("userSavedDatas");
            JSON.parse(alreadyPresentedDatas).map(item => console.log('ssss', item));
            if (!alreadyPresentedDatas) {
                let finaldata = [];
                let d = currentForm.form.map(item => item.value)
                finaldata.push(d);
                await AsyncStorage.setItem("userSavedDatas", JSON.stringify(finaldata));
                setCurrentForm(null);
                navigation.push("List");
            } else {
                let previousData = JSON.parse(alreadyPresentedDatas);
                let d = currentForm.form.map(item => item.value)
                previousData.push(d);
                setCurrentForm(null);
                await AsyncStorage.setItem("userSavedDatas", JSON.stringify(previousData));
                navigation.push("List");
            }
        } else {
            Alert.alert("All fields required");
        }
    }

    return (
        <View style={styles.container}>
            {currentForm ?
                currentForm?.form.map((item, index) => {
                    if (item.type === 'text') {
                        return (
                            <View>
                                <Text style={styles.subHead}>{item.label}</Text>
                                <View>
                                    <TextInput
                                        style={styles.input}
                                        onChangeText={data => onChangeText(data, index)}
                                        value={item.value}
                                    />
                                </View>
                            </View>
                        )
                    }
                    if (item.type === 'radio') {
                        return (
                            <View style={styles.headStyle}>
                                <Text style={styles.subHead}>{item.label}</Text>
                                <View>
                                    <RadioForm
                                        formHorizontal={false}
                                    >
                                        {
                                            item.options.map((obj, i) => (
                                                <RadioButton style={{ marginTop: 5 }} labelHorizontal={true} key={i} >
                                                    {/*  You can set RadioButtonLabel before RadioButtonInput */}
                                                    <RadioButtonInput
                                                        obj={obj}
                                                        index={i}
                                                        isSelected={item.value === obj.value}
                                                        onPress={data => onRadioSelect(data, index)}
                                                        borderWidth={1}
                                                        buttonInnerColor={'#e74c3c'}
                                                        buttonOuterColor={item.value === obj.value ? '#2196f3' : '#000'}
                                                        buttonSize={20}
                                                        buttonOuterSize={20}
                                                        buttonStyle={{}}
                                                        buttonWrapStyle={{ marginLeft: 10 }}
                                                    />
                                                    <RadioButtonLabel
                                                        obj={obj}
                                                        index={i}
                                                        labelHorizontal={true}
                                                        onPress={data => onRadioSelect(data, index)}
                                                        labelStyle={{ fontSize: 14, color: '#000' }}
                                                        labelWrapStyle={{}}
                                                    />
                                                </RadioButton>
                                            ))
                                        }
                                    </RadioForm>
                                </View>
                            </View>
                        )
                    }
                    if (item.type === 'checkbox') {
                        return (
                            <View style={styles.headStyle}>
                                <Text style={styles.subHead}>{item.label}</Text>
                                {item.options.map(inner_item => (
                                    <View style={styles.checkboxContainer}>
                                        <CheckBox
                                            value={item.value === inner_item}
                                            onValueChange={data => onCheckBoxSelect(data, index, inner_item)}
                                            style={styles.checkbox}
                                        />
                                        <Text style={styles.label}>{inner_item}</Text>
                                    </View>
                                ))
                                }
                            </View>
                        )
                    }
                })
                : null
            }
            <View style={{ marginTop: 40, width: width / 2 }}>
                <Button
                    title="Submit"
                    style={styles.btnStyle}
                    onPress={() => onSubmit()}
                />
            </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        paddingTop: StatusBar.currentHeight,
        paddingLeft: 20,
        alignItems: 'flex-start',
        backgroundColor: '#e0ebeb',
    },
    headStyle: {
        marginTop: 20,
    },
    subHead: {
        fontSize: 16,
        color: "#000",
        marginBottom: 10
    },
    input: {
        height: 40,
        width: width - 60,
        borderBottomWidth: 0.5,
        borderBottomColor: '#808080',
        padding: 10,
        fontSize: 16,
    },
    checkboxContainer: {
        flexDirection: "row",
        marginBottom: 5,
    },
    checkbox: {
        alignSelf: "center",
    },
    label: {
        margin: 5,
        fontSize: 14,
        color: '#000'
    },
});

//make this component available to the app
export default Form;
