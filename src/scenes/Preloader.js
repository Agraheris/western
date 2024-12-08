import { Scene } from 'phaser';

export class Preloader extends Scene
{
    constructor ()
    {
        super('Preloader');
    }

    init ()
    {
        //  We loaded this image in our Boot Scene, so we can display it here
        this.add.image(512, 384, 'background');

        this.add.image(512, 384, 'sherifBob');



    }

    preload ()
    {
            this.load.spritesheet('sherifIdle','assets/idle_spritesheet.png', { frameWidth: 32, frameHeight: 32 });
            this.load.spritesheet('sherifRunRight', 'assets/walk_right_spritesheet.png', { frameWidth: 32, frameHeight: 32 });
            this.load.spritesheet('sherifRunLeft', 'assets/walk_left_spritesheet.png', { frameWidth: 32, frameHeight: 32 });
        //  Load the assets for the game - Replace with your own assets
        this.load.setPath('assets');

    }

    create ()
    {
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.

        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        this.scene.start('MainMenu');
    }
}
