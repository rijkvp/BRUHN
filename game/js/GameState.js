const OFFSET_3D = 0.0;

const LEVEL_SIZE = 20000;
const LEVEL_HEIGHT = 800;
const PLATFORM_HEIGHT = 40;
const TOTAL_PARTS = 4;
const LEVEL_COLORS = { 1: "#6E9E7D", 2: "#647C9E", 3: "#9E925B", 4: "#9E7554", 5: "#FF343E", 6: "#C56AD7" };
class LevelPart {
    constructor(objects, width) {
        this.objects = objects;
        this.width = width;
    }
}

var gameOverInfo;

class GameState extends State {
    constructor() {
        super();
        this.level = 1;
        this.player = new Player(0, 0);
        this.collidableObjects = this.createLevel();
        this.cameraPos = createVector(0, 0);
        this.score = 0;
    }

    createLevel() {
        var objects = [];
        var x = 0;
        var levelPart = this.createEmptyLevelPart(x);
        levelPart.objects.forEach(object => {
            objects.push(object);
        });
        x += levelPart.width;
        while (x < LEVEL_SIZE) {
            var seed = int(random(0, TOTAL_PARTS + 1));
            var levelPart = this.generateLevelPart(seed, this.level, x);
            levelPart.objects.forEach(object => {
                objects.push(object);
            });
            x += levelPart.width;
        }
        return objects;
    }

    createEmptyLevelPart(x) {
        var y = 350;
        const WIDTH = 1000;
        return new LevelPart([
            new CollidableObject(x + (WIDTH / 2), y + (PLATFORM_HEIGHT / 2), WIDTH, PLATFORM_HEIGHT),
            new CollidableObject(x + (WIDTH / 2), y - LEVEL_HEIGHT + (PLATFORM_HEIGHT / 2), WIDTH, PLATFORM_HEIGHT)],
            WIDTH);
    }

