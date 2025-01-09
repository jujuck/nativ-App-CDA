import React from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { Link, RelativePathString } from "expo-router";

type CardProps = {
  subject: string;
  description: string;
  path: string;
};

function Card({ subject, description, path }: CardProps) {
  return (
    <TouchableOpacity style={styles.card}>
      <Link
        href={`/detail?subject=${subject}&path=${path}` as RelativePathString}
      >
        <View style={styles.cardContent}>
          <Text style={styles.title}>{subject}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </Link>
    </TouchableOpacity>
  );
}

export default Card;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3, // Pour l'ombre sur Android
    marginVertical: 10,
    marginHorizontal: 15,
    padding: 15,
    width: "90%",
  },
  cardContent: {
    alignItems: "flex-start", // Alignement des éléments
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: "#666",
  },
});
