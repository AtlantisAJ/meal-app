import { useContext, useLayoutEffect } from 'react';
import { Text, View, Image, StyleSheet, ScrollView } from 'react-native';
// для Redux
import { useSelector, useDispatch } from 'react-redux';

import { MEALS } from '../data/dummy-data';

import MealDetails from '../components/MealDetails';
import Subtitle from '../components/MealDetail/Subtitle';
import List from '../components/MealDetail/List';
import IconButton from '../components/IconButton';
import { addFavorite, removeFavorite } from '../store/redux/favorites';

// import { FavoritesContext } from '../store/context/favorites-context';       // для useContext

function MealDetailScreen({ route, navigation }) {
    // const favoriteMealsCtx = useContext(FavoritesContext);                   // для useContext
    const favoriteMealIds = useSelector((state) => state.favoriteMeals.ids); // для Redux
    const dispatch = useDispatch(); // для Redux

    const { mealId } = route.params;

    const selectedMeal = MEALS.find((meal) => meal.id === mealId);

    // const mealIsFavorite = favoriteMealsCtx.ids.includes(mealId);            // для useContext

    const mealIsFavorite = favoriteMealIds.includes(mealId); // для Redux

    // для useContext
    // function changeFavoriteStatusHandler() {
    //     if (mealIsFavorite) {
    //         favoriteMealsCtx.removeFavorite(mealId);
    //     } else {
    //         favoriteMealsCtx.addFavorite(mealId);
    //     }
    // }

    // для Redux
    function changeFavoriteStatusHandler() {
        if (mealIsFavorite) {
            dispatch(removeFavorite({ id: mealId }));
        } else {
            dispatch(addFavorite({ id: mealId }));
        }
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                return (
                    <IconButton
                        icon={mealIsFavorite ? 'star' : 'star-outline'}
                        color={'white'}
                        onPress={changeFavoriteStatusHandler}
                    />
                );
            },
        });
    }, [navigation, changeFavoriteStatusHandler]);

    return (
        <ScrollView style={styles.rootContainer}>
            <Image
                style={styles.image}
                source={{ uri: selectedMeal.imageUrl }}
            />
            <Text style={styles.title}>{selectedMeal.title}</Text>
            <MealDetails
                duration={selectedMeal.duration}
                complexity={selectedMeal.complexity}
                affordability={selectedMeal.affordability}
                textStyle={styles.detailText}
            />
            <View style={styles.listOuterContainer}>
                <View style={styles.listContainer}>
                    <Subtitle>Ingrediants</Subtitle>
                    <List data={selectedMeal.ingredients} />
                    <Subtitle>Steps</Subtitle>
                    <List data={selectedMeal.steps} />
                </View>
            </View>
        </ScrollView>
    );
}

export default MealDetailScreen;

const styles = StyleSheet.create({
    rootContainer: {
        marginBottom: 34,
    },
    image: {
        width: '100%',
        height: 350,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
        margin: 8,
        textAlign: 'center',
        color: 'white',
    },
    detailText: {
        color: 'white',
    },
    listOuterContainer: {
        alignItems: 'center',
    },
    listContainer: {
        width: '80%',
    },
});
