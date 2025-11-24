import { router } from 'expo-router';
import React from 'react';
import { Text, View, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BackButton } from '../src/components';
import { commonStyles, userProfileStyles, colors, spacing } from '../src/styles';
import { useUserProfile } from '../src/hooks/useUserProfile';

export default function UserProfileScreen() {
  const { profile, isLoading } = useUserProfile();

  const handleBack = (): void => {
    router.back();
  };

  const renderLoading = (): React.ReactElement => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: spacing.xl }}>
      <ActivityIndicator size="large" color={colors.white} />
    </View>
  );

  const renderProfile = (): React.ReactElement => (
    <>
      <View style={userProfileStyles.fieldContainer}>
        <Text style={userProfileStyles.label}>Primeiro Nome</Text>
        <Text style={userProfileStyles.value}>{profile?.firstName || ''}</Text>
      </View>

      <View style={userProfileStyles.fieldContainer}>
        <Text style={userProfileStyles.label}>Último Nome</Text>
        <Text style={userProfileStyles.value}>{profile?.lastName || ''}</Text>
      </View>

      <View style={userProfileStyles.fieldContainer}>
        <Text style={userProfileStyles.label}>E-mail</Text>
        <Text style={userProfileStyles.value}>{profile?.email || ''}</Text>
      </View>

      <View style={userProfileStyles.fieldContainer}>
        <Text style={userProfileStyles.label}>Telefone</Text>
        <Text style={userProfileStyles.value}>{profile?.phone || ''}</Text>
      </View>
    </>
  );

  return (
    <SafeAreaView style={commonStyles.container}>
      <BackButton onPress={handleBack} />
      
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={userProfileStyles.scrollContent}
      >
        <Text style={userProfileStyles.title}>Dados Cadastrais</Text>
        {isLoading ? renderLoading() : renderProfile()}
      </ScrollView>
    </SafeAreaView>
  );
}