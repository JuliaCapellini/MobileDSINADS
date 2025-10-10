export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

export interface LogoProps {
  source: any;
  width?: number;
  height?: number;
}
