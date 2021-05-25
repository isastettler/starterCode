import "phaser";

export default class Avatar extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, spriteKey) {
        super(scene, x, y, spriteKey);

        // this.scene = scene;
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.body.collideWorldBounds = true;
        this.facingRight = false;
    }
    updateMovement(cursors){
        if(cursors.right.isDown || cursors === "right"){
            this.facingRight = true;
            this.anims.play("right", true)
            this.setVelocityX(50);
        }
        else if(cursors.left.isDown || cursors === "left"){
            this.facingRight = false;
            this.anims.play("left", true)
            this.setVelocityX(-50)
        }
        else {
            this.facingRight ?  this.anims.play("stand-right") : this.anims.play("stand-left", true)
            this.setVelocityX(0)
        }
    }
    update(cursors){
        this.updateMovement(cursors);
    }
}