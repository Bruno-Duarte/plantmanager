import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    FlatList
} from 'react-native';
import { Header } from '../components/Header';

import waterdrop from '../assets/waterdrop.png';
import colors from '../styles/colors';
import { loadPlant, PlantProps } from '../libs/storage';
import { formatDistance } from 'date-fns';
import { pt } from 'date-fns/locale';

export function MyPlants() {
    const [myPlants, setMyPlants] = useState<PlantProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [nextWaterd, setNextWaterd] = useState<string>();

    useEffect(() => {
        async function loadStorageData() {
            const plantsStoraged = await loadPlant();

            const nextTime = formatDistance(
                new Date(plantsStoraged[0].dateTimeNotification).getTime(),
                new Date().getTime(), 
                {locale: pt }
            );

            setNextWaterd(
                `Não esqueça de regar a ${plantsStoraged[0].name} às ${nextTime} horas`
            );

            setMyPlants(plantsStoraged);
            setLoading(false);
        }

        loadStorageData();
    });

    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.spotlight}>
                <Image 
                    source={waterdrop}
                    style={styles.spotlightImage}
                />
                <Text style={styles.spotlightText}>
                    {nextWaterd}
                </Text>
            </View>
            <View>
                <Text>Próximas regadas</Text>
                <FlatList 
                    data={myPlants}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({item}) => (
                        <Text>Elemento</Text>
                    )}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{flex: 1}}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        paddingTop: 50,
        backgroundColor: colors.background,
    },
});
