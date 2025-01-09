import { useState, useEffect } from "react";
import { Text, View, FlatList } from "react-native";
import Card from "./components/card";
import axios from "axios";

type link = {
  subject: string;
  link: string;
  description: string;
};

export default function Index() {
  const [links, setLinks] = useState<link[]>([]);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await axios.get(
          `${process.env.EXPO_PUBLIC_GITHUB_REPO}/summary.json`
        );
        setLinks(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSummary();
  }, []);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Sommaire</Text>
      <FlatList
        data={links}
        renderItem={({ item }) => (
          <Card
            subject={item.subject}
            description={item.description}
            path={item.link}
          />
        )}
        keyExtractor={(link) => link.subject}
      />
    </View>
  );
}
