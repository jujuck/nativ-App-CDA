# Notre première application mobile 📱

Dans cet atelier, je te propose de créer une application mobile que tu pourras installer sur ton téléphone (au moins sous Android). Le but est de mettre à portée de main un accès rapide à toutes les ressources de la formation CDA, disponibles dans le repository [JS-CDA-Recap](https://github.com/WildCodeSchool-CDA-FT-2024-09/JS-CDA-recap).

## **Au programme**

- Découverte de React Native
- Introduction à Expo
- Mise en place d'une navigation
- Création de composants
- Gestion des styles avec CSS
- Utilisation de Markdown comme source de données
- Compilation de l'application en `.apk`

---

## 1. Lancer un projet React/Expo

Commençons par suivre la documentation officielle d'Expo pour créer un projet :

```bash
npx create-expo-app@latest <nom_de_l_app>
```

Ouvre l'application dans ton IDE préféré et explore les différents fichiers et dossiers. Par exemple, ouvre le dossier `app`, puis `(tabs)` et le fichier `index.tsx`. Tu verras une structure de code typique d'une application React.

### **1.1. Explorer le projet**

Observe la structure du fichier :

- En haut, il y a une liste d'importations.
- Ensuite, une fonction `HomeScreen` qui retourne des balises de type composant.

Cela ressemble à du **React** — et c'en est bien !

### **1.2. Nettoyer le projet**

Pour retirer le code de démonstration fourni par défaut, utilise la commande suivante :

```bash
npx expo reset-project
```

Cela va simplifier la structure de l'application.

### **1.3. Lancer et tester le projet**

Pour voir le résultat dans ton navigateur, utilise :

```bash
npx expo start
```

Modifie ensuite le texte dans `index.tsx` et observe les changements en temps réel.

### **1.4. Visualiser l'app sur ton mobile**

Pour visualiser l'application en direct sur ton téléphone :

1. Installe **Expo Go** sur Android ou iOS.
2. Ouvre l'application et scanne le QR Code affiché dans le terminal ou utilise la caméra (iOS).

> :warning: **Mode développeur** : Active-le sur ton téléphone pour déboguer efficacement. Voici [un guide pour Android](https://www.frandroid.com/comment-faire/tutoriaux/184906_comment-acceder-au-mode-developpeur-sur-android).

### **Avantages du mode développeur**

- **Tests rapides** : Modifie le code et observe les résultats instantanément.
- **Profilage** : Identifie les performances lentes.
- **Expérience utilisateur** : Teste sur différents appareils et contextes.

---

## 2. Développer l'application

### **2.1. Installer Axios et configurer l'API**

Installe Axios :

```bash
npm install axios
```

Crée un dossier `services` pour y configurer une instance de connexion. Utilise une variable d'environnement comme `baseURL` :

```js
https://wildcodeschool-cda-ft-2024-09.github.io/JS-CDA-recap/
```

Dans `index.tsx`, importe cette instance et configure un `useEffect` et un `useState` pour récupérer les données à partir de l'endpoint `summary.json` :

```tsx
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
```

### **2.2. Affichage des données avec `.map()`**

Utilise `.map()` pour afficher les sujets dans des balises `<Text>`.

### **2.3. Styliser avec `StyleSheet.create`**

Expérimente avec le style en utilisant :

```tsx
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
```

> :bulb: Les composants React Native comme `<Text>` ou `<View>` correspondent directement à des éléments graphiques natifs.

---

## 3. Créer un composant UI : `Card`

Ajoute un composant dans `/components/Card.tsx` pour afficher les titres et descriptions des sujets. Utilise **Flexbox** pour la mise en page.

Si le contenu dépasse l'écran, utilise `<FlatList>` pour gérer le scroll :

```tsx
<FlatList
  data={links}
  renderItem={({ item }) => (
    <Card
      subject={item.subject}
      description={item.description}
      link={item.link}
    />
  )}
  keyExtractor={(link) => link.subject}
/>
```

---

## 4. Intégrer le routing avec Expo

Expo propose un système de navigation basé sur `<Stack />`. Vérifie que `expo-router` est bien installé.

Dans `_layout.tsx`, ajoute :

```tsx
<Stack>
  <Stack.Screen name="index" />
  <Stack.Screen name="detail" />
</Stack>
```

Ajoute un fichier `detail.tsx` avec le code suivant :

```tsx
import { Text } from "react-native";

export default function DetailScreen() {
  return <Text>Page de détails</Text>;
}
```

### **Ajout des liens dans `Card`**

Utilise `<Link>` pour rendre chaque carte cliquable :

```tsx
<Link href={`/detail?subject=${subject}&link=${link}`}>
  <View style={styles.cardContent}>
    <Text style={styles.title}>{subject}</Text>
    <Text style={styles.description}>{description}</Text>
  </View>
</Link>
```

### **Récupération des query params**

Dans `detail.tsx`, importe et utilise `useLocalSearchParams` pour récupérer les paramètres :

```tsx
const { subject, link } = useLocalSearchParams();
```

Ajoute ensuite un `useEffect` pour charger les données correspondantes avec Axios.

---

## 5. Afficher du Markdown

Installe la librairie :

```bash
npm i react-native-markdown-display
```

Crée un composant `MdDisplayer.tsx` pour afficher le Markdown :

```tsx
import Markdown from "react-native-markdown-display";
import { StyleSheet } from "react-native";

const markdownStyles = StyleSheet.create({
  heading1: { color: "#333" },
});

export default function MdDisplayer({ data }) {
  return <Markdown style={markdownStyles}>{data}</Markdown>;
}
```

Ajoute une fonction pour nettoyer les balises HTML :

```ts
const cleanHtml = (md: string) => {
  return md.replace(/</?[^>]+(>|$)/g, "");
};
```

---

## 6. Générer un `.apk`

Crée un fichier `eas.json` à la racine :

```json
{
  "cli": {
    "version": ">= 14.2.0",
    "appVersionSource": "remote"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "autoIncrement": true
    }
  },
  "submit": {
    "production": {}
  }
}
```

### **Construire le `.apk`**

1. Crée un compte sur **https://expo.dev/**.
2. Installe la CLI :

   ```bash
   npm install -g eas-cli
   ```

3. Connecte-toi :

   ```bash
   eas login
   ```

4. Lance le build :

   ```bash
   eas build -p android --profile preview
   ```

Une fois terminé, tu obtiendras un lien de téléchargement pour ton `.apk`.

### **Installer sur ton téléphone**

Pour installer le fichier `.apk`, active le mode développeur et autorise les installations depuis des sources externes.

---

Félicitations, tu viens de créer et déployer ta première application mobile avec React Native et Expo ! 🎉
