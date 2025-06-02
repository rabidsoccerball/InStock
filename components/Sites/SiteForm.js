import { ScrollView, Text, TextInput, View, StyleSheet } from "react-native"
import { useCallback, useState } from "react";
import Button from "../ui/Button";
import { Site } from "../../models/site";

function SiteForm({ onCreateSite }) {
    const [enteredTitle, setEnteredTitle] = useState('');
    const [pickedSite, setPickedSite] = useState();

    function changeTitleHandler(enteredText) {
        setEnteredTitle(enteredText)
    }

    const changeSiteHandler = useCallback((enteredSite) => {
        setPickedSite(enteredSite)
    }, []);

    function saveSiteHandler() {
        const siteData = new Site(enteredTitle, pickedSite);
        onCreateSite(siteData);

    }
    return (
        <ScrollView style={styles.form}>
            <View>
                <Text style={styles.label}>Title</Text>
                <TextInput style={styles.input} onChangeText={changeTitleHandler} value={enteredTitle} maxLength={30}/>

                <Text style={styles.label}>URL</Text>
                <TextInput style={styles.inputURL} onChangeText={changeSiteHandler} value={pickedSite} multiline={true} />
            </View>
            <Button onPress={saveSiteHandler}>Add Site</Button>
        </ScrollView>
    )
}

export default SiteForm

const styles = StyleSheet.create({
    form: {
        flex: 1,
        padding: 24
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 4,
        color: '#670000'
    },
    input: {
        marginVertical: 8,
        paddingHorizontal: 4,
        paddingVertical: 8,
        fontSize: 16,
        backgroundColor: '#F9F3E1'
    },
    inputURL: {
        marginVertical: 8,
        paddingHorizontal: 4,
        paddingVertical: 8,
        fontSize: 16,
        backgroundColor: '#F9F3E1',
        height: 150,
        textAlign: 'left',
        textAlignVertical: 'top'
    }
})