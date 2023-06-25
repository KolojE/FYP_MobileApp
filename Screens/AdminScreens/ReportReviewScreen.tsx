import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const ReportReviewScreen = () => {
  const [report, setReport] = useState('');
  const [updatedReport, setUpdatedReport] = useState('');

  // Function to submit the updated report
  const submitReport = () => {
    // Perform the necessary logic to update the report in the database
    // You can use an API call or any other method to send the updated report data
    console.log('Updated report:', updatedReport);
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 16 }}>
        Report Review
      </Text>
      <Text style={{ marginBottom: 8 }}>Original Report:</Text>
      <Text>{report}</Text>

      <Text style={{ marginTop: 16 }}>Update Report:</Text>
      <TextInput
        style={{ borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 16 }}
        multiline
        numberOfLines={4}
        placeholder="Enter updated report"
        value={updatedReport}
        onChangeText={text => setUpdatedReport(text)}
      />

      <Button title="Submit" onPress={submitReport} />
    </View>
  );
};

export default ReportReviewScreen;
