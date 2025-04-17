import { useColors } from '@/hooks/useColors'
import { BottomSheetView } from '@gorhom/bottom-sheet'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Text } from '../Themed'
import DatePicker from '../DatePicker/DatePicker'
import { Ionicons } from '@expo/vector-icons'
import Button from '../Button/Button'
import { useParties } from '@/hooks/useParties'

interface FiltersOptionsProps {
    date: Date;
    setDate: (date: Date) => void;
}

const FiltersOptions: React.FC<FiltersOptionsProps> = ({ date, setDate }) => {
    const { surface, background, tint } = useColors()
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false)


    return (
        <BottomSheetView style={[styles.container, { backgroundColor: surface }]}>
            <Text style={styles.title}>
                Let's find perfect party for you!
            </Text>

            <View style={styles.filterContainer}>
                <TouchableOpacity
                    style={[styles.option, { backgroundColor: background, flex: 1 }]}
                    onPress={() => setDatePickerVisibility(true)}
                >
                    <View style={styles.row}>
                        <View style={styles.textWithIcon}>
                            <Ionicons name="calendar" size={22} color={tint} />
                            <Text style={styles.optionText}>
                                Date
                            </Text>
                        </View>
                        <Text style={[styles.dateText]}>
                            {date.toLocaleDateString()}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>

            <View style={styles.filterContainer}>
                <TouchableOpacity style={[styles.option, { backgroundColor: background }]}>
                    <View style={styles.row}>
                        <View style={styles.textWithIcon}>
                            <Ionicons name="location" size={22} color={tint} />
                            <Text style={styles.optionText}>
                                Distance
                            </Text>
                        </View>
                        <Text style={[styles.dateText]}>
                            10 km
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>

            {!isDatePickerVisible &&
                <Button
                    title='Apply'
                    onPress={() => { }}
                    color='primary'
                />
            }

            <View style={{ height: 30 }} />

            <DatePicker
                isDatePickerVisible={isDatePickerVisible}
                setDatePickerVisibility={setDatePickerVisibility}
                date={date}
                setDate={setDate}
            />
        </BottomSheetView>
    )
}

export default FiltersOptions

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,
        paddingHorizontal: 20,
        gap: 15,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 15,
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    option: {
        width: '100%',
        padding: 16,
        borderRadius: 12,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textWithIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    optionText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    dateText: {
        fontSize: 18,
        fontWeight: 'bold'
    },
})