    generateLevelPart(seed, difficulty, x) {
        var y = 350;
        switch (seed) {
            default:
            case 0:
                {
                    const WIDTH = 2000;
                    const OBSTACLE_WIDTH = 50;
                    var obstacleHeight = 200 + 5 * difficulty;
                    return new LevelPart([
                        new CollidableObject(x + (OBSTACLE_WIDTH / 2) + (WIDTH / 2), y - (obstacleHeight / 2), OBSTACLE_WIDTH, obstacleHeight, true),
                        new CollidableObject(x + (OBSTACLE_WIDTH / 2) + (WIDTH / 2), y - LEVEL_HEIGHT + (obstacleHeight / 2) + PLATFORM_HEIGHT, OBSTACLE_WIDTH, obstacleHeight, true),
                        new CollidableObject(x + (WIDTH / 2), y + (PLATFORM_HEIGHT / 2), WIDTH, PLATFORM_HEIGHT),
                        new CollidableObject(x + (WIDTH / 2), y - LEVEL_HEIGHT + (PLATFORM_HEIGHT / 2), WIDTH, PLATFORM_HEIGHT)],
                        WIDTH);
                }
            case 1:
                {
                    const WIDTH = 2000;
                    const OBSTACLE_WIDTH = 50;
                    var obstacleHeight = 310 + 10 * difficulty;
                    return new LevelPart([
                        new CollidableObject(x + (OBSTACLE_WIDTH / 2) + (WIDTH / 4), y - (obstacleHeight / 2), OBSTACLE_WIDTH, obstacleHeight, true),
                        new CollidableObject(x + (OBSTACLE_WIDTH / 2) + (WIDTH / 4 * 3), y - LEVEL_HEIGHT + (obstacleHeight / 2) + PLATFORM_HEIGHT, OBSTACLE_WIDTH, obstacleHeight, true),
                        new CollidableObject(x + (WIDTH / 2), y + (PLATFORM_HEIGHT / 2), WIDTH, PLATFORM_HEIGHT),
                        new CollidableObject(x + (WIDTH / 2), y - LEVEL_HEIGHT + (PLATFORM_HEIGHT / 2), WIDTH, PLATFORM_HEIGHT)],
                        WIDTH);
                }
            case 2:
                {
                    const WIDTH = 2000;
                    var obstacleHeight = 380 + 10 * difficulty;
                    const OBSTACLE_WIDTH = 50;
                    return new LevelPart([
                        new CollidableObject(x + (OBSTACLE_WIDTH / 2) + (WIDTH / 4), 0, OBSTACLE_WIDTH, obstacleHeight, true),
                        new CollidableObject(x + (OBSTACLE_WIDTH / 2) + (WIDTH / 4 * 3), 0, OBSTACLE_WIDTH, obstacleHeight, true),
                        new CollidableObject(x + (WIDTH / 2), y + (PLATFORM_HEIGHT / 2), WIDTH, PLATFORM_HEIGHT),
                        new CollidableObject(x + (WIDTH / 2), y - LEVEL_HEIGHT + (PLATFORM_HEIGHT / 2), WIDTH, PLATFORM_HEIGHT)],
                        WIDTH);
                }
            case 3:
                {
                    const WIDTH = 2000;
                    var obstacleHeight = 80 + this.level * 14;
                    const OBSTACLE_WIDTH = 50;
                    return new LevelPart([
                        new CollidableObject(x + (OBSTACLE_WIDTH / 2) + (WIDTH / 4), y - (obstacleHeight / 2), OBSTACLE_WIDTH, obstacleHeight, true),
                        new CollidableObject(x + (OBSTACLE_WIDTH / 2) + (WIDTH / 2), (obstacleHeight / 2) + (PLATFORM_HEIGHT / 2), OBSTACLE_WIDTH, obstacleHeight, true),
                        new CollidableObject(x + (OBSTACLE_WIDTH / 2) + (WIDTH / 4 * 3), y - (obstacleHeight / 2), OBSTACLE_WIDTH, obstacleHeight, true),

                        new CollidableObject(x + (OBSTACLE_WIDTH / 2) + (WIDTH / 4), y - LEVEL_HEIGHT + (obstacleHeight / 2) + PLATFORM_HEIGHT, OBSTACLE_WIDTH, obstacleHeight, true),
                        new CollidableObject(x + (OBSTACLE_WIDTH / 2) + (WIDTH / 2), -(obstacleHeight / 2) - (PLATFORM_HEIGHT / 2), OBSTACLE_WIDTH, obstacleHeight, true),
                        new CollidableObject(x + (OBSTACLE_WIDTH / 2) + (WIDTH / 4 * 3), y - LEVEL_HEIGHT + (obstacleHeight / 2) + PLATFORM_HEIGHT, OBSTACLE_WIDTH, obstacleHeight, true),

                        new CollidableObject(x + (WIDTH / 2), 0, WIDTH - 400, PLATFORM_HEIGHT),
                        new CollidableObject(x + (WIDTH / 2), y + (PLATFORM_HEIGHT / 2), WIDTH, PLATFORM_HEIGHT),
                        new CollidableObject(x + (WIDTH / 2), y - LEVEL_HEIGHT + (PLATFORM_HEIGHT / 2), WIDTH, PLATFORM_HEIGHT)],
                        WIDTH);
                }
            case 4:
                {
                    const WIDTH = 2000;
                    var obstacleHeight = 80 + this.level * 14;
                    const OBSTACLE_WIDTH = 50;
                    return new LevelPart([
                        new CollidableObject(x + (OBSTACLE_WIDTH / 2) + (WIDTH / 4), (obstacleHeight / 2) + (PLATFORM_HEIGHT / 2), OBSTACLE_WIDTH, obstacleHeight, true),
                        new CollidableObject(x + (OBSTACLE_WIDTH / 2) + (WIDTH / 2), y - (obstacleHeight / 2), OBSTACLE_WIDTH, obstacleHeight, true),
                        new CollidableObject(x + (OBSTACLE_WIDTH / 2) + (WIDTH / 4 * 3), (obstacleHeight / 2) + (PLATFORM_HEIGHT / 2), OBSTACLE_WIDTH, obstacleHeight, true),

                        new CollidableObject(x + (OBSTACLE_WIDTH / 2) + (WIDTH / 4), -(obstacleHeight / 2) - (PLATFORM_HEIGHT / 2), OBSTACLE_WIDTH, obstacleHeight, true),
                        new CollidableObject(x + (OBSTACLE_WIDTH / 2) + (WIDTH / 2), y - LEVEL_HEIGHT + (obstacleHeight / 2) + PLATFORM_HEIGHT, OBSTACLE_WIDTH, obstacleHeight, true),
                        new CollidableObject(x + (OBSTACLE_WIDTH / 2) + (WIDTH / 4 * 3), -(obstacleHeight / 2) - (PLATFORM_HEIGHT / 2), OBSTACLE_WIDTH, obstacleHeight, true),

                        new CollidableObject(x + (WIDTH / 2), 0, WIDTH - 400, PLATFORM_HEIGHT),
                        new CollidableObject(x + (WIDTH / 2), y + (PLATFORM_HEIGHT / 2), WIDTH, PLATFORM_HEIGHT),
                        new CollidableObject(x + (WIDTH / 2), y - LEVEL_HEIGHT + (PLATFORM_HEIGHT / 2), WIDTH, PLATFORM_HEIGHT)],
                        WIDTH);
                }
        }
    }

