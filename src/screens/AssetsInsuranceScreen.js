// src/screens/AssetsInsuranceScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  FlatList,
  Dimensions,
} from 'react-native';
import { spacing, typography } from '../theme';
import { assetsInsuranceData, formatCurrency, formatDate, formatPercentage } from '../data/mockData';
import InsuranceCard from '../components/InsuranceCard';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from '../components/ThemeToggle';
const { width } = Dimensions.get('window');

export default function AssetsInsuranceScreen({ navigation }) {
  const [selectedSection, setSelectedSection] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const { colors, isDarkMode } = useTheme();

  const { portfolio, investments, transactions, performance } = assetsInsuranceData;

  const openModal = (section) => {
    setSelectedSection(section);
    setModalVisible(true);
  };

  const getRiskColor = (riskLevel) => {
    switch (riskLevel) {
      case 'Low':
        return colors.success;
      case 'Medium':
        return colors.warning;
      case 'High':
        return colors.danger;
      default:
        return colors.gray500;
    }
  };

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'Purchase':
        return '📈';
      case 'Redemption':
        return '📉';
      case 'Dividend':
        return '💰';
      default:
        return '📊';
    }
  };

  // Simple portfolio pie chart component
  const PortfolioPieChart = ({ investments }) => {
    const total = investments.reduce((sum, inv) => sum + inv.currentValue, 0);
    let currentAngle = 0;

    return (
      <View style={styles.chartContainer}>
        <View style={styles.pieChart}>
          {investments.map((investment, index) => {
            const percentage = (investment.currentValue / total) * 100;
            const colors_chart = [colors.primary, colors.accent, colors.success, colors.warning];
            
            return (
              <View key={investment.id} style={styles.chartLegendItem}>
                <View style={[styles.legendColor, { backgroundColor: colors_chart[index % colors_chart.length] }]} />
                <Text style={styles.legendText}>
                  {investment.name.replace('CIC ', '')} ({percentage.toFixed(1)}%)
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    );
  };

  const renderInvestmentItem = ({ item }) => (
    <View style={styles.investmentItem}>
      <View style={styles.investmentHeader}>
        <View style={styles.investmentInfo}>
          <Text style={styles.investmentName}>{item.name}</Text>
          <Text style={styles.investmentType}>{item.type}</Text>
        </View>
        <View style={[styles.riskBadge, { backgroundColor: getRiskColor(item.riskLevel) }]}>
          <Text style={styles.riskText}>{item.riskLevel}</Text>
        </View>
      </View>
      
      <View style={styles.investmentDetails}>
        <View style={styles.investmentRow}>
          <Text style={styles.detailLabel}>Current Value:</Text>
          <Text style={styles.detailValue}>{formatCurrency(item.currentValue)}</Text>
        </View>
        <View style={styles.investmentRow}>
          <Text style={styles.detailLabel}>Initial Investment:</Text>
          <Text style={styles.detailValue}>{formatCurrency(item.initialInvestment)}</Text>
        </View>
        <View style={styles.investmentRow}>
          <Text style={styles.detailLabel}>Gain/Loss:</Text>
          <Text style={[styles.detailValue, { 
            color: item.gain >= 0 ? colors.success : colors.danger 
          }]}>
            {item.gain >= 0 ? '+' : ''}{formatCurrency(item.gain)} ({item.gainPercentage})
          </Text>
        </View>
        <View style={styles.investmentRow}>
          <Text style={styles.detailLabel}>Units:</Text>
          <Text style={styles.detailValue}>{item.units.toLocaleString()} @ {formatCurrency(item.pricePerUnit)}</Text>
        </View>
      </View>
    </View>
  );

  const renderTransactionItem = ({ item }) => (
    <View style={styles.transactionItem}>
      <View style={styles.transactionHeader}>
        <Text style={styles.transactionIcon}>{getTransactionIcon(item.type)}</Text>
        <View style={styles.transactionInfo}>
          <Text style={styles.transactionType}>{item.type}</Text>
          <Text style={styles.transactionFund}>{item.fund.replace('CIC ', '')}</Text>
          <Text style={styles.transactionDate}>{formatDate(item.date)}</Text>
        </View>
        <View style={styles.transactionAmount}>
          <Text style={[styles.transactionValue, {
            color: item.amount >= 0 ? colors.success : colors.danger
          }]}>
            {item.amount >= 0 ? '+' : ''}{formatCurrency(Math.abs(item.amount))}
          </Text>
          {item.units !== 0 && (
            <Text style={styles.transactionUnits}>
              {item.units > 0 ? '+' : ''}{item.units.toLocaleString()} units
            </Text>
          )}
        </View>
      </View>
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
              {selectedSection === 'investments' && '📊 Investment Details'}
              {selectedSection === 'transactions' && '📋 Transaction History'}
              {selectedSection === 'performance' && '📈 Performance Analytics'}
            </Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalScroll}>
            {selectedSection === 'investments' && (
              <View>
                <Text style={styles.modalSubtitle}>Your Investment Portfolio</Text>
                <FlatList
                  data={investments}
                  renderItem={renderInvestmentItem}
                  keyExtractor={(item) => item.id}
                  scrollEnabled={false}
                />
              </View>
            )}

            {selectedSection === 'transactions' && (
              <View>
                <Text style={styles.modalSubtitle}>Recent Transactions</Text>
                <FlatList
                  data={transactions}
                  renderItem={renderTransactionItem}
                  keyExtractor={(item) => item.id}
                  scrollEnabled={false}
                />
              </View>
            )}

            {selectedSection === 'performance' && (
              <View>
                <Text style={styles.modalSubtitle}>Portfolio Performance</Text>
                <View style={styles.performanceGrid}>
                  <View style={styles.performanceItem}>
                    <Text style={styles.performanceLabel}>1 Month</Text>
                    <Text style={styles.performanceValue}>{performance.oneMonth}</Text>
                  </View>
                  <View style={styles.performanceItem}>
                    <Text style={styles.performanceLabel}>3 Months</Text>
                    <Text style={styles.performanceValue}>{performance.threeMonths}</Text>
                  </View>
                  <View style={styles.performanceItem}>
                    <Text style={styles.performanceLabel}>6 Months</Text>
                    <Text style={styles.performanceValue}>{performance.sixMonths}</Text>
                  </View>
                  <View style={styles.performanceItem}>
                    <Text style={styles.performanceLabel}>1 Year</Text>
                    <Text style={styles.performanceValue}>{performance.oneYear}</Text>
                  </View>
                  <View style={styles.performanceItem}>
                    <Text style={styles.performanceLabel}>3 Years</Text>
                    <Text style={styles.performanceValue}>{performance.threeYears}</Text>
                  </View>
                </View>

                <View style={styles.summarySection}>
                  <Text style={styles.summaryTitle}>Portfolio Summary</Text>
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Total Invested:</Text>
                    <Text style={styles.summaryValue}>{formatCurrency(portfolio.totalInvested)}</Text>
                  </View>
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Current Value:</Text>
                    <Text style={styles.summaryValue}>{formatCurrency(portfolio.totalValue)}</Text>
                  </View>
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Total Gains:</Text>
                    <Text style={[styles.summaryValue, { color: colors.success }]}>
                      +{formatCurrency(portfolio.totalGains)}
                    </Text>
                  </View>
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Portfolio Return:</Text>
                    <Text style={[styles.summaryValue, { color: colors.success }]}>
                      +{portfolio.portfolioReturn}
                    </Text>
                  </View>
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
  // Portfolio Overview
  portfolioOverview: {
    backgroundColor: colors.primary,
    padding: spacing.lg,
    borderRadius: 16,
    marginBottom: spacing.md,
    alignItems: 'center',
  },
  portfolioTitle: {
    fontSize: typography.fontSize.md,
    color: colors.white,
    opacity: 0.9,
    marginBottom: spacing.xs,
  },
  portfolioValue: {
    fontSize: typography.fontSize.title + 4,
    fontWeight: typography.fontWeight.bold,
    color: colors.white,
    marginBottom: spacing.md,
  },
  portfolioStats: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.accent,
    marginBottom: spacing.xs,
  },
  statLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.white,
    opacity: 0.8,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: colors.white,
    opacity: 0.3,
    marginHorizontal: spacing.lg,
  },
  lastUpdated: {
    fontSize: typography.fontSize.xs,
    color: colors.white,
    opacity: 0.7,
  },
  // Chart
  chartContainer: {
    marginTop: spacing.md,
  },
  pieChart: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chartLegendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    marginBottom: spacing.sm,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: spacing.sm,
  },
  legendText: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    flex: 1,
  },
  // Actions Grid
  actionsGrid: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  actionCard: {
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
  actionIcon: {
    fontSize: 24,
    marginBottom: spacing.sm,
  },
  actionTitle: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  actionSubtitle: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
  // Recent Transactions
  recentTransactions: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: 12,
    marginBottom: spacing.md,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  transactionPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray100,
  },
  transactionPreviewIcon: {
    fontSize: 16,
    marginRight: spacing.sm,
  },
  transactionPreviewInfo: {
    flex: 1,
  },
  transactionPreviewType: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.textPrimary,
  },
  transactionPreviewDate: {
    fontSize: typography.fontSize.xs,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
  transactionPreviewAmount: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
  },
  viewAllButton: {
    marginTop: spacing.sm,
    alignItems: 'center',
  },
  viewAllText: {
    fontSize: typography.fontSize.sm,
    color: colors.primary,
    fontWeight: typography.fontWeight.medium,
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
  // Investment Items
  investmentItem: {
    backgroundColor: colors.gray50,
    padding: spacing.md,
    borderRadius: 12,
    marginBottom: spacing.md,
  },
  investmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  investmentInfo: {
    flex: 1,
  },
  investmentName: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
  },
  investmentType: {
    fontSize: typography.fontSize.sm,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
  riskBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 6,
  },
  riskText: {
    color: colors.white,
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.bold,
  },
  investmentDetails: {
    gap: spacing.xs,
  },
  investmentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
  detailValue: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.textPrimary,
  },
  // Transaction Items
  transactionItem: {
    backgroundColor: colors.gray50,
    padding: spacing.md,
    borderRadius: 12,
    marginBottom: spacing.md,
  },
  transactionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transactionIcon: {
    fontSize: 20,
    marginRight: spacing.sm,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionType: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
  },
  transactionFund: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  transactionDate: {
    fontSize: typography.fontSize.xs,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
  transactionAmount: {
    alignItems: 'flex-end',
  },
  transactionValue: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.bold,
  },
  transactionUnits: {
    fontSize: typography.fontSize.xs,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
  // Performance
  performanceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  performanceItem: {
    backgroundColor: colors.gray50,
    padding: spacing.md,
    borderRadius: 12,
    width: (width - spacing.screenPadding * 2 - spacing.md * 2) / 2,
    alignItems: 'center',
  },
  performanceLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  performanceValue: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.success,
  },
  summarySection: {
    backgroundColor: colors.gray50,
    padding: spacing.md,
    borderRadius: 12,
  },
  summaryTitle: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  summaryLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
  summaryValue: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
  },
  bottomSpacing: {
    height: spacing.xxl,
  },
});

  return (
    <View style={styles.container}>
      {/* Header */}
     < ThemeToggle/>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Assets Insurance</Text>
        <Text style={styles.subtitle}>Investment portfolio & returns</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Portfolio Overview */}
        <View style={styles.portfolioOverview}>
          <Text style={styles.portfolioTitle}>Portfolio Value</Text>
          <Text style={styles.portfolioValue}>{formatCurrency(portfolio.totalValue)}</Text>
          <View style={styles.portfolioStats}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>+{formatCurrency(portfolio.totalGains)}</Text>
              <Text style={styles.statLabel}>Total Gains</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.success }]}>+{portfolio.portfolioReturn}</Text>
              <Text style={styles.statLabel}>Portfolio Return</Text>
            </View>
          </View>
          <Text style={styles.lastUpdated}>Last updated: {formatDate(portfolio.lastUpdated)}</Text>
        </View>

        {/* Portfolio Allocation */}
        <InsuranceCard
          title="Portfolio Allocation"
          subtitle="Investment distribution across funds"
          icon="🥧"
          onPress={() => openModal('investments')}
        >
          <PortfolioPieChart investments={investments} />
        </InsuranceCard>

        {/* Quick Actions */}
        <View style={styles.actionsGrid}>
          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => openModal('investments')}
          >
            <Text style={styles.actionIcon}>📊</Text>
            <Text style={styles.actionTitle}>View Investments</Text>
            <Text style={styles.actionSubtitle}>{investments.length} funds</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => openModal('transactions')}
          >
            <Text style={styles.actionIcon}>📋</Text>
            <Text style={styles.actionTitle}>Transactions</Text>
            <Text style={styles.actionSubtitle}>{transactions.length} recent</Text>
          </TouchableOpacity>
        </View>

        {/* Performance Card */}
        <InsuranceCard
          title="Performance Analytics"
          subtitle="Track your investment returns over time"
          icon="📈"
          details={[
            { label: '1 Month', value: performance.oneMonth },
            { label: '3 Months', value: performance.threeMonths },
            { label: '1 Year', value: performance.oneYear },
            { label: '3 Years', value: performance.threeYears },
          ]}
          onPress={() => openModal('performance')}
        />

        {/* Recent Transactions Preview */}
        <View style={styles.recentTransactions}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          {transactions.slice(0, 3).map((transaction, index) => (
            <View key={transaction.id} style={styles.transactionPreview}>
              <Text style={styles.transactionPreviewIcon}>{getTransactionIcon(transaction.type)}</Text>
              <View style={styles.transactionPreviewInfo}>
                <Text style={styles.transactionPreviewType}>{transaction.type}</Text>
                <Text style={styles.transactionPreviewDate}>{formatDate(transaction.date)}</Text>
              </View>
              <Text style={[styles.transactionPreviewAmount, {
                color: transaction.amount >= 0 ? colors.success : colors.danger
              }]}>
                {transaction.amount >= 0 ? '+' : ''}{formatCurrency(Math.abs(transaction.amount))}
              </Text>
            </View>
          ))}
          <TouchableOpacity 
            style={styles.viewAllButton}
            onPress={() => openModal('transactions')}
          >
            <Text style={styles.viewAllText}>View All Transactions →</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>

      {renderModal()}
    </View>
  );
}

