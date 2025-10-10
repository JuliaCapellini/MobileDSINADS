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
