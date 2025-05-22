import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
const InsuranceCard = ({ 
  title, 
  subtitle, 
  icon, 
  status, 
  statusColor, 
  details = [], 
  onPress,
  children 
}) => {
    const { colors } = useTheme();

    const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    
  },
  icon: {
    fontSize: 24,
    marginRight: 8,
  },
  titleText: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  details: {
    marginBottom: 8,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  detailLabel: {
    fontSize: 14,
    color: '#999',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#222',
  },
  tapHint: {
    fontSize: 14,
    color: '#007bff',
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 8,
  },
});

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          {icon && <Text style={styles.icon}>{icon}</Text>}
          <View style={styles.titleText}>
            <Text style={styles.title}>{title}</Text>
            {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
          </View>
        </View>
        {status && (
          <View style={[styles.statusBadge, { backgroundColor: statusColor || '#888' }]}>
            <Text style={styles.statusText}>{status}</Text>
          </View>
        )}
      </View>

      {/* Details */}
      {details.length > 0 && (
        <View style={styles.details}>
          {details.map((detail, index) => (
            <View key={index} style={styles.detailRow}>
              <Text style={styles.detailLabel}>{detail.label}</Text>
              <Text style={styles.detailValue}>{detail.value}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Custom children content */}
      {children}

      {onPress && <Text style={styles.tapHint}>Tap to view details →</Text>}
    </TouchableOpacity>
  );
};


export default InsuranceCard;
