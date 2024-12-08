import { Scene } from 'phaser';

export class MainMenu extends Scene
{
    constructor ()
    {
        super('MainMenu');
    }

    create ()
    {
        this.add.image(512, 384, 'background');

        this.add.image(265, 500, 'sherifBob');

        this.add.rectangle(700, 320, 500, 575, 0x000000, 0.65);
        this.add
          .text(700, 75, "Sherif Bob", {
            fontSize: "40px",
            fill: "#ffffff",
          })
          .setOrigin(0.5);

        this.add
          .text(700, 350, "Howdy, partenaire ! Moi c’est Shérif Bob, et j’ai besoin d’un sacré coup d’main. On raconte qu’un développeur, capable de coder plus vite que son ombre, s’cache dans c’désert. Ton boulot ? Récupérer les lettres du mot WANTED et prouver qu’t’es à la hauteur pour l’trouver. T’attarde pas trop, cowboy, l’avenir d’l’Ouest numérique est entre tes mains !", {
            fontSize: "28px",
            fill: "#ffffff",
            wordWrap: { width: 400 },
          })
          .setOrigin(0.5);

        this.input.once('pointerdown', () => {

            this.scene.start('Game');

        });
    }
}
