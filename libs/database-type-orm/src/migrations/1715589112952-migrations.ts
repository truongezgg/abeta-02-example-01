import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1715589112952 implements MigrationInterface {
    name = 'Migrations1715589112952'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user-image\` ADD \`is_avatar\` tinyint NOT NULL COMMENT 'true: is current avatar, false: old avatar' DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`user-image\` DROP COLUMN \`image_type\``);
        await queryRunner.query(`ALTER TABLE \`user-image\` ADD \`image_type\` int UNSIGNED NOT NULL COMMENT '1: profile image, 2: wall image'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user-image\` DROP COLUMN \`image_type\``);
        await queryRunner.query(`ALTER TABLE \`user-image\` ADD \`image_type\` tinyint NOT NULL COMMENT 'true: is current avatar, false: old avatar' DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`user-image\` DROP COLUMN \`is_avatar\``);
    }

}
