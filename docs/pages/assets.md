# Icons, images et font

Comme nous l'avons vu dans le composant Todos, dans wapitis, la gestion des images se fait grâce aux svg et plus précisément à un fichier SVG contenant toutes les images que l'on veut utiliser sous forme de symbole accompagné d'un id.

Il suffit alors d'importer le fichier svg inclus dans www :
```typescript
import icons from '../www/assets/img/icons.svg'
```

Puis de créer une balise svg pointant vers ce fichier et vers l'id de l'image souhaité.
```typescript
html`<svg class="icon"><use href=${icons}#icon-check-circle></use></svg>`
```

De cette manière il est facile de changer la couleur et la taille du svg en css.

Il est néanmoins toujours possible d'utiliser des fichiers images png, jpeg ou autres. Il suffit alors d'importer l'image

```typescript
import image from '../www/assets/img/image.png'
```

Puis d'appeler la variable dans l'attribut src de la balise image
```typescript
 render() {
    return html`<img src=${image}>`
    ...
```

Il est également possible d'utiliser des fonts (police classique ou icones)

Il suffit ainsi de déclarer la font dans les styles

```css
@font-face {
    font-family: "RobotoLight";
    src: url(../assets/fonts/Roboto-Light.ttf) format('truetype');
    font-weight: normal;
    font-style: normal;
}
```

Puis d'appeler la font dans le selecteur choisi

```css
body {
    font-family: "RobotoLight";
}
```