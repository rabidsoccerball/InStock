import { FlatList, View, Text, StyleSheet} from "react-native"
import SiteItem from "./SiteItem"



function SiteList({ Sites }) {
    if (!Sites || Sites.length === 0) {
        return (
            <View style={styles.fallbackContainer}>
                <Text style={styles.fallbackText}>You haven't added any sites.</Text>
            </View>
        )
    }



    return (
        <FlatList style={styles.list} data={Sites} keyExtractor={(item) => item.id} renderItem={({ item }) => <SiteItem Site={item} />} />
    )
}

export default SiteList

const styles = StyleSheet.create({
    list: {
        margin: 24
    },
    fallbackContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    fallbackText: {
        fontSize: 16,
        color: '#670000'
    }
})