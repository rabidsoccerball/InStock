import { View, Text, TextInput, StyleSheet } from 'react-native';


function Input({
  label,
  keyboardType,
  secure,
  onUpdateValue,
  value,
  isInvalid,
}) {
  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, isInvalid && styles.labelInvalid]}>
        {label}
      </Text>
      <TextInput
        style={[styles.input, isInvalid && styles.inputInvalid]}
        autoCapitalize={false}
        keyboardType={keyboardType}
        secureTextEntry={secure}
        onChangeText={onUpdateValue}
        value={value}
      />
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 8,
  },
  label: {
    color: '#670000',
    marginBottom: 4,
  },
  labelInvalid: {
    color: '#FF0000',
  },
  input: {
    paddingVertical: 8,
    paddingHorizontal: 6,
    backgroundColor: '#F9F3E1',
    borderRadius: 4,
    fontSize: 16,
    color: '#670000'
  },
  inputInvalid: {
    backgroundColor: '#B99770',
  },
});
