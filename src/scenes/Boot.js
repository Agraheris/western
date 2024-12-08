import { Scene } from 'phaser';

export class Boot extends Scene
{
    constructor ()
    {
        super('Boot');
    }

    preload ()
    {
        //  The Boot Scene is typically used to load in any assets you require for your Preloader, such as a game logo or background.
        //  The smaller the file size of the assets, the better, as the Boot Scene itself has no preloader.

        this.load.image('background', 'assets/BgMenu.png');
        this.load.image('sherifBob', 'assets/bob.png');
        this.load.image('backgroundGame', 'assets/bg.png' );
        this.load.image('W', 'assets/W.png' );
        this.load.image('A', 'assets/A.png' );
        this.load.image('N', 'assets/N.png' );
        this.load.image('T', 'assets/T.png' );
        this.load.image('E', 'assets/E.png' );
        this.load.image('D', 'assets/D.png' );
        this.load.spritesheet('sherifIdle', 'assets/idle_spritesheet.png', {
            frameWidth: 16,
            frameHeight: 16, 
        });

      
    }
    create ()
    {
        this.scene.start('Preloader');
        
    }
}
