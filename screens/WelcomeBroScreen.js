import React, {useState} from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';

export default function WelcomeBro({ navigation }) {
    const [date, setDate] = useState(dayjs());
    let tomorrowMorning = dayjs().add(1, 'day').startOf('day').hour(6).minute(30).second(0);

    return (
        <View style={styles.container}>


            <Text style={styles.text}>Welcome, bro</Text>
            <Button 
                title='TOMORROW MORNING BRO' 
                onPress={() =>
                    navigation.navigate("WhereToBro", {
                        conditionsTimestamp: tomorrowMorning.unix(),
                    })
                } 
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    }
});