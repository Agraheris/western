import { Scene } from 'phaser';

export class Game extends Scene {
    constructor() {
        super('Game');
    }

    create() {
        // Ajouter le fond
        this.add.image(512, 384, 'backgroundGame');

        // Ajouter les lettres et les stocker dans un tableau
        this.letters = [
            this.matter.add.sprite(300, 700, 'W'),
            this.matter.add.sprite(700, 625, 'A'),
            this.matter.add.sprite(950, 450, 'N'),
            this.matter.add.sprite(700, 450, 'T'),
            this.matter.add.sprite(500, 425, 'E'),
            this.matter.add.sprite(250, 425, 'D'),
        ];

        // Configurer les lettres
        this.letters.forEach((letter) => {
            letter.setRectangle(50, 50); // Hitbox pour chaque lettre
            letter.setStatic(true); // Les lettres ne bougent pas
        });

        // Variable pour savoir si le shérif est au sol
        this.isOnGround = false;

        // Ajouter le shérif avec un body Matter.js
        this.sherif = this.matter.add.sprite(100, 700, 'sherifIdle');
        this.sherif.setRectangle(50, 80); // Hitbox rectangulaire pour le shérif
        this.sherif.setBounce(0.2); // Léger rebond
        this.sherif.setFriction(0.1); // Ajuste la friction
        this.sherif.setFixedRotation(); // Empêche le shérif de basculer

        // Ajouter une rampe inclinée
        const ramp = this.matter.add.rectangle(560, 730, 230, 30, {
            isStatic: true, // La rampe est fixe
            angle: Phaser.Math.DegToRad(-20), // Incliner la rampe de 20 degrés
        });

        // Ajouter le sol
        const ground = this.matter.add.rectangle(512, 780, 1024, 50, {
            isStatic: true, // Fixe
        });

        // Ajouter le premier étage
        const firstFloor = this.matter.add.rectangle(870, 700, 400, 50, {
            isStatic: true, // Fixe
        });

        // Diviser le secondFloor en deux parties
        const secondFloorLeft = this.matter.add.rectangle(312, 500, 600, 50, {
            isStatic: true, // Fixe
            isSensor: false, // Capteur désactivé par défaut
        });

        const secondFloorRight = this.matter.add.rectangle(800, 520, 512, 50, {
            isStatic: true, // Fixe
            isSensor: false, // Capteur désactivé par défaut
        });

        // Stocker les références pour les utiliser dans update()
        this.secondFloorLeft = secondFloorLeft;
        this.secondFloorRight = secondFloorRight;

        // Ajouter des collisions pour les lettres
        this.matter.world.on('collisionstart', (event) => {
            event.pairs.forEach((pair) => {
                const bodies = [pair.bodyA, pair.bodyB];

                // Vérifier si le shérif entre en collision avec une lettre
                this.letters.forEach((letter, index) => {
                    if (bodies.includes(this.sherif.body) && bodies.includes(letter.body)) {
                        // Supprimer la lettre collectée
                        letter.destroy();

                        // Retirer la lettre du tableau
                        this.letters.splice(index, 1);

                        // Vérifier si toutes les lettres sont collectées
                        if (this.letters.length === 0) {
                            this.scene.start('GameOver'); // Passer à la scène GameOver
                        }
                    }
                });

                // Gestion des collisions avec le sol ou les plateformes
                if (bodies.includes(this.sherif.body)) {
                    const otherBody = bodies[0] === this.sherif.body ? bodies[1] : bodies[0];
                    if (otherBody.isStatic) {
                        this.isOnGround = true; // Le shérif est au sol
                    }
                }
            });
        });

        this.matter.world.on('collisionend', (event) => {
            event.pairs.forEach((pair) => {
                const bodies = [pair.bodyA, pair.bodyB];
                if (bodies.includes(this.sherif.body)) {
                    const otherBody = bodies[0] === this.sherif.body ? bodies[1] : bodies[0];
                    if (otherBody.isStatic) {
                        this.isOnGround = false; // Le shérif quitte le sol
                    }
                }
            });
        });

        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('sherifIdle', { start: 0, end: 3 }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'runRight',
            frames: this.anims.generateFrameNumbers('sherifRunRight', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'runLeft',
            frames: this.anims.generateFrameNumbers('sherifRunLeft', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        // Configurer les entrées clavier
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
               // Déplacement gauche
               if (this.cursors.left.isDown) {
                this.sherif.setVelocityX(-5);
                this.sherif.anims.play('runLeft', true);
            }
            // Déplacement droite
            else if (this.cursors.right.isDown) {
                this.sherif.setVelocityX(5);
                this.sherif.anims.play('runRight', true);
            }
            // Rester immobile
            else {
                this.sherif.setVelocityX(0);
                this.sherif.anims.play('idle', true);
            }
    

        // Limiter la position horizontale
        if (this.sherif.x < 25) {
            this.sherif.setPosition(25, this.sherif.y); // Limite gauche
        } else if (this.sherif.x > 999) {
            this.sherif.setPosition(999, this.sherif.y); // Limite droite
        }

        // Descendre à travers les parties du secondFloor
        if (Phaser.Input.Keyboard.JustDown(this.cursors.down)) {
            this.secondFloorLeft.isSensor = true; // Rendre traversable
            this.secondFloorRight.isSensor = true; // Rendre traversable
            this.sherif.setVelocityY(5); // Légère poussée vers le bas
        } else if (this.cursors.down.isUp && this.sherif.y <= this.secondFloorLeft.position.y) {
            this.secondFloorLeft.isSensor = false; // Revenir à bloquer
            this.secondFloorRight.isSensor = false; // Revenir à bloquer
        }

        // Sauter à travers les parties du secondFloor
        if (
            (this.sherif.y > this.secondFloorLeft.position.y && this.sherif.body.velocity.y < 0) ||
            (this.sherif.y > this.secondFloorRight.position.y && this.sherif.body.velocity.y < 0)
        ) {
            this.secondFloorLeft.isSensor = true; // Rendre traversable pendant le saut
            this.secondFloorRight.isSensor = true; // Rendre traversable pendant le saut
        } else if (
            (this.sherif.y <= this.secondFloorLeft.position.y ||
                this.sherif.y <= this.secondFloorRight.position.y) &&
            this.cursors.down.isUp
        ) {
            this.secondFloorLeft.isSensor = false; // Revenir à bloquer après avoir traversé
            this.secondFloorRight.isSensor = false; // Revenir à bloquer après avoir traversé
        }

        // Saut
        if (this.cursors.up.isDown && this.isOnGround) {
            this.sherif.setVelocityY(-12); // Saut
            this.isOnGround = false; // Empêche de sauter en continu
        }
    }
}
