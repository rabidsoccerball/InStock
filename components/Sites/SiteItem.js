import { Pressable, View, Image, Text, StyleSheet } from "react-native"
import { useNavigation } from '@react-navigation/native';
import SpecialButton from "../ui/SpecialButton"
import { deleteSite } from "../../util/http"
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../store/auth-context";
import cio from 'cheerio-without-node-native';


function SiteItem({ Site }) {
    const [stock, setStock] = useState(null);

    const authCtx = useContext(AuthContext);


    const userId = authCtx.userId

    const navigation = useNavigation();

    const company = Site.company

    //this is old code that would work with different sites
    // let companySelector;
    // switch(company){
    //     case "Walmart":
    //         companySelector ='[data-testid="atc-buynow-container"]';
    //         break;
    //     case "Target":
    //         companySelector = 'span:contains("Out of stock")'
    //         break;
    //     default:
    //         console.log('did not work')
    // }


    async function fetchStock() {
        try {
            const response = await fetch(Site.url);
            const data = await response.text();
            const $ = cio.load(data);
            const container = $('span:contains("Add to cart")');
            return container.length > 0;
        } catch (error) {
            console.error("Error fetching stock status:", error);
            return false;
        }

    }

    useEffect(() => {
        async function fetchStockStatus() {
            const result = await fetchStock();
            setStock(result);
        }
        fetchStockStatus();
    }, [Site.url]);


    function onDeleteHandler(url) {
        deleteSite(url, userId)
        navigation.replace('SavedSites')
    }
    const urlShort = Site.url.substring(0,100)

return (
    <View style={styles.item}>

        <View style={styles.itemcase}>
            <Text style={styles.title}>{Site.title}</Text>
            <Text style={styles.url}>{urlShort}</Text>
            <View style={styles.stockCase}>
                <Text style={styles.stock}>{stock ? 'Item is in stock' : 'Out of stock'}</Text>
            </View>
        </View>


        <SpecialButton icon={"trash"} size={25} color={"#670000"} onPress={() => onDeleteHandler(Site.name)} />
    </View>
)
}

export default SiteItem

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        borderRadius: 6,
        marginVertical: 12,
        backgroundColor: '#F9F3E1',
        elevation: 2,
        paddingLeft: 10,
        width: '100%'
    },
    itemcase: {
        flex: 1,
        borderBottomLeftRadius: 4,
        borderTopLeftRadius: 4,
        height: 75,
        flexDirection: 'column',
        flex: 1,

    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#670000'
    },
    url: {
        fontSize: 12,
        color: '#670000'
    },
    stock: {
        fontSize: 12,
        color: '#FF0000'
    },
    stockCase: {
        width: '100%',


    },
})