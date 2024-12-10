import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Switch,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Yup from 'yup';
import { useAddresses } from '../../hooks/useAddresses';
import { AddEditAddressScreenProps } from '../../types/types';
import AddressAutocomplete from './AddressAutocomplete';
import { useAddressAutocomplete } from '../../hooks/useAddressAutocomplete';

const addressSchema = Yup.object().shape({
  fullName: Yup.string().required('Full name is required'),
  streetAddress: Yup.string().required('Street address is required'),
  city: Yup.string().required('City is required'),
  country: Yup.string().required('Country is required'),
  phone: Yup.string().required('Phone number is required'),
});

const FormSection = ({ children }: { children: React.ReactNode }) => (
  <View style={styles.section}>{children}</View>
);

export default function AddEditAddressScreen({ 
  navigation, 
  route 
}: AddEditAddressScreenProps) {
  const { addressId } = route.params || {};
  const { addresses, addAddress, updateAddress } = useAddresses();
  const { parseAddressComponents } = useAddressAutocomplete();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [formData, setFormData] = useState({
    fullName: '',
    streetAddress: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: '',
    isDefault: false,
  });

  useEffect(() => {
    if (addressId) {
      const address = addresses.find((addr) => addr.id === addressId);
      if (address) {
        setFormData({
          fullName: address.fullName,
          streetAddress: address.streetAddress,
          apartment: address.apartment || '',
          city: address.city,
          state: address.state || '',
          zipCode: address.zipCode || '',
          country: address.country,
          phone: address.phone,
          isDefault: address.isDefault,
        });
      }
    }
  }, [addressId, addresses]);

  const handleAddressSelect = (data: any, details: any) => {
    const addressComponents = parseAddressComponents(details.address_components);
    
    setFormData(prev => ({
      ...prev,
      streetAddress: `${addressComponents.street_number || ''} ${addressComponents.route || ''}`.trim(),
      city: addressComponents.locality || '',
      state: addressComponents.administrative_area_level_1 || '',
      zipCode: addressComponents.postal_code || '',
      country: addressComponents.country || '',
    }));

    setErrors(prev => ({
      ...prev,
      streetAddress: '',
      city: '',
      country: '',
    }));
  };

  const handleSubmit = async () => {
    try {
      await addressSchema.validate(formData, { abortEarly: false });
      if (addressId) {
        updateAddress({ ...formData, id: addressId });
      } else {
        addAddress(formData);
      }
      navigation.goBack();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const validationErrors: { [key: string]: string } = {};
        err.inner.forEach((error) => {
          if (error.path) {
            validationErrors[error.path] = error.message;
          }
        });
        setErrors(validationErrors);
      }
    }
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const formFields = [
    { key: 'fullName', type: 'input' },
    { key: 'addressSearch', type: 'autocomplete' },
    { key: 'apartment', type: 'input' },
    { key: 'phone', type: 'input' },
    { key: 'isDefault', type: 'switch' },
  ];

  const renderFormField = ({ item }: { item: { key: string; type: string } }) => {
    switch (item.key) {
      case 'fullName':
        return (
          <FormSection>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={[styles.input, errors.fullName && styles.inputError]}
              value={formData.fullName}
              onChangeText={(value) => handleChange('fullName', value)}
              placeholder="Enter your full name"
            />
            {errors.fullName && (
              <Text style={styles.errorText}>{errors.fullName}</Text>
            )}
          </FormSection>
        );

      case 'addressSearch':
        return (
          <FormSection>
            <View style={styles.addressSection}>
              <Text style={styles.label}>Search Address</Text>
              <AddressAutocomplete
                onSelect={handleAddressSelect}
                placeholder="Search for your address"
              />
              {!!formData.streetAddress && (
                <View style={styles.selectedAddress}>
                  <Text style={styles.selectedAddressText}>
                    {formData.streetAddress}
                  </Text>
                  <Text style={styles.selectedAddressText}>
                    {formData.city}
                    {formData.state ? `, ${formData.state}` : ''}
                    {formData.zipCode ? `, ${formData.zipCode}` : ''}
                  </Text>
                  {formData.country && (
                    <Text style={styles.selectedAddressText}>
                      {formData.country}
                    </Text>
                  )}
                </View>
              )}
            </View>
          </FormSection>
        );

      case 'apartment':
        return (
          <FormSection>
            <Text style={styles.label}>Apartment, Suite, etc. (optional)</Text>
            <TextInput
              style={styles.input}
              value={formData.apartment}
              onChangeText={(value) => handleChange('apartment', value)}
              placeholder="Apartment, suite, unit, etc."
            />
          </FormSection>
        );

      case 'phone':
        return (
          <FormSection>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={[styles.input, errors.phone && styles.inputError]}
              value={formData.phone}
              onChangeText={(value) => handleChange('phone', value)}
              placeholder="Enter phone number"
              keyboardType="phone-pad"
            />
            {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
          </FormSection>
        );

      case 'isDefault':
        return (
          <FormSection>
            <View style={styles.switchContainer}>
              <Text style={styles.switchLabel}>Set as default address</Text>
              <Switch
                value={formData.isDefault}
                onValueChange={(value) => handleChange('isDefault', value)}
                trackColor={{ false: '#767577', true: '#007AFF' }}
                thumbColor={formData.isDefault ? '#ffffff' : '#f4f3f4'}
              />
            </View>
          </FormSection>
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <FlatList
          data={formFields}
          renderItem={renderFormField}
          keyExtractor={(item) => item.key}
          contentContainerStyle={styles.formContainer}
          showsVerticalScrollIndicator={false}
        />

        <View style={styles.footer}>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>
              {addressId ? 'Update Address' : 'Add Address'}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  keyboardAvoid: {
    flex: 1,
  },
  formContainer: {
    padding: 16,
  },
  section: {
    marginBottom: 16,
    position: 'relative',
    zIndex: 1,
  },
  addressSection: {
    marginBottom: 16,
    position: 'relative',
    zIndex: 9999,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
  },
  inputError: {
    borderColor: '#FF3B30',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 12,
    marginTop: 4,
  },
  selectedAddress: {
    marginTop: 12,
    padding: 12,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectedAddressText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  switchLabel: {
    fontSize: 16,
    color: '#333',
  },
  footer: {
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});