import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { vehicleService } from '../../src/services/vehicleService';
import { parkingService } from '../../src/services/parkingService';
import { Vehicle } from '../../src/types';
import { CustomButton, BackButton } from '../../src/components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { showAlert } from '../../src/utils/alertUtils';

export default function CreateParkingScreen() {
  const params = useLocalSearchParams();

  const areaIdRaw = params.areaId;
  const areaId = Array.isArray(areaIdRaw) ? areaIdRaw[0] : areaIdRaw;

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);

  const [timeInMins, setTimeInMins] = useState<number>(60);
  const [bankId, setBankId] = useState<number>(1);
  const [paymentMethodId, setPaymentMethodId] = useState<number>(1);

  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const data = await vehicleService.getAll();
      setVehicles(data);
      if (data.length > 0) setSelectedVehicle(data[0].id);
    } catch (e) {
      showAlert("Erro", "Não foi possível carregar seus veículos.");
    } finally {
      setLoadingData(false);
    }
  }

  const handlePayment = async () => {
    if (!selectedVehicle) {
      showAlert("Atenção", "Cadastre ou selecione um veículo primeiro.");
      return;
    }
    if (!areaId) {
      showAlert("Erro", "Área inválida. Volte ao mapa.");
      return;
    }

    try {
      setLoading(true);

      const userStr = await AsyncStorage.getItem('@parquimetro_user');
      const user = userStr ? JSON.parse(userStr) : null;

      if (!user || !user.id) {
        showAlert("Erro", "Usuário não identificado. Faça login novamente.");
        return;
      }

      await parkingService.create({
        driverId: user.id,
        vehicleId: selectedVehicle,
        parkingAreaId: areaId,
        timeInMins: timeInMins,
        bankId: bankId,
        paymentMethodId: paymentMethodId
      });

      showAlert("Sucesso!", "Ticket ativado. Bom estacionamento!", [
        {
          text: "OK",
          onPress: () => router.replace('/parking')
        }
      ]);

    } catch (error: any) {
      const msg = error.response?.data?.message || "Pagamento recusado ou erro na conexão.";
      showAlert("Erro", msg);
    } finally {
      setLoading(false);
    }
  };

  if (loadingData) {
    return <View style={styles.center}><ActivityIndicator size="large" color="#0000ff" /></View>;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ paddingHorizontal: 20 }}>
        <BackButton onPress={() => router.back()} />
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Novo Ticket</Text>

        <Text style={styles.label}>Selecione o Veículo:</Text>
        <View style={styles.row}>
          {vehicles.length === 0 ? (
            <Text style={{ color: 'gray' }}>Nenhum veículo cadastrado.</Text>
          ) : (
            vehicles.map(v => (
              <TouchableOpacity
                key={v.id}
                style={[styles.option, selectedVehicle === v.id && styles.selected]}
                onPress={() => setSelectedVehicle(v.id)}
              >
                <Text style={selectedVehicle === v.id ? styles.textSelected : styles.text}>
                  {v.name} ({v.plate})
                </Text>
              </TouchableOpacity>
            ))
          )}
        </View>

        <Text style={styles.label}>Tempo de Permanência:</Text>
        <View style={styles.row}>
          <TouchableOpacity
            style={[styles.option, timeInMins === 60 && styles.selected]}
            onPress={() => setTimeInMins(60)}
          >
            <Text style={timeInMins === 60 ? styles.textSelected : styles.text}>1 Hora (R$ 5,00)</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.option, timeInMins === 120 && styles.selected]}
            onPress={() => setTimeInMins(120)}
          >
            <Text style={timeInMins === 120 ? styles.textSelected : styles.text}>2 Horas (R$ 10,00)</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Forma de Pagamento:</Text>
        <View style={styles.row}>
          <TouchableOpacity
            style={[styles.option, paymentMethodId === 1 && styles.selected]}
            onPress={() => setPaymentMethodId(1)}
          >
            <Text style={paymentMethodId === 1 ? styles.textSelected : styles.text}>Crédito</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.option, paymentMethodId === 2 && styles.selected]}
            onPress={() => setPaymentMethodId(2)}
          >
            <Text style={paymentMethodId === 2 ? styles.textSelected : styles.text}>Débito</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Banco:</Text>
        <View style={styles.row}>
          <TouchableOpacity style={[styles.option, bankId === 1 && styles.selected]} onPress={() => setBankId(1)}>
            <Text style={bankId === 1 ? styles.textSelected : styles.text}>Banco A</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.option, bankId === 2 && styles.selected]} onPress={() => setBankId(2)}>
            <Text style={bankId === 2 ? styles.textSelected : styles.text}>Banco B</Text>
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 40, marginBottom: 20 }}>
          {loading ? <ActivityIndicator size="large" color="#0000ff" /> : (
            <CustomButton title="Pagar e Confirmar" onPress={handlePayment} variant="primary" />
          )}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 50 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', marginTop: 10 },
  label: { fontSize: 16, fontWeight: 'bold', marginTop: 20, marginBottom: 10 },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  option: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#f9f9f9'
  },
  selected: {
    backgroundColor: '#000',
    borderColor: '#000'
  },
  text: { color: '#000' },
  textSelected: { color: '#fff', fontWeight: 'bold' }
});