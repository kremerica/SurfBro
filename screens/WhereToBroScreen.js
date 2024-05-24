import { 
    SafeAreaView, 
    StatusBar, 
    View, 
    Text, 
    StyleSheet, 
    FlatList 
} from 'react-native';
import { useState, useEffect } from 'react';

export default function WhereToBro({ route }) {
    const { plooper } = route.params;

    const [swellList, setSwellList] = useState([])

    const fetchSwellData = async (days = 5) => {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${days}`);
            const swellData = await response.json();
            setSwellList(swellData);
        } catch (error) {
            console.error("Failed to fetch data: ", error);
        }
    };

    useEffect(() => {
        fetchSwellData();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.listContainer}>
                <FlatList 
                    data={swellList}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <Text style={styles.titleText}>{item.title}</Text>
                            <Text style={styles.bodyText}>{item.body}</Text>
                        </View>
                    )}
                    keyExtractor={item => item.id.toString()}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingTop: StatusBar.currentHeight,
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    listContainer: {
        flex: 1,
        paddingHorizontal: 16,
    },
    card: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 8,
        borderWidth: 1,
    },
    titleText: {
        fontSize: 30,
    },
    bodyText: {
        fontSize: 24,
        color: '#666666',
    },
});
