import React from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView } from 'react-native';

interface UserProfileProps {
    name: string;
    balance: number;
    currency: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ name, balance, currency }) => {
    return (
        <View style={styles.profileContainer}>
            <View style={styles.profileHeader}>
                <Image
                    source={require('../assets/profile-pic.jpg')}
                    style={styles.profilePic}
                />
                <View style={styles.nameContainer}>
                    <Text style={styles.greeting}>Hi,</Text>
                    <Text style={styles.name}>{name}</Text>
                </View>
            </View>
            <View style={styles.balanceContainer}>
                <Text style={styles.balanceLabel}>Total Balance</Text>
                <Text style={styles.balance}>{currency} {balance.toFixed(2)}</Text>
            </View>
        </View>
    );
};

const HomeScreen: React.FC = () => {
    return (
        <SafeAreaView style={styles.container}>
            <UserProfile name="Frankline" balance={1234.56} currency="USD" />
        </SafeAreaView>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    profileContainer: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        margin: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    profileHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    profilePic: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 15,
    },
    nameContainer: {
        justifyContent: 'center',
    },
    greeting: {
        fontSize: 16,
        color: '#666',
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    balanceContainer: {
        borderTopWidth: 1,
        borderTopColor: '#eee',
        paddingTop: 15,
    },
    balanceLabel: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
    },
    balance: {
        fontSize: 28,
        fontWeight: 'bold',
    },
});