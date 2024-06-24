import { 
    SafeAreaView, 
    StatusBar, 
    View, 
    Text, 
    StyleSheet, 
    ScrollView,
    FlatList 
} from 'react-native';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';

export default function WhereToBro({ route }) {
    const MIN_POWER = 10;
    const { conditionsTimestamp } = route.params;

    const [swellList, setSwellList] = useState([])
    const [tideList, setTideList] = useState([])

    const fetchSwellData = async (days = 3) => {
        try {
            const swellURL = `https://services.surfline.com/kbyg/spots/forecasts/swells?cacheEnabled=true&${days}&intervalHours=1&spotId=5842041f4e65fad6a7708807&units%5BswellHeight%5D=FT`
            const response = await fetch(swellURL);
            const swellData = await response.json();

            // find target swell
            setSwellList(findClosestSwell(swellData, conditionsTimestamp));
        } catch (error) {
            console.error("Failed to fetch swell data: ", error);
        }
    };

    const fetchTideData = async (days = 3) => {
        try {
            const tideURL = `https://services.surfline.com/kbyg/spots/forecasts/tides?spotId=5842041f4e65fad6a7708807&days=${days}`
            const response = await fetch(tideURL);
            const tideData = await response.json();
            
            setTideList(findClosestTide(tideData.data.tides, conditionsTimestamp));
        } catch (error) {
            console.error("Failed to fetch tide data: ", error);
        }
    };

    useEffect(() => {
        fetchSwellData();
        fetchTideData();
    }, []);

    const findClosestSwell = (swells, targetTimestamp) => {
        var index = 0;

        while (swells.data.swells[index].timestamp < targetTimestamp) {
            index++;
        }

        return swells.data.swells[index];
    };

    const findClosestTide = (tides, targetTimestamp) => {
        var index = 0;

        while (index < tides.length && tides[index].timestamp < targetTimestamp) {
            //console.log("Tide: ", tides[index].timestamp, " vs. ", targetTimestamp);
            index++;
        }

        return tides[index];
    };


    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {/* show time of day */}
                <Text>{dayjs(conditionsTimestamp * 1000).format('MMMM D, YYYY h:mm A')}</Text>
                
                {/* show swells */}
                {swellList && swellList.swells && swellList.swells
                    .filter(swell => swell.power >= MIN_POWER)
                    .map((swell, index) => (
                        <Text key={index}>
                            Height: {parseFloat(swell.height.toPrecision(2))}, Period: {swell.period}, Direction: {Math.round(swell.direction)}
                        </Text>
                ))}


                {/* show tides */}
                <Text>Tide: {tideList.height}</Text>

            </ScrollView>
            <Text>{/*JSON.stringify(tideList, null, 2)*/}</Text>
                {/*
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
                */}
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
