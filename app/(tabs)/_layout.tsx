import React from 'react';
import { TouchableOpacity, StyleSheet, Dimensions, View } from 'react-native';
import { Tabs, useRouter } from 'expo-router';
import Animated, {
    useAnimatedStyle,
    withTiming,
    interpolateColor,
    useSharedValue,
    useAnimatedReaction,
} from 'react-native-reanimated';
import LottieView from 'lottie-react-native';

// Import Lottie files
import homeLottie from '../../assets/lottie/home.json';
import statsLottie from '../../assets/lottie/stats.json';
import addLottie from '../../assets/lottie/add.json';
import userLottie from '../../assets/lottie/user.json';

const { width } = Dimensions.get('window');
const tabBarWidth = width * 0.7;
const tabBarHeight = 65; // Increased height
const iconSize = 36; // Unified icon size

const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

interface TabIconProps {
    focused: boolean;
    source: any;
    onPress: () => void;
    index: number;
    activeIndex: Animated.SharedValue<number>;
}

const TabIcon: React.FC<TabIconProps> = ({ focused, source, onPress, index, activeIndex }) => {
    const lottieRef = React.useRef<LottieView>(null);
    const progress = useSharedValue(0);

    React.useEffect(() => {
        if (focused) {
            lottieRef.current?.play();
        } else {
            lottieRef.current?.reset();
        }
    }, [focused]);

    useAnimatedReaction(
        () => activeIndex.value,
        (currentIndex) => {
            progress.value = withTiming(currentIndex === index ? 1 : 0, { duration: 200 });
        }
    );

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: progress.value * 0.1 + 1 }], // Reduced scale
        backgroundColor: interpolateColor(progress.value, [0, 1], ['transparent', '#e6ffe6']),
    }));

    return (
        <TouchableOpacity onPress={onPress} style={styles.iconButton}>
            <Animated.View style={[styles.iconContainer, animatedStyle]}>
                <AnimatedLottieView
                    ref={lottieRef}
                    source={source}
                    style={styles.lottieView}
                    autoPlay={false}
                    loop={true}
                />
            </Animated.View>
        </TouchableOpacity>
    );
};

export default function TabsLayout() {
    const router = useRouter();
    const activeIndex = useSharedValue(0);

    return (
        <View style={styles.container}>
            <Tabs
                screenOptions={{
                    tabBarStyle: styles.tabBar,
                    tabBarShowLabel: false,
                    headerShown: false,
                }}
            >
                <Tabs.Screen
                    name="index"
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <TabIcon
                                focused={focused}
                                source={homeLottie}
                                onPress={() => {
                                    router.push('/');
                                    activeIndex.value = 0;
                                }}
                                index={0}
                                activeIndex={activeIndex}
                            />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="stats"
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <TabIcon
                                focused={focused}
                                source={statsLottie}
                                onPress={() => {
                                    router.push('/stats');
                                    activeIndex.value = 1;
                                }}
                                index={1}
                                activeIndex={activeIndex}
                            />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="addBill"
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <TabIcon
                                focused={focused}
                                source={addLottie}
                                onPress={() => {
                                    router.push('/addBill');
                                    activeIndex.value = 2;
                                }}
                                index={2}
                                activeIndex={activeIndex}
                            />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="user"
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <TabIcon
                                focused={focused}
                                source={userLottie}
                                onPress={() => {
                                    router.push('/user');
                                    activeIndex.value = 3;
                                }}
                                index={3}
                                activeIndex={activeIndex}
                            />
                        ),
                    }}
                />
            </Tabs>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabBar: {
        position: 'absolute',
        bottom: 25,
        left: (width - tabBarWidth) / 2,
        right: (width - tabBarWidth) / 2,
        backgroundColor: 'white',
        borderRadius: tabBarHeight / 2,
        height: tabBarHeight,
        width: tabBarWidth,
        shadowColor: '#7F5DF0',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,
    },
    iconButton: {
        width: tabBarWidth / 4,
        height: tabBarHeight,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconContainer: {
        width: iconSize * 1.5,
        height: iconSize * 1.5,
        borderRadius: (iconSize * 1.5) / 2,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    lottieView: {
        width: iconSize,
        height: iconSize,
    },
});