import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

export default function AddBillScreen() {
    const [billName, setBillName] = useState('');
    const [amount, setAmount] = useState('');

    const handleAddBill = () => {
        // Implement the logic to add the bill
        console.log('Adding bill:', { name: billName, amount: parseFloat(amount) });
        // Reset the form
        setBillName('');
        setAmount('');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add New Bill</Text>
            <TextInput
                style={styles.input}
                placeholder="Bill Name"
                value={billName}
                onChangeText={setBillName}
            />
            <TextInput
                style={styles.input}
                placeholder="Amount"
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
            />
            <TouchableOpacity style={styles.button} onPress={handleAddBill}>
                <Text style={styles.buttonText}>Add Bill</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        marginBottom: 15,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});