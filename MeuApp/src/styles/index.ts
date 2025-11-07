import { StyleSheet } from 'react-native';

export const colors = {
  background: 'rgba(56, 69, 77, 1)',
  white: '#FFFFFF',
  black: '#000000',
  yellow: '#FFD700',
  shadow: '#000000',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 80,
};

export const typography = {
  button: {
    fontSize: 16,
    fontWeight: '600' as const,
  },
};

export const buttonVariants = {
  primary: 'primary',
  secondary: 'secondary',
} as const;

export type ButtonVariant = typeof buttonVariants[keyof typeof buttonVariants];

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  shadow: {
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});

export const loginStyles = StyleSheet.create({
  logoContainer: {
    marginBottom: spacing.xxxl,
  },
  logo: {
    width: 200,
    height: 80,
  },
  buttonsContainer: {
    width: '100%',
    maxWidth: 300,
  },
  button: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: spacing.sm,
    marginBottom: spacing.md,
    alignItems: 'center',
    ...commonStyles.shadow,
  },
  primaryButton: {
    backgroundColor: colors.yellow,
  },
  secondaryButton: {
    backgroundColor: colors.white,
  },
  buttonText: {
    fontSize: typography.button.fontSize,
    fontWeight: typography.button.fontWeight,
    color: colors.black,
  },
});

export const registerStyles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  title: {
    color: colors.white,
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: spacing.xl,
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
    maxWidth: 300,
    marginBottom: spacing.xl,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 300,
  },
});

export const loginFormStyles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  title: {
    color: colors.white,
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: spacing.xxl,
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
    maxWidth: 300,
    marginBottom: spacing.xl,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 300,
  },
});

export const profileStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: '#617991',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    gap: spacing.md,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 30,
    backgroundColor: '#B0BEC5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfo: {
    flex: 1,
  },
  userLabel: {
    fontSize: 20,
    color: '#3A3636',
    marginBottom: spacing.xs,
  },
  userName: {
    fontSize: 25,
    fontWeight: '600',
    color: '#000000',
  },
  userButton: {
    backgroundColor: '#7995B0',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    gap: spacing.md,
  },
  userButtonText: {
    fontSize: 25,
    color: colors.black,
    fontWeight: '500',
  },
  contentArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  logoutButton: {
    backgroundColor: colors.background,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    gap: spacing.md,
    minHeight: 70,
  },
  logoutButtonText: {
    fontSize: 30,
    color: colors.black,
    fontWeight: '600',
  },
  navigationBar: {
    flexDirection: 'row',
    backgroundColor: '#CFD8DC',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    paddingBottom: 0,
    marginBottom: 0,
    marginTop: 0,
    paddingTop: 0,
    overflow: 'hidden',
    elevation: 0,
    shadowOpacity: 0,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm,
    gap: spacing.xs,
  },
  navItemInactive: {
    backgroundColor: '#617991',
  },
  navItemActive: {
    backgroundColor: '#7995B1',
  },
  navItemText: {
    fontSize: 20,
    color: colors.black,
    fontWeight: '500',
  },
});

export const parkingStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  balanceButton: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.lg,
    backgroundColor: '#617991',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: spacing.md,
    gap: spacing.xs,
    zIndex: 10,
    ...commonStyles.shadow,
  },
  balanceText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.white,
  },
  contentArea: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: spacing.xxl,
  },
});
