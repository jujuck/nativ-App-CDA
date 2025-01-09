import React from "react";
import { StyleSheet } from "react-native";
import Markdown from "react-native-markdown-display";

type MdDisplayerProps = {
  data: string;
};
const cleanHtml = (md: string) => {
  return md.replace(/<\/?[^>]+(>|$)/g, ""); // Supprime toutes les balises HTML
};

function MdDisplayer({ data }: MdDisplayerProps) {
  return (
    <Markdown
      style={markdownStyles}
      rules={{
        html: () => null,
      }}
    >
      {cleanHtml(data)}
    </Markdown>
  );
}

export default MdDisplayer;

const markdownStyles = StyleSheet.create({
  heading1: {
    fontSize: 24,
    color: "#333",
  },
  paragraph: {
    fontSize: 16,
    color: "#555",
  },
  link: {
    color: "blue",
    textDecorationLine: "underline",
  },
});
