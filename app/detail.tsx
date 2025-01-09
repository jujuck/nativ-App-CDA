import { useState, useEffect } from "react";
import { Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import axios from "axios";
import MdDisplayer from "./components/mdDisplayer";

function DetailScreen() {
  const [data, setData] = useState<string>("");
  const { subject, path } = useLocalSearchParams();

  useEffect(() => {
    const fetchSubject = async () => {
      try {
        const subject = await axios.get(
          `${process.env.EXPO_PUBLIC_GITHUB_REPO}/${path}`
        );
        setData(subject.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSubject();
  }, []);
  return (
    <View>
      <Text>{subject}</Text>
      <MdDisplayer data={data} />
    </View>
  );
}

export default DetailScreen;
