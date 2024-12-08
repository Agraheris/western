import { Scene } from 'phaser';

export class GameOver extends Scene {
    constructor() {
        super('GameOver');
    }

    create() {
        this.add.image(512, 384, 'background');

        // Ajouter l'image "cv" et la rendre interactive
        const cvImage = this.add.image(200, 400, 'cv').setInteractive();

        // Ajouter une interaction sur clic
        cvImage.on('pointerdown', () => {
            window.open('https://drive.google.com/file/d/1-UTTVFioh3_CQiO-yBnvxDeue8b9uOeo/view?usp=drive_link', '_blank'); // Ouvre le CV dans un nouvel onglet
        });

        // Ajouter le rectangle pour le texte de fond
        this.add.rectangle(700, 320, 500, 575, 0x000000, 0.65);

        // Ajouter le texte de Sherif Bob
        this.add
            .text(700, 75, "Sherif Bob", {
                fontSize: "40px",
                fill: "#ffffff",
            })
            .setOrigin(0.5);

        // Ajouter le texte principal
        this.add
            .text(
                700,
                350,
                "Eh ben dis donc, t’as réussi, cowboy ! T’as prouvé qu’tu pouvais traquer le fameux développeur plus rapide que son ombre. Et comme toute mission qui s’respecte, y’a une récompense ! Jette un œil à l’image juste là – un clic, et tu décroches son CV. C’est un sacré butin pour un recruteur, si tu veux mon avis !",
                {
                    fontSize: "28px",
                    fill: "#ffffff",
                    wordWrap: { width: 400 },
                }
            )
            .setOrigin(0.5);
    }
}
