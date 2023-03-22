let bgImages = [
    "https://firebasestorage.googleapis.com/v0/b/sportman-f1d90.appspot.com/o/images%2Falex-azabache-yuwOgewXmiY-unsplash.jpg?alt=media&token=65a07693-e2fa-4645-9dd2-ac9cb720e5cd",
    "https://firebasestorage.googleapis.com/v0/b/sportman-f1d90.appspot.com/o/images%2Fashkan-forouzani-IRDPRsdozLI-unsplash.jpg?alt=media&token=c7e37920-40ab-4311-b132-c96331fe2100",
    "https://firebasestorage.googleapis.com/v0/b/sportman-f1d90.appspot.com/o/images%2Fatharva-dharmadhikari-XnH8c4so-wE-unsplash.jpg?alt=media&token=df5e68db-c2ef-42ac-916f-8526da0c2ce6",
    "https://firebasestorage.googleapis.com/v0/b/sportman-f1d90.appspot.com/o/images%2Fcharlesdeluvio-wn7dOzUh3Rs-unsplash.jpg?alt=media&token=91e4badf-1fef-4cb2-bca7-67e3d549d2b7",
    "https://firebasestorage.googleapis.com/v0/b/sportman-f1d90.appspot.com/o/images%2Fdanie-franco-23s0q7NCJKM-unsplash.jpg?alt=media&token=6a1702d4-4798-479e-9adb-486e0a1a1a02",
    "https://firebasestorage.googleapis.com/v0/b/sportman-f1d90.appspot.com/o/images%2Feverton-vila-AsahNlC0VhQ-unsplash.jpg?alt=media&token=0f68a7b4-f549-45ac-83e4-eb5b5f7199e7",
    "https://firebasestorage.googleapis.com/v0/b/sportman-f1d90.appspot.com/o/images%2Fkenny-eliason-y_6rqStQBYQ-unsplash.jpg?alt=media&token=027aaafe-b273-4779-939d-9f40a288b687",
    "https://firebasestorage.googleapis.com/v0/b/sportman-f1d90.appspot.com/o/images%2Flinkedin-sales-solutions-W3Jl3jREpDY-unsplash.jpg?alt=media&token=dcf2f175-b105-4923-9b6e-3f77dbe50188",
    "https://firebasestorage.googleapis.com/v0/b/sportman-f1d90.appspot.com/o/images%2Fluana-azevedo-36Zi8qQTMas-unsplash.jpg?alt=media&token=1a06433d-098c-4ed5-a225-de70da78b2e6",
    "https://firebasestorage.googleapis.com/v0/b/sportman-f1d90.appspot.com/o/images%2Fm-accelerator-zJYMJIrQYTE-unsplash.jpg?alt=media&token=b8ac5ba9-fd24-4f00-89dd-e491aee723cd",
    "https://firebasestorage.googleapis.com/v0/b/sportman-f1d90.appspot.com/o/images%2Fmelyna-valle-pvl9zYmy1kM-unsplash.jpg?alt=media&token=c98c17d9-ff32-4528-8f75-48337fdcfc75",
    "https://firebasestorage.googleapis.com/v0/b/sportman-f1d90.appspot.com/o/images%2Fnathan-dumlao-EdULZpOKsUE-unsplash.jpg?alt=media&token=c35d639b-030f-40b0-a1cd-3f4f67d9990f",
    "https://firebasestorage.googleapis.com/v0/b/sportman-f1d90.appspot.com/o/images%2Fpaul-hanaoka-vp2apmPpkf8-unsplash.jpg?alt=media&token=6ff4758b-1eb0-4f17-bd36-1a2de0efc7df",
    "https://firebasestorage.googleapis.com/v0/b/sportman-f1d90.appspot.com/o/images%2Fpriscilla-du-preez-K8XYGbw4Ahg-unsplash.jpg?alt=media&token=1d053b1a-a06a-404d-9c9f-eda780c621b2",
    "https://firebasestorage.googleapis.com/v0/b/sportman-f1d90.appspot.com/o/images%2Fwan-san-yip-ID1yWa1Wpx0-unsplash.jpg?alt=media&token=10dc5c67-2947-424d-8257-7cbe0129fa1b",
    "https://firebasestorage.googleapis.com/v0/b/sportman-f1d90.appspot.com/o/images%2Fzack-marshall-QFc2kxpXVYQ-unsplash.jpg?alt=media&token=ad892522-8029-4a4f-be70-1b435002b553",
];


export default function getBGImage() {
    return bgImages[Math.floor(Math.random() * bgImages.length)];
}