    nextLevel() {
        this.player.position = createVector(0, 0);
        this.cameraPos = createVector(0, 0);
        this.collidableObjects = this.createLevel();
        this.level++;
    }

    onUpdate() {
        this.player.update(this.collidableObjects);
        this.cameraPos.lerp(this.player.position.x, this.player.position.y / 2, 0, 0.1);
        if (this.player.position.x >= LEVEL_SIZE) {
            this.nextLevel();
        }
        if (this.player.isDead) {
            gameOverInfo = {
                score: this.score,
                level: this.level
            }
            stateManager.switchState(GAME_STATE_ENUM.GAME_OVER);
        }
        this.score += this.level;
    }

    onDraw() {
        var bgColor = color(LEVEL_COLORS[this.level]);
        background(bgColor);

        camera(this.cameraPos.x, this.cameraPos.y, (height / 2.0) / tan(PI * 30.0 / 180.0), this.cameraPos.x + OFFSET_3D, this.cameraPos.y + OFFSET_3D, 0, 0, 1, 0);

        this.player.draw();
        this.collidableObjects.forEach(object => {
            object.draw();
        });

        // Draw HUD
        camera(0, 0, (height / 2.0) / tan(PI * 30.0 / 180.0), 0, 0, 0, 0, 1, 0);
        fill('#fff');
        const SCREEN_PADDING = 50;

        textSize(24);
        textAlign(LEFT, TOP);
        text("LEVEL: " + this.level, SCREEN_PADDING, SCREEN_PADDING, width, height);


        textAlign(RIGHT, TOP);
        text("SCORE: " + this.score, -SCREEN_PADDING, SCREEN_PADDING, width, height);

        textAlign(LEFT, BOTTOM);
        text("PLAYER X: " + this.player.position.x, SCREEN_PADDING, -SCREEN_PADDING, width, height);

        // Dash bar
        var barWidth = 200;
        var barHeight = 40;
        var fillPercent = this.player.dashTimer / DASH_COOLDOWN;
        var barFill = fillPercent * barWidth;

        stroke('#000');
        strokeWeight(2);
        fill('#222');
        rect(0, -height / 2 + SCREEN_PADDING, barWidth, barHeight);
        fill('#4589ff');
        rect((0.5 * barFill) - barWidth / 2, -height / 2 + SCREEN_PADDING, barFill, barHeight);
    }
}