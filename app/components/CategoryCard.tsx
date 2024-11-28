import React from 'react';
import { TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import { Category } from '../types';

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <TouchableOpacity style={styles.card}>
      <Image source={{ uri: category.image }} style={styles.image} />
      <Text style={styles.title}>{category.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 10,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  image: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    padding: 10,
    textAlign: 'center',
  },
});