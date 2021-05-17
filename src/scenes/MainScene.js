import "phaser";

import Avatar from "../entities/Avatar";
import Bird from "../entities/Bird";
import Shit from "../entities/Shits";

export default class MainScene extends Phaser.Scene {
    constructor() {
        super("MainScene");
    }
    //PRELOAD IS THE PLACE TO LAOD ALL YOUR FILES
    preload(){
        this.load.spritesheet("avatar", "/assets/avatar.png", {
            frameWidth: 48,
            frameHeight: 48
        });
        this.load.spritesheet("bird", "/assets/bird.png", {
            frameWidth: 48,
            frameHeight: 48
        })

        this.load.image("shit", "/assets/shit.png")
        this.load.image("bg", "/assets/background.png")
    }
    
    create(){
        this.add.image(300, 110, "bg").setScale(0.5);
        this.physics.world.setBounds(-10, 0, 620, 270);
        // CREATE AVATAR
        createAvatar(this, 300, 275);

        // CREATE THE COUNTDOWN 
        this.countdown = 150;
        this.birdCount = 0;
        this.text= this.add.text(50, 15, "00:00")
        this.score = this.add.text(50, 30, `you got hit: ${this.avatar.hitCount}\nyou killed: ${this.birdCount}`)
        // CREATE GROUPS TO ADD EACH CREATED BIRD/BIRDSHIT/BULLET
        this.birds = this.add.group();
        this.shits = this.add.group();
        // CREATE THE BIRD
        createBird(this, "bird");
        this.nextShit = Phaser.Math.Between(500, 1000);
        this.birds.getChildren().forEach(bird => {
            bird.timer = this.time.addEvent({
                delay: this.nextShit,
                callback: onEvent,
                callbackScope: this,
                repeat: -1
            });
        })
       
        //ADD KEYBOARD CONTROLLS FOR NAVIGATION
        this.cursors = this.input.keyboard.addKeys({
            left: Phaser.Input.Keyboard.KeyCodes.LEFT,
            right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
        }) 
        this.nextShotAt = 0;
        this.shotDelay = 500;   

    }
    update(){
        //check on keyboard controls for movement update
        if(this.avatar){
            this.avatar.update(this.cursors);
            let y = this.avatar.getBounds().y
            if(y > 300){
                this.physics.pause();
            }
        }
    }
}

//ADD ALL FUNCTIONS USED IN THE MAINSCENE

//sprite create functions
function createAvatar(scene, x, y) {
    createAvatarAnimations(scene, "avatar");
    scene.avatar = new Avatar(scene, x, y, "avatar").setSize(20, 30);
    scene.avatar.anims.play("stand-left")
    scene.avatar.hitCount = 0;
    scene.avatar.setPushable(false);
}
function createBird(scene) {
    createBirdAnimations(scene, "bird");
    let y = Math.ceil(Math.random() * 100 + 50);
    let newBird = new Bird(scene, 790, y, "bird").setSize(15, 5);
    scene.birds.add(newBird)    
}
function createShit(scene, sprite, coordinates){
    let y = coordinates.y + 48;
    let x = coordinates.x + 24;
    let newShit = new Shit(scene, x, y, sprite).setScale(0.2);
    scene.shits.add(newShit);
}
//animatin create functions
function createAvatarAnimations(scene, sprite){
    scene.anims.create({
        key: "stand-right",
        frames: scene.anims.generateFrameNumbers(sprite, {
            start: 56,
            end: 56
        })
    });
    scene.anims.create({
        key: "stand-left",
        frames: scene.anims.generateFrameNumbers(sprite, {
            start: 48,
            end: 48
        })
    });
    scene.anims.create({
        key: "right",
        frames: scene.anims.generateFrameNumbers(sprite, {
            start: 24,
            end: 31
        }),
        frameRate: 4,
        repeat: -1
    });
    scene.anims.create({
        key: "left",
        frames: scene.anims.generateFrameNumbers(sprite, {
            start: 16, 
            end: 23
        }),
        frameRate: 4,
        repeat: -1
    });
}

function createBirdAnimations(scene, sprite){
    scene.anims.create({
        key: "flyingRight",
        frames: scene.anims.generateFrameNumbers(sprite, {
            start: 3,
            end: 5
        }),
        frameRate: 3,
        repeat: -1
    });
    scene.anims.create({
        key: "flyingLeft",
        frames: scene.anims.generateFrameNumbers(sprite, {
            start: 6,
            end: 8
        }),
        frameRate: 3,
        repeat: -1
    })
}
//event function to create bird shit
function onEvent(){
    this.birds.getChildren().forEach(bird => {
        createShit(this, "shit", bird.getBounds());
    })
}
