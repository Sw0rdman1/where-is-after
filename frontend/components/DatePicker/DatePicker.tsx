import { StyleSheet, Text, View } from 'react-native'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import Button from '../Button/Button'
import { useState } from 'react'

interface DatePickerProps {
    date: Date
    setDate: (date: Date) => void
    isDatePickerVisible: boolean
    setDatePickerVisibility: (isVisible: boolean) => void
}

const DatePicker: React.FC<DatePickerProps> = ({ isDatePickerVisible, setDatePickerVisibility, date, setDate }) => {
    const [] = useState(false)
    const [tempSelectedDate, setTempSelectedDate] = useState(date)

    const hideDatePicker = () => setDatePickerVisibility(false)

    const handleDateChange = (date: Date) => {
        setTempSelectedDate(date)
    }

    const handleConfirm = (selectedDate: Date) => {
        setDate(selectedDate)
    }

    return (
        <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            date={tempSelectedDate}
            onConfirm={handleConfirm} // optional now
            onCancel={hideDatePicker}
            onChange={handleDateChange}
            isDarkModeEnabled={true}
            themeVariant="dark"
            display="spinner"
            cancelTextIOS="Cancel"
            confirmTextIOS="Confirm"
            customConfirmButtonIOS={() => (
                <Button
                    title="Confirm"
                    onPress={() => {
                        setDate(tempSelectedDate)
                        hideDatePicker()
                    }}
                />
            )}
            customCancelButtonIOS={() => (
                <Button title="Cancel" color='secondary' onPress={hideDatePicker} />
            )}
        />
    )
}

export default DatePicker

const styles = StyleSheet.create({})