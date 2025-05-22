// src/screens/GeneralInsuranceScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { colors, spacing, typography } from '../theme';
import { generalInsuranceData, formatCurrency, formatDate } from '../data/mockData';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from '../components/ThemeToggle';

export default function GeneralInsuranceScreen({ navigation }) {
  const [selectedCover, setSelectedCover] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const { colors, isDarkMode } = useTheme();

  const { covers } = generalInsuranceData;

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return colors.success;
      case 'Expired':
        return colors.danger;
      case 'Pending':
        return colors.warning;
      default:
        return colors.gray500;
    }
  };

  const getCoverIcon = (type) => {
    switch (type) {
      case 'Motor Vehicle':
        return '🚗';
      case 'Home Insurance':
        return '🏠';
      case 'Travel Insurance':
        return '✈️';
      default:
        return '📋';
    }
  };

  const openCoverDetails = (cover) => {
    setSelectedCover(cover);
    setModalVisible(true);
  };

  const renderCoverCard = (cover) => (
    <TouchableOpacity
      key={cover.id}
      style={styles.coverCard}
      onPress={() => openCoverDetails(cover)}
    >
      <View style={styles.coverHeader}>
        <View style={styles.coverTitleContainer}>
          <Text style={styles.coverIcon}>{getCoverIcon(cover.type)}</Text>
          <View style={styles.coverTitleText}>
            <Text style={styles.coverType}>{cover.type}</Text>
            <Text style={styles.policyNumber}>{cover.policyNumber}</Text>
          </View>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(cover.status) }]}>
          <Text style={styles.statusText}>{cover.status}</Text>
        </View>
      </View>

      <View style={styles.coverDetails}>
        <View style={styles.coverInfo}>
          <Text style={styles.coverLabel}>Coverage</Text>
          <Text style={styles.coverValue}>{cover.coverage}</Text>
        </View>
        <View style={styles.coverInfo}>
          <Text style={styles.coverLabel}>Annual Premium</Text>
          <Text style={styles.coverValue}>{formatCurrency(cover.premium)}</Text>
        </View>
        <View style={styles.coverInfo}>
          <Text style={styles.coverLabel}>Valid Until</Text>
          <Text style={styles.coverValue}>{formatDate(cover.endDate)}</Text>
        </View>
      </View>

      <Text style={styles.viewDetails}>Tap to view details →</Text>
    </TouchableOpacity>
  );

  const renderCoverModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              {getCoverIcon(selectedCover?.type)} {selectedCover?.type}
            </Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalScroll}>
            {/* Policy Information */}
            <View style={styles.modalSection}>
              <Text style={styles.sectionTitle}>Policy Information</Text>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Policy Number:</Text>
                <Text style={styles.infoValue}>{selectedCover?.policyNumber}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Coverage Type:</Text>
                <Text style={styles.infoValue}>{selectedCover?.coverage}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Premium:</Text>
                <Text style={styles.infoValue}>{formatCurrency(selectedCover?.premium || 0)}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Deductible:</Text>
                <Text style={styles.infoValue}>{formatCurrency(selectedCover?.deductible || 0)}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Period:</Text>
                <Text style={styles.infoValue}>
                  {formatDate(selectedCover?.startDate || '')} - {formatDate(selectedCover?.endDate || '')}
                </Text>
              </View>
            </View>

            {/* Asset Information */}
            {selectedCover?.vehicleInfo && (
              <View style={styles.modalSection}>
                <Text style={styles.sectionTitle}>Vehicle Details</Text>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Vehicle:</Text>
                  <Text style={styles.infoValue}>
                    {selectedCover.vehicleInfo.year} {selectedCover.vehicleInfo.make} {selectedCover.vehicleInfo.model}
                  </Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Registration:</Text>
                  <Text style={styles.infoValue}>{selectedCover.vehicleInfo.registrationNumber}</Text>
                </View>
              </View>
            )}

            {selectedCover?.propertyInfo && (
              <View style={styles.modalSection}>
                <Text style={styles.sectionTitle}>Property Details</Text>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Address:</Text>
                  <Text style={styles.infoValue}>{selectedCover.propertyInfo.address}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Type:</Text>
                  <Text style={styles.infoValue}>{selectedCover.propertyInfo.propertyType}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Size:</Text>
                  <Text style={styles.infoValue}>
                    {selectedCover.propertyInfo.bedrooms} bedrooms, {selectedCover.propertyInfo.squareMeters}m²
                  </Text>
                </View>
              </View>
            )}

            {selectedCover?.tripInfo && (
              <View style={styles.modalSection}>
                <Text style={styles.sectionTitle}>Trip Details</Text>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Destination:</Text>
                  <Text style={styles.infoValue}>{selectedCover.tripInfo.destination}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Duration:</Text>
                  <Text style={styles.infoValue}>{selectedCover.tripInfo.tripDuration}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Type:</Text>
                  <Text style={styles.infoValue}>{selectedCover.tripInfo.travelType}</Text>
                </View>
              </View>
            )}

            {/* Benefits */}
            <View style={styles.modalSection}>
              <Text style={styles.sectionTitle}>Coverage Benefits</Text>
              {selectedCover?.benefits.map((benefit, index) => (
                <View key={index} style={styles.benefitItem}>
                  <Text style={styles.benefitIcon}>✓</Text>
                  <Text style={styles.benefitText}>{benefit}</Text>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.surface,
    paddingTop: spacing.xxl + spacing.md,
    paddingHorizontal: spacing.screenPadding,
    paddingBottom: spacing.lg,
  },
  backButton: {
    marginBottom: spacing.sm,
  },
  backButtonText: {
    color: colors.primary,
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.medium,
  },
  title: {
    fontSize: typography.fontSize.title,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
  },
  summaryCard: {
    backgroundColor: colors.surface,
    margin: spacing.screenPadding,
    padding: spacing.lg,
    borderRadius: 12,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  summaryValue: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  summarySubtext: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: spacing.screenPadding,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  coverCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.md,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  coverHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  coverTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  coverIcon: {
    fontSize: 24,
    marginRight: spacing.sm,
  },
  coverTitleText: {
    flex: 1,
  },
  coverType: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
  },
  policyNumber: {
    fontSize: typography.fontSize.sm,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
  statusBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 6,
  },
  statusText: {
    color: colors.white,
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.bold,
  },
  coverDetails: {
    marginBottom: spacing.sm,
  },
  coverInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  coverLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
  coverValue: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.textPrimary,
  },
  viewDetails: {
    fontSize: typography.fontSize.sm,
    color: colors.primary,
    fontWeight: typography.fontWeight.medium,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: spacing.lg,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.screenPadding,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
  },
  modalTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
  },
  closeButton: {
    padding: spacing.sm,
  },
  closeButtonText: {
    fontSize: typography.fontSize.lg,
    color: colors.textMuted,
  },
  modalScroll: {
    paddingHorizontal: spacing.screenPadding,
  },
  modalSection: {
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray100,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  infoLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    flex: 1,
  },
  infoValue: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.textPrimary,
    flex: 1,
    textAlign: 'right',
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  benefitIcon: {
    color: colors.success,
    fontSize: typography.fontSize.md,
    marginRight: spacing.sm,
    fontWeight: typography.fontWeight.bold,
  },
  benefitText: {
    fontSize: typography.fontSize.sm,
    color: colors.textPrimary,
    flex: 1,
  },
  bottomSpacing: {
    height: spacing.xxl,
  },
});
  return (
    <View style={styles.container}>
      {/* Header */}
      <ThemeToggle />
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>General Insurance</Text>
        <Text style={styles.subtitle}>Your covers and benefits</Text>
      </View>

      {/* Summary */}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Active Policies</Text>
        <Text style={styles.summaryValue}>
          {covers.filter(cover => cover.status === 'Active').length} of {covers.length}
        </Text>
        <Text style={styles.summarySubtext}>
          Total Annual Premium: {formatCurrency(
            covers
              .filter(cover => cover.status === 'Active')
              .reduce((sum, cover) => sum + cover.premium, 0)
          )}
        </Text>
      </View>

      {/* Covers List */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Your Insurance Covers</Text>
        {covers.map(renderCoverCard)}
        
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {renderCoverModal()}
    </View>
  );
}

