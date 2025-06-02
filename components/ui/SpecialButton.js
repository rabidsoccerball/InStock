import { Pressable, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"

function SpecialButton({icon, size, color, onPress}) {
return(
    <Pressable style={({pressed}) =>[styles.button, pressed && styles.pressed]} onPress={onPress}>
        <Ionicons name={icon} size={size} color={color}/>
    </Pressable>
)
}

export default SpecialButton

const styles = StyleSheet.create({
    button:{
        padding: 8,
        margin: 4,
        justifyContent: 'center',
        alignContent: 'center'
    },
    pressed:{
        opacity: 0.7
    }
})