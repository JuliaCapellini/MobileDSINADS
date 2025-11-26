import { StyleSheet } from 'react-native';

export const colors = {
  background: 'rgba(56, 69, 77, 1)',
  white: '#FFFFFF',
  black: '#000000',
  yellow: '#FFD700',
  shadow: '#000000',
  primary: '#617991',
  secondary: '#7995B0',
  tertiary: '#CFD8DC',
  lightGray: '#B0BEC5',
  darkGray: '#3A3636',
  error: '#F44336',
  lightText: '#E0E0E0',
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
  title: {
    fontSize: 32,
    fontWeight: 'bold' as const,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: 'bold' as const,
  },
  body: {
    fontSize: 20,
    fontWeight: '500' as const,
  },
  label: {
    fontSize: 18,
    fontWeight: '600' as const,
  },
  button: {
    fontSize: 16,
    fontWeight: '600' as const,
  },
  small: {
    fontSize: 14,
    fontWeight: '400' as const,
  },
  input: {
    fontSize: 16,
    fontWeight: '400' as const,
  },
};

export const borderRadius = {
  sm: spacing.sm,
  md: spacing.md,
  lg: spacing.lg,
  round: 30,
  circle: 70,
};

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
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});

export const formStyles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 300,
  },
  inputContainer: {
    marginBottom: spacing.lg,
    width: '100%',
  },
  inputLabel: {
    color: colors.white,
    fontSize: typography.input.fontSize,
    fontWeight: typography.label.fontWeight,
    marginBottom: spacing.sm,
  },
  input: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.white,
    borderRadius: borderRadius.sm,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    color: colors.white,
    fontSize: typography.input.fontSize,
  },
  inputDisabled: {
    opacity: 0.6,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 300,
  },
});

export const buttonStyles = StyleSheet.create({
  base: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.sm,
    alignItems: 'center',
    ...commonStyles.shadow,
  },
  primary: {
    backgroundColor: colors.yellow,
  },
  secondary: {
    backgroundColor: colors.white,
  },
  tertiary: {
    backgroundColor: colors.primary,
  },
  text: {
    fontSize: typography.button.fontSize,
    fontWeight: typography.button.fontWeight,
    color: colors.black,
  },
  textWhite: {
    fontSize: typography.button.fontSize,
    fontWeight: typography.button.fontWeight,
    color: colors.white,
  },
  disabled: {
    opacity: 0.5,
  },
});

export const titleStyles = StyleSheet.create({
  primary: {
    fontSize: typography.title.fontSize,
    fontWeight: typography.title.fontWeight,
    color: colors.white,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  secondary: {
    fontSize: typography.subtitle.fontSize,
    fontWeight: typography.subtitle.fontWeight,
    color: colors.white,
    textAlign: 'center',
    marginBottom: spacing.lg,
    marginTop: spacing.md,
  },
});

export const cardStyles = StyleSheet.create({
  container: {
    marginBottom: spacing.xl,
    padding: spacing.md,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
  },
  label: {
    fontSize: typography.label.fontSize,
    fontWeight: typography.label.fontWeight,
    color: colors.black,
    marginBottom: spacing.xs,
  },
  value: {
    fontSize: typography.body.fontSize,
    fontWeight: typography.body.fontWeight,
    color: colors.white,
  },
});

export const screenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xxl,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xxl,
    paddingBottom: spacing.xl,
  },
  contentArea: {
    flex: 1,
    backgroundColor: colors.background,
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
  buttonsContainer: formStyles.buttonContainer,
  button: {
    ...buttonStyles.base,
  },
  primaryButton: {
    ...buttonStyles.base,
    ...buttonStyles.primary,
  },
  secondaryButton: {
    ...buttonStyles.base,
    ...buttonStyles.secondary,
  },
  buttonText: buttonStyles.text,
});

export const registerStyles = StyleSheet.create({
  content: commonStyles.content,
  title: titleStyles.primary,
  formContainer: formStyles.container,
  buttonContainer: formStyles.buttonContainer,
});

export const loginFormStyles = StyleSheet.create({
  content: commonStyles.content,
  title: titleStyles.primary,
  formContainer: formStyles.container,
  buttonContainer: formStyles.buttonContainer,
});

export const userProfileStyles = StyleSheet.create({
  scrollContent: screenStyles.scrollContent,
  title: titleStyles.primary,
  fieldContainer: cardStyles.container,
  label: cardStyles.label,
  value: cardStyles.value,
});

