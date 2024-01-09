<p align="center">
<img alt="logo" src=".github/docs/logo.png"/>
</p>

<h4 align="center">Cody ADAM & Mael KERICHARD</h4>
<p align="center">
   <img src="https://img.shields.io/badge/-ESIR-orange" alt="ESIR">
   <img src="https://img.shields.io/badge/-Langium-red" alt="Langium">
   <img src="https://img.shields.io/badge/-ASE-blue" alt="ASE">
</p>

## 🌐 Accès rapide

Le projet est disponible à l'adresse suivante : [https://ai-kerichard-adam.vercel.app](https://ai-kerichard-adam.vercel.app).

> ⚠️ Nous ne sommes pas responsables des contenus présents sur le site. Notre modèle fait tout pour filtrer les messages inappropriés, mais il peut arriver que certains passent à travers les mailles du filet.

> ℹ️ Il y a un petit délai de chargement à la première redaction d'un message, le temps que le modèle se charge.

## 🤔 Le projet

C'est un clone très simpliste de X (ex-Twitter) qui permet de poster des messages sur un fil global. 

Le but de ce projet est de mettre en place un modèle de Machine Learning qui permet de filtrer les 
messages inappropriés en empêchant leur publication.

## 🛠️ Architecture et technologies

```mermaid
sequenceDiagram
    actor U as Utilisateur
    participant C as Client
    participant M as Modèle
    participant S as Serveur

    U ->> C: Rédaction d'un message
    C ->> M: Vérification du message
    alt Message correct
        M ->> C: Classement du message comme correct
        C ->> S: Publication du message
    else Message inapproprié
        M ->> C: Classement du message comme inapproprié
        C ->> U: Signalement que le message est inapproprié et qu'il ne peut pas être publié
    end
    
```

Pour simplifier le développement, la validation se fait côté client. Le modèle est donc chargé dans le navigateur de l'utilisateur.
Il est chargé dans un Web Worker pour ne pas bloquer le thread principal (voir `app/worker.js`).

Nous utilisons une petite base de donnée SQLite pour stocker les messages. Le serveur est géré par Next.js et est déployé sur Vercel.

Nous utilisons le modèle [_unitary/toxic-bert_](https://huggingface.co/unitary/toxic-bert) (via [_Xenova/toxic-bert_](https://huggingface.co/Xenova/toxic-bert) 
pour Transformers.js) qui est un modèle pré-entrainé pour la classification de textes inappropriés.
