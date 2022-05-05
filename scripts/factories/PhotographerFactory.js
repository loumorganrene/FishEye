// export class MediaFactory {
//     constructor(media, type) {
//         // Si le type correspond à l'ancienne API, alors retourne-moi l'ancien formatage
//         if (type === 'photo') {
//             return new Photo(media)
//         // Sinon retourne-moi le nouveau formatage
//         } else if (type === 'video') {
//             return new Video(media)
//         // Une bonne pratique est de déclencher une erreur si le format n'est pas reconnu
//         } else {
//             throw 'Unknown type format'
//         }
//     }
//  }