export const vehicleStyles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  addButton: {
    backgroundColor: colors.yellow,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.sm,
    marginTop: spacing.xl,
    ...commonStyles.shadow,
  },
  addButtonText: {
    fontSize: typography.button.fontSize,
    fontWeight: typography.button.fontWeight,
    color: colors.black,
  },
  container: {
    ...screenStyles.container,
  },
  title: {
    ...titleStyles.primary,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: spacing.xxl,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: spacing.xxl,
  },
  emptyText: {
    fontSize: typography.body.fontSize,
    color: colors.lightText,
    textAlign: 'center',
  },
  listContainer: {
    flex: 1,
    marginTop: spacing.lg,
  },
  vehicleCard: {
    backgroundColor: colors.primary,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.md,
    ...commonStyles.shadow,
  },
  vehicleName: {
    fontSize: typography.subtitle.fontSize,
    fontWeight: typography.subtitle.fontWeight,
    color: colors.white,
    marginBottom: spacing.xs,
  },
  vehiclePlate: {
    fontSize: typography.body.fontSize,
    color: colors.lightText,
    marginBottom: spacing.xs,
  },
  vehicleType: {
    fontSize: typography.body.fontSize,
    color: colors.lightText,
  },
  formContainer: {
    ...formStyles.container,
    alignSelf: 'center',
  },
  typeContainer: {
    marginBottom: spacing.lg,
    width: '100%',
  },
  typeLabel: {
    color: colors.white,
    fontSize: typography.input.fontSize,
    fontWeight: typography.label.fontWeight,
    marginBottom: spacing.sm,
  },
  typeOptions: {
    flexDirection: 'row',
    gap: spacing.sm,
    flexWrap: 'wrap',
  },
  typeOption: {
    flex: 1,
    minWidth: 100,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.sm,
    borderWidth: 2,
    borderColor: colors.white,
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  typeOptionSelected: {
    backgroundColor: colors.yellow,
    borderColor: colors.yellow,
  },
  typeOptionText: {
    fontSize: typography.button.fontSize,
    fontWeight: typography.button.fontWeight,
    color: colors.white,
  },
  typeOptionTextSelected: {
    color: colors.black,
  },
  saveButton: {
    ...buttonStyles.base,
    ...buttonStyles.tertiary,
    marginTop: spacing.md,
  },
  saveButtonDisabled: {
    opacity: 0.5,
  },
  saveButtonText: buttonStyles.textWhite,
});

export const balanceStyles = StyleSheet.create({
  container: screenStyles.container,
  title: titleStyles.primary,
  balanceDisplayContainer: {
    backgroundColor: colors.tertiary,
    padding: spacing.xl,
    borderRadius: borderRadius.md,
    marginBottom: spacing.xxl,
    alignItems: 'center',
    ...commonStyles.shadow,
  },
  balanceLabel: {
    fontSize: typography.body.fontSize,
    color: colors.black,
    marginBottom: spacing.sm,
    fontWeight: typography.label.fontWeight,
  },
  balanceValue: {
    fontSize: 40,
    fontWeight: 'bold',
    color: colors.yellow,
  },
  sectionTitle: titleStyles.secondary,
  formContainer: formStyles.container,
  saveButton: vehicleStyles.saveButton,
  saveButtonText: vehicleStyles.saveButtonText,
});

export const profileStyles = StyleSheet.create({
  container: commonStyles.container,
  header: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    gap: spacing.md,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: borderRadius.round,
    backgroundColor: colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfo: {
    flex: 1,
  },
  userLabel: {
    fontSize: typography.body.fontSize,
    color: colors.darkGray,
    marginBottom: spacing.xs,
  },
  userName: {
    fontSize: 25,
    fontWeight: '600',
    color: colors.black,
  },
  userButton: {
    backgroundColor: colors.secondary,
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
  contentArea: screenStyles.contentArea,
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
    backgroundColor: colors.tertiary,
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
    backgroundColor: colors.primary,
  },
  navItemActive: {
    backgroundColor: colors.secondary,
  },
  navItemText: {
    fontSize: typography.body.fontSize,
    color: colors.black,
    fontWeight: '500',
  },
});

export const parkingStyles = StyleSheet.create({
  container: commonStyles.container,
  balanceButton: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.lg,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    gap: spacing.xs,
    zIndex: 10,
    ...commonStyles.shadow,
  },
  balanceText: {
    fontSize: typography.label.fontSize,
    fontWeight: typography.label.fontWeight,
    color: colors.white,
  },
  contentArea: screenStyles.contentArea,
  activateButton: {
    position: 'absolute',
    bottom: 100,
    alignSelf: 'center',
    backgroundColor: colors.yellow,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.round,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  activateButtonText: {
    fontSize: typography.button.fontSize,
    fontWeight: 'bold',
    color: colors.black,
  },
});

