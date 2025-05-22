// src/screens/LifeInsuranceScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import {  spacing, typography } from '../theme';
import { lifeInsuranceData, formatCurrency, formatDate } from '../data/mockData';
import InsuranceCard from '../components/InsuranceCard';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from '../components/ThemeToggle';

export default function LifeInsuranceScreen({ navigation }) {
  const [selectedSection, setSelectedSection] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const { colors, isDarkMode } = useTheme();

  const { policies, deposits, maturityBenefits, summary } = lifeInsuranceData;
  const policy = policies[0]; // Using first policy for demo

  const openModal = (section) => {
    setSelectedSection(section);
    setModalVisible(true);
  };

  const renderDepositItem = ({ item }) => (
    <View style={styles.depositItem}>
      <View style={styles.depositInfo}>
        <Text style={styles.depositDate}>{formatDate(item.date)}</Text>
        <Text style={styles.depositType}>{item.type}</Text>
      </View>
      <View style={styles.depositAmount}>
        <Text style={styles.depositValue}>{formatCurrency(item.amount)}</Text>
        <View style={[styles.depositStatus, { 
          backgroundColor: item.status === 'Processed' ? colors.success : colors.warning 
        }]}>
          <Text style={styles.depositStatusText}>{item.status}</Text>
        </View>
      </View>
    </View>
  );

  const renderBeneficiaryItem = ({ item }) => (
    <View style={styles.beneficiaryItem}>
      <View style={styles.beneficiaryInfo}>
        <Text style={styles.beneficiaryName}>{item.name}</Text>
        <Text style={styles.beneficiaryRelationship}>{item.relationship}</Text>
      </View>
      <Text style={styles.beneficiaryPercentage}>{item.percentage}%</Text>
    </View>
  );

  const renderModal = () => (
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
              {selectedSection === 'deposits' && '💰 Statement of Deposits'}
              {selectedSection === 'maturity' && '🎯 Maturity Benefits'}
              {selectedSection === 'policy' && '📋 Policy Details'}
            </Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalScroll}>
            {selectedSection === 'deposits' && (
              <View>
                <Text style={styles.modalSubtitle}>Recent Premium Payments</Text>
                <FlatList
                  data={deposits}
                  renderItem={renderDepositItem}
                  keyExtractor={(item) => item.id}
                  scrollEnabled={false}
                />
                <View style={styles.totalSection}>
                  <Text style={styles.totalLabel}>Total Premiums Paid:</Text>
                  <Text style={styles.totalValue}>{formatCurrency(summary.totalPremiumsPaid)}</Text>
                </View>
              </View>
            )}

            {selectedSection === 'maturity' && (
              <View>
                <View style={styles.maturitySection}>
                  <Text style={styles.maturityTitle}>Projected Maturity Value</Text>
                  <Text style={styles.maturityValue}>{formatCurrency(maturityBenefits.projectedMaturityValue)}</Text>
                  <Text style={styles.maturitySubtext}>
                    In {maturityBenefits.yearsToMaturity} years, {maturityBenefits.monthsToMaturity} months
                  </Text>
                </View>

                <View style={styles.breakdownSection}>
                  <Text style={styles.sectionTitle}>Breakdown</Text>
                  <View style={styles.breakdownItem}>
                    <Text style={styles.breakdownLabel}>Guaranteed Amount:</Text>
                    <Text style={styles.breakdownValue}>{formatCurrency(maturityBenefits.guaranteedAmount)}</Text>
                  </View>
                  <View style={styles.breakdownItem}>
                    <Text style={styles.breakdownLabel}>Projected Bonus:</Text>
                    <Text style={styles.breakdownValue}>{formatCurrency(maturityBenefits.bonusProjection)}</Text>
                  </View>
                  <View style={styles.breakdownItem}>
                    <Text style={styles.breakdownLabel}>Current Surrender Value:</Text>
                    <Text style={styles.breakdownValue}>{formatCurrency(maturityBenefits.surrenderValue)}</Text>
                  </View>
                </View>
              </View>
            )}

            {selectedSection === 'policy' && (
              <View>
                <View style={styles.policySection}>
                  <Text style={styles.sectionTitle}>Policy Information</Text>
                  <View style={styles.policyDetail}>
                    <Text style={styles.policyLabel}>Policy Number:</Text>
                    <Text style={styles.policyValue}>{policy.policyNumber}</Text>
                  </View>
                  <View style={styles.policyDetail}>
                    <Text style={styles.policyLabel}>Policy Type:</Text>
                    <Text style={styles.policyValue}>{policy.policyType}</Text>
                  </View>
                  <View style={styles.policyDetail}>
                    <Text style={styles.policyLabel}>Sum Assured:</Text>
                    <Text style={styles.policyValue}>{formatCurrency(policy.sumAssured)}</Text>
                  </View>
                  <View style={styles.policyDetail}>
                    <Text style={styles.policyLabel}>Premium:</Text>
                    <Text style={styles.policyValue}>
                      {formatCurrency(policy.premiumAmount)} ({policy.premiumFrequency})
                    </Text>
                  </View>
                  <View style={styles.policyDetail}>
                    <Text style={styles.policyLabel}>Start Date:</Text>
                    <Text style={styles.policyValue}>{formatDate(policy.policyStartDate)}</Text>
                  </View>
                  <View style={styles.policyDetail}>
                    <Text style={styles.policyLabel}>Maturity Date:</Text>
                    <Text style={styles.policyValue}>{formatDate(policy.maturityDate)}</Text>
                  </View>
                </View>

                <View style={styles.beneficiariesSection}>
                  <Text style={styles.sectionTitle}>Beneficiaries</Text>
                  <FlatList
                    data={policy.beneficiaries}
                    renderItem={renderBeneficiaryItem}
                    keyExtractor={(item, index) => index.toString()}
                    scrollEnabled={false}
                  />
                </View>
              </View>
            )}
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
  scrollView: {
    flex: 1,
    paddingHorizontal: spacing.screenPadding,
    paddingTop: spacing.md,
  },
  statsContainer: {
    flexDirection: 'row',
    marginBottom: spacing.md,
    gap: spacing.md,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statValue: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  statLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
  reminderCard: {
    backgroundColor: colors.accent,
    padding: spacing.md,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.md,
  },
  reminderIcon: {
    fontSize: 24,
    marginRight: spacing.md,
  },
  reminderContent: {
    flex: 1,
  },
  reminderTitle: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
  },
  reminderDate: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  reminderAmount: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
    marginTop: spacing.xs,
  },
  // Modal Styles
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
  modalSubtitle: {
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
    marginBottom: spacing.md,
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
  // Deposit Styles
  depositItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray100,
  },
  depositInfo: {
    flex: 1,
  },
  depositDate: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.textPrimary,
  },
  depositType: {
    fontSize: typography.fontSize.xs,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
  depositAmount: {
    alignItems: 'flex-end',
  },
  depositValue: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
  },
  depositStatus: {
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: spacing.xs,
  },
  depositStatusText: {
    fontSize: typography.fontSize.xs,
    color: colors.white,
    fontWeight: typography.fontWeight.bold,
  },
  totalSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: spacing.md,
    marginTop: spacing.md,
    borderTopWidth: 2,
    borderTopColor: colors.primary,
  },
  totalLabel: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
  },
  totalValue: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
  },
  // Maturity Styles
  maturitySection: {
    alignItems: 'center',
    padding: spacing.lg,
    backgroundColor: colors.gray50,
    borderRadius: 12,
    marginBottom: spacing.lg,
  },
  maturityTitle: {
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  maturityValue: {
    fontSize: typography.fontSize.title,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  maturitySubtext: {
    fontSize: typography.fontSize.sm,
    color: colors.textMuted,
  },
  breakdownSection: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  breakdownItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  breakdownLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
  breakdownValue: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.textPrimary,
  },
  // Policy Styles
  policySection: {
    marginBottom: spacing.lg,
  },
  policyDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  policyLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    flex: 1,
  },
  policyValue: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.textPrimary,
    flex: 1,
    textAlign: 'right',
  },
  // Beneficiary Styles
  beneficiariesSection: {
    marginBottom: spacing.lg,
  },
  beneficiaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray100,
  },
  beneficiaryInfo: {
    flex: 1,
  },
  beneficiaryName: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.textPrimary,
  },
  beneficiaryRelationship: {
    fontSize: typography.fontSize.xs,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
  beneficiaryPercentage: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
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
        <Text style={styles.title}>Life Insurance</Text>
        <Text style={styles.subtitle}>Your life coverage and benefits</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Summary Overview */}
        <InsuranceCard
          title="Policy Summary"
          subtitle={policy.policyNumber}
          icon="💝"
          status={policy.status}
          statusColor={colors.success}
          details={[
            { label: 'Sum Assured', value: formatCurrency(policy.sumAssured) },
            { label: 'Premium', value: `${formatCurrency(policy.premiumAmount)}/${policy.premiumFrequency}` },
            { label: 'Policy Duration', value: summary.policyDuration },
            { label: 'Cash Value', value: formatCurrency(summary.cashValue) },
          ]}
          onPress={() => openModal('policy')}
        />

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{formatCurrency(summary.totalPremiumsPaid)}</Text>
            <Text style={styles.statLabel}>Total Paid</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{formatCurrency(maturityBenefits.projectedMaturityValue)}</Text>
            <Text style={styles.statLabel}>Projected Value</Text>
          </View>
        </View>

        {/* Action Cards */}
        <InsuranceCard
          title="Statement of Deposits"
          subtitle="View your premium payment history"
          icon="💰"
          details={[
            { label: 'Last Payment', value: formatDate(summary.lastPaymentDate) },
            { label: 'Next Payment Due', value: formatDate(summary.nextPaymentDue) },
            { label: 'Total Payments', value: deposits.length.toString() },
          ]}
          onPress={() => openModal('deposits')}
        />

        <InsuranceCard
          title="Maturity Benefits"
          subtitle="Your policy's projected returns"
          icon="🎯"
          details={[
            { label: 'Maturity Date', value: formatDate(policy.maturityDate) },
            { label: 'Years Remaining', value: `${maturityBenefits.yearsToMaturity} years` },
            { label: 'Projected Value', value: formatCurrency(maturityBenefits.projectedMaturityValue) },
          ]}
          onPress={() => openModal('maturity')}
        />

        {/* Next Payment Reminder */}
        <View style={styles.reminderCard}>
          <Text style={styles.reminderIcon}>⏰</Text>
          <View style={styles.reminderContent}>
            <Text style={styles.reminderTitle}>Next Payment Due</Text>
            <Text style={styles.reminderDate}>{formatDate(summary.nextPaymentDue)}</Text>
            <Text style={styles.reminderAmount}>{formatCurrency(policy.premiumAmount)}</Text>
          </View>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>

      {renderModal()}
    </View>
  );
}

