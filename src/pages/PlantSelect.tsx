import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import colors from '../styles/colors';

export function PlantSelect() {
	return (
		<View style={styles.container}>
			<Text>Selecionar Planta</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: colors.background
	}
});