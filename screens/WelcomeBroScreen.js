import { View, Text, StyleSheet, Button } from 'react-native';

export default function WelcomeBro({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Welcome, bro</Text>
            <Button 
                title='GET SOME' 
                onPress={() =>
                    navigation.navigate("WhereToBro", {
                        plooper: 'doodle',
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