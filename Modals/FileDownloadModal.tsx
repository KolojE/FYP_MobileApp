import React, { useState } from "react";
import { Modal, View, TouchableOpacity, Text, StyleSheet } from "react-native";

const FileDownloadModal = ({ visible, onClose, onFileTypeSelect }) => {
  const [selectedFileType, setSelectedFileType] = useState(null);

  const handleFileTypeSelect = (fileType) => {
    setSelectedFileType(fileType);
    onFileTypeSelect(fileType);
  };

  return (
    <Modal visible={visible} onRequestClose={onClose} transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Select File Type</Text>
          <TouchableOpacity
            style={[
              styles.fileTypeButton,
              selectedFileType === "excel" && styles.selectedFileTypeButton,
            ]}
            onPress={() => handleFileTypeSelect("csv")}
          >
            <Text style={styles.fileTypeButtonText}>Excel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    width: 300,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  fileTypeButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
  },
  selectedFileTypeButton: {
    borderColor: "blue",
  },
  fileTypeButtonText: {
    fontSize: 16,
    textAlign: "center",
  },
  closeButton: {
    backgroundColor: "blue",
    borderRadius: 8,
    padding: 10,
    marginTop: 16,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default FileDownloadModal;