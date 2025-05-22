ModularDashboardSimple/
├── App.js                    # Main app file
├── src/
│   ├── screens/             # All our screens
│   │   ├── LoginScreen.js
│   │   ├── DashboardScreen.js
│   │   ├── GeneralInsuranceScreen.js
│   │   ├── LifeInsuranceScreen.js
│   │   └── AssetsInsuranceScreen.js
│   ├── components/          # Reusable components
│   │   ├── AuthButton.js
│   │   └── InsuranceCard.js
│   ├── context/            # Global state
│   │   └── AuthContext.js
│   ├── data/               # Mock data
│   │   └── mockData.js
│   └── navigation/         # Navigation setup
│       └── AppNavigator.js



Navigation:
- @react-navigation/native - Navigation framework
- @react-navigation/stack - Stack navigator for screen transitions

Authentication:
- expo-auth-session - OAuth implementation
- expo-web-browser - Browser integration for OAuth
- expo-crypto - Cryptographic functions

Storage:
- @react-native-async-storage/async-storage - Local data persistence

UI/UX:
- react-native-vector-icons - Icon library
- Custom design system with theme

1. Component-Based Architecture (React Pattern)
- Functional Components with Hooks
- Reusable UI Components (InsuranceCard, ThemeToggle)
- Props-based component communication
- Single Responsibility Principle

Authentication Flow:
1. OAuth providers (Google, Microsoft, GitHub)
2. AuthContext manages state
3. AsyncStorage for persistence
4. Conditional rendering based on auth state

Pattern: Token-based authentication simulation