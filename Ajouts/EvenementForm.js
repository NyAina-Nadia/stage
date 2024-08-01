import * as React from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Dimensions, Modal, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome';

function EvenementForm({ navigation }) {
    const [startDate, setStartDate] = React.useState(new Date());
    const [endDate, setEndDate] = React.useState(new Date());
    const [showStartDatePicker, setShowStartDatePicker] = React.useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = React.useState(false);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [summary, setSummary] = React.useState('');

    const [eventType, setEventType] = React.useState('');
    const [title, setTitle] = React.useState('');
    const [location, setLocation] = React.useState('');
    const [participant, setParticipant] = React.useState('');
    const [notes, setNotes] = React.useState('');

    const onStartDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || startDate;
        setShowStartDatePicker(false);
        setStartDate(currentDate);
    };

    const onEndDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || endDate;
        setShowEndDatePicker(false);
        setEndDate(currentDate);
    };

    const handleSubmit = async () => {
        const eventDetails = {
            event_type: eventType,
            title: title,
            location: location,
            participant: participant,
            notes: notes,
            start_date: startDate.toISOString().split('T')[0],
            end_date: endDate.toISOString().split('T')[0],
        };

        try {
            const response = await fetch('http://127.0.0.1:8000/api/evenements/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(eventDetails),
            });

            if (response.ok) {
                const data = await response.json();
                const summaryText = `Type d'évènement: ${data.event_type}\nTitre: ${data.title}\nLieu: ${data.location}\nParticipant: ${data.participant}\nNotes: ${data.notes}\nDate début: ${data.start_date}\nDate fin: ${data.end_date}`;
                setSummary(summaryText);
                setModalVisible(true);
            } else {
                Alert.alert('Erreur', 'Quelque chose a mal tourné.');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Erreur', 'Quelque chose a mal tourné.');
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                <TextInput
                    placeholder="Type d'évènement"
                    style={styles.input}
                    value={eventType}
                    onChangeText={setEventType}
                />
                <TextInput
                    placeholder="Titre"
                    style={styles.input}
                    value={title}
                    onChangeText={setTitle}
                />
                <TextInput
                    placeholder="Lieu"
                    style={styles.input}
                    value={location}
                    onChangeText={setLocation}
                />
                <TextInput
                    placeholder="Participant"
                    style={styles.input}
                    value={participant}
                    onChangeText={setParticipant}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Notes..."
                    multiline={true}
                    value={notes}
                    onChangeText={setNotes}
                />
                <View style={styles.dateContainer}>
                    <View style={styles.dateInput}>
                        <Text style={styles.dateInputLabel}>Date début</Text>
                        <TouchableOpacity onPress={() => setShowStartDatePicker(true)} style={styles.dateButton}>
                            <Text style={styles.dateButtonText}>{startDate.toLocaleDateString()}</Text>
                        </TouchableOpacity>
                        {showStartDatePicker && (
                            <DateTimePicker
                                testID="startDatePicker"
                                value={startDate}
                                mode="date"
                                display="default"
                                onChange={onStartDateChange}
                            />
                        )}
                    </View>
                    <View style={styles.dateInput}>
                        <Text style={styles.dateInputLabel}>Date fin</Text>
                        <TouchableOpacity onPress={() => setShowEndDatePicker(true)} style={styles.dateButton}>
                            <Text style={styles.dateButtonText}>{endDate.toLocaleDateString()}</Text>
                        </TouchableOpacity>
                        {showEndDatePicker && (
                            <DateTimePicker
                                testID="endDatePicker"
                                value={endDate}
                                mode="date"
                                display="default"
                                onChange={onEndDateChange}
                            />
                        )}
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
                        <Icon name="play" size={20} color="white" />
                        <Text style={styles.addButtonText}>Générer</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Compte-rendu de l'évènement</Text>
                    <Text style={styles.modalText}>{summary}</Text>
                    <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                        <Text style={styles.closeButtonText}>Fermer</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
}

// CSS
const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: 'white',
    },
    input: {
        width: '90%',
        padding: 10,
        marginVertical: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        fontSize: 16,
        color: '#333',
    },
    dateContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        marginVertical: 8,
    },
    dateInput: {
        flex: 1,
        alignItems: 'center',
        marginHorizontal: 5,
    },
    dateInputLabel: {
        marginBottom: 8,
        fontSize: 16,
        color: '#99A1A2',
    },
    dateButton: {
        padding: 10,
        backgroundColor: '#007AFF',
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
    },
    dateButtonText: {
        color: 'white',
    },
    buttonContainer: {
        marginTop: 20,
        width: '90%',
        alignItems: 'center',
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#000',
        borderRadius: 5,
        width: '50%',
        justifyContent: 'center',
    },
    addButtonText: {
        color: 'white',
        marginLeft: 8,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'white',
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    modalText: {
        fontSize: 18,
        marginBottom: 10,
    },
    closeButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#007AFF',
        borderRadius: 5,
    },
    closeButtonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default EvenementForm;
