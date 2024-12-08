import { Scene } from 'phaser';

export class Game extends Scene
{
    constructor ()
    {
        super('Game');
    }

    create ()
    {

        this.add.image(512, 384, 'backgroundGame');
        this.add.image(300,700, 'W');
        this.add.image(700,625, 'A');
        this.add.image(950,450, 'N');
        this.add.image(700,450, 'T');
        this.add.image(500,425, 'E');
        this.add.image(250,425, 'D');

        this.anims.create({
            key: 'idle', // clé de l'animation
            frames: this.anims.generateFrameNumbers('sherifIdle', {
                start: 0, // première frame
                end: 3, 
            }),
        });

        // Ajouter et jouer l'animation sur le sprite
        const sherif = this.add.sprite(400, 200, 'sherifIdle');

        sherif.play('idle'); // démarrer l'animation

    }
}