export const usoStyles = StyleSheet.create({
  container: commonStyles.container,
  header: {
    backgroundColor: colors.tertiary,
    height: 150,
    width: '100%',
  },
  logoContainer: {
    position: 'absolute',
    top: 100,
    alignSelf: 'center',
    zIndex: 10,
    width: 140,
    height: 140,
    borderRadius: borderRadius.circle,
    backgroundColor: colors.background,
    borderWidth: 3,
    borderColor: colors.tertiary,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    ...commonStyles.shadow,
  },
  logo: {
    width: 110,
    height: 110,
    resizeMode: 'contain',
  },
  contentArea: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 80,
    paddingHorizontal: spacing.lg,
    justifyContent: 'flex-start',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
    paddingTop: spacing.xl,
  },
  actionButton: {
    flex: 1,
    minHeight: 120,
    backgroundColor: colors.tertiary,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.md,
    gap: spacing.xs,
    ...commonStyles.shadow,
  },
  actionButtonIcon: {
    marginBottom: spacing.xs,
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.black,
    textAlign: 'center',
  },
});

export const parkingMapWebStyles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.lg,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  loadingContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: spacing.lg,
    borderRadius: borderRadius.sm,
    alignItems: 'center',
    gap: spacing.sm,
  },
  loadingText: {
    color: colors.white,
    fontSize: typography.input.fontSize,
  },
  errorText: {
    color: colors.error,
    fontSize: typography.label.fontSize,
    fontWeight: typography.label.fontWeight,
    textAlign: 'center',
  },
  errorSubtext: {
    color: colors.lightText,
    fontSize: typography.small.fontSize,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
});

export const parkingMapNativeStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.lg,
  },
  loadingText: {
    color: colors.white,
    fontSize: typography.input.fontSize,
    marginTop: spacing.sm,
  },
  errorText: {
    color: colors.error,
    fontSize: typography.label.fontSize,
    fontWeight: typography.label.fontWeight,
    textAlign: 'center',
  },
  errorSubtext: {
    color: colors.lightText,
    fontSize: typography.small.fontSize,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  map: {
    flex: 1,
  },
});

export const ticketActivationModalStyles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.background,
    borderTopLeftRadius: borderRadius.lg,
    borderTopRightRadius: borderRadius.lg,
    padding: spacing.lg,
    height: '80%',
  },
  stepContainer: {
    flex: 1,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: spacing.sm,
    zIndex: 1,
  },
  title: {
    fontSize: typography.subtitle.fontSize,
    fontWeight: typography.subtitle.fontWeight,
    color: colors.white,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: typography.label.fontSize,
    fontWeight: typography.label.fontWeight,
    color: colors.lightText,
    marginBottom: spacing.sm,
  },
  listContainer: {
    flex: 1,
    marginBottom: spacing.xl,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    gap: spacing.md,
    borderWidth: 2,
    borderColor: 'transparent',
    marginBottom: spacing.sm,
  },
  optionCardSelected: {
    backgroundColor: colors.yellow,
    borderColor: colors.yellow,
  },
  optionTitle: {
    fontSize: typography.body.fontSize,
    fontWeight: 'bold',
    color: colors.white,
  },
  optionSubtitle: {
    fontSize: typography.small.fontSize,
    color: colors.lightText,
  },
  optionTextSelected: {
    color: colors.black,
  },
  button: {
    backgroundColor: colors.yellow,
    padding: spacing.md,
    borderRadius: borderRadius.sm,
    alignItems: 'center',
    flex: 1,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: typography.button.fontSize,
    fontWeight: 'bold',
    color: colors.black,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: 'auto',
  },
  secondaryButton: {
    backgroundColor: colors.white,
  },
  secondaryButtonText: {
    fontSize: typography.button.fontSize,
    fontWeight: 'bold',
    color: colors.black,
  },
});

export const buttonVariants = {
  primary: 'primary',
  secondary: 'secondary',
} as const;

export type ButtonVariant = typeof buttonVariants[keyof typeof buttonVariants];

export const iconSizes = {
  actionButton: 40,
};

export const iconColors = {
  actionButton: colors.black,
};

export const usoButtonConfig = {
  activeOpacity: 0.7,
  iconSize: iconSizes.actionButton,
  iconColor: iconColors.actionButton,
};
