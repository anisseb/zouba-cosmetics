import { useState } from 'react';
import * as Location from 'expo-location';
import { GooglePlaceDetail } from 'react-native-google-places-autocomplete';

interface AddressComponent {
  street_number?: string;
  route?: string;
  locality?: string;
  administrative_area_level_1?: string;
  postal_code?: string;
  country?: string;
}

export const useAddressAutocomplete = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getCurrentLocation = async () => {
    try {
      setLoading(true);
      setError(null);

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Permission to access location was denied');
        return null;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      
      return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
    } catch (err) {
      setError('Error getting current location');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const parseAddressComponents = (components: GooglePlaceDetail['address_components'] = []): AddressComponent => {
    const result: AddressComponent = {};
    
    components.forEach(component => {
      const types = component.types;
      if (types.includes('street_number')) {
        result.street_number = component.long_name;
      } else if (types.includes('route')) {
        result.route = component.long_name;
      } else if (types.includes('locality')) {
        result.locality = component.long_name;
      } else if (types.includes('administrative_area_level_1')) {
        result.administrative_area_level_1 = component.short_name;
      } else if (types.includes('postal_code')) {
        result.postal_code = component.long_name;
      } else if (types.includes('country')) {
        result.country = component.long_name;
      }
    });

    return result;
  };

  return {
    loading,
    error,
    getCurrentLocation,
    parseAddressComponents,
  };
};