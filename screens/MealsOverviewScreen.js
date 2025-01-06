import { View, StyleSheet, FlatList } from 'react-native';

import MealItem from '../components/MeaItem';
import { MEALS } from '../data/dummy-data';

function MealsOverviewScreen({ route }) {
    const catId = route.params.categoryId;

    const displayedMeals = MEALS.filter((mealItem) => {
        return mealItem.categoryIds.indexOf(catId) >= 0;
    });

    function renderMealItem(itemData) {
        const { title, imageUrl, duration, complexity, affordability } =
            itemData.item;
        return (
            <MealItem
                title={title}
                imageUrl={imageUrl}
                duration={duration}
                complexity={complexity}
                affordability={affordability}
            />
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={displayedMeals}
                keyExtractor={(item) => item.id}
                renderItem={renderMealItem}
            />
        </View>
    );
}

export default MealsOverviewScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
});
