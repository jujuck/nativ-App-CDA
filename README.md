# Notre première application 📱

Pour ce projet, je te propose de créer une application mobile, installable sur ton téléphone (au moins Android).
Le but de est mettre dans ta poche un accès rapide à toutes les ressources de la formation CDA, partagé dans le repo [JS-CDA-Recap](https://github.com/WildCodeSchool-CDA-FT-2024-09/JS-CDA-recap)

**Au sommaire**

- react native
- Expo
- Mettre en place une navigation
- Mettre en place un ou plusieurs composants
- Mettre en place du CSS
- Jouer avec du MarkDown comme source de données
- Builder l'`App`en mode `.apk`

## 1. Lancer un projet React / Expo

Pour cette première phase, nous allons suivre la [doc](https://docs.expo.dev/tutorial/create-your-first-app/)

```
npx create-expo-app@latest <nom_de_app>
```

Ouvre maintenant l'application dans ton IDE préféré et fait un tour du propriétaire...
OK, il y a déjà plein de choses.
Un indice, ouvre le dossier `app` puis `(tabs)` puis le fichier `index.tsx`

**1. Observe bien la structure du code**
En haut, une liste d'import, puis une fonction `HomeScreen` qui a un return avec des balises de type `composant`..
Cela ressemble bien a du **React**, c'est du **React**.

Un peu de nettoyage s'impose car nous n'avons pas besoin de tout cela.
T'inquiète, on va quand même garder ce bout de code en exmple.

**2. Nettoyer le projet**
Pour retirer le code `boilerplate` de l'exemple, **expo** nous fournit une commande

```
npx expo reset-project
```

Finissons maintenant le tour du propriétaire pour mieux comprendre.
Il n'y a plus que 2 composants (pages) dans `app`.

Lance le projet... Nous puvons le voir dans notre navigateur sur http://localhost:8081

```
npx expo start
```

Modifie le texte dans le fichier `index.ts`et regarde ton navigateur...
C'est bon, cela ressemble vraiment à du **React**

**3. Visualiser l'app sur ton mobile.**
Pour Visualiser ton application en live sur un téléphone, il faut que tu installes l'application **Expo Go** sur Android
Puis, ouvre l'application et scanne le **QR Code** de ton terminal... Ou directement avec la camera sur IOs

:warning: :warning: :warning:
On va maintenant passer du coté obscur de la force... Il existe un mode **DEVELOPPEUR** sur nos téléphones...
Le moyen de le déverrouiller est différents selon ton OS (Android/IOs), mais aussi selon ta version ou constructeur... Je te laisse faire une recherche Google pour trouver la meilleure façon de faire

Pour Android, voici [plusieurs pistes](https://www.frandroid.com/comment-faire/tutoriaux/184906_comment-acceder-au-mode-developpeur-sur-android).
A quoi sert'il?

### Les principaux avantages pour les développeurs React Native:

- Développement plus rapide: Le mode développeur accélère le cycle de développement en permettant de tester les modifications de code rapidement et facilement.
- Applications plus stables: En identifiant et en corrigeant les problèmes plus tôt dans le processus de développement, on réduit le risque de bugs en production.
- Meilleures performances: En profilant l'application, on peut identifier les parties les plus lentes et les optimiser.
- Expérience utilisateur améliorée: En testant l'application sur différents appareils et dans différentes conditions, on s'assure qu'elle fonctionne correctement et offre une expérience utilisateur fluide.

## Développons notre application mobile

**1. Notre sommaire**

- Commençons par installer axios. Puis comme dans React, mettons en place un dossier service permettant de configurer notre connexion en utilisant une variable d'environnement comme `baseURL`. Celle ci aura pour valeur : `https://wildcodeschool-cda-ft-2024-09.github.io/JS-CDA-recap/`.

- Dans le fichier `index.ts`, importons notre `instance` de connexion et mettons en place notre strucutre useEffect, useState pour aller récupérer le résumé de notre formation à l'endPoint : `summary.json`

:astuce:

```
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

- Utilise maintenant un `.map()` avec un composant `<Text></Text>` pour afficher la liste des sujets aborder.
- Je te laisse digérer tout cela, faire une pause et aller chatouiller un peu la mise en place de style avec `StyleSheet.create`
  [Doc](https://reactnative.dev/docs/style).

:warning:
Composants natifs: "Contrairement au web où les éléments HTML sont des concepts abstraits, les composants React Native comme <Text> ou <View> sont directement liés aux éléments graphiques natifs de l'appareil. Cela signifie que lorsque nous stylisons un <Text>, nous modifions directement l'apparence du texte sur l'écran."

**2. Mise en place d'un composant UI avec CSS intégré**

- Améliorons notre structure en mettant en place un composant. `/composants/Card.tsx`
- Pour chaque élément du sommaire, affiche le titre et la description.
- Pour la mise en page, React native utilise flexbox. Fait différents essaie de mise en page.

Selon notre disposition, on peut se retrouver avec un problème d'affichage. Le scroll n'est pas automatique.
Pour garder le scroll, lors d'un defilement vertical, tu peux utliser <flatList /> [Doc](https://reactnative.dev/docs/flatlist)

**_exemple_**

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

On remplace ici la structure de boucle par un container scrollable.

- Le container reçoit ses données via la propriété data.
- La boucle est effectuée par la fonction de callback de la proriété `renderItem`. Cette fonction callback, accept un objet en paramètre, dont une propriété à le nom `item` (Nommenclature à respecter).
- Notons la notions de `keyExtractor` qui correspond à la notion de key en **React Dom**

**3. Intégration du routing**
Si vous cherchez sur la documentation en ligne, vous pouvez voir qu'il y a 2 systèmes parallèles pour gérer la navigation dans une App `React-Expo`.
Soit directement le systeme `React-Nativ`, soit celui d'`Expo`.
Dans cette partie, nous allons implémenter la navigation `Expo`.

[Doc](https://docs.expo.dev/tutorial/add-navigation/)

Le systeme de navigation se base sur la balise <Stack /> de notre **\_layout.tsx**.
Normalement, le package `expo-router` est directement intégré lors de la création de l'application. Vérifie sa présence dans le package.json et installe le si besoin.

- Dans notre fichier **\_layout.jsx**, ajoute simplement ce code :

```tsx
return (
  <Stack>
    <Stack.Screen name="index" />
    <Stack.Screen name="detail" />
  </Stack>
);
```

**_Nous venons de créer 2 routes:_**

- une première sur l'url "/" ("index")
- une deuxième sur l'url "detail".
  Par principe, si nous ne spécifions pas de composant, le `router` affichera le fichier du même nom, à la racine de l'arborescence.
  Explication; choix de la navigation via expo. Autres system peux être intégrée directement avec react-navigation. Nous parlons alors de systeme **file-bases routing**. On retrouve ce systeme sur **Next.js** ou **Nuxt.js** également.

- Ajoute un fichier **detail.tsx** à coté de ton **\_layout.tsx** avec le code si dessous

```tsx
import { Text } from "react-native";

export default function DetailScreen() {
  return <Text>Detail Page</Text>;
}
```

Normalement, si tu vas sur l'url **/details**, tu devrait voir la page s'afficher... Coooool, Isn't it.

**4. Ajoutons notre systeme de navigation**

- Revenons sur notre composant de carte... Chaque carte va devenir un lien vers notre page détail où nous récupérerons les informations spécifiques du sujet et les afficherons.

- La gestion des liens avec `Expo-router` ressemble fortement à celle de `react-router-dom`. La balise s'appelle <Link>.
  Importons la en haut de notre fichier puis encadrons notre code avec celle-ci. Nous utiliserons les données `subject` et `link`

```tsx
<Link href={`/detail?subject=${subject}&link=${link}` as RelativePathString}>
  <View style={styles.cardContent}>
    <Text style={styles.title}>{subject}</Text>
    <Text style={styles.description}>{description}</Text>
  </View>
</Link>
```

**a.** Dans le code au dessus, nous pouvons voir que la balise <Link> a un attribut **href** (:warning:, en react nativ, le code tsx ne génère pas de balise html telle que <a>, mais des composants natif Android ou Ios. Cela ne pose donc pas de problème de rafraichissmenent).

**b.** Nous voyons également que les informations que je veux transmettre à ma page passe par des query params et non pas des params d'url (présence d'un `?`). Je peux donc passer autant d'information que je le veux à ma page.

**c.** Lors de mon import de Link de la librairie `expo-router`, il faut également que j'importe `RelativePathString` pour respecter le typage `ts`

- Essayez de naviguer à partir de vos cartes. Cela marche... Top!!! :rocket:

**5. Récupération des informations de query**
Dans ma page de **detail.tsx**, récupérons maintenant nos query params.
Pour ce faire, importons la method `useLocalSearchParams` de `expo-router` puis, initialisons nos données en haut de notre composant.

```tsx
const { subject, link } = useLocalSearchParams();
```

Hop, le tour est joué.
Je vous laisse maintenant quelques minutes pour mettre en place la logique `react`de récupération des données à partir des `Search Params`. Pur cela, utilise un state, un useEffect et axios.

```tsx
const subject = await axios.get(
  `${process.env.EXPO_PUBLIC_GITHUB_REPO}/${link}` //https://wildcodeschool-cda-ft-2024-09.github.io/JS-CDA-recap/GraphQL/wild_content.md
);
setData(subject.data);
```

**6. Affichage du markdown**
Pour afficher du markdown et le mettre en forme, rien de très compliqué...
Nous allons utiliser la librairie `react-native-markdown-display`
[Doc](https://www.npmjs.com/package/react-native-markdown-display)

- Ajouter la librairie à votre projet : `npm i react-native-markdown-display`.
- Créer un composant spécifique **mdDisplayer.tsx**
- Intégrer ce composant au `tsx` de votre page et passer lui les datas (markdown) en props.
- Dans votre composant **mdDisplayer.tsx**, importer { StyleSheet } de `react-native`pour le style et MarkDown de `react-native-markdown-display` pour gérer votre markdown.

- Dans le return du composant, intègre seulement :

```tsx
return <Markdown>{data}</Markdown>;
```

Super, mais ce n'est pas super jolie...

- Pour améliorer le sytle, crée en dehors de ton composant (en dessous par exemple), une variable :

```
const markdownStyles = StyleSheet.create({
  heading1: {
    color: "#333",
  },
});
```

- Intègre la maintenant à ta balise <MarkDown > via l'attribut `style`.
  Pour connaître les propriétés du markdown (heading1, paragraph...), jette une oeil à la [Doc](https://www.npmjs.com/package/react-native-markdown-display#rules-and-styles).
  Il n'y plus qu'à ecrire tes règles.

- Un dernier problème reste. Il y a du HTML dans notre markdown.
  Pour nettoyer celui ci, applique cette fonction à ta data :

```ts
const cleanHtml = (md: string) => {
  return md.replace(/<\/?[^>]+(>|$)/g, ""); // Supprime toutes les balises HTML
};
```

WELL DONE

## Générons notre application .apk

**1. Configuration**
Pour pouvoir directement générer un .apk de notre application, nous devons créer un fichier de configuration.
[Doc](https://docs.expo.dev/build-reference/apk/)

- Créer un fichier `eas.json` à la racine et y intégrer le code 🕴

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

:warning:
Pour Ios, remplacer "android" par "ios".

La partie qui nous intéresse est "preview". Elle peut se nommer comme nous voulons.
Dans celle-ci, nous configurons notre build pour produite un .apk pour "android".

**2. Build de l'.apk**

- Pour commencer, nous allons nous créer un compte sur **https://expo.dev/**.
- Puis, installons la CLI `npm install -g eas-cli`
- Connectons notre PC à notre compte **expo** avec la commande `eas login`
- Lançons le build avec `eas build -p android --profile preview` ou android est notre OS cible et preview, la clé de référence dans notre config.

:coffee
La phase de build est longue, c'est vraiment le moment de faire une pause café.

- A la fin, tu récupère un lien de téléchargement de ton .apk.

## Installation sur ton mobile.

Sur la plupart des versions Android ou Ios, l'installation d'un `.apk` n'est pas possible directement pour des raisons de sécurité.
Je te laisse faire des recherches sur internet pour trouver comment débloquer ton `Phone` et passer en mode `Developpeur`.

🦸 🦸 🦸 Incroyable, tu es maintenant un super Héro de ton téléphone.

- Télécharge ton `.apk` et éxécute le pour l'installer.
  Normalement, tu as accès à ton application...
